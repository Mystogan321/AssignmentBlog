"use client";

import { useState } from "react";
import { Search, LucideIcon } from "lucide-react";
import Container from "./Container";
import Link from "next/link";

export interface NavLink {
  label: string;
  slug: {
    current: string;
  };
}

export interface HeaderProps {
  logoSrc?: string;
  navLinks?: NavLink[];
  contactLabel?: string;
  onSearchClick?: () => void;
  SearchIcon?: LucideIcon;
}

const Header = ({
  logoSrc,
  navLinks = [],
  contactLabel = "Contact Us",
  onSearchClick = () => {},
  SearchIcon = Search,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use default navigation links if none are provided
  const displayNavLinks =
    navLinks.length > 0
      ? navLinks
      : [
          { label: "Fashion", slug: { current: "fashion" } },
          { label: "Lifestyle", slug: { current: "lifestyle" } },
          { label: "Spiritual", slug: { current: "spiritual" } },
          { label: "Mental Health", slug: { current: "mental-health" } },
        ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Container>
      <header className="fixed top-0 left-0 w-full py-4 px-4 bg-white z-40 border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center">
            {logoSrc ? (
              <img src={logoSrc} alt="LUX VENTUS" className="h-10" />
            ) : (
              <div className="font-cinzel text-3xl tracking-wider font-bold">
                LUX <span className="text-[#4CE0D7]">VENTUS</span>
              </div>
            )}
          </div>
          <div className="hidden lg:flex md:flex items-center space-x-8">
            {/* Desktop Navigation */}
            <nav>
              <div className="space-x-8">
                {displayNavLinks?.map(({ label, slug }) => (
                  <Link
                    key={label}
                    href={`/${slug.current}`}
                    className="text-gray-800 hover:text-[#4CE0D7] transition-colors font-Poppins font-bold text-base"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Contact and Search */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/contact"
                className="bg-[#4CE0D7] text-black px-8 py-3 rounded-full hover:opacity-80 transition-colors text-base font-Poppins font-bold"
              >
                {contactLabel}
              </Link>
              <button
                onClick={onSearchClick}
                className="p-2 rounded-full bg-[#4CE0D7] text-black hover:opacity-80 transition-colors flex items-center justify-center w-12 h-12"
                aria-label="Search"
              >
                <SearchIcon size={18} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={onSearchClick}
              className="p-2 rounded-full bg-[#4CE0D7] text-black font-bold hover:opacity-80 transition-colors flex items-center justify-center size-8"
              aria-label="Search"
            >
              <SearchIcon size={14} />
            </button>
            <button
              className="p-2 font-bold focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="w-7 h-0.5 bg-gray-800 mb-2"></div>
              <div className="w-7 h-0.5 bg-gray-800 mb-2"></div>
              <div className="w-7 h-0.5 bg-gray-800"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 p-8 overflow-y-auto">
            <div className="flex justify-between items-center">
              {logoSrc ? (
                <img src={logoSrc} alt="LUX VENTUS" className="h-10" />
              ) : (
                <div className="font-cinzel text-3xl tracking-wider font-bold">
                  LUX <span className="text-[#4CE0D7]">VENTUS</span>
                </div>
              )}
              <button
                className="focus:outline-none p-1"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="border-t border-gray-200 w-full mt-8 mb-10"></div>
            <nav className="flex flex-col space-y-8">
              {displayNavLinks?.map(({ label, slug }) => (
                <Link
                  key={label}
                  href={`/${slug.current}`}
                  className="text-gray-800 hover:text-[#4CE0D7] transition-colors text-xl font-Poppins font-bold"
                  onClick={toggleMenu}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="bg-[#4CE0D7] text-black px-8 py-3 rounded-full hover:opacity-80 transition-colors inline-block w-fit mt-6 text-base font-Poppins font-bold"
                onClick={toggleMenu}
              >
                {contactLabel}
              </Link>
            </nav>
          </div>
        )}
      </header>
    </Container>
  );
};

export default Header;
