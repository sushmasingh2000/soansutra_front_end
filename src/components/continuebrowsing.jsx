import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useQuery } from 'react-query';
import { apiConnectorGet } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';

const ContinueBrowsing = () => {

  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(
    ['continue-browsing'],
    () => apiConnectorGet(endpoint.get_continue_browsing)
  );

  const categories = data?.data?.result || [];

  if (isLoading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center p-10 text-red-500">Failed to load data.</div>;
  }

  return (
    <div className="w-full max-w-9xl mx-auto p-4 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-1xl md:text-2xl font-medium text-gray-700 mb-6">
          Continue Browsing
        </h1>
      </div>

      {/* Desktop Layout - Horizontal Cards */}
      <div className="hidden lg:flex gap-6">
        {categories.map((category, index) => {
          const images = category.images.split(',');

          return (
            <div
              key={index}
              className="flex-1 bg-red-50 rounded-2xl p-4 relative"
                    onClick={() => navigate(`/products_web?category=${category.category_id}`)}
                     >
              {/* Category Title */}
              <h3 className="text-gray-800 text-[14px] font-medium mb-4">
                {category.top_product_name}
              </h3>

              {/* Products Scroll */}
              <div className="flex gap-3 items-center overflow-x-auto scrollbar-hide">
                {images.map((imgUrl, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex-shrink-0"
                    style={{ width: '80px', height: '80px' }}
                  >
                    <img
                      src={imgUrl}
                      alt="Product"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}

                {/* Arrow Button */}
                <button className="ml-2 p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Layout - Vertical Stack */}
      <div className="lg:hidden space-y-6">
        {categories.map((category, index) => {
          const images = category.images.split(',');

          return (
            <div
              key={index}
              className="bg-red-50 rounded-2xl p-4"
              onClick={() => navigate(`/products_web?category=${category.category_id}`)}
              >
              {/* Category Title */}
              <h3 className="text-gray-800 text-[14px] font-medium mb-4">
                {category.top_product_name}
              </h3>

              {/* Products Scroll */}
              <div className="flex gap-3 items-center overflow-x-auto scrollbar-hide">
                {images.map((imgUrl, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex-shrink-0"
                    style={{ width: '80px', height: '80px' }}
                  >
                    <img
                      src={imgUrl}
                      alt="Product"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}

                {/* Arrow Button */}
                <button className="ml-2 p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors flex-shrink-0">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom scrollbar styles */}
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

export default ContinueBrowsing;
