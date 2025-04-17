"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import { headerSettingsQuery } from "@/sanity/lib/quries";
import Hero from "@/components/Hero";

interface HeaderSettings {
  logo?: string;
  navigationLinks: Array<{ label: string; href: string }>;
  contactButtonLabel: string;
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

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const data = await client.fetch(headerSettingsQuery);
        setHeaderData(data);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, []);

  return (
    <div className={`${cinzelVariable} ${poppinsVariable} font-body`}>
      {!isStudioRoute && (
        <Header
          logoSrc={headerData?.logo}
          navLinks={headerData?.navigationLinks || []}
          contactLabel={headerData?.contactButtonLabel || "Contact Us"}
          onSearchClick={() => console.log("Search clicked")}
          SearchIcon={Search}
        />
      )}
      <Hero
        title="Welcome to Our Blog"
        highlightedText="Explore the latest insights"
        content="Stay up-to-date with the latest trends and news in the industry."
      />
      {children}
    </div>
  );
}
