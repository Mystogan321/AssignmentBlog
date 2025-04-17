"use client";

import { useState } from "react";
import { Search, LucideIcon } from "lucide-react";
// Removed Container import if it's not used elsewhere or if it was causing the issue
import Container from "./Container";
import Link from "next/link";

export interface NavLink {
  label: string;
  href: string;
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
  navLinks = [
    { label: "Fashion", href: "#fashion" },
    { label: "Lifestyle", href: "#lifestyle" },
    { label: "Spiritual", href: "#spiritual" },
    { label: "Mental Health", href: "#mental-health" },
  ],
  contactLabel = "Contact Us",
  onSearchClick = () => {},
  SearchIcon = Search,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Container>
      <header className="fixed top-0 left-0 w-full py-4 bg-white z-40 border-b border-gray-200">
        {/* This inner div centers the content using Tailwind's container */}
        <div className="container mx-auto flex items-center justify-between px-6">
          {" "}
          {/* Added container, mx-auto, px-6 */}
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
            {/* Desktop Navigation - Removed flex-1, justify-end, mx-8 */}
            <nav>
              <div className="space-x-8">
                {navLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-gray-800 hover:text-[#4CE0D7] transition-colors font-Poppins font-bold text-base"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Contact and Search - Removed lg:flex (md:flex covers it), removed justify-between */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#contact"
                className="bg-[#4CE0D7] text-black px-8 py-3 rounded-full hover:opacity-80 transition-colors text-base font-Poppins font-bold"
              >
                {contactLabel}
              </a>
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
              aria-label="Toggle menu" // Added aria-label for accessibility
            >
              <div className="w-7 h-0.5 bg-gray-800 mb-2"></div>
              <div className="w-7 h-0.5 bg-gray-800 mb-2"></div>
              <div className="w-7 h-0.5 bg-gray-800"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Stays fixed, full screen */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 p-8 overflow-y-auto">
            {" "}
            {/* Added overflow-y-auto */}
            <div className="flex justify-between items-center">
              {logoSrc ? (
                <img src={logoSrc} alt="LUX VENTUS" className="h-10" />
              ) : (
                <div className="font-cinzel text-3xl tracking-wider font-bold">
                  LUX <span className="text-[#4CE0D7]">VENTUS</span>
                </div>
              )}
              <button
                className="focus:outline-none p-1" // Added padding for easier tap
                onClick={toggleMenu}
                aria-label="Close menu" // Added aria-label
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28" // Keep size consistent or adjust as needed
                  height="28"
                  viewBox="0 0 24 24" // Adjusted viewBox for standard X
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />{" "}
                  {/* Standard X lines */}
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="border-t border-gray-200 w-full mt-8 mb-10"></div>
            <nav className="flex flex-col space-y-8">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-800 hover:text-[#4CE0D7] transition-colors text-xl font-Poppins font-bold"
                  onClick={toggleMenu} // Close menu on link click
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                // Ensure text color contrasts with background if needed (e.g., text-black or text-white)
                className="bg-[#4CE0D7] text-black px-8 py-3 rounded-full hover:opacity-80 transition-colors inline-block w-fit mt-6 text-base font-Poppins font-bold"
                onClick={toggleMenu} // Close menu on link click
              >
                {contactLabel}
              </a>
            </nav>
          </div>
        )}
      </header>
    </Container>
  );
};

export default Header;
