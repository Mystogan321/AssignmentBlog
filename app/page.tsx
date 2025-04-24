"use client";

import { useState, useEffect } from "react";
import { client } from "@/lib/sanity.client";
import { Post } from "@/components/BlogCard";
import PageLayout from "@/components/layout";
import {
  allPostsQuery,
  headerSettingsQuery,
  activePageLayoutQuery,
} from "@/sanity/lib/quries";

export default function Home() {
  const [data, setData] = useState<{
    allPosts: Post[];
    headerData: null | any;
    pageLayoutData: null | any;
    isLoading: boolean;
  }>({
    allPosts: [],
    headerData: null,
    pageLayoutData: null,
    isLoading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all posts, header data, and page layout
        const [allPosts, headerData, pageLayoutData] = await Promise.all([
          client.fetch(allPostsQuery),
          client.fetch(headerSettingsQuery),
          client.fetch(activePageLayoutQuery),
        ]);

        setData({
          allPosts,
          headerData,
          pageLayoutData,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setData((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchData();
  }, []);

  if (data.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading page layout...</p>
      </div>
    );
  }

  // Find a featured post (assuming it's marked with featured = true)
  const featuredPost =
    data.allPosts.find((post: Post) => post.featured === true) ||
    data.allPosts[0];

  const regularPosts = featuredPost
    ? data.allPosts.filter((post: Post) => post._id !== featuredPost._id)
    : data.allPosts;

  return (
    <div className="min-h-screen">
      {/* Pass the layout data to PageLayout */}
      <PageLayout layoutData={data.pageLayoutData || undefined} />
    </div>
  );
}
