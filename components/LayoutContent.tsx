"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import { Search } from "lucide-react";
import Hero from "@/components/Hero";
import Topics from "@/components/Topic/topic";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

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
  const isHomePage = pathname === "/";

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
          {isHomePage && heroData && (
            <Hero
              magazineTitle={heroData.magazineTitle}
              title={heroData.title}
              highlightedText={heroData.highlightedText}
              content={heroData.content}
              backgroundImage={heroData.backgroundImage}
            />
          )}
          {isHomePage && topicsData && (
            <Topics
              title={topicsData.title}
              topicCards={topicsData.topicCards}
              onCardClick={(slug) => console.log(`Navigating to ${slug}`)}
            />
          )}
        </>
      )}

      <main>{children}</main>

      {!isStudioRoute && <Footer />}
    </div>
  );
}
