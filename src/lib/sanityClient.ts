import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '2mgbz7vp',
  dataset: 'production',
  apiVersion: '2023-01-01', // stable, supported version
  useCdn: false,            // ensures querying via API not CDN
});