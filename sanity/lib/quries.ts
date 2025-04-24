// lib/sanity.queries.ts
import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";

// Fetch all post slugs
export const postPathsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage {
      asset->{
        _id,
        url
      }
    },
    body,
    excerpt,
    publishedAt,
    categories[]->{
      _id,
      title
    },
    "author": author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      },
      bio
    },
    specialTag,
    callToActionText
  }
`;

// GROQ query for posts by category
export const postsByCategoryQuery = `
  *[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      }
    },
    publishedAt,
    categories[]->{
      _id,
      title
    },
    "author": author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    specialTag,
    callToActionText,
    displaySize
  }
`;

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
  *[_type == "headerSettings"][0] {
    "logoUrl": logo.asset->url,
    navigationLinks[] {
      label,
      slug
    },
    contactButtonLabel
  }
`;

// Add this to your lib/sanity.queries.ts file

export const heroSectionQuery = groq`
  *[_type == "hero"][0] {
    magazineTitle,
    title,
    highlightedText,
    content,
    "backgroundImage": backgroundImage.asset->url
  }
`;

export const topicCardsQuery = `*[_type == "topicCard"] {
  _id,
  title,
  buttonText,
  image,
  slug
}`;

export async function getTopicCards() {
  const topicCards = await client.fetch(topicCardsQuery);
  return topicCards;
}

export const topicsSectionQuery = groq`
  *[_type == "topicsSection"][0] {
    title,
    topicCards[]-> {
      _id,
      title,
      buttonText,
      image,
      slug
    }
  }
`;

export const topicCardBySlugQuery = groq`
  *[_type == "topicCard" && slug.current == $slug][0] {
    _id,
    title,
    buttonText,
    image,
    content,  
    slug {
      current
    }
  }
`;

export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      }
    },
    publishedAt,
    categories[]->{
      _id,
      title
    },
    "author": author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    specialTag,
    displaySize
  }
`;

// Fetch the active pageLayout (with post refs left as an array)
export const activePageLayoutQuery = groq`
  *[_type == "pageLayout" && isActive == true][0]{
    title,
    "featuredPost": featuredPost->{
      _id, title, slug, excerpt, publishedAt, specialTag,
      callToActionText, displaySize, isFeatured, layoutSection, displayOrder,
      "author": author->{name, image{asset->url}},
      "mainImage": mainImage.asset->url,
      categories[]->{_id, title}
    },
    trendingTitle,
    "trendingPosts": trendingPosts[]->{
      _id, title, slug, excerpt, publishedAt, specialTag,
      callToActionText, displaySize, isFeatured, layoutSection, displayOrder,
      "author": author->{name, image{asset->url}},
      "mainImage": mainImage.asset->url,
      categories[]->{_id, title}
    },
    stackedTitle,
    "stackedPosts": stackedPosts[]->{
      _id, title, slug, excerpt, publishedAt, specialTag,
      callToActionText, displaySize, isFeatured, layoutSection, displayOrder,
      "author": author->{name, image{asset->url}},
      "mainImage": mainImage.asset->url,
      categories[]->{_id, title}
    },
    sidebarContent // array of { _ref } objects
  }
`;

// Given an array of _id's in $refs, pull back both posts and widgets
export const sidebarItemsQuery = groq`
  *[_id in $refs]{
    _id,
    _type,
    // Post fields
    title,
    slug,
    excerpt,
    publishedAt,
    specialTag,
    callToActionText,
    displaySize,
    isFeatured,
    layoutSection,
    displayOrder,
    "author": author->{name, image{asset->url}},
    "mainImage": mainImage.asset->url,
    categories[]->{_id, title},
    // Widget fields
    widgetType,
    content
  }
`;
