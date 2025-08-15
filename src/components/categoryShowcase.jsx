import React from 'react';

const JewelryCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Wrapped with Love",
      image: "https://assets.cltstatic.com/images/responsive/hp/hp-asset1.png",
      isGift: true
    },
    {
      id: 2,
      title: "LATEST RINGS",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/Banner/6-tile/01/01_d.jpg"
    },
    {
      id: 3,
      title: "TRENDY BRACELETS",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/Banner/6-tile/01/02_d.jpg"
    },
    {
      id: 4,
      title: "MUST-HAVE EARRINGS",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/Banner/6-tile/01/03_d.jpg"
    },
    {
      id: 5,
      title: "ALL-DAY CHAINS",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/Banner/6-tile/01/04_d.jpg"
    },
    {
      id: 6,
      title: "ON-TREND NECKLACES",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/Banner/6-tile/01/05_d.jpg"
    },
    {
      id: 7,
      title: "UNDER ₹30K STYLES",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/Banner/6-tile/01/06_d.jpg"
    }
  ];

  const handleImageError = (e) => {
    // Create a colored placeholder div instead of another image
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

  return (
    <div className="w-full p-2 sm:p-4 lg:p-6">
      {/* Main container with full width and custom background */}
      <div 
        className="w-full p-4 sm:p-6 lg:p-8 rounded-2xl"
        style={{ backgroundColor: 'rgb(246, 243, 249)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                {/* Image Container */}
                <div className="relative w-full h-40 sm:h-48 lg:h-52 xl:h-56 overflow-hidden bg-white">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={handleImageError}
                    loading="lazy"
                  />
                  {/* Overlay for better text visibility */}
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                
                {/* Title */}
                <div className="p-2 sm:p-3 text-center">
                  <h3 className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                    category.isGift 
                      ? 'text-purple-600' 
                      : 'text-gray-800 group-hover:text-purple-600'
                  }`}>
                    {category.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JewelryCategories;