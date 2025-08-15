import React from 'react';

export default function JewelryPromoCard() {
  return (
    <div className="h-86 flex items-center justify-center p-4 mb-5" style={{ backgroundColor: '#ebebff' }}>
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center py-6 px-6">
          <h2 className="text-gray-600 text-lg font-medium mb-2">Exclusive deals</h2>
          <h1 className="text-gray-800 text-2xl font-semibold">Curated only for you</h1>
        </div>
        
        {/* Jewelry Image Section */}
        <div className="flex justify-center px-6 mb-2">
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://i.ibb.co/nq2DBcGy/JE11177-1-YS300-1-lar.jpg" 
                alt="Gold Jewelry"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Design Count Badge */}
            <div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-gray-700 whitespace-nowrap"
              style={{ backgroundColor: '#dcd2fe' }}
            >
              3888+ Designs
            </div>
          </div>
        </div>
        
        {/* Discount Button */}
        <div className="px-6 pt-4 flex justify-center">
          <button 
            className="px-8 py-3 mb-0.5 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{ backgroundColor: '#4f3267' }}
          >
            Up to 20% off on MRP
          </button>
        </div>
      </div>
    </div>
  );
}