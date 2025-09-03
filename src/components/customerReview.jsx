import React from 'react';
import { Star } from 'lucide-react';

const CustomerReviewSection = () => {
  const reviewHighlights = [
    { label: 'Design', count: 107 },
    { label: 'Size/fit', count: 58 },
    { label: 'Quality', count: 68 },
    { label: 'Delivery', count: 39 },
    { label: 'Packaging', count: 62 },
    { label: 'Customer service', count: 82 },
    { label: 'Overall experience', count: 71 },
    { label: 'Others', count: 9 }
  ];

  const customerImages = [
    'https://cl-cdn-images.s3.ap-south-1.amazonaws.com/review/production/default/product-UE06254-1R0000-696e5f1706287529.jpg',
    'https://cl-cdn-images.s3.ap-south-1.amazonaws.com/review/production/default/product-UE06254-1R0000-464f331684296675.jpg'
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column - Customer Reviews */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
              
              {/* Rating Display */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-800">4.9/5</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-6">Based on 129 Ratings & Reviews</p>
              
              {/* Write Review Button */}
              <button className="w-full sm:w-auto bg-purple-400 hover:bg-purple-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                WRITE A REVIEW
              </button>
            </div>
          </div>
        </div>

        {/* Middle Column - What Customers Liked */}
        <div className="lg:col-span-1">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">What Customers Liked</h3>
            <p className="text-gray-600 text-sm mb-4">Review Highlights</p>
            
            {/* Review Tags */}
            <div className="flex flex-wrap gap-2">
              {reviewHighlights.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors duration-200 cursor-pointer"
                >
                  {item.label} ({item.count})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Customer Images */}
        <div className="lg:col-span-1">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Images by Customers(7)
            </h3>
            
            {/* Customer Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
              {customerImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Customer review ${index + 1}`}
                    className="w-full h-24 sm:h-28 lg:h-32 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  />
                </div>
              ))}
              
              {/* More Images Indicator */}
              <div className="relative group cursor-pointer">
                <div className="w-full h-24 sm:h-28 lg:h-32 bg-gray-800 bg-opacity-80 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  <span className="text-white font-semibold text-lg">+4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      

      {/* Lower Section - Individual Reviews and Pagination */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white mt-6">
        {/* Individual Reviews Section */}
        <div className="border-t border-gray-200 pt-6">
        <p className="text-gray-600 text-sm mb-6">
          Customer Reviews : Showing 1 - 2 out of 129
        </p>
        
        {/* Review 1 */}
        <div className="mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600 text-sm font-medium">Dr</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-800">Dr</span>
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  VERIFIED PURCHASE
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-800">5/5</span>
                <span className="text-xs text-gray-500">22 Jul '24</span>
              </div>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="inline-flex items-center gap-1 text-xs text-green-600 mb-3">
              <div className="w-3 h-3 bg-green-100 rounded flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              </div>
              Positives
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {['DESIGN', 'SIZE/FIT', 'DELIVERY', 'PACKAGING', 'OTHERS'].map((tag) => (
                <span key={tag} className="bg-purple-100 text-purple-700 text-xs px-2.5 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
            I bought them for my niece she loved it... I have been buying from SonaSutra 
            since a long time ans i impressed with their customer service I love their 
            be... <span className="text-purple-500 cursor-pointer hover:text-purple-600">Read More</span>
          </p>
          
          <div className="flex gap-2">
            <img src={customerImages[0]} alt="Review image 1" className="w-16 h-16 object-cover rounded-lg" />
            <img src={customerImages[1]} alt="Review image 2" className="w-16 h-16 object-cover rounded-lg" />
          </div>
        </div>

        {/* Review 2 */}
        <div className="mb-8 pb-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600 text-sm font-medium">S</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-800">Sweta</span>
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  VERIFIED PURCHASE
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-800">5/5</span>
                <span className="text-xs text-gray-500">11 Apr '23</span>
              </div>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="inline-flex items-center gap-1 text-xs text-green-600 mb-3">
              <div className="w-3 h-3 bg-green-100 rounded flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              </div>
              Positives
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {['DESIGN', 'SIZE/FIT', 'QUALITY', 'DELIVERY', 'PACKAGING', 'CUSTOMER SERVICE', 'OVERALL EXPERIENCE'].map((tag) => (
                <span key={tag} className="bg-purple-100 text-purple-700 text-xs px-2.5 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
            this earrings are very good ,not disappointing very satisfied with this earrings 
            they are very beautiful and looks very unique thankyou SonaSutra for this ... 
            <span className="text-purple-500 cursor-pointer hover:text-purple-600">Read More</span>
          </p>
          
          <div className="flex gap-2">
            <img src={customerImages[0]} alt="Review image 1" className="w-16 h-16 object-cover rounded-lg" />
            <img src={customerImages[1]} alt="Review image 2" className="w-16 h-16 object-cover rounded-lg" />
            <img src={customerImages[0]} alt="Review image 3" className="w-16 h-16 object-cover rounded-lg" />
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
              FIRST
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
              &lt;
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm bg-purple-200 text-purple-800 border border-purple-300 rounded-lg">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
              &gt;
            </button>
            <button className="px-3 py-2 text-sm border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
              LAST
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default CustomerReviewSection;