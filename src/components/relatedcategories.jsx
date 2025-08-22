import React from 'react';

const RelatedCategories = () => {
  const categories = [
    'cocktail rings',
    'princess cut diamond ring',
    'stone ring design',
    'boys gold ring',
    'wedding ring designs',
    'ring',
    'white gold rings for men',
    'white gold rings',
    'simple gold ring design',
    'couple rings',
    'birthstone rings',
    'real diamond rings',
    'round gold ring',
    'ring designs for male',
    'platinum rings for men'
  ];

  return (
    <div className="w-full bg-blue-50 py-4 px-2 mb-5">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-base font-semibold text-gray-800 mb-3 text-center">
          Related Categories
        </h2>
        
        {/* Desktop View - Grid Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-full px-2 py-1 text-center shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-200 hover:border-blue-200"
              >
                <span className="text-xs text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View - Horizontal Scroll */}
        <div className="md:hidden">
          {/* First Row */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {categories.slice(0, 10).map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-full px-2 py-1 shadow-sm border border-gray-200 whitespace-nowrap flex-shrink-0"
                >
                  <span className="text-xs text-gray-700">{category}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Second Row */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {categories.slice(10).map((category, index) => (
                <div
                  key={index + 10}
                  className="bg-white rounded-full px-2 py-1 shadow-sm border border-gray-200 whitespace-nowrap flex-shrink-0"
                >
                  <span className="text-xs text-gray-700">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet View - 3 Columns */}
        <div className="hidden sm:block md:hidden">
          <div className="grid grid-cols-3 gap-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-full px-2 py-1 text-center shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-200 hover:border-blue-200"
              >
                <span className="text-xs text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RelatedCategories;