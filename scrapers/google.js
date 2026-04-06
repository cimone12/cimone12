import client from '../apify.js';
import { ACTORS, SEARCH_QUERIES } from '../config.js';
import { normalizeLead } from '../lib/normalizer.js';

/**
 * Scrape Google search results for life insurance intent signals.
 * Uses apify/google-search-scraper.
 */
export async function scrapeGoogle() {
  console.log('[Google] Starting scrape...');

  const run = await client.actor(ACTORS.googleSearch).call({
    queries:           SEARCH_QUERIES.join('\n'),
    resultsPerPage:    10,
    maxPagesPerQuery:  2,
    languageCode:      'en',
    countryCode:       'us',
    outputFormats:     ['organic'],
  });

  const dataset = await client.dataset(run.defaultDatasetId).listItems();
  const raw     = dataset.items || [];

  console.log(`[Google] Got ${raw.length} raw results`);

  const leads = [];
  for (const item of raw) {
    // Each Google result may have organic results nested
    const results = item.organicResults || [item];
    for (const r of results) {
      const lead = normalizeLead(
        {
          title:   r.title   || item.title,
          snippet: r.snippet || item.description || '',
          url:     r.url     || item.url || r.link,
        },
        'Google'
      );
      if (lead) leads.push(lead);
    }
  }

  console.log(`[Google] Normalized ${leads.length} leads`);
  return leads;
}
