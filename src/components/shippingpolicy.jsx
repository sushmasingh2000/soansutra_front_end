import React from 'react';
import Header from './Header1';
import Footer from './Footer1';
import NavigationBar from './navigationbar';

const ShippingPolicy = () => {
  return (
    <>
    <Header/>
      <div className="hidden lg:block">
         <NavigationBar />
       </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
        Shipping Policy
      </h1>
      
      {/* Introduction Text */}
      <p className="text-sm sm:text-base text-gray-700 mb-8 sm:mb-12 leading-relaxed">
        We offer FREE shipping on every order only within India. Your order will be shipped to you fully insured. 
        We urge all customers to inspect the package for any damage or tamper before receiving or signing for receipt.
      </p>
      
      {/* Indian Customers Section */}
      <div className="mb-12 sm:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 xl:gap-12">
          {/* Text Content */}
          <div className="flex-1 mb-8 lg:mb-0">
            <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              For our Indian customers, after your item has been packaged, it will be shipped and delivered free 
              via one of the following carriers.
            </p>
          </div>
          
          {/* Carrier Logos - Indian */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 lg:gap-6">
              {/* Sequel */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-full max-w-[180px] h-20 sm:h-16 lg:h-20 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow duration-200">
                  <img
                    src="https://stageimages.cltstatic.com/stage-images/9312f0c9f2ec46479802230d1e8df856.png"
                    alt="Sequel Logistics"
                    className="max-h-12 sm:max-h-10 lg:max-h-12 w-auto object-contain"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">Sequel</span>
              </div>
              
              {/* Speed Post */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-full max-w-[180px] h-20 sm:h-16 lg:h-20 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow duration-200">
                  <img
                    src="https://stageimages.cltstatic.com/stage-images/08323cb0a6af44ac9ac041cb3dadc02c.png"
                    alt="India Post Speed Post"
                    className="max-h-12 sm:max-h-10 lg:max-h-12 w-auto object-contain"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">Speed Post</span>
              </div>
              
              {/* Blue Dart */}
              <div className="flex flex-col items-center text-center group sm:col-span-1 sm:mx-auto lg:col-span-1 lg:mx-0">
                <div className="w-full max-w-[180px] h-20 sm:h-16 lg:h-20 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow duration-200">
                  <img
                    src="https://stageimages.cltstatic.com/stage-images/2bf2428dd30748c8953eb5cbe1bb7784.png"
                    alt="Blue Dart"
                    className="max-h-12 sm:max-h-10 lg:max-h-12 w-auto object-contain"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">Blue Dart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* International Customers Section */}
      <div className="mb-12 sm:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 xl:gap-12">
          {/* Text Content */}
          <div className="flex-1 mb-8 lg:mb-0">
            <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
              For our International customers, after your item has been packaged, it will be shipped and delivered 
              via the following carrier.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              The shipping charges for our international customers are charged at the time of order booking.
            </p>
          </div>
          
          {/* UPS Logo - International */}
          <div className="flex-1">
            <div className="flex justify-center lg:justify-start">
              <div className="flex flex-col items-center text-center group">
                <div className="w-full max-w-[200px] h-24 sm:h-20 lg:h-24 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow duration-200">
                  <img
                    src="https://stageimages.cltstatic.com/stage-images/e2b681629b5d4f2ebd9fa7a448922327.png"
                    alt="UPS"
                    className="max-h-16 sm:max-h-12 lg:max-h-16 w-auto object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600 mt-3 font-medium">UPS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Free Gift Packaging Section */}
      <div className="border-t border-gray-200 pt-8 sm:pt-12">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
          Free Gift Packaging Test
        </h2>
        
        <div className="space-y-6 sm:space-y-8">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            In case your purchase is intended as a gift, we offer free gift packing at just $ 1000 charges, along with a gift message of your choice. 
            Your gift will be delivered in distinctive SonaSutra gift packing. So whether you order a gift to give to your loved ones personally, 
            or want us to deliver it, the recipient is sure to be impressed.
          </p>
          
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            To send a free gift message with your gift, look for the Gift message text box in the shopping bag/cart page. 
            Your personal message will be printed on a distinctive card and delivered along with the gift.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default ShippingPolicy;