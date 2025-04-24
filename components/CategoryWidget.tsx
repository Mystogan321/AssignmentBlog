import { useState, useEffect } from "react";
import {
  getCategoriesWithPostCount,
  getCategoryWidgetSettings,
} from "../sanity/lib/quries";

// Define props interface
interface CategoryWidgetProps {
  title?: string; // Optional title prop with default in component
}

interface Category {
  _id: string;
  title: string;
  postCount: number;
}

const CategoryWidget = ({ title: propTitle }: CategoryWidgetProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [widgetTitle, setWidgetTitle] = useState(propTitle || "Categories");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const categoryData = await getCategoriesWithPostCount();
        setCategories(categoryData);

        if (!propTitle) {
          try {
            const settings = await getCategoryWidgetSettings();
            if (settings && settings.title) {
              setWidgetTitle(settings.title);
            }
          } catch (settingsErr) {
            console.error("Failed to fetch widget settings:", settingsErr);
          }
        }
      } catch (err) {
        setError("Failed to load categories");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [propTitle]);

  if (isLoading) return <div className="p-4">Loading categories...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{widgetTitle}</h2>

      <div className="divide-y divide-gray-400">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex justify-between items-center py-4"
          >
            <div className="text-gray-800 font-semibold">{category.title}</div>
            <div className="bg-teal-400 text-center rounded-full w-10 h-10 font-semibold flex items-center justify-center text-black">
              {category.postCount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryWidget;
