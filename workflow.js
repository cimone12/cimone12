/**
 * Life Insurance Lead Scraping Workflow
 *
 * Orchestrates parallel scraping across Google, Reddit, Quora,
 * and public insurance sites. Normalizes, deduplicates, scores,
 * and ranks leads before writing structured output.
 *
 * Usage:
 *   APIFY_API_TOKEN=<token> node workflow.js [--sources=google,reddit,quora,insurance]
 */

import { scrapeGoogle }         from './scrapers/google.js';
import { scrapeReddit }         from './scrapers/reddit.js';
import { scrapeQuora }          from './scrapers/quora.js';
import { scrapeInsuranceSites } from './scrapers/insurance-sites.js';
import { deduplicateLeads, rankLeads } from './lib/normalizer.js';
import { writeJSON, writeCSV, printTable } from './lib/output.js';

// Parse --sources flag, default to all
const args    = process.argv.slice(2);
const srcArg  = args.find(a => a.startsWith('--sources='));
const sources = srcArg
  ? srcArg.split('=')[1].split(',').map(s => s.trim().toLowerCase())
  : ['google', 'reddit', 'quora', 'insurance'];

async function run() {
  console.log('=== Life Insurance Lead Workflow ===');
  console.log(`Sources: ${sources.join(', ')}`);
  console.log('Country: United States | Product: Life Insurance\n');

  const scrapers = [];

  if (sources.includes('google'))    scrapers.push(scrapeGoogle());
  if (sources.includes('reddit'))    scrapers.push(scrapeReddit());
  if (sources.includes('quora'))     scrapers.push(scrapeQuora());
  if (sources.includes('insurance')) scrapers.push(scrapeInsuranceSites());

  if (scrapers.length === 0) {
    console.error('No valid sources specified. Use: google, reddit, quora, insurance');
    process.exit(1);
  }

  // Run all scrapers in parallel
  const results = await Promise.allSettled(scrapers);

  const allLeads = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      allLeads.push(...result.value);
    } else {
      console.error(`Scraper failed: ${result.reason?.message || result.reason}`);
    }
  }

  console.log(`\nTotal raw leads collected: ${allLeads.length}`);

  // Deduplicate → rank
  const unique = deduplicateLeads(allLeads);
  console.log(`After deduplication: ${unique.length}`);

  const ranked = rankLeads(unique);

  // Output
  printTable(ranked);
  writeJSON(ranked);
  writeCSV(ranked);

  console.log('\nDone.');
  return ranked;
}

run().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
