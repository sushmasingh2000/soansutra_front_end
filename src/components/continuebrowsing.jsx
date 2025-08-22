import React from 'react';
import { ChevronRight } from 'lucide-react';

const ContinueBrowsing = () => {
  const productImage = "https://cdn.caratlane.com/media/catalog/product/J/R/JR07840-1YS300_1_lar.jpg";
  
  const categories = [
    {
      title: "Latest Earrings Designs",
      bgColor: "bg-orange-50",
      textColor: "text-gray-700",
      products: [
        { id: 1, image: productImage },
        { id: 2, image: productImage },
        { id: 3, image: productImage },
        { id: 4, image: productImage },
        { id: 5, image: productImage }
      ]
    },
    {
      title: "22kt Gold Chains",
      bgColor: "bg-pink-50",
      textColor: "text-gray-700",
      products: [
        { id: 6, image: productImage },
        { id: 7, image: productImage },
        { id: 8, image: productImage },
        { id: 9, image: productImage },
        { id: 10, image: productImage }
      ]
    },
    {
      title: "CaratLane Offer: Flat 30% Off On Diamond...",
      bgColor: "bg-blue-50",
      textColor: "text-gray-700",
      products: [
        { id: 11, image: productImage },
        { id: 12, image: productImage },
        { id: 13, image: productImage },
        { id: 14, image: productImage },
        { id: 15, image: productImage }
      ]
    }
  ];

  return (
    <div className="w-full max-w-9xl mx-auto p-4 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-1xl md:text-2xl font-medium text-gray-700 mb-6">
          Continue Browsing
        </h1>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden lg:flex gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`flex-1 ${category.bgColor} rounded-2xl p-4 relative`}
          >
            {/* Category Title */}
            <h3 className={`${category.textColor} text-[14px] font-medium mb-6`}>
              {category.title}
            </h3>
            
            {/* Products Grid */}
            <div className="flex gap-3 items-center">
              {category.products.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex-shrink-0"
                  style={{ width: '80px', height: '80px' }}
                >
                  <img
                    src={product.image}
                    alt="Jewelry product"
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
        ))}
      </div>

      {/* Mobile Layout - Vertical Stack */}
      <div className="lg:hidden space-y-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${category.bgColor} rounded-2xl p-6 relative`}
          >
            {/* Category Title */}
            <h3 className={`${category.textColor} text-[14px] font-medium mb-6`}>
              {category.title}
            </h3>
            
            {/* Products Horizontal Scroll */}
            <div className="flex gap-3 items-center overflow-x-auto scrollbar-hide">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex-shrink-0"
                  style={{ width: '80px', height: '80px' }}
                >
                  <img
                    src={product.image}
                    alt="Jewelry product"
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
        ))}
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