/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { client } from "@/lib/sanity.client";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const topics = await client.fetch(
    `*[_type == "topicCard"]{ "slug": slug.current }`
  );
  return topics;
}

export default function StudioPage() {
  return null; // The layout component handles the rendering
}
