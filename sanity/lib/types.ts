// lib/types.ts
import type { Image, PortableTextBlock, Slug } from "sanity";

export interface SanityImageWithAlt extends Image {
  alt?: string;
  caption?: string; // If you added caption field
}

export interface Author {
  _type: "author";
  _id: string;
  name: string;
  slug: Slug;
  image?: SanityImageWithAlt;
  bio?: string | PortableTextBlock[]; // Can be simple text or rich text
}

export interface Category {
  _type: "category";
  _id: string;
  title: string;
  slug: Slug;
  description?: string;
}

export interface Post {
  _type: "post";
  _id: string;
  _createdAt: string;
  title: string;
  slug: Slug;
  author: Author; // Reference expanded
  mainImage?: SanityImageWithAlt;
  categories?: Category[]; // Array of references expanded
  publishedAt: string;
  body: PortableTextBlock[]; // Rich text content
  excerpt?: string;
}

export interface SiteSettings {
  _type: "siteSettings";
  _id: string;
  title: string;
  description?: string;
  logo?: SanityImageWithAlt;
  footerText?: string;
  // Add other settings fields
}
