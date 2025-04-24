"use client";

import { useState, useEffect } from "react";
import { getNewsletterWidgetData } from "@/sanity/lib/quries";

interface NewsletterData {
  title: string;
  description: string;
  inputPlaceholder: string;
  buttonText: string;
  successMessage: string;
  footerText: string;
  backgroundColor: string;
  accentColor: string;
  subscriberCount: number;
  formEndpoint: string;
  active: boolean;
}

const NewsletterWidget = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [newsletterData, setNewsletterData] = useState<NewsletterData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsletterData = async () => {
      try {
        const data = await getNewsletterWidgetData();
        setNewsletterData(data);
      } catch (err) {
        console.error("Failed to fetch newsletter data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsletterData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsSubscribing(true);

    try {
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubscribeSuccess(true);
      setEmail("");

      setTimeout(() => setSubscribeSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to subscribe:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 ">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-12 bg-gray-200 rounded-full w-full mb-4"></div>
          <div className="h-12 bg-gray-200 rounded-full w-full mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-3xl font-bold text-center mb-2">
        {newsletterData?.title || "Newsletter"}
      </h2>

      <div className="w-32 h-px bg-gray-300 mx-auto mb-4"></div>

      <p className="text-center mb-6">
        {newsletterData?.description || "Join the 36,000 Lux Ventus!"}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder={newsletterData?.inputPlaceholder || "Email Address"}
          className="px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-teal-400 text-black font-medium py-3 rounded-full hover:bg-teal-500 transition-colors"
          disabled={isSubscribing}
        >
          {isSubscribing
            ? "Subscribing..."
            : newsletterData?.buttonText || "Subscribe"}
        </button>
      </form>

      {subscribeSuccess && (
        <p className="text-green-600 text-center mt-4">
          {newsletterData?.successMessage || "Thanks for subscribing!"}
        </p>
      )}

      <p className="text-center text-gray-600 text-sm mt-4">
        {newsletterData?.footerText ||
          "Rest assured! You're gonna have a lot of fun when you press this"}
      </p>
    </div>
  );
};

export default NewsletterWidget;
