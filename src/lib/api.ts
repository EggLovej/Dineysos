import { client } from "@/lib/sanityClient";
import { Event } from "@/types/event";

const UpcomingQuery = `
  *[_type == "event" && startDate > now()] | order(startDate asc){
    _id,
    name,
    subtitle,
    slug,
    startDate,
    endDate,
    "locationDetails": locationDetails,
    "priceInfo": priceInfo,
    "coverImageUrl": coverImage.asset->url,
    "logoUrl": logo.asset->url,
    "description_de": descriptionParagraphs.de,
    "description_en": descriptionParagraphs.en,
    "signUpUrl": signUpUrl
  }
`;

const PastQuery = `
  *[_type == "event" && startDate <= now()] | order(startDate desc){
    _id,
    name,
    subtitle,
    slug,
    startDate,
    endDate,
    "locationDetails": locationDetails,
    "priceInfo": priceInfo,
    "coverImageUrl": coverImage.asset->url,
    "logoUrl": logo.asset->url,
    "description_de": descriptionParagraphs.de,
    "description_en": descriptionParagraphs.en,
    "signUpUrl": signUpUrl
  }
`;

export async function fetchUpcomingEvents(): Promise<Event[]> {
  try {
    const result = await client.fetch(UpcomingQuery);
    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(`fetchUpcomingEvents failed: ${err.message}`);
    }
    throw new Error("fetchUpcomingEvents failed with unknown error");
  }
}

export async function fetchPastEvents(): Promise<Event[]> {
  try {
    const result = await client.fetch(PastQuery);
    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(`fetchPastEvents failed: ${err.message}`);
    }
    throw new Error("fetchPastEvents failed with unknown error");
  }
}

export async function fetchAllEventSlugs(): Promise<string[]> {
  const query = '*[_type == "event"]{ "slug": slug.current }';
  const data = await client.fetch(query);
  return data.map((e: { slug: string }) => e.slug);
}

export async function fetchEventBySlug(slug: string): Promise<Event> {
  const query = `*[_type == "event" && slug.current == $slug][0]{
    _id,
    name,
    subtitle,
    slug,
    startDate,
    endDate,
    "locationDetails": locationDetails,
    "priceInfo": priceInfo,
    "coverImageUrl": coverImage.asset->url,
    "logoUrl": logo.asset->url,
    "descriptionParagraphs": descriptionParagraphs,
    "signUpUrl": signUpUrl
  }
`;
  return client.fetch(query, { slug });
}

export async function fetchGalleryImages() {
  return client.fetch(`*[_type == "galleryImage"] | order(order asc) {
  _id,
  "imageUrl": image.asset->url,
  "width": image.asset->metadata.dimensions.width,
  "height": image.asset->metadata.dimensions.height,
  description,
  order
}`);
}
