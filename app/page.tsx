import { client } from "@/lib/sanity.client";
import { Post } from "@/components/BlogCard";
import { LayoutContent } from "@/components/LayoutContent";
import { allPostsQuery } from "@/sanity/lib/quries";

export default async function Home() {
  // Fetch all posts
  const allPosts = await client.fetch(allPostsQuery);

  // Find a featured post (assuming it's marked with featured = true)
  const featuredPost =
    allPosts.find((post: Post) => post.featured === true) || allPosts[0];

  const regularPosts = allPosts.filter(
    (post: Post) => post._id !== featuredPost._id
  );

  return (
    <LayoutContent
      cinzelVariable="font-cinzel"
      poppinsVariable="font-poppins"
      posts={regularPosts} // Pass the filtered posts
      featuredPost={featuredPost}
    >
      <div className="min-h-screen">
        {/* Main content will be rendered through LayoutContent */}
      </div>
    </LayoutContent>
  );
}
