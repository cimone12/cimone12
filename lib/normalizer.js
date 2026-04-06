import {
  scoreIntent,
  extractState,
  extractAge,
  extractEmail,
  extractPhone,
  extractCoverageInterest,
} from './scorer.js';
import { MIN_INTENT_SCORE } from '../config.js';

/**
 * Normalize a raw scraped item into the standard lead schema.
 *
 * A lead is ONLY returned when ALL of the following are true:
 *  1. Not disqualified by any DISQUALIFY_PATTERN (career, agent, educational)
 *  2. Has confirmed US context (state, city, or explicit US mention)
 *  3. intentScore >= MIN_INTENT_SCORE (60) → intentLevel === 'HIGH'
 *
 * Returns null for anything that doesn't meet all three conditions.
 */
export function normalizeLead(raw, source) {
  const text = [
    raw.title    || '',
    raw.text     || '',
    raw.snippet  || '',
    raw.body     || '',
    raw.content  || '',
    raw.selftext || '',
    raw.question || '',
    raw.answer   || '',
  ].join(' ');

  const { score, intentLevel, disqualified } = scoreIntent(text);

  // Reject: disqualified (agent promo / career / non-US / educational)
  if (disqualified) return null;

  // Reject: not HIGH intent
  if (intentLevel !== 'HIGH' || score < MIN_INTENT_SCORE) return null;

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
 * Key: URL when available, otherwise source + name + title fingerprint.
 * Keeps the entry with the highest intent score on collision.
 */
export function deduplicateLeads(leads) {
  const seen = new Map();

  for (const lead of leads) {
    const key = lead.url
      ? lead.url
      : `${lead.source}::${lead.name ?? ''}::${lead.title ?? ''}`;

    const existing = seen.get(key);
    if (!existing || lead.intentScore > existing.intentScore) {
      seen.set(key, lead);
    }
  }

  return [...seen.values()];
}

/**
 * Sort HIGH-intent leads by score descending.
 * All leads reaching this point are already HIGH — rank purely by score.
 */
export function rankLeads(leads) {
  return leads.sort((a, b) => b.intentScore - a.intentScore);
}
