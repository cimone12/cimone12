import {
  HIGH_INTENT_KEYWORDS,
  MEDIUM_INTENT_KEYWORDS,
  DISQUALIFY_PATTERNS,
  US_CONTEXT_PATTERNS,
  US_STATES,
  US_CITIES,
  AGE_PATTERNS,
} from '../config.js';

/**
 * Score a lead's intent level based on text content.
 *
 * Scoring philosophy:
 *  - Exact high-intent buying phrases carry the most weight (+25 each).
 *  - Medium-intent keywords only add points when a HIGH phrase is present.
 *  - US context is mandatory; failure to confirm US drops score to 0.
 *  - Disqualifying patterns (career, agent promo, educational) hard-fail.
 *
 * Returns: { score, intentLevel, disqualified, reason }
 *   score        – numeric (0–100)
 *   intentLevel  – 'HIGH' | 'MEDIUM' | 'LOW'
 *   disqualified – boolean
 *   reason       – string explaining disqualification (if any)
 */
export function scoreIntent(text = '') {
  // ── 1. Hard disqualification check ────────────────────────────────────────
  for (const pattern of DISQUALIFY_PATTERNS) {
    if (pattern.test(text)) {
      return { score: 0, intentLevel: 'LOW', disqualified: true, reason: `Matched disqualify pattern: ${pattern}` };
    }
  }

  const lower = text.toLowerCase();
  let score = 0;
  let highIntentMatches = 0;

  // ── 2. HIGH intent phrases (+25 each, heavy weight) ───────────────────────
  for (const kw of HIGH_INTENT_KEYWORDS) {
    if (lower.includes(kw.toLowerCase())) {
      score += 25;
      highIntentMatches++;
    }
  }

  // ── 3. Buying-verb proximity to "life insurance" (+20) ────────────────────
  // e.g. "I want to buy life insurance", "need to get life insurance"
  if (/\b(buy|purchase|get|need|want|looking to|trying to|ready to|plan to|apply)\b.{0,40}life insurance/i.test(text)) {
    score += 20;
    highIntentMatches++;
  }

  // ── 4. Quote / recommendation request signals (+15 each) ──────────────────
  if (/\b(get|request|need|want|compare|find)\b.{0,30}\bquote[s]?\b/i.test(text)) score += 15;
  if (/\b(recommend|suggest|advise)\b.{0,40}(life insurance|policy|coverage)/i.test(text)) score += 15;
  if (/\bwhich (life insurance|policy|plan|company).{0,30}(best|recommend|choose|pick|go with)\b/i.test(text)) score += 15;

  // ── 5. Medium-intent signals — only add weight if HIGH phrases present ─────
  if (highIntentMatches > 0) {
    for (const kw of MEDIUM_INTENT_KEYWORDS) {
      if (lower.includes(kw.toLowerCase())) score += 5;
    }
  }

  // ── 6. US context check ────────────────────────────────────────────────────
  const hasUSContext =
    US_CONTEXT_PATTERNS.some(p => p.test(text)) ||
    US_STATES.some(s => new RegExp(`\\b${s}\\b`, 'i').test(text)) ||
    US_CITIES.some(c => new RegExp(`\\b${c}\\b`, 'i').test(text));

  if (!hasUSContext) {
    // No US signal at all — zero out and disqualify
    return { score: 0, intentLevel: 'LOW', disqualified: true, reason: 'No US context detected' };
  }

  // US match bonus (+10)
  score += 10;

  // ── 7. Cap and classify ────────────────────────────────────────────────────
  const capped = Math.min(score, 100);

  // Only HIGH passes — threshold is 60
  const intentLevel = capped >= 60 ? 'HIGH' : capped >= 35 ? 'MEDIUM' : 'LOW';

  return { score: capped, intentLevel, disqualified: false, reason: null };
}

/**
 * Extract a US state mention from text.
 */
export function extractState(text = '') {
  // Check full state names first (more specific)
  for (const state of US_STATES.filter(s => s.length > 2)) {
    if (new RegExp(`\\b${state}\\b`, 'i').test(text)) return state;
  }
  // Then abbreviations (two-letter, standalone)
  for (const abbr of US_STATES.filter(s => s.length === 2)) {
    if (new RegExp(`\\b${abbr}\\b`).test(text)) return abbr;
  }
  return null;
}

/**
 * Attempt to extract an age or age range from text.
 */
export function extractAge(text = '') {
  for (const pattern of AGE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      const raw = match[1] || match[0];
      const num = parseInt(raw, 10);
      if (!isNaN(num)) return ageRange(num);
      const decade = raw.match(/(\d+)s/);
      if (decade) return `${decade[1]}s`;
    }
  }
  return null;
}

function ageRange(age) {
  if (age < 25) return '18-24';
  if (age < 35) return '25-34';
  if (age < 45) return '35-44';
  if (age < 55) return '45-54';
  if (age < 65) return '55-64';
  return '65+';
}

/**
 * Extract email addresses from text (public content only).
 */
export function extractEmail(text = '') {
  const match = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : null;
}

/**
 * Extract phone numbers from text.
 */
export function extractPhone(text = '') {
  const match = text.match(
    /(?:\+?1[\s.\-]?)?(?:\(?\d{3}\)?[\s.\-]?)?\d{3}[\s.\-]?\d{4}/
  );
  return match ? match[0].trim() : null;
}

/**
 * Detect coverage interest from text.
 */
export function extractCoverageInterest(text = '') {
  const interests = [];
  if (/term life/i.test(text))       interests.push('Term Life');
  if (/whole life/i.test(text))      interests.push('Whole Life');
  if (/universal life/i.test(text))  interests.push('Universal Life');
  if (/final expense/i.test(text))   interests.push('Final Expense');
  if (/\$[\d,]+k?\b/.test(text)) {
    const m = text.match(/\$([\d,]+k?)\b/);
    if (m) interests.push(`Coverage: $${m[1]}`);
  }
  return interests.length > 0 ? interests.join(', ') : 'Life Insurance (general)';
}
