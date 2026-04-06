import {
  scoreIntent,
  extractState,
  extractAge,
  extractEmail,
  extractPhone,
  extractCoverageInterest,
} from './scorer.js';

/**
 * Normalize a raw scraped item into the standard lead schema.
 *
 * Raw item may come from Google, Reddit, Quora, or insurance sites.
 * Returns null if the item has no life-insurance relevance.
 */
export function normalizeLead(raw, source) {
  const text = [
    raw.title   || '',
    raw.text    || '',
    raw.snippet || '',
    raw.body    || '',
    raw.content || '',
    raw.selftext || '',
    raw.question || '',
    raw.answer   || '',
  ].join(' ');

  const { score, intentLevel } = scoreIntent(text);

  // Drop completely irrelevant items
  if (score === 0) return null;

  return {
    source,
    name:             raw.author || raw.username || raw.name || null,
    email:            extractEmail(text),
    phone:            extractPhone(text),
    state:            extractState(text),
    ageRange:         extractAge(text),
    coverageInterest: extractCoverageInterest(text),
    intentScore:      score,
    intentLevel,
    title:            (raw.title || raw.question || '').slice(0, 120),
    url:              raw.url || raw.link || null,
    scrapedAt:        new Date().toISOString(),
  };
}

/**
 * Deduplicate leads.
 * Strategy: group by (name + source) or URL; keep highest intent score.
 */
export function deduplicateLeads(leads) {
  const seen = new Map();

  for (const lead of leads) {
    const key = lead.url || `${lead.source}::${lead.name}::${lead.title}`;
    const existing = seen.get(key);
    if (!existing || lead.intentScore > existing.intentScore) {
      seen.set(key, lead);
    }
  }

  return [...seen.values()];
}

/**
 * Sort leads: HIGH intent first, then by score descending.
 */
export function rankLeads(leads) {
  const order = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  return leads.sort((a, b) => {
    const levelDiff = (order[a.intentLevel] ?? 3) - (order[b.intentLevel] ?? 3);
    return levelDiff !== 0 ? levelDiff : b.intentScore - a.intentScore;
  });
}
