"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import BlogCard, { CardSize, Post } from "@/components/BlogCard";
import Container from "./Container";
import CategoryWidget from "./CategoryWidget";
import TopRatedWidget from "./TopRatedWidget";
import Link from "next/link";
import HostWidget from "./HostWidget";
import NewsletterWidget from "./NewsLetterWidget";

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

interface PageLayoutDataResolved {
  title: string;
  featuredPost?: Post;
  trendingTitle: string;
  trendingPosts: Post[];
  stackedTitle?: string;
  stackedPosts: Post[];
  sidebarContent?: any[];
}

const CustomWidget = ({ content }: { content: any }) => (
  <div className="bg-white rounded-lg shadow p-4 mb-6">
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

const TopRatedWidgetAdapter = ({
  title,
  posts,
}: {
  title: string;
  posts?: Post[];
}) => {
  const validPosts = posts?.filter((post) => post.mainImage) || [];

  const adaptedPosts = validPosts.map((post) => ({
    _id: post._id,
    title: post.title,
    slug: post.slug,
    mainImage: {
      asset: {
        _id:
          typeof post.mainImage === "string"
            ? post.mainImage
            : post.mainImage?.asset?._id || "",
        url:
          typeof post.mainImage === "string"
            ? post.mainImage
            : post.mainImage?.asset?.url || "",
      },
    },
    callToActionText: post.callToActionText,
  }));

  return <TopRatedWidget data={{ title, posts: adaptedPosts }} />;
};

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
      return <TopRatedWidgetAdapter title="Top Rated" posts={posts || []} />;
    case "categories":
      return <CategoryWidget />;
    case "custom":
      return <CustomWidget content={content} />;
    default:
      return null;
  }
};

export const PageLayout = ({
  layoutData,
}: {
  layoutData?: PageLayoutDataResolved;
}) => {
  const [state, setState] = useState<{
    fetchedLayoutData: PageLayoutDataResolved | null;
    sidebarWidgets: SidebarWidget[];
    sidebarPosts: Post[];
    loading: boolean;
    error: string | null;
    debugInfo: any;
  }>({
    fetchedLayoutData: layoutData || null,
    sidebarWidgets: [],
    sidebarPosts: [],
    loading: !layoutData, // If layoutData is provided, we're not loading
    error: null,
    debugInfo: null,
  });

  useEffect(() => {
    // If layoutData is provided via props, don't fetch again
    if (layoutData) {
      return;
    }

    const fetchLayoutData = async () => {
      try {
        console.log("Fetching page layout data...");

        // First, check if the pageLayout document type exists at all
        const checkQuery = groq`*[_type == "pageLayout"]{_id, title, isActive}`;
        const allLayouts = await client.fetch(checkQuery);
        console.log("All pageLayout documents:", allLayouts);

        if (!allLayouts || allLayouts.length === 0) {
          console.error("No pageLayout documents found in Sanity");
          setState((prev) => ({
            ...prev,
            loading: false,
            error:
              "No pageLayout documents exist in Sanity. You need to create at least one pageLayout document in the Sanity Studio.",
            debugInfo: { allLayouts },
          }));
          return;
        }

        const activeLayouts = allLayouts.filter((l: any) => l.isActive);
        if (activeLayouts.length === 0) {
          console.error(
            "No active pageLayout found - please set isActive=true on at least one layout"
          );
          setState((prev) => ({
            ...prev,
            loading: false,
            error:
              "No active pageLayout found. Please set isActive=true on at least one pageLayout document.",
            debugInfo: { allLayouts, activeLayouts },
          }));
          return;
        }

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
        console.log("Fetched layout data:", layoutData);

        let sidebarWidgets: SidebarWidget[] = [];
        let sidebarPosts: Post[] = [];

        if (layoutData?.sidebarContent?.length) {
          const widgetRefs = layoutData.sidebarContent
            .filter((item: SidebarItem) => item._ref)
            .map((item: SidebarItem) => item._ref);

          console.log("Widget refs:", widgetRefs);

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
          console.log("Widget data:", widgetData);

          sidebarWidgets = widgetData.filter(
            (item: any) => item._type === "sidebarWidget"
          );
          sidebarPosts = widgetData.filter(
            (item: any) => item._type === "post"
          );
        }

        setState({
          fetchedLayoutData: layoutData,
          sidebarWidgets,
          sidebarPosts,
          loading: false,
          error: null,
          debugInfo: { layoutData, sidebarWidgets, sidebarPosts },
        });
      } catch (error) {
        console.error("Error fetching layout data:", error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Unknown error fetching layout data",
          debugInfo: { error },
        }));
      }
    };

    fetchLayoutData();
  }, [layoutData]);

  const {
    fetchedLayoutData,
    sidebarWidgets,
    sidebarPosts,
    loading,
    error,
    debugInfo,
  } = state;

  // Use either the fetched data or the provided props
  const displayData = layoutData || fetchedLayoutData;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Loading page layout...</h2>
          <p className="text-gray-600">Fetching data from Sanity...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Error Loading Layout</h2>
          <p className="text-red-600">{error}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Troubleshooting:</h3>
            <ol className="list-decimal ml-5 mt-2 space-y-2">
              <li>
                Make sure you've created a "pageLayout" document in Sanity
                Studio
              </li>
              <li>
                Ensure that at least one pageLayout document has "isActive" set
                to true
              </li>
              <li>
                Check that your Sanity project ID and dataset name are correct
              </li>
            </ol>
          </div>
          {debugInfo && (
            <details className="mt-4">
              <summary className="cursor-pointer text-blue-600">
                Debug Information
              </summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }

  if (!displayData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-bold mb-2">No Active Layout Found</h2>
          <p className="text-gray-700">
            There is no active page layout configuration in Sanity.
          </p>
          <div className="mt-4">
            <h3 className="font-semibold">To fix this:</h3>
            <ol className="list-decimal ml-5 mt-2 space-y-2">
              <li>Go to your Sanity Studio</li>
              <li>Create a new "Page Layout" document</li>
              <li>Make sure to set "isActive" to true</li>
              <li>Fill in the required fields (title, trending title)</li>
              <li>Set featured, trending, and stacked posts as desired</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // Default content for when we have data
  return (
    <Container>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 py-12">
          {/* Main content area - Increased width */}
          <div className="w-full lg:w-3/4">
            {/* Featured post - made larger */}
            {displayData.featuredPost && (
              <div className="mb-12">
                <BlogCard
                  post={displayData.featuredPost}
                  size={CardSize.LARGE}
                />
              </div>
            )}

            {/* Trending section with title */}
            {displayData.trendingPosts?.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">
                  {displayData.trendingTitle || "Trending"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {displayData.trendingPosts.slice(0, 2).map((post) => (
                    <div key={post._id} className="col-span-1">
                      <BlogCard post={post} size={CardSize.MEDIUM} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stacked blog posts */}
            {displayData.stackedPosts?.length > 0 && (
              <div>
                {displayData.stackedTitle && (
                  <h2 className="text-2xl font-semibold mb-6">
                    {displayData.stackedTitle}
                  </h2>
                )}
                <div className="space-y-8">
                  {displayData.stackedPosts.map((post) => (
                    <BlogCard key={post._id} post={post} size={CardSize.WIDE} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - decreased width and added top margin */}
          <div className="w-full lg:w-1/4 mt-8 lg:mt-0">
            <div className=" top-6">
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
                  <HostWidget />
                  <NewsletterWidget />
                  <TopRatedWidget />
                  <CategoryWidget />
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
