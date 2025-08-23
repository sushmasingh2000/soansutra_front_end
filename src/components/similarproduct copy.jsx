import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const SimilarProducts = () => {
  const [showMore, setShowMore] = useState(false);

  const products = [
    {
      id: 1,
      name: "Dainty Scallop Diamond Band",
      price: "₹12,165",
      originalPrice: "₹14,300",
      discount: "15% OFF",
      image: "https://cdn.caratlane.com/media/catalog/product/J/R/JR07840-1YS300_1_lar.jpg"
    },
    {
      id: 2,
      name: "Sky Rover Gemstone Ring",
      price: "₹15,323",
      originalPrice: "₹17,977",
      discount: "15% OFF",
      image: "https://cdn.caratlane.com/media/catalog/product/J/R/JR06551-YGS300_1_lar.jpg"
    },
    {
      id: 3,
      name: "Shiny Pods Diamond Ring",
      price: "₹10,687",
      originalPrice: "₹12,587",
      discount: "15% OFF",
      image: "https://cdn.caratlane.com/media/catalog/product/J/R/JR07840-1YS300_1_lar.jpg"
    },
    {
      id: 4,
      name: "Whirl Line Diamond Ring",
      price: "₹10,458",
      originalPrice: "₹12,104",
      discount: "14% OFF",
      image: "https://cdn.caratlane.com/media/catalog/product/J/R/JR06551-YGS300_1_lar.jpg"
    },
    {
      id: 5,
      name: "Classic Band Ring",
      price: "₹8,999",
      originalPrice: "₹10,587",
      discount: "15% OFF",
      image: "https://cdn.caratlane.com/media/catalog/product/J/R/JR07840-1YS300_1_lar.jpg"
    },
    {
      id: 6,
      name: "Elegant Stone Ring",
      price: "₹13,245",
      originalPrice: "₹15,582",
      discount: "15% OFF",
      image: "https://cdn.caratlane.com/media/catalog/product/J/R/JR06551-YGS300_1_lar.jpg"
    }
  ];

  const displayedProducts = showMore ? products : products.slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Desktop View */}
      <div className="hidden md:block">
        <h2 className="text-2xl font-medium text-gray-800 text-center mb-8">Similar Products</h2>
        
        <div className="grid grid-cols-3 gap-8 mb-8">
          {displayedProducts.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <div className="relative mb-4">
                <span className="absolute top-2 left-2 bg-purple-800 text-white text-xs px-2 py-1 rounded">
                  {product.discount}
                </span>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-lg font-semibold text-gray-800">{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                </div>
                <p className="text-sm text-gray-600">{product.name}</p>
              </div>
            </div>
          ))}
        </div>

        {!showMore && (
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
            <div key={product.id} className="flex-shrink-0 w-40">
              <div className="relative mb-3">
                <span className="absolute top-2 left-2 bg-purple-800 text-white text-xs px-2 py-1 rounded z-10">
                  {product.discount}
                </span>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm font-semibold text-gray-800">{product.price}</span>
                  <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{product.name}</p>
              </div>
            </div>
          ))}
          
          {/* See More Card */}
          <div className="flex-shrink-0 w-40 h-40 flex items-center justify-center">
            <button className="flex flex-col items-center justify-center text-purple-600 hover:text-purple-700 transition-colors">
              <ArrowRight size={24} className="mb-2" />
              <span className="text-sm font-medium">SEE MORE</span>
            </button>
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