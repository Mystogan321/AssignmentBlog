import { createClient } from "next-sanity";
import { headerSettingsQuery } from "../sanity/lib/quries";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-02-08",
  useCdn: true,
});

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
