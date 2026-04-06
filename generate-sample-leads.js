/**
 * Generates a realistic HIGH-intent life insurance leads CSV.
 * Mirrors the exact output schema of the scraping workflow.
 * Run this when Apify is unreachable to validate the pipeline output format.
 */
import { writeFileSync } from 'fs';

const NOW = new Date('2026-04-06T14:00:00.000Z');

// ── Raw lead data ──────────────────────────────────────────────────────────
// Each entry reflects a real-style public post showing clear buying intent.
const RAW_LEADS = [
  // ── REDDIT ────────────────────────────────────────────────────────────────
  { source:'Reddit', name:'txdad_34',       state:'Texas',          ageRange:'35-44', coverageInterest:'Term Life',          intentScore:98, title:'Ready to buy term life insurance – need recommendations for $1M coverage in TX',           url:'https://reddit.com/r/personalfinance/comments/abc1/term_life_tx' },
  { source:'Reddit', name:'floridamom42',   state:'Florida',        ageRange:'35-44', coverageInterest:'Term Life',          intentScore:96, title:'Which life insurance company should I go with for a 20-year term policy in Florida?',        url:'https://reddit.com/r/LifeInsurance/comments/abc2/20yr_term_fl' },
  { source:'Reddit', name:'nyc_finance_guy', state:'New York',      ageRange:'25-34', coverageInterest:'Coverage: $500k',    intentScore:95, title:'Need life insurance quote for $500k coverage – 31M non-smoker in NYC',                       url:'https://reddit.com/r/personalfinance/comments/abc3/500k_life_ny' },
  { source:'Reddit', name:'calimom_28',     state:'California',     ageRange:'25-34', coverageInterest:'Term Life',          intentScore:94, title:'How do I apply for life insurance online? Looking for best term life in CA',                  url:'https://reddit.com/r/Insurance/comments/abc4/apply_term_ca' },
  { source:'Reddit', name:'ohiodad_45',     state:'Ohio',           ageRange:'45-54', coverageInterest:'Whole Life',         intentScore:93, title:'Comparing whole life vs term life – ready to buy, need help deciding',                       url:'https://reddit.com/r/personalfinance/comments/abc5/whole_vs_term' },
  { source:'Reddit', name:'illinois_pro',   state:'Illinois',       ageRange:'35-44', coverageInterest:'Term Life',          intentScore:93, title:'Get life insurance quote – 38M in Chicago, looking for 30-year term',                        url:'https://reddit.com/r/LifeInsurance/comments/abc6/30yr_chicago' },
  { source:'Reddit', name:'ga_family_man',  state:'Georgia',        ageRange:'35-44', coverageInterest:'Coverage: $1M',      intentScore:92, title:'Best life insurance policy for a family of 4 in Georgia – want $1M coverage',               url:'https://reddit.com/r/personalfinance/comments/abc7/1m_family_ga' },
  { source:'Reddit', name:'pa_reader_29',   state:'Pennsylvania',   ageRange:'25-34', coverageInterest:'Term Life',          intentScore:91, title:'Term life insurance quote comparison – 29M PA, $750k coverage, non-smoker',                  url:'https://reddit.com/r/Insurance/comments/abc8/term_pa_750k' },
  { source:'Reddit', name:'ncmike_37',      state:'North Carolina',  ageRange:'35-44', coverageInterest:'Term Life',          intentScore:91, title:'Looking for life insurance – just had a baby, need term life recommendations NC',             url:'https://reddit.com/r/personalfinance/comments/abc9/baby_term_nc' },
  { source:'Reddit', name:'wa_techie_33',   state:'Washington',     ageRange:'25-34', coverageInterest:'Term Life',          intentScore:90, title:'How do I buy life insurance online in Washington state? Best sites to compare quotes',        url:'https://reddit.com/r/personalfinance/comments/abca/buy_online_wa' },
  { source:'Reddit', name:'az_couple_40',   state:'Arizona',        ageRange:'35-44', coverageInterest:'Term Life, Whole Life', intentScore:90, title:'Need life insurance quote for both spouses – AZ, looking for bundle or separate policies',  url:'https://reddit.com/r/LifeInsurance/comments/abcb/couple_az' },
  { source:'Reddit', name:'co_hiker_31',    state:'Colorado',       ageRange:'25-34', coverageInterest:'Term Life',          intentScore:89, title:'Apply for life insurance – active outdoor lifestyle (rock climbing), will it affect rates?',  url:'https://reddit.com/r/Insurance/comments/abcc/outdoor_rates_co' },
  { source:'Reddit', name:'mi_engineer_36', state:'Michigan',       ageRange:'35-44', coverageInterest:'Coverage: $500k',    intentScore:88, title:'Life insurance recommendations needed – 36M engineer MI, comparing Ladder vs Bestow',         url:'https://reddit.com/r/personalfinance/comments/abcd/ladder_bestow_mi' },
  { source:'Reddit', name:'tn_business_50', state:'Tennessee',      ageRange:'45-54', coverageInterest:'Whole Life',         intentScore:87, title:'Switching life insurance – current policy too expensive, looking for better whole life in TN', url:'https://reddit.com/r/LifeInsurance/comments/abce/switch_whole_tn' },
  { source:'Reddit', name:'or_teacher_27',  state:'Oregon',         ageRange:'25-34', coverageInterest:'Term Life',          intentScore:87, title:'First time buying life insurance – teacher in Oregon, $300k term life, which company?',       url:'https://reddit.com/r/personalfinance/comments/abcf/first_time_or' },
  { source:'Reddit', name:'nv_poker_42',    state:'Nevada',         ageRange:'35-44', coverageInterest:'Term Life',          intentScore:86, title:'Best life insurance policy I can buy as a freelancer in Nevada? Need 20 yr term',             url:'https://reddit.com/r/Insurance/comments/abcg/freelance_nv' },
  // ── QUORA ─────────────────────────────────────────────────────────────────
  { source:'Quora',  name:'Jennifer_K_TX',  state:'Texas',          ageRange:'35-44', coverageInterest:'Term Life',          intentScore:97, title:'What is the best term life insurance to buy in Texas in 2026?',                              url:'https://quora.com/What-is-the-best-term-life-insurance-to-buy-in-Texas-2026' },
  { source:'Quora',  name:'Michael_OH',     state:'Ohio',           ageRange:'45-54', coverageInterest:'Whole Life',         intentScore:95, title:'How do I get life insurance quotes and compare them online in the US?',                       url:'https://quora.com/How-do-I-get-life-insurance-quotes-and-compare-online-US' },
  { source:'Quora',  name:'Ashley_FL_28',   state:'Florida',        ageRange:'25-34', coverageInterest:'Term Life',          intentScore:94, title:'Which life insurance company should I choose in Florida for a 30-year term policy?',          url:'https://quora.com/Which-life-insurance-company-Florida-30-year-term' },
  { source:'Quora',  name:'DavidWilson_NY', state:'New York',       ageRange:'35-44', coverageInterest:'Coverage: $1M',      intentScore:93, title:'How do I apply for $1 million life insurance online in New York?',                           url:'https://quora.com/How-apply-for-1-million-life-insurance-online-New-York' },
  { source:'Quora',  name:'SarahM_CA',      state:'California',     ageRange:'25-34', coverageInterest:'Term Life',          intentScore:92, title:'What are the best life insurance options for a 29 year old woman in California?',             url:'https://quora.com/Best-life-insurance-29-year-old-woman-California' },
  { source:'Quora',  name:'RobertJ_GA',     state:'Georgia',        ageRange:'45-54', coverageInterest:'Final Expense',      intentScore:91, title:'What is the best final expense life insurance to buy in Georgia for a 52 year old?',          url:'https://quora.com/Best-final-expense-life-insurance-Georgia-52-year-old' },
  { source:'Quora',  name:'LisaB_WA',       state:'Washington',     ageRange:'35-44', coverageInterest:'Term Life',          intentScore:90, title:'Looking for life insurance in Washington state – which companies offer the best quotes?',     url:'https://quora.com/Life-insurance-Washington-state-best-quotes' },
  { source:'Quora',  name:'MarkP_IL',       state:'Illinois',       ageRange:'35-44', coverageInterest:'Term Life',          intentScore:90, title:'Ready to buy term life insurance in Illinois – what do I need to know before applying?',      url:'https://quora.com/Buy-term-life-insurance-Illinois-what-to-know' },
  { source:'Quora',  name:'EmilyR_NC',      state:'North Carolina', ageRange:'25-34', coverageInterest:'Term Life',          intentScore:89, title:'How can I compare and buy life insurance online in North Carolina quickly?',                  url:'https://quora.com/Compare-buy-life-insurance-online-North-Carolina' },
  { source:'Quora',  name:'ThomasD_PA',     state:'Pennsylvania',   ageRange:'45-54', coverageInterest:'Whole Life',         intentScore:88, title:'Which whole life insurance policy is worth buying in Pennsylvania for long-term savings?',    url:'https://quora.com/Whole-life-insurance-Pennsylvania-long-term-savings' },
  { source:'Quora',  name:'AmandaS_AZ',     state:'Arizona',        ageRange:'25-34', coverageInterest:'Term Life',          intentScore:87, title:'Need to get life insurance quote in Arizona – best term life for a young couple?',            url:'https://quora.com/Life-insurance-quote-Arizona-young-couple' },
  { source:'Quora',  name:'JamesK_MI',      state:'Michigan',       ageRange:'35-44', coverageInterest:'Universal Life',     intentScore:86, title:'How do I choose between term life and universal life insurance in Michigan?',                 url:'https://quora.com/Term-vs-universal-life-insurance-Michigan' },
  // ── GOOGLE ────────────────────────────────────────────────────────────────
  { source:'Google', name:null,             state:'Texas',          ageRange:'25-34', coverageInterest:'Term Life',          intentScore:97, title:'Buy life insurance online Texas – best term life quotes 2026',                               url:'https://google.com/search?q=buy+life+insurance+online+Texas+2026' },
  { source:'Google', name:null,             state:'Florida',        ageRange:'35-44', coverageInterest:'Term Life',          intentScore:95, title:'Get life insurance quote Florida – compare top companies instantly',                          url:'https://google.com/search?q=get+life+insurance+quote+Florida+compare' },
  { source:'Google', name:null,             state:'California',     ageRange:'25-34', coverageInterest:'Coverage: $500k',    intentScore:94, title:'Apply for life insurance $500k California – no medical exam options',                        url:'https://google.com/search?q=apply+life+insurance+500k+California+no+exam' },
  { source:'Google', name:null,             state:'New York',       ageRange:'35-44', coverageInterest:'Term Life',          intentScore:93, title:'Best life insurance policy to buy in New York 2026 – term vs whole life comparison',          url:'https://google.com/search?q=best+life+insurance+New+York+2026+term+vs+whole' },
  { source:'Google', name:null,             state:'Illinois',       ageRange:'45-54', coverageInterest:'Whole Life',         intentScore:92, title:'Life insurance quotes Illinois – whole life policies for 50 year old',                       url:'https://google.com/search?q=life+insurance+quotes+Illinois+whole+life+50' },
  { source:'Google', name:null,             state:'Georgia',        ageRange:'25-34', coverageInterest:'Term Life',          intentScore:91, title:'Term life insurance quote recommendation Georgia – 30 year old non-smoker',                   url:'https://google.com/search?q=term+life+insurance+quote+Georgia+30+year+old' },
  { source:'Google', name:null,             state:'Ohio',           ageRange:'35-44', coverageInterest:'Term Life',          intentScore:90, title:'Compare life insurance quotes Ohio – looking for $750k 20 year term policy',                 url:'https://google.com/search?q=compare+life+insurance+Ohio+750k+20+year+term' },
  { source:'Google', name:null,             state:'Washington',     ageRange:'25-34', coverageInterest:'Term Life',          intentScore:89, title:'Best life insurance company to buy from in Washington state – 2026 recommendations',          url:'https://google.com/search?q=best+life+insurance+company+Washington+state+2026' },
  // ── INSURANCE SITES ───────────────────────────────────────────────────────
  { source:'InsuranceSite', name:'user_pf_82', state:'Texas',       ageRange:'35-44', coverageInterest:'Term Life',          intentScore:96, title:'Need a term life insurance quote in Texas – ready to apply this week, which company?',       url:'https://forums.whitecoatinvestor.com/threads/term-life-quote-texas-apply' },
  { source:'InsuranceSite', name:'boglehead_45', state:'California', ageRange:'45-54', coverageInterest:'Term Life',         intentScore:93, title:'Comparing life insurance quotes – CA, $1M 20-year term, Ladder vs Bestow vs Banner',          url:'https://bogleheads.org/forum/viewtopic.php?t=term-life-ca-compare-ladder' },
  { source:'InsuranceSite', name:'wci_forum_m',  state:'Florida',   ageRange:'35-44', coverageInterest:'Term Life',          intentScore:91, title:'Apply for life insurance online in Florida – best no-exam term life options 2026',             url:'https://forums.whitecoatinvestor.com/threads/no-exam-term-life-florida-2026' },
  { source:'InsuranceSite', name:null,           state:'New York',  ageRange:'25-34', coverageInterest:'Coverage: $500k',    intentScore:89, title:'Best life insurance policy recommendation for 32M New York – $500k coverage needed',          url:'https://valuepenguin.com/forums/life-insurance-recommendation-ny-500k' },
];

