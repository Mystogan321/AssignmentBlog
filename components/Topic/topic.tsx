import { useState, useEffect, useRef } from "react";
import CategoryCard from "./topicCard";
import Container from "../Container";
import { useRouter } from "next/navigation";
import { getTopicCards, topicsSectionQuery } from "../../sanity/lib/quries";
import { client } from "@/lib/sanity.client";

interface TopicCardData {
  _id: string;
  title: string;
  buttonText: string;
  image: any;
  slug: {
    current: string;
  };
}

interface TopicsProps {
  title?: string;
  topicCards?: TopicCardData[];
}

export default function Topics({ title, topicCards: initialTopicCards }: TopicsProps) {
  const [topicData, setTopicData] = useState<{
    title: string;
    topicCards: TopicCardData[];
    navIcons?: {
      prev?: string;
      next?: string;
    };
  }>({
    title: title || "",
    topicCards: initialTopicCards || [],
    navIcons: {
      prev: "",
      next: ""
    }
  });
  
  const [isLoading, setIsLoading] = useState(!initialTopicCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(2);
  const [slideOffset, setSlideOffset] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch data from Sanity if not provided as props
  useEffect(() => {
    const fetchTopicsData = async () => {
      if (initialTopicCards) return;
      
      setIsLoading(true);
      try {
        // Using your existing topicsSectionQuery to fetch all data
        const result = await client.fetch(topicsSectionQuery);
        
        setTopicData({
          title: result.title || "Popular Topics",
          topicCards: result.topicCards || [],
          navIcons: result.navIcons || {
            prev: "",
            next: ""
          }
        });
      } catch (error) {
        console.error("Error fetching topics section data:", error);
        // Fallback to fetching just the topic cards if the section query fails
        try {
          const cards = await getTopicCards();
          setTopicData(prev => ({
            ...prev,
            topicCards: cards || []
          }));
        } catch (fallbackError) {
          console.error("Fallback topic cards fetch failed:", fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopicsData();
  }, [initialTopicCards]);

  const totalCards = topicData.topicCards.length;

  // Responsive Logic: Determine cardsToShow
  useEffect(() => {
    const handleResize = () => {
      let numCards = 2;
      if (window.innerWidth >= 1280) numCards = 5;
      else if (window.innerWidth >= 1024) numCards = 4;
      else if (window.innerWidth >= 768) numCards = 3;
      setCardsToShow(numCards);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamic Calculation: Measure card width and gap
  useEffect(() => {
    const calculateSlideOffset = () => {
      if (cardRef.current && trackRef.current) {
        const cardElement = cardRef.current;
        const trackElement = trackRef.current;
        const trackStyle = window.getComputedStyle(trackElement);
        const gapValue = trackStyle.getPropertyValue("gap");
        const gap = parseFloat(gapValue) || 24; // Default gap fallback
        const cardWidth = cardElement.offsetWidth;
        setSlideOffset(cardWidth + gap);
      }
    };

    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout;
    const handleResizeDebounced = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        calculateSlideOffset();
        // Recalculate cardsToShow on resize end as well
        let numCards = 2;
        if (window.innerWidth >= 1280) numCards = 5;
        else if (window.innerWidth >= 1024) numCards = 4;
        else if (window.innerWidth >= 768) numCards = 3;
        setCardsToShow(numCards);
      }, 150);
    };

    // Calculate initially only after cards are likely rendered
    const initialTimeout = setTimeout(calculateSlideOffset, 50); // Small delay

    window.addEventListener("resize", handleResizeDebounced);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResizeDebounced);
    };
  }, [totalCards]); // Rerun if the number of cards changes

  // Slider Navigation Logic
  const totalSlides = Math.max(0, totalCards - cardsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalSlides));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleCardClick = (slug: string) => {
    router.push(`/topics/${slug}`);
  };

  // Dynamic Styles
  const transformStyle = {
    transform: `translateX(-${currentIndex * slideOffset}px)`,
  };

  // Render loading state
  if (isLoading) {
    return (
      <Container>
        <div className="w-full pt-6 pb-6">
          <div className="flex justify-between items-center mb-6 px-4 sm:px-6 lg:px-8">
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="flex gap-6 pl-4 sm:pl-6 lg:pl-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-72 h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </Container>
    );
  }

  // Don't render if no cards
  if (totalCards === 0) {
    return null;
  }

  return (
    <Container>
      <div className="w-full pt-6 pb-6">
        {/* Header: Title + Navigation Buttons */}
        <div className="flex justify-between items-center mb-6 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{topicData.title}</h2>
          <div className="flex gap-2">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-opacity rounded-full ${
                currentIndex > 0
                  ? "opacity-100 bg-teal-300 hover:bg-teal-400"
                  : "opacity-50 bg-gray-200 cursor-not-allowed"
              }`}
              disabled={currentIndex === 0}
              aria-label="Previous slide"
            >
              {topicData.navIcons?.prev ? (
                // If we have a custom icon from Sanity
                <img 
                  src={topicData.navIcons.prev} 
                  alt="Previous" 
                  className="w-5 h-5"
                />
              ) : (
                // Default icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-black">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              )}
            </button>
            {/* Next Button */}
            <button
              onClick={nextSlide}
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-opacity rounded-full ${
                currentIndex < totalSlides
                  ? "opacity-100 bg-teal-300 hover:bg-teal-400"
                  : "opacity-50 bg-gray-200 cursor-not-allowed"
              }`}
              disabled={currentIndex >= totalSlides}
              aria-label="Next slide"
            >
              {topicData.navIcons?.next ? (
                // If we have a custom icon from Sanity
                <img 
                  src={topicData.navIcons.next} 
                  alt="Next" 
                  className="w-5 h-5"
                />
              ) : (
                // Default icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-black">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          {/* Slider Track */}
          <div
            ref={trackRef}
            className="flex transition-transform duration-300 ease-in-out gap-6 pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8"
            style={transformStyle}
          >
            {topicData.topicCards.map((topic, index) => (
              <div
                key={topic._id}
                ref={index === 0 ? cardRef : null}
                className="flex-shrink-0 h-full"
              >
                <CategoryCard
                  topicData={topic}
                  onClick={() => handleCardClick(topic.slug.current)}
                />
              </div>
            ))}
          </div>

          {/* Horizontal Line */}
          <hr className="border-t border-gray-300 mt-20 mx-4 sm:mx-6 lg:mx-8" />
        </div>
      </div>
    </Container>
  );
}