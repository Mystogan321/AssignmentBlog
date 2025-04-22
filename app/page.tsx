import { client } from "@/lib/sanity.client";
import { Post } from "@/components/BlogCard";
import { LayoutContent } from "@/components/LayoutContent";
import { allPostsQuery, headerSettingsQuery } from "@/sanity/lib/quries";

export default async function Home() {
  // Fetch all posts and header data
  const [allPosts, headerData] = await Promise.all([
    client.fetch(allPostsQuery),
    client.fetch(headerSettingsQuery),
  ]);

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
      posts={regularPosts}
      featuredPost={featuredPost}
      headerData={headerData}
    >
      <div className="min-h-screen">
        {/* Main content will be rendered through LayoutContent */}
      </div>
    </LayoutContent>
  );
}
