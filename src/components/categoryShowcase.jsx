import React from 'react';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const JewelryCategories = () => {
  const navigate = useNavigate();

  const { data } = useQuery(
    ["frequent_product"],
    () => apiConnectorGet(endpoint.get_most_frequent),
    usequeryBoolean
  );

  const products = data?.data?.result || [];

  const handleClick = (product) => {
    navigate("/productdetails", { state: { product } });
  };

  const handleImageError = (e) => {
    const parent = e.target.parentElement;
    parent.innerHTML = `
      <div class="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
        <div class="text-center text-gray-600">
          <div class="text-2xl mb-2">💎</div>
          <div class="text-xs">Jewelry</div>
        </div>
      </div>
    `;
  };
  const giftItem = products.find(cat => cat.isGift);
  return (
    <div className="w-full p-2 sm:p-4 lg:p-6">
      {/* Main container with full width and custom background */}
      <div
        className="w-full p-4 sm:p-6 lg:p-8 rounded-2xl"
        style={{ backgroundColor: 'rgb(246, 243, 249)' }}
      >

        {/* Mobile Layout: Gift at top, then 3x2 grid */}
        <div className="block sm:hidden">
          {/* Gift Item - Mobile */}
          <div className="flex justify-center mb-6">
            <div className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                {/* Image Container */}
                <div className="relative w-32 h-32 overflow-hidden bg-white">
                  <img
                    src="https://assets.cltstatic.com/images/responsive/hp/hp-asset1.png"
                    alt="gift"
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <div className="p-2 text-center">
                  <h3 className="text-xs font-semibold text-purple-600">
                   Wrapped with Love
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Jewelry Items Grid - Mobile: 3 columns */}
          <div className="grid grid-cols-3 gap-3">
            {products.map((product) => {
               let imageUrl = 'https://via.placeholder.com/300x300?text=Jewelry';
              try {
                const images = JSON.parse(product.product_images);
                if (Array.isArray(images) && images[0]?.p_image_url) {
                  imageUrl = images[0].p_image_url;
                }
              } catch (err) {
                console.warn('Image parsing failed', err);
              }
              return (
                <div id='viewcollection_scroll'
                  key={product.product_id}
                  className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => handleClick(product)}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-md">
                    {/* Image Container */}
                    <div className="relative w-full h-24 overflow-hidden bg-white">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    </div>

                    {/* Title */}
                    <div className="p-1 text-center">
                      <h3 className="text-xs font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300 leading-tight">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Desktop/Tablet Layout: Original grid layout */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-6">
          {products.map((product) => {
             let imageUrl = 'https://via.placeholder.com/300x300?text=Jewelry';
            try {
              const images = JSON.parse(product.product_images);
              if (Array.isArray(images) && images[0]?.p_image_url) {
                imageUrl = images[0].p_image_url;
              }
            } catch (err) {
              console.warn('Image parsing failed', err);
            }
            return (
              <div
                id='viewcollection_scroll'
                key={product.product_id}
                className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => handleClick(product)}   >
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  {/* Image Container */}
                  <div className="relative w-full h-40 sm:h-48 lg:h-52 xl:h-56 overflow-hidden bg-white">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    {/* Overlay for better text visibility */}
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>

                  {/* Title */}
                  <div className="p-2 sm:p-3 text-center">
                    <h3 className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${product.isGift
                      ? 'text-purple-600'
                      : 'text-gray-800 group-hover:text-purple-600'
                      }`}>
                      {product.name}
                    </h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default JewelryCategories;
