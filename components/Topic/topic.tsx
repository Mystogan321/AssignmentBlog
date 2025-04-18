import { useState, useEffect } from "react";
import Image from "next/image";
import CategoryCard from "./topicCard";
import Container from "../Container";
import { useRouter } from "next/navigation";

interface TopicCardData {
  _id: string;
  title: string;
  buttonText: string;
  image: any; // Sanity image reference
  slug: {
    current: string;
  };
}

interface TopicsProps {
  title: string;
  topicCards: TopicCardData[];
  onCardClick?: (slug: string) => void;
}

export default function Topics({
  title,
  topicCards,
  onCardClick,
}: TopicsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4); // Default, will adjust based on screen size
  const router = useRouter();

  // Update cards to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setCardsToShow(5);
      else if (window.innerWidth >= 1024) setCardsToShow(4);
      else if (window.innerWidth >= 768) setCardsToShow(3);
      else if (window.innerWidth >= 640) setCardsToShow(2);
      else setCardsToShow(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.max(0, topicCards.length - cardsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalSlides));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleCardClick = (slug: string) => {
    router.push(`/topics/${slug}`);
  };

  return (
    <Container>
      <div className="w-full h-96 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className={`w-[46px] h-[46px] flex items-center justify-center cursor-pointer transition-opacity ${
                currentIndex > 0 ? "opacity-100" : "opacity-50"
              }`}
              disabled={currentIndex === 0}
              aria-label="Previous slide"
            >
              <Image
                src="/navigation/left.svg"
                alt="Previous"
                width={46}
                height={46}
                priority
              />
            </button>
            <button
              onClick={nextSlide}
              className={`w-[46px] h-[46px] flex items-center cursor-pointer justify-center transition-opacity ${
                currentIndex < totalSlides ? "opacity-100" : "opacity-50"
              }`}
              disabled={currentIndex >= totalSlides}
              aria-label="Next slide"
            >
              <Image
                src="/navigation/right.svg"
                alt="Next"
                width={46}
                height={46}
                priority
              />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-6 mb-20"
            style={{ transform: `translateX(-${currentIndex * (204 + 24)}px)` }}
          >
            {topicCards.map((topic) => (
              <CategoryCard
                key={topic._id}
                topicData={topic}
                onClick={() => handleCardClick(topic.slug.current)}
              />
            ))}
          </div>
          <hr className="border-t border-gray-300 my-8" />
        </div>
      </div>
    </Container>
  );
}
