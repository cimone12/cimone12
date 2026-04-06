# Life Insurance Lead Scraper (Apify)

Scrapes **high-intent US life insurance buyer leads** from Google, Reddit, Quora, and public insurance forums using Apify. Outputs deduplicated, scored leads to `leads_output.csv` and `leads_output.json`.

---

## Quick Start (Local Machine)

### 1 — Clone the repo

```bash
git clone https://github.com/cimone12/cimone12.git
cd cimone12
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Add your Apify API key

Create a `.env` file in the project root:

```bash
touch .env
```

Open `.env` and add this line **exactly** (key=value format):

```
APIFY_API_TOKEN=your_apify_token_here
```

> **Important:** `.env` is already in `.gitignore` — your token will never be committed.

### 4 — Run the full scrape

```bash
npm start
```

This runs all four sources in parallel (Google + Reddit + Quora + Insurance sites) and writes:
- `leads_output.csv` — spreadsheet-ready
- `leads_output.json` — structured data

---

## Available Commands

| Command | What it does |
|---|---|
| `npm start` | Run full workflow (all sources) |
| `npm run google` | Scrape Google only |
| `npm run reddit` | Scrape Reddit only |
| `npm run quora` | Scrape Quora only |
| `npm run insurance` | Scrape insurance forums only |
| `npm run connect` | Test Apify connection & print account info |
| `npm run generate` | Generate sample leads locally (no Apify needed) |

---

## Project Structure

```
.
├── workflow.js              # Main orchestrator — runs all scrapers in parallel
├── config.js                # Search queries, keywords, scoring thresholds
├── apify.js                 # Apify client wrapper
├── scrapers/
│   ├── google.js            # Google Search scraper
│   ├── reddit.js            # Reddit discussions scraper
│   ├── quora.js             # Quora questions scraper
│   └── insurance-sites.js   # Insurance forum scraper
├── lib/
│   ├── scorer.js            # Intent scoring + field extraction
│   ├── normalizer.js        # Lead schema, deduplication, ranking
│   └── output.js            # CSV, JSON, console table
├── generate-sample-leads.js # Offline sample data generator
├── leads_output.csv         # ← Output file (created on run)
├── leads_output.json        # ← Output file (created on run)
└── .env                     # Your API key (never committed)
```

---

## Lead Criteria

| Filter | Value |
|---|---|
| Country | United States ONLY |
| Product | Life Insurance ONLY |
| Intent level | HIGH only (score ≥ 60) |
| Sources | Google, Reddit, Quora, Insurance forums |

**Accepted intent signals:**
- "buy life insurance"
- "get life insurance quote"
- "term life insurance quote"
- "best life insurance policy"
- "apply for life insurance"

**Auto-rejected:**
- Career / job / agent hiring posts
- Agent self-promotion ("DM me for a quote")
- Educational-only content ("what is life insurance")
- Non-US context (Canada, UK, Australia, etc.)

---

## Output CSV Columns

| Column | Description |
|---|---|
| `intentLevel` | Always `HIGH` |
| `intentScore` | 60–100 (higher = stronger buyer signal) |
| `source` | Reddit / Quora / Google / InsuranceSite |
| `name` | Username from Reddit/Quora (or blank) |
| `email` | Extracted if publicly posted |
| `phone` | Extracted if publicly posted |
| `state` | US state detected in post text |
| `ageRange` | 18-24 / 25-34 / 35-44 / 45-54 / 55-64 / 65+ |
| `coverageInterest` | Term Life / Whole Life / Universal Life / etc. |
| `title` | Post/question title (first 120 chars) |
| `url` | Source URL |
| `scrapedAt` | ISO timestamp |

---

## dotenv Note

This project uses **ES Modules** (`"type": "module"` in package.json).  
Use `import 'dotenv/config'` — **not** `require('dotenv').config()`.  
Both `workflow.js` and `index.js` already have this at the top.
