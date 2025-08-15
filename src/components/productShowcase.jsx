import React from 'react';

const JewelryShowcase = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4 p-4 min-h-screen">
        
        {/* Left Column - First Image */}
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-100">
          <img 
            src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/06_JUNE/Banner/latest/01/LD_shaya.jpg"
            alt="Hands with rings"
            className="w-full h-full object-cover"
            onLoad={(e) => {
              console.log('Image loaded successfully');
            }}
            onError={(e) => {
              console.log('Image failed to load, trying alternative');
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f3f4f6'/%3E%3Ctext x='200' y='300' font-family='Arial, sans-serif' font-size='16' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3EImage Loading...%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        
        {/* Right Column - Two Images Stacked */}
        <div className="col-span-2 grid grid-rows-2 gap-4">
          
          {/* Top Right - Portrait with jewelry */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img 
              src="https://cdn.caratlane.com/media/static/images/V4/2025/Shaya/06-June/Responsive/20/Responsive-02.jpg"
              alt="Woman wearing jewelry"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Bottom Right - SEABORN section */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img 
              src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/Banner/Oceanic/01/banners/Desktop_1740x850_4.jpg"
              alt="Seaborn oceanic jewelry"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4 p-4">
        
        {/* First Image - Full width */}
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-100">
          <img 
            src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/06_JUNE/Banner/latest/01/LD_shaya.jpg"
            alt="Hands with rings"
            className="w-full h-auto"
            onLoad={(e) => {
              console.log('Mobile image loaded successfully');
            }}
            onError={(e) => {
              console.log('Mobile image failed to load');
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' font-family='Arial, sans-serif' font-size='16' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3EImage Loading...%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        
        {/* Second Image - SHAYA */}
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img 
            src="https://cdn.caratlane.com/media/static/images/V4/2025/Shaya/06-June/Responsive/20/Responsive-02.jpg"
            alt="Woman wearing jewelry"
            className="w-full h-auto"
          />
        </div>
        
        {/* Third Image - SEABORN */}
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img 
            src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/05_MAY/Banner/Oceanic/01/banners/Desktop_1740x850_4.jpg"
            alt="Seaborn oceanic jewelry"
            className="w-full h-auto"
          />
          
         
         
          
          
        </div>
      </div>
    </div>
  );
};

export default JewelryShowcase;