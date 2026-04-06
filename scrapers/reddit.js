import client from '../apify.js';
import { ACTORS, REDDIT_SUBREDDITS, REDDIT_SEARCH_TERMS } from '../config.js';
import { normalizeLead } from '../lib/normalizer.js';

/**
 * Scrape Reddit discussions for life insurance intent signals.
 * Uses trudax/reddit-scraper-lite.
 */
export async function scrapeReddit() {
  console.log('[Reddit] Starting scrape...');

  const startUrls = [];

  // Build search URLs for each term across each subreddit
  for (const sub of REDDIT_SUBREDDITS) {
    for (const term of REDDIT_SEARCH_TERMS) {
      const encoded = encodeURIComponent(term);
      startUrls.push({
        url: `https://www.reddit.com/r/${sub}/search/?q=${encoded}&restrict_sr=1&sort=new`,
      });
    }
  }

  const run = await client.actor(ACTORS.redditScraper).call({
    startUrls,
    maxPostCount:    50,
    maxComments:     10,
    skipComments:    false,
    proxy:           { useApifyProxy: true, apifyProxyGroups: ['RESIDENTIAL'] },
  });

  const dataset = await client.dataset(run.defaultDatasetId).listItems();
  const raw     = dataset.items || [];

  console.log(`[Reddit] Got ${raw.length} raw items`);

  const leads = [];
  for (const item of raw) {
    // Posts
    if (item.dataType === 'post' || item.title) {
      const lead = normalizeLead(
        {
          title:   item.title    || '',
          text:    item.selftext || item.body || '',
          author:  item.author   || item.authorName,
          url:     item.url      || item.permalink,
        },
        'Reddit'
      );
      if (lead) leads.push(lead);
    }

    // Comments
    if (item.dataType === 'comment' || item.comments) {
      const comments = item.comments || (Array.isArray(item) ? item : []);
      for (const c of comments) {
        const lead = normalizeLead(
          {
            text:   c.body   || c.text || '',
            author: c.author || c.authorName,
            url:    c.permalink || item.url,
            title:  item.title || '',
          },
          'Reddit'
        );
        if (lead) leads.push(lead);
      }
    }
  }

  console.log(`[Reddit] Normalized ${leads.length} leads`);
  return leads;
}
