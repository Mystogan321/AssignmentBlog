import Image from "next/image";
import { useNextSanityImage, UseNextSanityImageProps } from "next-sanity-image";
import { client } from "@/lib/sanity.client"; // Adjust this import based on your project structure

// Define types for the topic card data from Sanity
interface TopicCardData {
  _id: string;
  title: string;
  buttonText: string;
  image: any; // Sanity image reference
  slug: {
    current: string;
  };
}

// Props for the CategoryCard component
type CategoryCardProps = {
  topicData: TopicCardData;
  onClick?: () => void;
};

export default function CategoryCard({
  topicData,
  onClick,
}: CategoryCardProps) {
  // Use the useNextSanityImage hook to get optimized image props
  const imageProps = useNextSanityImage(client, topicData.image);

  if (!imageProps) return null;

  const typedImageProps = imageProps as UseNextSanityImageProps;

  return (
    <div className="w-[204px] h-[291px] rounded-2xl bg-white shadow-md flex flex-col items-center justify-between p-6">
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={typedImageProps.src}
          loader={typedImageProps.loader}
          alt={`${topicData.title} Icon`}
          width={80}
          height={80}
        />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mt-4">
        {topicData.title}
      </h3>
      <button
        onClick={onClick}
        className="mt-4 w-full py-2 rounded-full text-white font-medium transition hover:opacity-90"
        style={{ backgroundColor: "#4CE0D7" }}
      >
        {topicData.buttonText}
      </button>
    </div>
  );
}
