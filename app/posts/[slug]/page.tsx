import { client } from "@/lib/sanity.client";
import { Post } from "@/components/BlogCard";

// Function to generate static paths
export async function generateStaticParams() {
  const query = `*[_type == "post"] {
    slug {
      current
    }
  }`;

  const posts = await client.fetch(query);
  return posts.map((post: Post) => ({
    slug: post.slug.current,
  }));
}

// Function to fetch post data
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    author->{
      name,
      image
    },
    categories[]->{
      _id,
      title
    },
    specialTag,
    callToActionText,
    displaySize
  }`;

  return client.fetch(query, { slug });
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article>
        <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
        {/* Add your post content rendering here */}
      </article>
    </div>
  );
}
