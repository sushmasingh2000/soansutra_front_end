import React from 'react';

const SonasutraCollections = () => {
  const collections = [
    {
      id: 1,
      name: "Ombre",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/others/collection/ombre_m.jpg"
    },
    {
      id: 2,
      name: "Eternity",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/others/collection/eternity_m.jpg"
    },
    {
      id: 3,
      name: "Luna",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/others/collection/luna_d.jpg"
    },
    {
      id: 4,
      name: "Adaa",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/others/collection/01/adaa_d.jpg"
    },
    {
      id: 5,
      name: "Butterfly",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/others/collection/butterfly_d.jpg"
    },
    {
      id: 6,
      name: "Aaranya",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/04_APR/others/collection/aaranya_d.jpg"
    }
  ];

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
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-auto object-contain bg-white"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x320/6B46C1/FFFFFF?text=${collection.name}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Horizontal Scroll */}
        <div className="hidden md:block">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4 min-w-max px-2">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="flex-shrink-0 w-80 lg:w-96 group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-auto object-contain bg-white"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x320/6B46C1/FFFFFF?text=${collection.name}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
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