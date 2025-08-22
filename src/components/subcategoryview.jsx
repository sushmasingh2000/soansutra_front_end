import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const SubcategoryView = ({ 
  category, 
  onBack, 
  onItemClick 
}) => {
  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    // Default behavior - navigate or perform action
    console.log(`Clicked on: ${item.name}`);
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
        </div>
      </div>

      {/* Featured Section */}
      <FeaturedSection 
        items={category.subcategories.featured} 
        onItemClick={handleItemClick}
      />

      {/* By Style Section */}
      <StyleSection 
        items={category.subcategories.byStyle} 
        onItemClick={handleItemClick}
      />

      {/* By Metal & Stone Section */}
      <MetalSection 
        items={category.subcategories.byMetal} 
        onItemClick={handleItemClick}
      />

      {/* Price Range Section */}
      <PriceRangeSection onPriceClick={handleItemClick} />

      {/* Banner Section */}
      <BannerSection 
        banners={category.subcategories.banners} 
        onBannerClick={handleItemClick}
      />

      {/* Gender Categories Section */}
      <GenderCategoriesSection onGenderClick={handleItemClick} />
    </div>
  );
};

// Featured Items Component
const FeaturedSection = ({ items, onItemClick }) => (
  <div className="px-4 py-3">
    <h3 className="text-sm font-medium text-gray-700 mb-3">Featured</h3>
    <div className="grid grid-cols-2 gap-2">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => onItemClick(item)}
          className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 text-center hover:bg-purple-100 transition-colors"
        >
          <span className="text-sm font-medium text-purple-700">{item.name}</span>
        </button>
      ))}
    </div>
  </div>
);

// Style Items Component
const StyleSection = ({ items, onItemClick }) => (
  <div className="px-4 py-3">
    <h3 className="text-sm font-medium text-gray-700 mb-3">By Style</h3>
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => onItemClick(item)}
          className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-contain"
              />
            )}
            <span className="text-xs font-medium text-gray-800 leading-tight">
              {item.name}
            </span>
          </div>
        </button>
      ))}
    </div>
  </div>
);

// Metal & Stone Component
const MetalSection = ({ items, onItemClick }) => (
  <div className="px-4 py-3">
    <h3 className="text-sm font-medium text-gray-700 mb-3">By Metal & Stone</h3>
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => onItemClick(item)}
          className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-contain"
              />
            )}
            <span className="text-xs font-medium text-gray-800 leading-tight">
              {item.name}
            </span>
          </div>
        </button>
      ))}
    </div>
  </div>
);

// Price Range Component
const PriceRangeSection = ({ onPriceClick }) => {
  const priceRanges = [
    "Under ₹ 10k",
    "₹ 10k - ₹ 20k",
    "₹ 20k - ₹ 30k",
    "₹ 30k - ₹ 50k",
    "₹ 40k - ₹ 50k",
    "₹ 50k - ₹ 75k",
    "₹ 75k & Above"
  ];

  return (
    <div className="px-4 py-3">
      <h3 className="text-sm font-medium text-gray-700 mb-3">By Price</h3>
      <div className="grid grid-cols-2 gap-2">
        {priceRanges.slice(0, 6).map((price, index) => (
          <button
            key={index}
            onClick={() => onPriceClick({ name: price })}
            className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 text-center hover:bg-purple-100 transition-colors"
          >
            <span className="text-xs font-medium text-purple-700">{price}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Banner Component
const BannerSection = ({ banners, onBannerClick }) => (
  <div className="px-4 py-3">
    <div className="grid grid-cols-2 gap-3">
      {banners.map((banner, index) => (
        <button
          key={index}
          onClick={() => onBannerClick(banner)}
          className="flex flex-col bg-white rounded-lg overflow-hidden hover:opacity-90 transition-opacity shadow-sm"
        >
          {banner.image && (
            <div className="relative">
              <img
                src={banner.image}
                alt={banner.name}
                className="w-full h-24 object-cover"
              />
            </div>
          )}
          <div className="p-2 text-center">
            <span className="text-xs font-medium text-gray-700 leading-tight">
              {banner.name}
            </span>
          </div>
        </button>
      ))}
    </div>
  </div>
);

// Gender Categories Component
const GenderCategoriesSection = ({ onGenderClick }) => {
  const genderCategories = [
    { name: "For Women" },
    { name: "For Men" },
    { name: "For Kids" }
  ];

  return (
    <div className="px-4 py-3 bg-purple-50">
      <div className="space-y-2">
        {genderCategories.map((gender, index) => (
          <button
            key={index}
            onClick={() => onGenderClick(gender)}
            className="flex items-center justify-between py-2 bg-white rounded-lg px-3 hover:bg-gray-50 transition-colors w-full"
          >
            <span className="text-sm font-medium text-gray-700">{gender.name}</span>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryView;