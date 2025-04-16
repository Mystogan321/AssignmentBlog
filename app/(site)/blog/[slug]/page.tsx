// app/(site)/page.tsx
import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "../../../../sanity/lib/client";
import { homePagePostsQuery } from "../../../../sanity/lib/quries";
import { Post } from "../../../../sanity/lib/types";
import { urlFor } from "../../../../sanity/lib/image";

async function getPosts(): Promise<Post[]> {
  return (await sanityClient.fetch(homePagePostsQuery)) || [];
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Latest Posts</h1>

      {posts.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(
            ({ _id, slug, title, mainImage, excerpt, author, publishedAt }) => (
              <article
                key={_id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
              >
                {mainImage && urlFor(mainImage) && (
                  <Link href={`/blog/${slug}`}>
                    <div className="relative h-48 w-full">
                      <Image
                        src={urlFor(mainImage)!.url()}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 hover:text-blue-600 transition">
                    <Link href={`/blog/${slug}`}>{title}</Link>
                  </h2>
                  {excerpt && (
                    <p className="text-sm text-gray-600 mb-2">{excerpt}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    By {author?.name || "Unknown"} |{" "}
                    {new Date(publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </article>
            )
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts found.</p>
      )}
    </main>
  );
}

export const revalidate = 3600;
