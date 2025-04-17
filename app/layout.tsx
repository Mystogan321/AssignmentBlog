import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "@/components/LayoutContent";
import type { Metadata } from "next";
import { client } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/sanity/lib/quries";

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
  const settings = await client.fetch(siteSettingsQuery);
  return {
    title: settings?.title || "Lux Ventus",
    description:
      settings?.description ||
      "Fashion, Lifestyle, Spiritual & Mental Health Blog",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutContent
          cinzelVariable={cinzel.variable}
          poppinsVariable={poppins.variable}
        >
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
