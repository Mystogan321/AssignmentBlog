"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import { Search } from "lucide-react";
import Hero from "@/components/Hero";
import Topics from "@/components/Topic/topic";
import BlogCard, { CardSize } from "@/components/BlogCard";
import { Post } from "@/components/BlogCard";

interface HeaderSettings {
  logo?: string;
  navigationLinks: Array<{ label: string; href: string }>;
  contactButtonLabel: string;
}

interface HeroSettings {
  magazineTitle?: string;
  title: string;
  highlightedText: string;
  content: string;
  backgroundImage: string;
}

interface TopicsSection {
  title: string;
  topicCards: TopicCardData[];
}

interface TopicCardData {
  _id: string;
  title: string;
  buttonText: string;
  image: any;
  slug: {
    current: string;
  };
}

interface LayoutContentProps {
  children: React.ReactNode;
  cinzelVariable: string;
  poppinsVariable: string;
  featuredPost?: Post;
  posts?: Post[];
  headerData?: HeaderSettings | null;
  heroData?: HeroSettings | null;
  topicsData?: TopicsSection | null;
}

export function LayoutContent({
  children,
  cinzelVariable,
  poppinsVariable,
  featuredPost,
  posts,
  headerData,
  heroData,
  topicsData,
}: LayoutContentProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");

  return (
    <div className={`${cinzelVariable} ${poppinsVariable} font-body`}>
      {!isStudioRoute && (
        <>
          <Header
            logoSrc={headerData?.logo}
            navLinks={headerData?.navigationLinks || []}
            contactLabel={headerData?.contactButtonLabel || "Contact Us"}
            onSearchClick={() => console.log("Search clicked")}
            SearchIcon={Search}
          />
          {heroData && (
            <Hero
              magazineTitle={heroData.magazineTitle}
              title={heroData.title}
              highlightedText={heroData.highlightedText}
              content={heroData.content}
              backgroundImage={heroData.backgroundImage}
            />
          )}
          {topicsData && (
            <Topics
              title={topicsData.title}
              topicCards={topicsData.topicCards}
              onCardClick={(slug) => console.log(`Navigating to ${slug}`)}
            />
          )}
        </>
      )}
      {!isStudioRoute && posts && (
        <div className="container mx-auto mt-10 px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post._id}
                post={post}
                size={
                  post.displaySize === "wide" ? CardSize.WIDE : CardSize.MEDIUM
                }
              />
            ))}
          </div>
        </div>
      )}
      {!isStudioRoute && featuredPost && (
        <div className="container mx-auto px-4 py-12">
          <BlogCard post={featuredPost} size={CardSize.LARGE} />
        </div>
      )}
      {children}
    </div>
  );
}
