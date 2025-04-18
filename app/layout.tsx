import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "../components/LayoutContent";
import type { Metadata } from "next";
import { client } from "@/lib/sanity.client";
import {
  siteSettingsQuery,
  headerSettingsQuery,
  heroSectionQuery,
  topicsSectionQuery,
} from "../sanity/lib/quries";

// Configure fonts
const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-cinzel",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-poppins",
});

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await client.fetch(siteSettingsQuery);
    return {
      title: settings?.title || "Lux Ventus",
      description:
        settings?.description ||
        "Fashion, Lifestyle, Spiritual & Mental Health Blog",
    };
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {
      title: "Lux Ventus",
      description: "Fashion, Lifestyle, Spiritual & Mental Health Blog",
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the required data
  const [headerData, heroData, topicsData] = await Promise.all([
    client.fetch(headerSettingsQuery).catch(() => null),
    client.fetch(heroSectionQuery).catch(() => null),
    client.fetch(topicsSectionQuery).catch(() => null),
  ]);

  return (
    <html lang="en" className={`${cinzel.variable} ${poppins.variable}`}>
      <body className="font-body">
        <LayoutContent
          cinzelVariable={cinzel.variable}
          poppinsVariable={poppins.variable}
          headerData={headerData}
          heroData={heroData}
          topicsData={topicsData}
        >
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
