import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useQuery } from 'react-query';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';

const SimilarProducts = ({ productData }) => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const { data } = useQuery(
    ['similar_items', productData.product_id],
    () =>
      apiConnectorGet(`${endpoint.similar_items}?product_id=${productData.product_id}`),
    usequeryBoolean
  );

  const products = data?.data?.result || [];

  const displayedProducts = showMore ? products : products.slice(0, 3);

  // Extract first image URL safely
  const getFirstImageUrl = (images) => {
    if (!images || images.length === 0) return '';
    return images[0]?.p_image_url || '';
  };

  const handleClick = (product) => {
    window.scrollTo(0, 0);
    navigate('/productdetails', { state: { product } });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Desktop View */}
      <div className="hidden md:block">
        <h2 className="text-2xl font-medium text-gray-800 text-center mb-8">Similar Products</h2>

        <div className="grid grid-cols-3 gap-8 mb-8">
          {displayedProducts.map((product) => (
            <div
              key={product.product_id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleClick(product)}
            >
              <div className="relative mb-4 w-full">
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-purple-800 text-white text-xs px-2 py-1 rounded z-10">
                    {product.discount}
                  </span>
                )}
                <img
                  src={getFirstImageUrl(product.product_images)}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-lg font-semibold text-gray-800">
                    ₹{parseFloat(product.price).toLocaleString()}
                  </span>
                  {/* If originalPrice exists and is different from price */}
                  {product.originalPrice && product.originalPrice !== product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{parseFloat(product.originalPrice).toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{product.name}</p>
              </div>
            </div>
          ))}
        </div>

        {!showMore && products.length > 3 && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowMore(true)}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <ChevronDown size={16} />
              SHOW MORE
            </button>
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <h2 className="text-xl font-medium text-gray-800 mb-6">Similar Products</h2>

        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.product_id}
              className="flex-shrink-0 w-40 cursor-pointer"
              onClick={() => handleClick(product)}
            >
              <div className="relative mb-3">
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-purple-800 text-white text-xs px-2 py-1 rounded z-10">
                    {product.discount}
                  </span>
                )}
                <img
                  src={getFirstImageUrl(product.product_images)}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm font-semibold text-gray-800">
                    ₹{parseFloat(product.price).toLocaleString()}
                  </span>
                  {product.originalPrice && product.originalPrice !== product.price && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{parseFloat(product.originalPrice).toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{product.name}</p>
              </div>
            </div>
          ))}

          {/* See More Card */}
          {products.length > 3 && (
            <div className="flex-shrink-0 w-40 h-40 flex items-center justify-center">
              <button
                onClick={() => setShowMore(true)}
                className="flex flex-col items-center justify-center text-purple-600 hover:text-purple-700 transition-colors"
              >
                <ArrowRight size={24} className="mb-2" />
                <span className="text-sm font-medium">SEE MORE</span>
              </button>
            </div>
          )}
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SimilarProducts;
