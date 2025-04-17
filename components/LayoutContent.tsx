"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { headerSettingsQuery, heroSectionQuery } from "@/sanity/lib/quries";
import Hero from "@/components/Hero";

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

interface LayoutContentProps {
  children: React.ReactNode;
  cinzelVariable: string;
  poppinsVariable: string;
}

export function LayoutContent({
  children,
  cinzelVariable,
  poppinsVariable,
}: LayoutContentProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");
  const [headerData, setHeaderData] = useState<HeaderSettings | null>(null);
  const [heroData, setHeroData] = useState<HeroSettings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [headerResult, heroResult] = await Promise.all([
          client.fetch(headerSettingsQuery),
          client.fetch(heroSectionQuery),
        ]);
        setHeaderData(headerResult);
        setHeroData(heroResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
        </>
      )}
      {children}
    </div>
  );
}
