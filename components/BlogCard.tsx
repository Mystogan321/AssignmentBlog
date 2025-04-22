import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { urlFor } from "@/lib/sanity.client";

// Type definitions
export type SanityImage = {
  asset: {
    _id: string;
    url?: string;
  };
};

export type Author = {
  name: string;
  image?: SanityImage;
};

export type Category = {
  _id: string;
  title: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: SanityImage | string;
  excerpt?: string;
  publishedAt: string;
  author?: Author | string;
  categories?: Category[];
  specialTag?: string;
  callToActionText?: string;
  displaySize?: "large" | "medium" | "wide";
  featured?: boolean;
};

// Card size constants
export enum CardSize {
  LARGE = "large", // W-915, H-687
  MEDIUM = "medium", // W-441, H-660
  WIDE = "wide", // W-920, H-362
}

interface BlogCardProps {
  post: Post;
  size?: CardSize;
}

const BlogCard: React.FC<BlogCardProps> = ({
  post,
  size = CardSize.MEDIUM,
}) => {
  const {
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    author,
    categories,
    specialTag,
    callToActionText = "READ MORE",
  } = post;

  const formattedDate = publishedAt
    ? format(new Date(publishedAt), "MMMM do, yyyy")
    : "";

  // Generate post URL from slug
  const postUrl = `/posts/${slug?.current}`;

  // Style variations based on card size
  const cardStyles = {
    [CardSize.LARGE]: {
      container: "max-w-[1000px] min-h-[680px] flex flex-col rounded-3xl",
      imageContainer: "w-full h-[450px] relative rounded-3xl overflow-hidden",
      content: "p-8",
      titleClass: "text-3xl font-bold mb-3",
    },
    [CardSize.MEDIUM]: {
      container: "max-w-[440px] min-h-[600px] flex flex-col rounded-3xl",
      imageContainer: "w-full h-[320px] relative rounded-3xl overflow-hidden",
      content: "p-6",
      titleClass: "text-2xl font-bold mb-3",
    },
    [CardSize.WIDE]: {
      container: "max-w-[10000px] min-h-[300px] flex flex-row rounded-3xl",
      imageContainer: "w-1/2 h-auto relative rounded-l-3xl overflow-hidden",
      content: "p-6 w-1/2",
      titleClass: "text-2xl font-bold mb-2",
    },
  };

  const styles = cardStyles[size] || cardStyles[CardSize.MEDIUM];

  // Enhanced function to get image URL safely, handling both formats
  const getImageUrl = (image: any): string => {
    try {
      // If image is a string (direct URL from GROQ)
      if (typeof image === 'string') {
        return image;
      }
      
      // If image already has a direct URL
      if (image?.asset?.url) {
        return image.asset.url;
      }
      
      // If we need to use urlFor to generate the URL
      if (image?.asset?._id) {
        return urlFor(image).width(1200).url();
      }
      
      // Fallback
      return "/placeholder-image.jpg";
    } catch (error) {
      console.error("Error generating image URL:", error);
      return "/placeholder-image.jpg"; // Fallback image path
    }
  };

  // Enhanced function to handle author data
  const getAuthorName = (author: any): string => {
    if (typeof author === 'string') {
      return author;
    }
    return author?.name || 'Anonymous';
  };

  // Enhanced function to get author image
  const getAuthorImageUrl = (author: any): string | null => {
    if (typeof author === 'string') {
      return null;
    }
    
    if (author?.image) {
      return getImageUrl(author.image);
    }
    
    return null;
  };

  return (
    <div
      className={`bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${styles.container}`}
    >
      {/* Image */}
      {size === CardSize.WIDE ? (
        <div className={styles.imageContainer}>
          {mainImage && (
            <div className="relative w-full h-full min-h-[300px]">
              <Image
                src={getImageUrl(mainImage)}
                alt={title || "Blog post image"}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Category Label */}
          {categories && categories.length > 0 && (
            <div className="absolute top-4 left-4 bg-black text-white px-6 py-2 rounded-full text-sm uppercase font-bold tracking-wider z-10">
              {categories[0].title}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.imageContainer}>
          {mainImage && (
            <Image
              src={getImageUrl(mainImage)}
              alt={title || "Blog post image"}
              fill
              className="object-cover"
              priority
            />
          )}

          {/* Category Label */}
          {categories && categories.length > 0 && (
            <div className="absolute top-4 left-4 bg-black text-white px-6 py-2 rounded-full text-sm uppercase font-bold tracking-wider">
              {categories[0].title}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className={`${styles.content} flex flex-col flex-grow`}>
        <div className="flex items-center space-x-3 mb-5">
          {/* Author Avatar */}
          {author && getAuthorImageUrl(author) && (
            <div className="w-10 h-10 rounded-full overflow-hidden relative">
              <Image
                src={getAuthorImageUrl(author)!}
                alt={getAuthorName(author) || "Author"}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          )}

          <div className="flex flex-row items-center flex-grow">
            {/* Author Name */}
            <p className="text-base text-gray-500 font-medium mr-4">
              {author ? getAuthorName(author) : ''}
            </p>

            {/* Publication Date */}
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>

          {/* Special Tag */}
          {specialTag && (
            <div className="px-4 py-1 text-red-500 rounded-full text-sm font-bold uppercase">
              {specialTag}
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className={styles.titleClass}>
          <Link
            href={postUrl}
            className="hover:text-blue-600 transition-colors"
          >
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-6 line-clamp-3">{excerpt}</p>

        {/* Call to Action - Arrow style similar to image */}
        <div className="mt-auto">
          <Link
            href={postUrl}
            className="inline-flex items-center text-teal-400 hover:text-teal-500 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            {callToActionText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;