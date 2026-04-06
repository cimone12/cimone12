import { writeFileSync } from 'fs';
import { OUTPUT_FILE, CSV_FILE } from '../config.js';

const FIELDS = [
  'intentLevel',
  'intentScore',
  'source',
  'name',
  'email',
  'phone',
  'state',
  'ageRange',
  'coverageInterest',
  'title',
  'url',
  'scrapedAt',
];

/**
 * Write leads to JSON file.
 */
export function writeJSON(leads) {
  writeFileSync(OUTPUT_FILE, JSON.stringify(leads, null, 2));
  console.log(`\nWrote ${leads.length} leads → ${OUTPUT_FILE}`);
}

/**
 * Write leads to CSV file.
 */
export function writeCSV(leads) {
  const escape = v =>
    v == null ? '' : `"${String(v).replace(/"/g, '""')}"`;

  const header = FIELDS.join(',');
  const rows   = leads.map(lead =>
    FIELDS.map(f => escape(lead[f])).join(',')
  );

  writeFileSync(CSV_FILE, [header, ...rows].join('\n'));
  console.log(`Wrote ${leads.length} leads → ${CSV_FILE}`);
}

/**
 * Print a summary table to stdout.
 */
export function printTable(leads) {
  const top = leads.slice(0, 50);

  console.log('\n' + '='.repeat(120));
  console.log('LIFE INSURANCE LEADS — United States');
  console.log('='.repeat(120));

  const col = (val, w) => String(val ?? '—').slice(0, w).padEnd(w);

  const header = [
    col('#',       3),
    col('INTENT',  7),
    col('SCORE',   6),
    col('SOURCE',  14),
    col('NAME',    18),
    col('EMAIL',   24),
    col('PHONE',   14),
    col('STATE',   6),
    col('AGE',     7),
    col('COVERAGE', 24),
  ].join(' | ');

  console.log(header);
  console.log('-'.repeat(120));

  top.forEach((lead, i) => {
    console.log([
      col(i + 1,                   3),
      col(lead.intentLevel,        7),
      col(lead.intentScore,        6),
      col(lead.source,             14),
      col(lead.name,               18),
      col(lead.email,              24),
      col(lead.phone,              14),
      col(lead.state,              6),
      col(lead.ageRange,           7),
      col(lead.coverageInterest,   24),
    ].join(' | '));
  });

  console.log('='.repeat(120));

  // Summary stats
  const high   = leads.filter(l => l.intentLevel === 'HIGH').length;
  const medium = leads.filter(l => l.intentLevel === 'MEDIUM').length;
  const low    = leads.filter(l => l.intentLevel === 'LOW').length;

  const withEmail = leads.filter(l => l.email).length;
  const withPhone = leads.filter(l => l.phone).length;
  const withState = leads.filter(l => l.state).length;

  console.log(`\nSummary:`);
  console.log(`  Total leads  : ${leads.length}`);
  console.log(`  HIGH intent  : ${high}`);
  console.log(`  MEDIUM intent: ${medium}`);
  console.log(`  LOW intent   : ${low}`);
  console.log(`  With email   : ${withEmail}`);
  console.log(`  With phone   : ${withPhone}`);
  console.log(`  With state   : ${withState}`);

  const srcCounts = {};
  leads.forEach(l => { srcCounts[l.source] = (srcCounts[l.source] || 0) + 1; });
  console.log(`\n  By source:`);
  for (const [src, cnt] of Object.entries(srcCounts)) {
    console.log(`    ${src.padEnd(16)}: ${cnt}`);
  }
}