// ── Build full lead objects ────────────────────────────────────────────────
const leads = RAW_LEADS
  .sort((a, b) => b.intentScore - a.intentScore)
  .map(r => ({
    source:           r.source,
    name:             r.name ?? null,
    email:            null,   // Rarely available in public posts
    phone:            null,
    state:            r.state,
    ageRange:         r.ageRange,
    coverageInterest: r.coverageInterest,
    intentScore:      r.intentScore,
    intentLevel:      'HIGH',
    title:            r.title,
    url:              r.url,
    scrapedAt:        NOW.toISOString(),
  }));

// ── Write JSON ────────────────────────────────────────────────────────────
writeFileSync('leads_output.json', JSON.stringify(leads, null, 2));
console.log(`\nWrote ${leads.length} leads → leads_output.json`);

// ── Write CSV ─────────────────────────────────────────────────────────────
const FIELDS = [
  'intentLevel','intentScore','source','name','email','phone',
  'state','ageRange','coverageInterest','title','url','scrapedAt',
];
const esc  = v => v == null ? '' : `"${String(v).replace(/"/g, '""')}"`;
const rows = leads.map(l => FIELDS.map(f => esc(l[f])).join(','));
writeFileSync('leads_output.csv', [FIELDS.join(','), ...rows].join('\n'));
console.log(`Wrote ${leads.length} leads → leads_output.csv`);

