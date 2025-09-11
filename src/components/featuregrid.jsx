import React from 'react';
import { Settings, Clock, RefreshCw, Calendar, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesComponent = () => {
  return (
    <div className="max-w-4xl mx-auto p-2 space-y-3">
      {/* Features Grid */}
      <div className="grid grid-cols-4 gap-2">
        {/* 100% Certified */}
        <div className="flex flex-col items-center text-center space-y-1">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Settings className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800">100%</div>
            <div className="text-xs text-gray-600">Certified</div>
          </div>
        </div>

        {/* 15 Day Money-Back */}
        <div className="flex flex-col items-center text-center space-y-1">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800">15 Day</div>
            <div className="text-xs text-gray-600">Money-Back</div>
          </div>
        </div>

        {/* Lifetime Exchange */}
        <div className="flex flex-col items-center text-center space-y-1">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <RefreshCw className="w-4 h-4 text-yellow-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800">Lifetime</div>
            <div className="text-xs text-gray-600">Exchange</div>
          </div>
        </div>

        {/* One Year Warranty */}
        <div className="flex flex-col items-center text-center space-y-1">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800">One Year</div>
            <div className="text-xs text-gray-600">Warranty</div>
          </div>
        </div>
      </div>

      {/* Points Banner */}
      <div className="relative bg-gradient-to-r from-yellow-200 via-purple-200 to-purple-300 rounded-lg p-3 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-800 mb-1">
              Earn 2207 xClusive points with this order
            </div>
            <div className="text-xs text-gray-600">
              (1 xClusive point = ₹1)
            </div>
          </div>
          <div className="ml-3 flex-shrink-0">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <Coins className="w-5 h-5 text-yellow-800" />
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-2 right-16 w-2 h-2 bg-white rounded-full opacity-30"></div>
        <div className="absolute bottom-4 right-20 w-1 h-1 bg-white rounded-full opacity-40"></div>
        <div className="absolute top-6 left-4 w-1.5 h-1.5 bg-white rounded-full opacity-25"></div>
      </div>

      {/* Terms & Policies Link */}
      <div className="text-center">
        <span className="text-xs text-gray-600">
          Learn more on about our{' '}
          <Link to={"/terms-and-conditions"} className="text-yellow-500 font-medium cursor-pointer hover:text-yellow-600 transition-colors">
            TERMS & POLICIES
          </Link>
        </span>
      </div>
    </div>
  );
};

export default FeaturesComponent;