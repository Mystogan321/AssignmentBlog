"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getHostWidgetData } from "@/sanity/lib/quries";
import { PortableText } from "@portabletext/react";

// Define interface for social platform
interface SocialPlatform {
  platform: string;
  url: string;
  icon: string;
}

const HostWidget = () => {
  const [hostData, setHostData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHostData = async () => {
      try {
        const data = await getHostWidgetData();
        setHostData(data);
      } catch (err) {
        console.error("Failed to fetch host widget data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHostData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded p-4 shadow-sm w-full mb-6">
        <div className="animate-pulse flex flex-col items-center">
          <div className="bg-gray-200 rounded-full w-32 h-32 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-10 bg-gray-200 rounded w-1/2 mb-4"></div>
        </div>
      </div>
    );
  }

  if (!hostData) return null;

  // Extract social media platforms that have both URL and icon
  const socialPlatforms: SocialPlatform[] = [];
  if (hostData.socialIcons) {
    const platforms = [
      "facebook",
      "twitter",
      "linkedin",
      "youtube",
      "instagram",
    ];
    platforms.forEach((platform) => {
      if (
        hostData.socialIcons[platform]?.url &&
        hostData.socialIcons[platform]?.icon
      ) {
        socialPlatforms.push({
          platform,
          url: hostData.socialIcons[platform].url,
          icon: hostData.socialIcons[platform].icon,
        });
      }
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6  flex flex-col items-center text-center">
      {/* Host Image */}
      <div className="mb-4 relative w-32 h-32 rounded-full overflow-hidden border-4 border-teal-400">
        {hostData.image ? (
          <Image
            src={hostData.image}
            alt={hostData.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Host Label */}
      <div className="text-gray-500 uppercase text-sm tracking-wider mb-1">
        {hostData.hostLabel || "YOUR HOST"}
      </div>

      {/* Host Name */}
      <h2 className="text-2xl mb-4">{hostData.name}</h2>

      {/* Divider */}
      <div className="w-1/2 h-px bg-gray-300 mb-4"></div>

      {/* Host Bio */}
      <div className="text-gray-700 mb-6 tracking-wider text-center align-middle">
        {hostData.bio ? (
          <PortableText value={hostData.bio} />
        ) : (
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        )}
      </div>

      {/* Let's Chat Button */}
      <Link
        href={hostData.ctaLink || "/contact"}
        className="bg-teal-400 text-black px-8 py-3 rounded-full hover:bg-teal-500 transition-colors mb-6 text-center inline-block"
      >
        {hostData.ctaText || "Let's Chat"}
      </Link>

      {/* Social Icons - with debugging */}
      {socialPlatforms.length > 0 ? (
        <div className="flex  justify-center">
          {socialPlatforms.map(({ platform, url, icon }) => {
            console.log(`Rendering icon for ${platform}:`, icon); // Debugging
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${platform}`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                  {icon ? (
                    <Image
                      src={icon}
                      alt={platform}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-white text-xs">
                      {platform.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="text-sm text-gray-500">No social icons available</div>
      )}
    </div>
  );
};

export default HostWidget;
