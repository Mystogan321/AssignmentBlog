import React from "react";

interface HeaderData {
  title: string;
  subtitle: string;
  heroImage: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export interface LayoutContentProps {
  children: React.ReactNode;
  headerData: HeaderData;
}

export default function LayoutContent({
  children,
  headerData,
}: LayoutContentProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {headerData.title}
          </h1>
          {headerData.subtitle && (
            <p className="mt-2 text-lg text-gray-600">{headerData.subtitle}</p>
          )}
          {headerData.heroImage && (
            <img
              src={headerData.heroImage.asset.url}
              alt={headerData.title}
              className="w-full h-auto mt-4 rounded-lg shadow-md"
              width={headerData.heroImage.asset.metadata.dimensions.width}
              height={headerData.heroImage.asset.metadata.dimensions.height}
            />
          )}
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
