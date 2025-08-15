import React from 'react';

const CheckoutHeader = () => {
  return (
    <div className="w-full" style={{ backgroundColor: 'rgb(246, 243, 249)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Left side - Back button and Address */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
              <i className="fas fa-arrow-left text-gray-700 text-lg"></i>
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              Address
            </h1>
          </div>
          
          {/* Right side - Security badge */}
          <div className="flex items-center space-x-2 bg-white/60 px-3 py-2 rounded-full">
            <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
              <i className="fas fa-check text-white text-xs"></i>
            </div>
            <span className="text-sm font-medium text-gray-800 hidden sm:inline">
              100% SECURE
            </span>
            <span className="text-sm font-medium text-gray-800 sm:hidden">
              SECURE
            </span>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="pb-6">
          <div className="flex items-center justify-center space-x-2 sm:space-x-8">
            {/* Address Step - Active */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">1</span>
              </div>
              <span className="text-sm font-medium text-purple-600 hidden sm:inline">
                Address
              </span>
            </div>
            
            {/* Progress Line */}
            <div className="w-12 sm:w-20 h-0.5 bg-purple-600"></div>
            
            {/* Payment Step - Inactive */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">2</span>
              </div>
              <span className="text-sm font-medium text-gray-500 hidden sm:inline">
                Payment
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Font Awesome CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
    </div>
  );
};

export default CheckoutHeader;