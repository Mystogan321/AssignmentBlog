import { CardSize, Post } from "@/components/BlogCard";
import BlogCard from "@/components/BlogCard";
import { sanityClient } from "../../../../sanity/lib/client";
import { homePagePostsQuery } from "../../../../sanity/lib/quries";

async function getPosts(): Promise<Post[]> {
  return (await sanityClient.fetch(homePagePostsQuery)) || [];
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Latest Posts</h1>

      {posts.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => {
            let size = CardSize.MEDIUM;
            

            if (index === 0) {
              size = CardSize.LARGE;
            } else if (index === 1) {
              size = CardSize.WIDE;
            }
            

            if (post.displaySize) {
              size = post.displaySize as CardSize;
            }
            
            return (
              <div 
                key={post._id}
                className={`
                  ${size === CardSize.LARGE ? 'col-span-2 row-span-2' : ''}
                  ${size === CardSize.WIDE ? 'col-span-2' : ''}
                `}
              >
                <BlogCard post={post} size={size} />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts found.</p>
      )}
    </main>
  );
}

export const revalidate = 3600;