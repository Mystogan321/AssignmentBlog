import { client } from "@/lib/sanity.client";
import { topicCardBySlugQuery } from "../../../../sanity/lib/quries";

// Generate static paths at build time
export async function generateStaticParams() {
  const topics = await client.fetch(
    `*[_type == "topicCard"]{ "slug": slug.current }`
  );
  return topics;
}

// Main component for individual topic pages
export default async function TopicPage({
  params,
}: {
  params: { slug: string };
}) {
  const topic = await client.fetch(topicCardBySlugQuery, { slug: params.slug });

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">{topic.title}</h1>
      <div className="max-w-3xl mx-auto">
        {/* Add your detailed topic content here */}
        <p className="text-lg text-gray-700">{topic.content}</p>
      </div>
    </div>
  );
}
