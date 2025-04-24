"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import { Search } from "lucide-react";
import Hero from "@/components/Hero";
import Topics from "@/components/Topic/topic";
import { getTopRatedWidget } from "../sanity/lib/quries";
import { useState, useEffect } from "react";
import TopRatedWidget from "@/components/TopRatedWidget";
import TopRatedWidgetAdapter from "@/components/TopRatedWidgetAdapter";

interface HeaderSettings {
  logo?: string;
  navigationLinks: Array<{ label: string; slug: { current: string } }>;
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
  headerData?: HeaderSettings | null;
  heroData?: HeroSettings | null;
  topicsData?: TopicsSection | null;
}

export function LayoutContent({
  children,
  cinzelVariable,
  poppinsVariable,
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

      {children}
    </div>
  );
}
