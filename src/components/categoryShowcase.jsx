
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
      title: "STACK 'N' GO RINGS",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/Banner/6-tile/01/01_d.jpg"
    },
    {
      id: 3,
      title: "DAY-TO-DAY BRACELETS",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/Banner/6-tile/01/02_d.jpg"
    },
    {
      id: 4,
      title: "SOLITAIRE EARRINGS",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/Banner/6-tile/01/03_d.jpg"
    },
    {
      id: 5,
      title: "EVERYDAY CHAINS",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/Banner/6-tile/01/04_d.jpg"
    },
    {
      id: 6,
      title: "GO-TO PENDANTS",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/Banner/6-tile/01/05_d.jpg"
    },
    {
      id: 7,
      title: "STYLE PICKS UNDER 75K",
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

  // Separate gift item and jewelry items for mobile layout
  const giftItem = categories.find(cat => cat.isGift);
  const jewelryItems = categories.filter(cat => !cat.isGift);

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
                    src={giftItem.image}
                    alt={giftItem.title}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>
                
                {/* Title */}
                <div className="p-2 text-center">
                  <h3 className="text-xs font-semibold text-purple-600">
                    {giftItem.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Jewelry Items Grid - Mobile: 3 columns */}
          <div className="grid grid-cols-3 gap-3">
            {jewelryItems.map((category) => (
              <div
                key={category.id}
                className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  {/* Image Container */}
                  <div className="relative w-full h-24 overflow-hidden bg-white">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Title */}
                  <div className="p-1 text-center">
                    <h3 className="text-xs font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300 leading-tight">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet Layout: Original grid layout */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-6">
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