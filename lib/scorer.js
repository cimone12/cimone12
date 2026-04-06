import {
  HIGH_INTENT_KEYWORDS,
  MEDIUM_INTENT_KEYWORDS,
  US_STATES,
  AGE_PATTERNS,
} from '../config.js';

/**
 * Score a lead's intent level based on text content.
 * Returns: { score, intentLevel }
 *   score       – numeric (0–100)
 *   intentLevel – 'HIGH' | 'MEDIUM' | 'LOW'
 */
export function scoreIntent(text = '') {
  const lower = text.toLowerCase();
  let score = 0;

  for (const kw of HIGH_INTENT_KEYWORDS) {
    if (lower.includes(kw.toLowerCase())) score += 15;
  }
  for (const kw of MEDIUM_INTENT_KEYWORDS) {
    if (lower.includes(kw.toLowerCase())) score += 5;
  }

  // Buying-signal verbs near insurance terms
  if (/\b(buy|purchase|get|need|want|looking for|apply)\b.{0,30}life insurance/i.test(text)) score += 20;
  if (/\bquote[s]?\b/i.test(text)) score += 10;
  if (/\brecommend(ation)?[s]?\b/i.test(text)) score += 8;
  if (/\bcompare\b/i.test(text)) score += 8;
  if (/\bunited states|u\.s\.|usa\b/i.test(text)) score += 5;

  const capped = Math.min(score, 100);
  const intentLevel = capped >= 50 ? 'HIGH' : capped >= 25 ? 'MEDIUM' : 'LOW';
  return { score: capped, intentLevel };
}

/**
 * Extract a US state mention from text.
 */
export function extractState(text = '') {
  for (const state of US_STATES) {
    const re = new RegExp(`\\b${state}\\b`, 'i');
    if (re.test(text)) return state;
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
      // decade e.g. "30s"
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
  if (/term life/i.test(text))  interests.push('Term Life');
  if (/whole life/i.test(text)) interests.push('Whole Life');
  if (/universal life/i.test(text)) interests.push('Universal Life');
  if (/final expense/i.test(text)) interests.push('Final Expense');
  if (/\$[\d,]+k?\b/.test(text)) {
    const m = text.match(/\$([\d,]+k?)\b/);
    if (m) interests.push(`Coverage: $${m[1]}`);
  }
  return interests.length > 0 ? interests.join(', ') : 'Life Insurance (general)';
}
