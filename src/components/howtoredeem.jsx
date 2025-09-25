
import React from 'react';

const HowToRedeem = () => {
  return (
    <div className="w-full bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-yellow-500 text-xs md:text-sm mb-2">Redeem</h2>
          <h1 className="text-lg md:text-2xl text-gray-900">
            eGold to jewellery, in a blink!
          </h1>
        </div>

        {/* Desktop View - 3 Steps in Row */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex-1 text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <div className="w-full h-full rounded-full border-2 border-yellow-300 border-dashed flex items-center justify-center bg-white">
                  <div 
                    className="w-8 h-8"
                    style={{
                      backgroundImage: 'url("/image/jewellery.png")',
                     
                    }}
                  />
                </div>
              </div>
              <h3 className="text-sm text-gray-900 mb-2">Choose your</h3>
              <h3 className="text-sm text-gray-900 mb-2">favorite jewellery</h3>
              <p className="text-gray-600">from SonaSutra</p>
            </div>

            {/* Arrow 1 */}
            <div className="flex-shrink-0 mx-8">
              <div className="w-12 h-0.5 bg-yellow-400 relative">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <div className="w-0 h-0 border-l-8 border-l-yellow-400 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <div className="w-full h-full rounded-full border-2 border-yellow-300 border-dashed flex items-center justify-center bg-white">
                  <div 
                    className="w-12 h-10"
                    style={{
                      backgroundImage: 'url("https://cdn.caratlane.com/media/static/images/V4/2024/CL/05-MAY/Others/62867401d05b4e7d92f8817d4354ae47.png")',
                      backgroundSize: '1120px 690px',
                      backgroundPosition: '-350px -150px'
                    }}
                  />
                </div>
                {/* Sparkle effects */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-yellow-400 rounded-full"></div>
                <div className="absolute top-1/2 -right-2 w-1 h-1 bg-yellow-400 rounded-full"></div>
              </div>
              <h3 className="text-sm text-gray-900 mb-2">Redeem your</h3>
              <h3 className="text-sm text-gray-900 mb-2">SonaSutra eGold at</h3>
              <p className="text-gray-600">checkout</p>
            </div>

            {/* Arrow 2 */}
            <div className="flex-shrink-0 mx-8">
              <div className="w-12 h-0.5 bg-yellow-400 relative">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <div className="w-0 h-0 border-l-8 border-l-yellow-400 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <div className="w-full h-full rounded-full border-2 border-yellow-300 border-dashed flex items-center justify-center bg-white">
                  <div 
                    className="w-12 h-8"
                    style={{
                      backgroundImage: 'url("https://cdn.caratlane.com/media/static/images/V4/2024/CL/05-MAY/Others/62867401d05b4e7d92f8817d4354ae47.png")',
                      backgroundSize: '1120px 690px',
                      backgroundPosition: '-500px -200px'
                    }}
                  />
                </div>
                <div className="absolute top-2 left-2 w-2 h-2 bg-green-400 rounded-full flex items-center justify-center">
                  <svg className="w-1 h-1 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <path d="M2.5 4L3.5 5L5.5 3"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-sm text-gray-900 mb-2">Get your jewellery</h3>
              <h3 className="text-sm text-gray-900 mb-2">delivered for free at</h3>
              <p className="text-gray-600">your doorstep</p>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-16 flex items-start justify-between max-w-4xl mx-auto">
            <div className="flex-1">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-yellow-600 text-sm">!</span>
                </div>
                <div>
                  <p className="text-gray-600 text-base leading-relaxed">
                    You can redeem SonaSutra eGold online or offline through one of our many jewellery stores across India.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 ml-16">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-yellow-100">
                <div className="text-center mb-4">
                  <div 
                    className="w-12 h-12 mx-auto mb-3"
                    style={{
                      backgroundImage: 'url("https://cdn.caratlane.com/media/static/images/V4/2024/CL/05-MAY/Others/62867401d05b4e7d92f8817d4354ae47.png")',
                      backgroundSize: '1120px 690px',
                      backgroundPosition: '-100px -50px'
                    }}
                  />
                  <h3 className="text-yellow-500 text-base">Visit Vault</h3>
                  <p className="text-gray-600 text-sm">Check your gold Balance</p>
                </div>
                <button className="w-full bg-transparent border-none text-yellow-500 flex items-center justify-center space-x-2 hover:text-yellow-600 transition-colors">
                  <span>Verify KYC</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View - Vertical Steps */}
        <div className="md:hidden">
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4">
                <div className="w-full h-full rounded-full border-2 border-yellow-300 border-dashed flex items-center justify-center bg-white">
                  <div 
                    className="w-6 h-6"
                    style={{
                      backgroundImage: 'url("https://cdn.caratlane.com/media/static/images/V4/2024/CL/05-MAY/Others/62867401d05b4e7d92f8817d4354ae47.png")',
                      backgroundSize: '560px auto',
                      backgroundPosition: '-328px -10px',
                      width: '89px',
                      height: '92px'
                    }}
                  />
                </div>
              </div>
              <h3 className="text-base text-gray-900">Choose your favorite</h3>
              <h3 className="text-base text-gray-900 mb-1">jewellery from SonaSutra</h3>
              
              {/* Arrow down */}
              <div className="flex justify-center my-6">
                <div className="w-0.5 h-12 bg-yellow-400 relative">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-t-8 border-t-yellow-400 border-l-4 border-l-transparent border-r-4 border-r-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <div className="w-full h-full rounded-full border-2 border-yellow-300 border-dashed flex items-center justify-center bg-white">
                  <div 
                    className="w-10 h-8"
                    style={{
                      backgroundImage: 'url("https://cdn.caratlane.com/media/static/images/V4/2024/CL/05-MAY/Others/62867401d05b4e7d92f8817d4354ae47.png")',
                      backgroundSize: '840px 518px',
                      backgroundPosition: '-260px -110px'
                    }}
                  />
                </div>
                {/* Sparkle effects */}
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <div className="absolute bottom-1 left-1 w-1 h-1 bg-yellow-400 rounded-full"></div>
                <div className="absolute top-1/2 -right-1 w-1 h-1 bg-yellow-400 rounded-full"></div>
              </div>
              <h3 className="text-base text-gray-900">Redeem your SonaSutra</h3>
              <h3 className="text-base text-gray-900 mb-1">eGold at checkout</h3>
              
              {/* Arrow down */}
              <div className="flex justify-center my-6">
                <div className="w-0.5 h-12 bg-yellow-400 relative">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-t-8 border-t-yellow-400 border-l-4 border-l-transparent border-r-4 border-r-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <div className="w-full h-full rounded-full border-2 border-yellow-300 border-dashed flex items-center justify-center bg-white">
                  <div 
                    className="w-10 h-6"
                    style={{
                      backgroundImage: 'url("https://cdn.caratlane.com/media/static/images/V4/2024/CL/05-MAY/Others/62867401d05b4e7d92f8817d4354ae47.png")',
                      backgroundSize: '840px 518px',
                      backgroundPosition: '-380px -150px'
                    }}
                  />
                </div>
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-green-400 rounded-full flex items-center justify-center">
                  <svg className="w-1 h-1 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <path d="M2.5 4L3.5 5L5.5 3"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-base text-gray-900">Get your jewellery</h3>
              <h3 className="text-base text-gray-900 mb-1">delivered for free at your</h3>
              <h3 className="text-base text-gray-900">doorstep</h3>
            </div>
          </div>

          {/* Info Section Mobile */}
          <div className="mt-12">
            <div className="flex items-start space-x-3 mb-6">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-600 text-xs">!</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                You can redeem SonaSutra eGold online or offline through one of our many jewellery stores across India.
              </p>
            </div>

            {/* Vault Card Mobile */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 flex-shrink-0"
                  style={{
                    backgroundImage: 'url("https://cdn.caratlane.com/media/static/images/V4/2024/CL/05-MAY/Others/62867401d05b4e7d92f8817d4354ae47.png")',
                    backgroundSize: '840px 518px',
                    backgroundPosition: '-75px -40px'
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-yellow-500 text-sm">Visit Vault</h3>
                  <p className="text-gray-600 text-sm">Check your gold Balance</p>
                </div>
              </div>
              <button className="w-full mt-3 bg-transparent border-none text-yellow-500 flex items-center justify-center space-x-2 hover:text-yellow-600 transition-colors">
                <span>Verify KYC</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Action Button (Mobile) */}
        <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-yellow-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-yellow-700 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8m-4-4v8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HowToRedeem;