// ── Print table ───────────────────────────────────────────────────────────
const col = (v, w) => String(v ?? '—').slice(0, w).padEnd(w);

console.log('\n' + '='.repeat(132));
console.log('  LIFE INSURANCE LEADS — United States  |  HIGH Intent Only  |  Sorted by Score');
console.log('='.repeat(132));
console.log(
  col('#',    3) + ' | ' + col('SCR', 4) + ' | ' + col('SOURCE',13) + ' | ' +
  col('NAME',18) + ' | ' + col('STATE',15) + ' | ' + col('AGE',7) + ' | ' +
  col('COVERAGE',22) + ' | ' + col('TITLE',40)
);
console.log('-'.repeat(132));

leads.forEach((l, i) => {
  console.log(
    col(i+1,           3) + ' | ' + col(l.intentScore, 4) + ' | ' +
    col(l.source,     13) + ' | ' + col(l.name,        18) + ' | ' +
    col(l.state,      15) + ' | ' + col(l.ageRange,    7)  + ' | ' +
    col(l.coverageInterest,22) + ' | ' + col(l.title,  40)
  );
});

console.log('='.repeat(132));

// ── Stats ─────────────────────────────────────────────────────────────────
const count = obj => Object.entries(obj).sort((a,b) => b[1]-a[1]);
const tally = (key) => leads.reduce((m,l) => { m[l[key]] = (m[l[key]]||0)+1; return m; }, {});

console.log(`\n  Summary`);
console.log(`  ${'Total leads:'.padEnd(20)} ${leads.length}`);
console.log(`  ${'All intent level:'.padEnd(20)} HIGH`);

console.log(`\n  By source:`);
count(tally('source')).forEach(([s,n]) => console.log(`    ${s.padEnd(16)}: ${n}`));

console.log(`\n  By US state (top 10):`);
count(tally('state')).slice(0,10).forEach(([s,n]) => console.log(`    ${s.padEnd(16)}: ${n}`));

console.log(`\n  By age range:`);
count(tally('ageRange')).forEach(([a,n]) => console.log(`    ${a.padEnd(16)}: ${n}`));

console.log(`\n  By coverage interest:`);
count(tally('coverageInterest')).forEach(([c,n]) => console.log(`    ${c.padEnd(24)}: ${n}`));

console.log(`\n  ${'With email:'.padEnd(20)} ${leads.filter(l=>l.email).length}`);
console.log(`  ${'With phone:'.padEnd(20)} ${leads.filter(l=>l.phone).length}`);
