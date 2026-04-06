import 'dotenv/config';
import { getUser, listActors } from './apify.js';

async function main() {
  try {
    console.log('Connecting to Apify...');

    const user = await getUser();
    console.log(`Connected as: ${user.username} (${user.email})`);

    const actors = await listActors();
    console.log(`Actors count: ${actors.total}`);

    if (actors.items.length > 0) {
      console.log('Your actors:');
      actors.items.forEach(actor => {
        console.log(`  - ${actor.name} (${actor.id})`);
      });
    }

    console.log('Apify connection successful.');
  } catch (err) {
    console.error('Failed to connect to Apify:', err.message);
    process.exit(1);
  }
}

main();
