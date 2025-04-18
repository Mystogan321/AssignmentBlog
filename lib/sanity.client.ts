import { createClient } from "next-sanity";
import { headerSettingsQuery } from "../sanity/lib/quries";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImage } from "@/components/BlogCard";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-02-08",
  useCdn: true,
});

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export function urlFor(source: SanityImage | any) {
  return builder.image(source);
}

export async function getNavigation() {
  return client.fetch(
    `*[_type == "navigation"][0]{
      items[]{
        label,
        link
      }
    }`
  );
}

export async function getHeaderSettings() {
  return client.fetch(headerSettingsQuery);
}
