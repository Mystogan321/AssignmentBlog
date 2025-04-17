// lib/sanity.queries.ts
import { groq } from "next-sanity";

// Fetch all post slugs
export const postPathsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

// Fetch a single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    author->{name, "slug": slug.current, image{..., alt}},
    mainImage {..., alt},
    categories[]->{title, "slug": slug.current},
    publishedAt,
    body,
    excerpt
  }
`;

// Fetch limited posts for the homepage, ordered by published date
export const homePagePostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...6] {
     _id,
    title,
    "slug": slug.current,
    author->{name},
    mainImage {..., alt},
    publishedAt,
    excerpt
  }
`;

// Fetch Site Settings (assuming only one instance)
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo {..., alt},
    footerText
    // Add other fields you need
  }
`;

export const headerSettingsQuery = groq`
  *[_type == "headerSettings"][0]{
    "logo": logo.asset->url,
    navigationLinks[] {
      label,
      href
    },
    contactButtonLabel
  }
`;
