// Lead scraping configuration for Life Insurance (United States)

export const APIFY_TOKEN = process.env.APIFY_API_TOKEN;

// Search queries targeting high-intent buyers
export const SEARCH_QUERIES = [
  'buy life insurance United States',
  'term life insurance quotes online',
  'best life insurance policy USA',
  'life insurance quotes compare',
  'how much life insurance do I need',
  'whole life vs term life insurance',
  'affordable life insurance plans USA',
  'life insurance for family protection',
];

// Reddit subreddits with life insurance discussions
export const REDDIT_SUBREDDITS = [
  'personalfinance',
  'LifeInsurance',
  'Insurance',
  'financialindependence',
  'Frugal',
  'povertyfinance',
  'investing',
];

export const REDDIT_SEARCH_TERMS = [
  'life insurance quote',
  'term life insurance',
  'buy life insurance',
  'life insurance recommendation',
  'life insurance advice',
];

// Quora topics/queries
export const QUORA_QUERIES = [
  'What is the best term life insurance in the US',
  'How do I get life insurance quotes',
  'Which life insurance company is best',
  'life insurance for young adults USA',
];

// Intent signal keywords (used for scoring)
export const HIGH_INTENT_KEYWORDS = [
  'buy life insurance',
  'get a quote',
  'looking for life insurance',
  'need life insurance',
  'term life insurance quote',
  'apply for life insurance',
  'best life insurance',
  'affordable life insurance',
  'life insurance recommendation',
  'comparing life insurance',
  'switching life insurance',
];

export const MEDIUM_INTENT_KEYWORDS = [
  'life insurance',
  'term life',
  'whole life',
  'coverage',
  'beneficiary',
  'premium',
  'policy',
  'death benefit',
  'underwriting',
];

// US states for extraction
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
  // Abbreviations
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID',
  'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS',
  'MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK',
  'OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
  'WI','WY',
];

// Age range patterns
export const AGE_PATTERNS = [
  /\b(1[89]|[2-6]\d|7[0-5])\s*(?:year[s]?\s*old|yo|yr[s]?)\b/i,
  /\bage[d]?\s*:?\s*(1[89]|[2-6]\d|7[0-5])\b/i,
  /\bI(?:'m| am)\s*(1[89]|[2-6]\d|7[0-5])\b/i,
  /\b(2[05]|3[05]|4[05]|5[05]|6[05])s\b/i,
];

// Apify actor IDs
export const ACTORS = {
  googleSearch: 'apify/google-search-scraper',
  redditScraper: 'trudax/reddit-scraper-lite',
  quoraScraper:  'epctex/quora-scraper',
  webScraper:    'apify/web-scraper',
};

export const OUTPUT_FILE = 'leads_output.json';
export const CSV_FILE    = 'leads_output.csv';
