import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import BlogCard, { CardSize, Post } from "@/components/BlogCard";
import Container from "./Container";

interface SidebarWidget {
  _id: string;
  title: string;
  widgetType: "newsletter" | "topRated" | "categories" | "custom";
  content?: any;
}

interface SidebarItem {
  _type: "reference";
  _ref: string;
  _key: string;
}

interface PageLayoutData {
  title: string;
  featuredPost?: Post;
  trendingTitle: string;
  trendingPosts: Post[];
  stackedTitle?: string;
  stackedPosts: Post[];
  sidebarContent: SidebarItem[];
}

const NewsletterWidget = () => (
  <div className="bg-white rounded-lg shadow p-4 mb-6">
    <h3 className="font-medium text-lg mb-4">Newsletter</h3>
    <p className="text-sm text-gray-600 mb-3">Sign up to stay updated!</p>
    <form className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="Your email address"
        className="px-3 py-2 border rounded text-sm"
      />
      <button className="bg-teal-500 text-white rounded-full py-2 text-sm">
        SUBSCRIBE
      </button>
    </form>
  </div>
);

const TopRatedWidget = ({ posts }: { posts: Post[] }) => (
  <div className="bg-white rounded-lg shadow p-4 mb-6">
    <h3 className="font-medium text-lg mb-4">Top Rated</h3>
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="flex gap-3">
          <div className="w-16 h-16 relative flex-shrink-0">
            <img
              src={
                typeof post.mainImage === "string"
                  ? post.mainImage
                  : post.mainImage?.asset?.url || ""
              }
              alt={post.title}
              className="object-cover w-full h-full rounded"
            />
          </div>
          <div>
            <h4 className="font-medium text-sm">{post.title}</h4>
            <p className="text-xs text-teal-500">
              {post.callToActionText || "READ MORE"}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CategoriesWidget = () => (
  <div className="bg-white rounded-lg shadow p-4 mb-6">
    <h3 className="font-medium text-lg mb-4">Categories</h3>
    <div className="space-y-2">
      {["Fashion", "Lifestyle", "Self Care", "Mental Health"].map(
        (category, index) => (
          <div key={category} className="flex items-center justify-between">
            <span className="text-sm">{category}</span>
            <span className="bg-teal-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {index + 1}
            </span>
          </div>
        )
      )}
    </div>
  </div>
);

const CustomWidget = ({ content }: { content: any }) => (
  <div className="bg-white rounded-lg shadow p-4 mb-6">
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

const SidebarWidgetRenderer = ({
  widgetType,
  posts,
  content,
}: {
  widgetType: string;
  posts?: Post[];
  content?: any;
}) => {
  switch (widgetType) {
    case "newsletter":
      return <NewsletterWidget />;
    case "topRated":
      return <TopRatedWidget posts={posts || []} />;
    case "categories":
      return <CategoriesWidget />;
    case "custom":
      return <CustomWidget content={content} />;
    default:
      return null;
  }
};

export const PageLayout = () => {
  const [state, setState] = useState<{
    layoutData: PageLayoutData | null;
    sidebarWidgets: SidebarWidget[];
    sidebarPosts: Post[];
    loading: boolean;
  }>({
    layoutData: null,
    sidebarWidgets: [],
    sidebarPosts: [],
    loading: true,
  });

  useEffect(() => {
    const fetchLayoutData = async () => {
      try {
        const layoutQuery = groq`
          *[_type == "pageLayout" && isActive == true][0]{
            title,
            "featuredPost": featuredPost->{
              _id,
              title,
              slug,
              "author": author->name,
              "mainImage": mainImage.asset->url,
              publishedAt,
              excerpt,
              specialTag,
              callToActionText
            },
            trendingTitle,
            "trendingPosts": trendingPosts[]->{
              _id,
              title,
              slug,
              "author": author->name,
              "mainImage": mainImage.asset->url,
              publishedAt,
              excerpt,
              specialTag,
              callToActionText
            },
            stackedTitle,
            "stackedPosts": stackedPosts[]->{
              _id,
              title,
              slug,
              "author": author->name,
              "mainImage": mainImage.asset->url,
              publishedAt,
              excerpt,
              specialTag,
              callToActionText
            },
            sidebarContent
          }
        `;

        const layoutData = await client.fetch(layoutQuery);
        let sidebarWidgets: SidebarWidget[] = [];
        let sidebarPosts: Post[] = [];

        if (layoutData?.sidebarContent?.length) {
          const widgetRefs = layoutData.sidebarContent
            .filter((item: SidebarItem) => item._ref)
            .map((item: SidebarItem) => item._ref);

          const widgetsQuery = groq`
            *[_id in $refs]{
              _id,
              _type,
              title,
              widgetType,
              content
            }
          `;

          const widgetData = await client.fetch(widgetsQuery, {
            refs: widgetRefs,
          });
          sidebarWidgets = widgetData.filter(
            (item: any) => item._type === "sidebarWidget"
          );
          sidebarPosts = widgetData.filter(
            (item: any) => item._type === "post"
          );
        }

        setState({
          layoutData,
          sidebarWidgets,
          sidebarPosts,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching layout data:", error);
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchLayoutData();
  }, []);

  const { layoutData, sidebarWidgets, sidebarPosts, loading } = state;

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!layoutData) {
    return (
      <div className="container mx-auto px-4 py-8">No active layout found</div>
    );
  }

  return (
    <Container>
      <div className="container mt-24 mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 py-12">
          {/* Main content area - Increased width */}
          <div className="w-full lg:w-3/4">
            {/* Featured post - made larger */}
            {layoutData.featuredPost && (
              <div className="mb-12">
                <BlogCard
                  post={layoutData.featuredPost}
                  size={CardSize.LARGE}
                />
              </div>
            )}

            {/* Trending section with title */}
            {layoutData.trendingPosts?.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">
                  {layoutData.trendingTitle || "Trending"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {layoutData.trendingPosts.slice(0, 2).map((post) => (
                    <div key={post._id} className="col-span-1">
                      <BlogCard post={post} size={CardSize.MEDIUM} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stacked blog posts */}
            {layoutData.stackedPosts?.length > 0 && (
              <div>
                {layoutData.stackedTitle && (
                  <h2 className="text-2xl font-semibold mb-6">
                    {layoutData.stackedTitle}
                  </h2>
                )}
                <div className="space-y-8">
                  {layoutData.stackedPosts.map((post) => (
                    <BlogCard key={post._id} post={post} size={CardSize.WIDE} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - decreased width and added top margin */}
          <div className="w-full lg:w-1/4 mt-8 lg:mt-0">
            <div className="sticky top-6">
              {sidebarWidgets.length > 0 ? (
                sidebarWidgets.map((widget) => (
                  <SidebarWidgetRenderer
                    key={widget._id}
                    widgetType={widget.widgetType}
                    posts={sidebarPosts}
                    content={widget.content}
                  />
                ))
              ) : (
                <>
                  <NewsletterWidget />
                  <TopRatedWidget posts={sidebarPosts.slice(0, 5)} />
                  <CategoriesWidget />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PageLayout;
