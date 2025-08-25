import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';

const SonasutraCollections = () => {
  const navigate = useNavigate();

  const { data } = useQuery(
    ["latest_product"],
    () => apiConnectorGet(endpoint.latest_items),
    usequeryBoolean
  );

  const collections = data?.data?.result || [];
  const handleClick = (product) => {
    window.scrollTo(0, 0); 
    navigate("/productdetails", { state: { product } });
  };

  return (
    <div className="w-full bg-gradient-to-b from-purple-50 to-purple-100 py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-1xl md:text-3xl font-semibold text-purple-900 mb-2">
          Sonasutra Collections
        </h1>
      </div>

      {/* Collections Container */}
      <div className="max-w-7xl mx-auto">
        {/* Mobile View - 2 columns grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {collections.map((collection) => {
            // Parse images from JSON string
            let images = [];
            try {
              images = JSON.parse(collection.product_images);
            } catch {
              images = [];
            }
            const imageUrl = images.length > 0 ? images[0].p_image_url : null;

           
            return (
              <div
                key={collection.product_id}
                className="group cursor-pointer"
                onClick={() => handleClick(collection)}   >
                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <img
                    src={imageUrl || `https://via.placeholder.com/400x320/6B46C1/FFFFFF?text=${encodeURIComponent(collection.name)}`}
                    alt={collection.name}
                    className="w-full h-auto object-contain bg-white"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x320/6B46C1/FFFFFF?text=${encodeURIComponent(collection.name)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop View - Horizontal Scroll */}
        <div className="hidden md:block">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4 min-w-max px-2">
              {collections.map((collection) => {
                let images = [];
                try {
                  images = JSON.parse(collection.product_images);
                } catch {
                  images = [];
                }
                const imageUrl = images.length > 0 ? images[0].p_image_url : null;

                return (
                  <div
                    key={collection.product_id}
                    className="flex-shrink-0 w-80 lg:w-96 group cursor-pointer"
                    onClick={() => handleClick(collection)}  >
                    <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <img
                        src={imageUrl || `https://via.placeholder.com/400x320/6B46C1/FFFFFF?text=${encodeURIComponent(collection.name)}`}
                        alt={collection.name}
                        className="w-full h-auto object-contain bg-white"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x320/6B46C1/FFFFFF?text=${encodeURIComponent(collection.name)}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* View All Collections Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-purple-800 hover:bg-purple-900 text-white text-sm font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            VIEW ALL COLLECTIONS
          </button>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
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

export default SonasutraCollections;
