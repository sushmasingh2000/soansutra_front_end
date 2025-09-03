import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';

// Hero Banner Component with Dynamic Content
const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, loading } = useQuery(
    ["banner_data"],
    () =>
      apiConnectorGet(endpoint?.get_banner),
    usequeryBoolean
  );

  const slides = data?.data?.result || [];

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
            {/* Slides container */}
            <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {
                loading
                  ? Array.from({ length: 6 }).map((_, index) => (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div key={index} className="w-full h-full flex-shrink-0 relative">
                        <img
                          className="w-full h-auto object-contain object-center"
                          style={{ minWidth: '100%', minHeight: '100%' }}
                        />
                      </div>
                    </div>
                  ))
                  : slides.map((slide, index) => (
                    <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
                      <img
                        src={slide.ban_image}
                        alt={slide.alt}
                        className="w-full h-auto object-contain object-center"
                        style={{ minWidth: '100%', minHeight: '100%' }}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="hidden min-[500px]:block absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-800 p-1.5 sm:p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 group z-10 shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={goToNext}
              className="hidden min-[500px]:block absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-800 p-1.5 sm:p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 group z-10 shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
            </button>

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
        <div className="flex items-center justify-center mt-2 sm:mt-3 space-x-4">
          {/* Slide indicators */}
          <div className="flex space-x-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                  ? 'bg-purple-600 scale-125 shadow-lg'
                  : 'bg-gray-400 hover:bg-gray-600 hover:scale-110'
                  }`}
                // aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
            {currentSlide + 1}/{slides.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;