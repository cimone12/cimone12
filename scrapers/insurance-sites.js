import client from '../apify.js';
import { ACTORS } from '../config.js';
import { normalizeLead } from '../lib/normalizer.js';

/**
 * Scrape public insurance comparison / quote request pages.
 * Uses apify/web-scraper (Puppeteer-based).
 *
 * These sites often show public reviews, forum threads, or visible
 * quote-form discussions. We do NOT submit forms or access private data.
 */

const TARGET_URLS = [
  // Public forum / community threads on insurance aggregators
  {
    url:  'https://www.reddit.com/r/LifeInsurance/new/',
    type: 'REDDIT_FEED',
  },
  {
    url:  'https://www.insure.com/life-insurance/',
    type: 'ARTICLE',
  },
  {
    url:  'https://www.policygenius.com/life-insurance/',
    type: 'ARTICLE',
  },
  {
    url:  'https://www.valuepenguin.com/life-insurance',
    type: 'ARTICLE',
  },
  {
    url:  'https://forums.whitecoatinvestor.com/search?q=life+insurance',
    type: 'FORUM',
  },
  {
    url:  'https://www.bogleheads.org/forum/viewforum.php?f=1',
    type: 'FORUM',
  },
];

const PAGE_FUNCTION = `
async function pageFunction(context) {
  const { page, request, log } = context;
  const results = [];

  // Generic text extraction — grab headings + paragraphs with intent signals
  const elements = await page.$$eval('h1,h2,h3,p,li,article,.post,.comment,.review', els =>
    els.map(el => ({
      tag:  el.tagName,
      text: el.innerText.slice(0, 500),
    }))
  );

  const LIFE_RE = /life insurance|term life|whole life/i;
  const INTENT_RE = /buy|quote|recommend|compare|need|looking for|apply/i;

  for (const el of elements) {
    if (LIFE_RE.test(el.text) && INTENT_RE.test(el.text)) {
      results.push({
        url:     request.url,
        content: el.text.trim(),
        source:  'InsuranceSite',
      });
    }
  }

  return results;
}
`;

export async function scrapeInsuranceSites() {
  console.log('[InsuranceSites] Starting scrape...');

  const run = await client.actor(ACTORS.webScraper).call({
    startUrls:    TARGET_URLS.map(t => ({ url: t.url })),
    pageFunction: PAGE_FUNCTION,
    maxCrawlingDepth: 1,
    maxPagesPerCrawl: 30,
    proxyConfiguration: { useApifyProxy: true },
  });

  const dataset = await client.dataset(run.defaultDatasetId).listItems();
  // Web scraper returns arrays of results per page
  const raw = (dataset.items || []).flat();

  console.log(`[InsuranceSites] Got ${raw.length} raw snippets`);

  const leads = [];
  for (const item of raw) {
    const lead = normalizeLead(
      {
        text:  item.content || '',
        url:   item.url,
      },
      'InsuranceSite'
    );
    if (lead) leads.push(lead);
  }

  console.log(`[InsuranceSites] Normalized ${leads.length} leads`);
  return leads;
}
