import client from '../apify.js';
import { ACTORS, QUORA_QUERIES } from '../config.js';
import { normalizeLead } from '../lib/normalizer.js';

/**
 * Scrape Quora for life insurance questions and answers.
 * Uses epctex/quora-scraper.
 */
export async function scrapeQuora() {
  console.log('[Quora] Starting scrape...');

  const startUrls = QUORA_QUERIES.map(q => ({
    url:  `https://www.quora.com/search?q=${encodeURIComponent(q)}`,
    type: 'SEARCH',
  }));

  const run = await client.actor(ACTORS.quoraScraper).call({
    startUrls,
    maxItems:           100,
    includeAnswers:     true,
    proxy:              { useApifyProxy: true, apifyProxyGroups: ['RESIDENTIAL'] },
  });

  const dataset = await client.dataset(run.defaultDatasetId).listItems();
  const raw     = dataset.items || [];

  console.log(`[Quora] Got ${raw.length} raw items`);

  const leads = [];
  for (const item of raw) {
    // Question-level lead
    const qLead = normalizeLead(
      {
        question: item.question || item.title || '',
        text:     item.questionDetails || '',
        author:   item.author || null,
        url:      item.url,
      },
      'Quora'
    );
    if (qLead) leads.push(qLead);

    // Per-answer leads
    const answers = item.answers || [];
    for (const ans of answers) {
      const aLead = normalizeLead(
        {
          question: item.question || '',
          answer:   ans.content   || ans.text || '',
          author:   ans.author    || null,
          url:      ans.url       || item.url,
        },
        'Quora'
      );
      if (aLead) leads.push(aLead);
    }
  }

  console.log(`[Quora] Normalized ${leads.length} leads`);
  return leads;
}
