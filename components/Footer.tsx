"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { getFooterData } from "../sanity/lib/quries";

interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

interface FooterData {
  logo?: string;
  copyright: string;
  ctaText: string;
  socialLinks?: SocialLink[];
  author?: string;
}

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const data = await getFooterData();
        setFooterData(data);
      } catch (err) {
        console.error("Failed to fetch footer data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (isLoading) {
    return (
      <footer className="bg-white py-6">
        <Container>
          <div className="animate-pulse">
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 bg-gray-200 rounded w-40"></div>
              <div className="h-6 bg-gray-200 rounded w-36"></div>
              <div className="flex space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gray-200 rounded-full"
                  ></div>
                ))}
              </div>
            </div>
            <div className="h-px bg-gray-200 w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mt-4 mx-auto"></div>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="bg-white py-6">
      <Container>
        <div className="flex flex-col">
          {/* Main footer content */}
          <div className="flex justify-between items-center mb-6">
            {/* Logo - Left section */}
            <div>
              {footerData?.logo ? (
                <Image
                  src={footerData.logo}
                  alt="Lux Ventus"
                  width={180}
                  height={40}
                  className="h-auto"
                />
              ) : (
                <div className="text-xl font-bold tracking-widest">
                  <span>LUX </span>
                  <span className="bg-teal-400 px-1">VENTUS</span>
                </div>
              )}
            </div>

            {/* CTA Text - Center section */}
            <div className="text-lg font-medium">
              {footerData?.ctaText || "Let's Hang Out"}
            </div>

            {/* Social Media Icons - Right section */}
            <div className="flex">
              {footerData?.socialLinks?.map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-white p-2 rounded-full hover:bg-teal-500 transition-colors"
                >
                  {social.icon ? (
                    <Image
                      src={social.icon}
                      alt={social.platform}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  ) : (
                    <span className="w-5 h-5 flex items-center justify-center bg-teal-400 rounded-full">
                      {social.platform.charAt(0).toUpperCase()}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Divider line */}
          <div className="border-t border-gray-200 mb-4"></div>

          {/* Copyright Text - Bottom section */}
          <div className="text-sm text-gray-600 text-center">
            {footerData?.copyright ||
              `© ${new Date().getFullYear()} - Lux Ventus${
                footerData?.author ? ` by ${footerData.author}` : ""
              }`}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
