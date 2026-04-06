/**
 * run.js — Full end-to-end lead scraping pipeline
 *
 * In production (local machine with Apify access):
 *   Calls live Apify actors → Google, Reddit, Quora scrapers.
 *
 * In sandboxed environments (Apify unreachable):
 *   Automatically falls back to realistic mock actor payloads that
 *   mirror the real actor output schemas exactly, then runs every
 *   processing step (score → normalize → deduplicate → rank → output).
 *
 * Usage:
 *   APIFY_API_TOKEN=<token> node run.js
 */

import 'dotenv/config';
import { ApifyClient } from 'apify-client';
import { normalizeLead, deduplicateLeads, rankLeads } from './lib/normalizer.js';
import { writeJSON, writeCSV, printTable } from './lib/output.js';
import { ACTORS, SEARCH_QUERIES, REDDIT_SUBREDDITS, REDDIT_SEARCH_TERMS, QUORA_QUERIES } from './config.js';
import { GOOGLE_RAW, REDDIT_RAW, QUORA_RAW } from './mock-actor-data.js';

const client = new ApifyClient({ token: process.env.APIFY_API_TOKEN });

// ── Connectivity check ────────────────────────────────────────────────────
async function apifyReachable() {
  try {
    await client.user('me').get();
    return true;
  } catch {
    return false;
  }
}

// ── LIVE scrapers ─────────────────────────────────────────────────────────
async function liveGoogle() {
  console.log('  [Google] Calling actor apify/google-search-scraper...');
  const run = await client.actor(ACTORS.googleSearch).call({
    queries:          SEARCH_QUERIES.join('\n'),
    resultsPerPage:   10,
    maxPagesPerQuery: 2,
    languageCode:     'en',
    countryCode:      'us',
  });
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  console.log(`  [Google] Actor finished — ${items.length} raw results`);
  return items;
}

async function liveReddit() {
  console.log('  [Reddit] Calling actor trudax/reddit-scraper-lite...');
  const startUrls = REDDIT_SUBREDDITS.flatMap(sub =>
    REDDIT_SEARCH_TERMS.map(term => ({
      url: `https://www.reddit.com/r/${sub}/search/?q=${encodeURIComponent(term)}&restrict_sr=1&sort=new`,
    }))
  );
  const run = await client.actor(ACTORS.redditScraper).call({
    startUrls,
    maxPostCount: 50,
    maxComments:  5,
    proxy: { useApifyProxy: true, apifyProxyGroups: ['RESIDENTIAL'] },
  });
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  console.log(`  [Reddit] Actor finished — ${items.length} raw results`);
  return items;
}

async function liveQuora() {
  console.log('  [Quora] Calling actor epctex/quora-scraper...');
  const startUrls = QUORA_QUERIES.map(q => ({
    url:  `https://www.quora.com/search?q=${encodeURIComponent(q)}`,
    type: 'SEARCH',
  }));
  const run = await client.actor(ACTORS.quoraScraper).call({
    startUrls,
    maxItems:       100,
    includeAnswers: true,
    proxy: { useApifyProxy: true, apifyProxyGroups: ['RESIDENTIAL'] },
  });
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  console.log(`  [Quora] Actor finished — ${items.length} raw results`);
  return items;
}

// ── Mock scrapers (same output shape as live) ─────────────────────────────
function mockGoogle() {
  console.log('  [Google] Using mock actor data (17 results across 3 query pages)...');
  return GOOGLE_RAW;
}
function mockReddit() {
  console.log('  [Reddit] Using mock actor data (17 posts)...');
  return REDDIT_RAW;
}
function mockQuora() {
  console.log('  [Quora]  Using mock actor data (10 questions + answers)...');
  return QUORA_RAW;
}

// ── Normalizers — shape raw actor items into the lead schema ───────────────
function processGoogle(items) {
  const leads = [];
  for (const item of items) {
    const results = item.organicResults || [item];
    for (const r of results) {
      const lead = normalizeLead(
        { title: r.title || item.title || '', snippet: r.snippet || item.description || '', url: r.url || item.url },
        'Google'
      );
      if (lead) leads.push(lead);
    }
  }
  return leads;
}

function processReddit(items) {
  const leads = [];
  for (const item of items) {
    const lead = normalizeLead(
      { title: item.title || '', text: item.selftext || item.body || '', author: item.author || item.authorName, url: item.url || item.permalink },
      'Reddit'
    );
    if (lead) leads.push(lead);

    for (const c of (item.comments || [])) {
      const cLead = normalizeLead(
        { title: item.title || '', text: c.body || c.text || '', author: c.author, url: c.permalink || item.url },
        'Reddit'
      );
      if (cLead) leads.push(cLead);
    }
  }
  return leads;
}

function processQuora(items) {
  const leads = [];
  for (const item of items) {
    const qLead = normalizeLead(
      { question: item.question || '', text: item.questionDetails || '', author: item.author, url: item.url },
      'Quora'
    );
    if (qLead) leads.push(qLead);

    for (const ans of (item.answers || [])) {
      const aLead = normalizeLead(
        { question: item.question || '', answer: ans.content || ans.text || '', author: ans.author, url: ans.url || item.url },
        'Quora'
      );
      if (aLead) leads.push(aLead);
    }
  }
  return leads;
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║   Life Insurance Lead Scraper  |  United States  |  2026 ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Step 1 — connectivity check
  process.stdout.write('Checking Apify connectivity... ');
  const live = await apifyReachable();
  console.log(live ? 'CONNECTED (live mode)\n' : 'UNREACHABLE — running with mock actor data\n');

  // Step 2 — scrape all sources in parallel
  console.log('Step 1/4 — Calling scrapers in parallel...');
  const [googleRaw, redditRaw, quoraRaw] = await Promise.all([
    live ? liveGoogle() : mockGoogle(),
    live ? liveReddit() : mockReddit(),
    live ? liveQuora()  : mockQuora(),
  ]);
  console.log('');

  // Step 3 — normalize through real pipeline
  console.log('Step 2/4 — Processing leads through scoring pipeline...');
  const googleLeads  = processGoogle(googleRaw);
  const redditLeads  = processReddit(redditRaw);
  const quoraLeads   = processQuora(quoraRaw);
  const totalRaw = googleLeads.length + redditLeads.length + quoraLeads.length;
  console.log(`  Google : ${googleLeads.length} passed HIGH-intent filter`);
  console.log(`  Reddit : ${redditLeads.length} passed HIGH-intent filter`);
  console.log(`  Quora  : ${quoraLeads.length} passed HIGH-intent filter`);
  console.log(`  Total  : ${totalRaw} before deduplication\n`);

  // Step 4 — deduplicate + rank
  console.log('Step 3/4 — Deduplicating and ranking...');
  const allLeads  = [...googleLeads, ...redditLeads, ...quoraLeads];
  const unique    = deduplicateLeads(allLeads);
  const ranked    = rankLeads(unique);
  console.log(`  ${allLeads.length - unique.length} duplicates removed → ${ranked.length} unique leads\n`);

  // Step 5 — output
  console.log('Step 4/4 — Saving files...');
  printTable(ranked);
  writeJSON(ranked);
  writeCSV(ranked);

  console.log('\n✓ Done. Files saved: leads_output.csv  |  leads_output.json');
}

main().catch(err => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
