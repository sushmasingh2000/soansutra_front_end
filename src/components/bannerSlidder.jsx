import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from 'lucide-react';

// Hero Banner Component with Dynamic Content
const BannerSlidder = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://cdn.caratlane.com/media/static/images/V4/2025/CL/06_JUNE/Banner/loyalty/01/SC_desktop.jpg',
      alt: 'Diamond Jewelry Collection'
    },
    {
      id: 2,
      image: 'https://cdn.caratlane.com/media/static/images/V4/2025/CL/06_JUNE/Banner/Kids/01/SC_desktop.jpg',
      alt: 'Digital Gold Balance Offer'
    },
    {
      id: 3,
      image: 'https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/Banner/harvest/02/SC_Desktop.jpg',
      alt: 'Bundle Offer'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="w-full px-2 py-2 sm:py-3 md:py-4">
      <div className="relative w-full max-w-full mx-auto">
        {/* Main carousel container */}
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="relative w-full overflow-hidden">
            {/* Mobile view - Single slide */}
            <div className="block md:hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-auto object-contain object-center"
                      style={{ minWidth: '100%', minHeight: '100%' }}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop view - Multiple slides with reduced height */}
            <div className="hidden md:block">
              <div className="relative h-48 lg:h-52 xl:h-56 overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-in-out h-full gap-4"
                  style={{ transform: `translateX(-${currentSlide * 33.33}%)` }}
                >
                  {slides.concat(slides).map((slide, index) => (
                    <div key={`${slide.id}-${index}`} className="w-1/3 h-full flex-shrink-0 relative">
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-full object-contain object-center rounded-lg bg-gray-50"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>



            {/* Enhanced mobile touch gestures */}
            <div
              className="absolute inset-0 md:hidden z-5"
              onTouchStart={(e) => {
                const touch = e.touches[0];
                e.currentTarget.startX = touch.clientX;
              }}
              onTouchEnd={(e) => {
                const touch = e.changedTouches[0];
                const startX = e.currentTarget.startX;
                const endX = touch.clientX;
                const diff = startX - endX;

                if (Math.abs(diff) > 50) {
                  if (diff > 0) {
                    goToNext();
                  } else {
                    goToPrevious();
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Pagination dots and slide counter */}
        <div className="flex items-center justify-center mt-2 sm:mt-3">
          {/* Mobile: Center aligned indicators and counter */}
          <div className="flex md:hidden items-center justify-center w-full space-x-4">
            {/* Slide indicators */}
            <div className="flex space-x-1.5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                      ? 'bg-yellow-600 scale-125 shadow-lg'
                      : 'bg-yellow-400 hover:bg-yellow-600 hover:scale-110'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Slide counter */}
            <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
              {currentSlide + 1}/{slides.length}
            </div>
          </div>

          {/* Desktop: Center aligned indicators and counter with right aligned navigation */}
          <div className="hidden md:flex items-center justify-center w-full relative">
            {/* Center - Slide indicators and counter */}
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                        ? 'bg-yellow-600 scale-125 shadow-lg'
                        : 'bg-yellow-400 hover:bg-gray-600 hover:scale-110'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                {currentSlide + 1}/{slides.length}
              </div>
            </div>

            {/* Right side - Navigation buttons */}
            <div className="absolute right-0 flex items-center space-x-2">
              <button
                onClick={goToPrevious}
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-800 p-2 rounded-full transition-all duration-300 hover:scale-110 group shadow-lg border border-gray-200"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={goToNext}
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-800 p-2 rounded-full transition-all duration-300 hover:scale-110 group shadow-lg border border-gray-200"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlidder;