import React from 'react';
import { ChevronRight } from 'lucide-react';

const More18KProducts = () => {
  const productImage = "https://cdn.caratlane.com/media/catalog/product/J/R/JR07840-1YS300_1_lar.jpg";
  
  const rings = [
    { id: 1, image: productImage },
    { id: 2, image: productImage },
    { id: 3, image: productImage },
    { id: 4, image: productImage },
    { id: 5, image: productImage }
  ];

  return (
    <div className="w-full max-w-9xl p-4 bg-white" mt-5>
      {/* Title */}
      <h2 className="text-[15px] md:text-xl font-medium text-gray-700 mb-2">
        More 18K Rings
      </h2>

      {/* Mobile View - Full width container */}
      <div className="md:hidden">
        <div className="bg-blue-50 rounded-2xl p-6">
          <div className="flex gap-4 items-center">
            {rings.slice(0, 3).map((ring) => (
              <div
                key={ring.id}
                className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex-shrink-0"
                style={{ width: '80px', height: '80px' }}
              >
                <img
                  src={ring.image}
                  alt="18K Ring"
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
      </div>

      {/* Desktop View - Compact container aligned left */}
      <div className="hidden md:block">
        <div className="bg-blue-50 rounded-2xl p-6 inline-block">
          <div className="flex gap-4 items-center">
            {rings.slice(0, 3).map((ring) => (
              <div
                key={ring.id}
                className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex-shrink-0"
                style={{ width: '80px', height: '80px' }}
              >
                <img
                  src={ring.image}
                  alt="18K Ring"
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
      </div>
    </div>
  );
};

export default More18KProducts;