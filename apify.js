import { ApifyClient } from 'apify-client';

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
if (!APIFY_API_TOKEN) {
  throw new Error('APIFY_API_TOKEN environment variable is required');
}

const client = new ApifyClient({ token: APIFY_API_TOKEN });

export default client;

export async function getUser() {
  const user = await client.user('me').get();
  return user;
}

export async function listActors() {
  const actors = await client.actors().list();
  return actors;
}

export async function runActor(actorId, input = {}) {
  const run = await client.actor(actorId).call(input);
  return run;
}

export async function getDataset(datasetId) {
  const items = await client.dataset(datasetId).listItems();
  return items;
}
