"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTopRatedWidget } from "@/sanity/lib/quries";

const TopRatedWidget = () => {
  const [widgetData, setWidgetData] = useState<{
    title: string;
    posts: Array<{
      _id: string;
      title: string;
      slug: { current: string };
      mainImage?: { asset: { url: string } };
      callToActionText?: string;
    }>;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopRatedData = async () => {
      try {
        const data = await getTopRatedWidget();
        setWidgetData(data);
      } catch (err) {
        console.error("Failed to fetch top rated widget data:", err);
        setWidgetData({
          title: "Top Rated",
          posts: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopRatedData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded p-4 shadow-sm w-full mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b font-poppins">
          Loading...
        </h2>
        <div className="animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 mb-4">
              <div className="bg-gray-200 rounded-md w-16 h-16"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!widgetData || !widgetData.posts || widgetData.posts.length === 0) {
    return null;
  }

  return (
    <div className="top-rated-widget bg-white rounded-lg shadow-sm w-full my-8 ">
      <h3 className="text-2xl font-bold pt-6 pb-4 px-6 border-b border-gray-200 font-poppins text-gray-800">
        {widgetData.title || "Top Rated"}
      </h3>

      <div className="top-rated-posts">
        {widgetData.posts.map((post) => (
          <div
            key={post._id}
            className="flex items-center gap-4 px-6 py-4 border-b border-gray-200 last:border-b-0"
          >
            <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
              {post.mainImage && (
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold font-poppins text-gray-800 line-clamp-2">
                {post.title}
              </h4>
              <Link
                href={`/post/${post.slug.current}`}
                className="text-[#4CE0D7] inline-flex items-center mt-1 font-poppins text-sm font-bold uppercase"
              >
                {post.callToActionText || "READ MORE"}
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedWidget;
