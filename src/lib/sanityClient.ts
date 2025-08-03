import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "2mgbz7vp",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  perspective: "published", 
});
