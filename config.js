// Lead scraping configuration — United States | Life Insurance ONLY
// Only high-intent buyer signals. No general discussions, no job/career posts.

export const APIFY_TOKEN = process.env.APIFY_API_TOKEN;

// ── Search queries ──────────────────────────────────────────────────────────
// Exact high-intent phrases only. Each query targets someone actively
// looking to purchase or quote life insurance in the US.
export const SEARCH_QUERIES = [
  '"buy life insurance" United States',
  '"get life insurance quote" USA',
  '"term life insurance quote" site:reddit.com OR site:quora.com',
  '"apply for life insurance" USA',
  '"best life insurance policy" recommendation USA',
  '"life insurance quotes" compare USA',
  '"looking for life insurance" recommendation',
  '"need life insurance" quotes United States',
];

// ── Reddit ──────────────────────────────────────────────────────────────────
// Subreddits where buyers (not agents) congregate
export const REDDIT_SUBREDDITS = [
  'personalfinance',
  'LifeInsurance',
  'Insurance',
  'financialindependence',
  'povertyfinance',
];

// Search terms that indicate a buyer — not an agent, not a career post
export const REDDIT_SEARCH_TERMS = [
  'buy life insurance',
  'get life insurance quote',
  'term life insurance quote',
  'best life insurance policy',
  'apply for life insurance',
  'life insurance recommendation',
  'which life insurance',
  'looking for life insurance',
];

// ── Quora ───────────────────────────────────────────────────────────────────
export const QUORA_QUERIES = [
  'How do I get a term life insurance quote in the US',
  'What is the best life insurance policy to buy in the United States',
  'How do I apply for life insurance online USA',
  'Which life insurance company should I choose in the US',
  'Where can I get life insurance quotes and compare them',
];

// ── Intent keywords ─────────────────────────────────────────────────────────
// HIGH_INTENT: exact buyer phrases — each match adds heavy weight
export const HIGH_INTENT_KEYWORDS = [
  'buy life insurance',
  'get life insurance quote',
  'term life insurance quote',
  'best life insurance policy',
  'apply for life insurance',
  'looking for life insurance',
  'need life insurance',
  'life insurance recommendation',
  'comparing life insurance',
  'life insurance quotes',
  'switching life insurance',
  'purchase life insurance',
  'sign up for life insurance',
  'life insurance for my family',
];

// MEDIUM_INTENT: supporting signals — used to lift score only when
// a HIGH_INTENT phrase is also present. Alone they do NOT qualify a lead.
export const MEDIUM_INTENT_KEYWORDS = [
  'term life',
  'whole life',
  'coverage amount',
  'death benefit',
  'monthly premium',
  'policy cost',
  'beneficiary',
  'underwriting',
];

// ── Disqualification filters ─────────────────────────────────────────────────
// Any of these patterns in text = immediate rejection
export const DISQUALIFY_PATTERNS = [
  // Career / job posts
  /\b(hiring|job opening|career[s]?|position available|we.re looking for|join our team|insurance agent|insurance broker|sales rep|commission.based)\b/i,
  // Agent self-promotion
  /\b(I (am|'m) an? (agent|broker|advisor)|contact me for (a )?quote|DM me|reach out to me|my clients|I offer|I sell|I specialize in)\b/i,
  // Educational/informational only (no buyer intent)
  /\b(history of life insurance|life insurance explained|what is life insurance|life insurance 101|how does life insurance work)\b/i,
  // Non-US context
  /\b(canada|uk|australia|india|europe|ireland|new zealand|south africa)\b/i,
];

// ── US context signals ───────────────────────────────────────────────────────
// At least ONE of these must match for a lead to pass the US filter
export const US_CONTEXT_PATTERNS = [
  /\bunited states\b/i,
  /\bu\.s\.a?\b/i,
  /\busa\b/i,
  /\bamerica[n]?\b/i,
];

// US states for extraction + US context detection
export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
  // Abbreviations (standalone word only — matched in scorer with \b guards)
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID',
  'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS',
  'MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK',
  'OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
  'WI','WY',
];

// US cities commonly mentioned in insurance queries
export const US_CITIES = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
  'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
  'Fort Worth', 'Columbus', 'Charlotte', 'Indianapolis', 'San Francisco',
  'Seattle', 'Denver', 'Nashville', 'Oklahoma City', 'El Paso', 'Washington',
  'Las Vegas', 'Louisville', 'Memphis', 'Portland', 'Baltimore', 'Milwaukee',
  'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Atlanta', 'Miami',
  'Minneapolis', 'Tampa', 'New Orleans', 'Cleveland', 'Raleigh',
];

// Age range patterns
export const AGE_PATTERNS = [
  /\b(1[89]|[2-6]\d|7[0-5])\s*(?:year[s]?\s*old|yo|yr[s]?)\b/i,
  /\bage[d]?\s*:?\s*(1[89]|[2-6]\d|7[0-5])\b/i,
  /\bI(?:'m| am)\s*(1[89]|[2-6]\d|7[0-5])\b/i,
  /\b(2[05]|3[05]|4[05]|5[05]|6[05])s\b/i,
];

// ── Thresholds ───────────────────────────────────────────────────────────────
// Minimum score to be kept in output (HIGH intent only)
export const MIN_INTENT_SCORE = 60;

// ── Apify actors ─────────────────────────────────────────────────────────────
export const ACTORS = {
  googleSearch: 'apify/google-search-scraper',
  redditScraper: 'trudax/reddit-scraper-lite',
  quoraScraper:  'epctex/quora-scraper',
  webScraper:    'apify/web-scraper',
};

export const OUTPUT_FILE = 'leads_output.json';
export const CSV_FILE    = 'leads_output.csv';
