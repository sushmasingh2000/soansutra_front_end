import React from 'react';

const ServiceShowcase = () => {
  return (
    <div className="min-h-screen bg-gray-50 mt-5 mb-5">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4 p-4 min-h-screen">
        
        {/* Left Column - First Video */}
        {/* Left Column - First Video */}
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-100 flex items-center justify-center">
          <video 
            src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/06_JUNE/Banner/treasure_chest/01/3way_desktop.mp4"
            className="w-full h-auto max-h-full object-contain"
            autoPlay
            muted
            loop
            playsInline
           
            onLoadStart={() => {
              console.log('Video loading started');
            }}
            onCanPlay={() => {
              console.log('Video can start playing');
            }}
            onError={(e) => {
              console.log('Video failed to load, showing fallback');
              // Hide video and show fallback
              e.target.style.display = 'none';
              const fallback = e.target.nextElementSibling;
              if (fallback) fallback.style.display = 'block';
            }}
          />
          {/* Fallback image */}
          <div 
            className="absolute inset-0 flex items-center justify-center bg-gray-200"
            style={{ display: 'none' }}
          >
            <div className="text-center">
              <div className="text-gray-600 mb-2">Video Preview</div>
              <div className="text-sm text-gray-500">Hands with rings showcase</div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Two Images Stacked */}
        <div className="col-span-2 grid grid-rows-2 gap-4">
          
          {/* Top Right - Portrait with jewelry */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img 
              src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/Banner/Runway/01/Static/Desktop_1740x850.jpg"
              alt="Woman wearing jewelry"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Bottom Right - SEABORN section */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img 
              src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/06_JUNE/Banner/22kt/02/Desktop_1740x850.jpg"
              alt="Seaborn oceanic jewelry"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4 p-4">
        
        {/* First Video - Full width */}
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-100">
          <video 
            src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/06_JUNE/Banner/treasure_chest/01/3way_desktop.mp4"
            className="w-full h-auto object-contain"
            autoPlay
            muted
            loop
            playsInline
            onLoadStart={() => {
              console.log('Mobile video loading started');
            }}
            onCanPlay={() => {
              console.log('Mobile video can start playing');
            }}
            onError={(e) => {
              console.log('Mobile video failed to load');
              // Hide video and show fallback
              e.target.style.display = 'none';
              const fallback = e.target.nextElementSibling;
              if (fallback) fallback.style.display = 'block';
            }}
          />
          {/* Fallback for mobile */}
          <div 
            className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-lg"
            style={{ display: 'none' }}
          >
            <div className="text-center">
              <div className="text-gray-600 mb-2">Video Preview</div>
              <div className="text-sm text-gray-500">Hands with rings showcase</div>
            </div>
          </div>
        </div>
        
        {/* Second Image - SHAYA */}
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img 
            src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/Banner/Runway/01/Static/Desktop_1740x850.jpg"
            alt="Woman wearing jewelry"
            className="w-full h-auto"
          />
        </div>
        
        {/* Third Image - SEABORN */}
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img 
            src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/06_JUNE/Banner/22kt/02/Desktop_1740x850.jpg"
            alt="Seaborn oceanic jewelry"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceShowcase;