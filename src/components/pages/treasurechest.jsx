import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

const Header = () => <div className="sticky top-0 bg-white p-4">Header</div>;
const NavigationBar = () => <div className="bg-gray-100 p-4">Navigation</div>;
const Footer = () => <div className="bg-gray-200 p-4">Footer</div>;

const TreasureChestBanner = () => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [showStickyFooter, setShowStickyFooter] = useState(true);
  const [isDescriptionActive, setIsDescriptionActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = Math.min(scrollTop / (documentHeight - windowHeight), 1);
      const newSliderPosition = scrollPercentage * 100;
      setSliderPosition(newSliderPosition);
      setShowStickyFooter(newSliderPosition < 90);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDragging]);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const deltaY = startY - currentY;
    const newPosition = Math.max(0, Math.min(100, sliderPosition + (deltaY / window.innerHeight) * 100));
    setSliderPosition(newPosition);
    setShowStickyFooter(newPosition < 90);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (sliderPosition > 50) {
      setSliderPosition(100);
      setShowStickyFooter(false);
    } else {
      setSliderPosition(0);
      setShowStickyFooter(true);
    }
  };

  const handleMouseStart = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentY = e.clientY;
    const deltaY = startY - currentY;
    const newPosition = Math.max(0, Math.min(100, sliderPosition + (deltaY / window.innerHeight) * 100));
    setSliderPosition(newPosition);
    setShowStickyFooter(newPosition < 90);
  };

  const handleMouseEnd = () => {
    setIsDragging(false);
    if (sliderPosition > 50) {
      setSliderPosition(100);
      setShowStickyFooter(false);
    } else {
      setSliderPosition(0);
      setShowStickyFooter(true);
    }
  };

  return (
   <>
    <div className="sticky top-0 z-50 bg-white">
        <Header />
        <NavigationBar />
      </div>
      <div className="h-90 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(at 17% 100%, hsla(240,87%,93%,1) 0px, transparent 50%),
              radial-gradient(at 1% 57%, hsla(240,100%,70%,0.57) 0px, transparent 50%),
              radial-gradient(at 93% 99%, hsla(287,100%,84%,1) 0px, transparent 50%)
            `,
          }}
        />
        <div className="fixed inset-0 z-10 pt-20">
          <div className="hidden md:block">
            <div className="container mx-auto px-40">
              <div className="flex items-start justify-between min-h-screen">
                <div className="flex-1 max-w-1xl pt-28">
                  <div className="flex items-center mb-6">
                    <img
                      src="https://cdn.caratlane.com/media/static/images/web/Treasure%20Chest/Landing%20Page/LOGOstatic.png"
                      alt="CaratLane Treasure Chest"
                      className="h-16 w-auto"
                    />
                  </div>
                  <div className="mb-3">
                    <h1 className="text-[38px] font-semibold text-[#4F3267] mb-6 leading-tight">
                      Start Saving for Jewellery,<br />
                      The Smart Way.
                    </h1>
                    <p className="text-sm text-gray-600 mb-8">
                      Pay in 9 easy instalments & get the 10th one<br />
                      free as a CaratLane discount!
                    </p>
                  </div>
                  <button
                    className="px-8 py-4 rounded-[10px] text-white font-semibold text-[12px] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    style={{
                      background: 'linear-gradient(90deg, #E56EEB -13.59%, #8863FB 111.41%)',
                    }}
                  >
                    CHOOSE YOUR PLAN & JOIN
                  </button>
                </div>
                <div className="flex-1 flex flex-col justify-start items-center relative pt-12">
                  <div className="relative mb-8">
                    <img
                      src="https://cdn.caratlane.com/media/static/images/web/Treasure%20Chest/Landing%20Page/Gold%20Ring%20with%20Diamonds.png"
                      alt="Gold Ring with Diamonds"
                      className="w-96 h-auto transform rotate-12 mb-8"
                      style={{ animation: 'rotate180 4s ease-in-out infinite', animationDirection: 'alternate' }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3 w-full max-w-2xl">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">Trust of TATA</h3>
                      <p className="text-gray-600 text-xs">Spirit of CaratLane.<br />3,00,270+ enrolments.</p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">Assured Bonus</h3>
                      <p className="text-gray-600 text-xs">Your 10th instalment is on<br />us- 100% FREE.</p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">Flexible Plan</h3>
                      <p className="text-gray-600 text-xs">Redeem at ease- online or<br />in-store.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block md:hidden">
                <div className="px-6 py-8 min-h-screen flex flex-col">
                  <div className="flex items-center mb-8 ml-20 mt-20">
                    <img
                      src="https://cdn.caratlane.com/media/static/images/web/Treasure%20Chest/Landing%20Page/LOGOstatic.png"
                      alt="CaratLane Treasure Chest"
                      className="h-12 w-auto"
                    />
                  </div>
                  <div className="flex justify-center items-center mb-8">
                    <div className="relative">
                      <img
                        src="https://cdn.caratlane.com/media/static/images/web/Treasure%20Chest/Landing%20Page/Gold%20Ring%20with%20Diamonds.png"
                        alt="Gold Ring with Diamonds"
                        className="w-40 h-auto transform rotate-12 mb-4"
                        style={{ animation: 'rotate180 4s ease-in-out infinite', animationDirection: 'alternate' }}
                      />
                    </div>
                  </div>
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                      Start Saving for Jewellery, The Smart Way.
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                      Pay in 9 easy instalments & get the 10th one free as a CaratLane discount!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {showStickyFooter && (
              <div className="fixed bottom-0 left-0 right-0 z-50 block md:hidden">
                <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-left flex-1">
                      <p className="text-gray-800 font-semibold text-sm mb-1">Start saving ₹5,000/month</p>
                      <p className="text-gray-600 text-xs">for your dream jewellery</p>
                    </div>
                    <button
                      className="ml-4 px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                      style={{ background: 'linear-gradient(90deg, #E56EEB -13.59%, #8863FB 111.41%)' }}
                      onClick={() => {
                        setSliderPosition(100);
                        setShowStickyFooter(false);
                      }}
                    >
                      CHOOSE YOUR PLAN
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="h-[200vh]"></div>
            <div
              className="fixed inset-x-0 bg-white shadow-2xl z-40 transition-transform duration-300 ease-out"
              style={{
                transform: `translateY(calc(100% - 80px + ${(sliderPosition * -1)}%))`,
                minHeight: '100vh',
                bottom: showStickyFooter ? '80px' : '0px',
                background: '#fff',
              }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseEnd}
              onMouseLeave={handleMouseEnd}
            >
              <div className="md:hidden">
                <div
                  className="w-full h-20 bg-gradient-to-r from-purple-500 to-orange-500 cursor-grab active:cursor-grabbing flex flex-col items-start justify-center shadow-lg rounded-t-3xl px-4"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseStart}
                >
                  <div className="w-12 h-1 bg-white/70 rounded-full mb-2"></div>
                  <div className="text-black font-semibold text-sm text-left">
                    {sliderPosition < 50 ? '👆 Swipe up to choose plan' : 'CHOOSE YOUR PLAN'}
                  </div>
                  {sliderPosition < 50 && (
                    <div className="text-black text-xs text-left mt-1">
                      Start saving ₹5,000/month for your dream jewellery
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden md:block">
                <div
                  className="w-full h-20 bg-gradient-to-r from-purple-500 to-orange-500 cursor-grab active:cursor-grabbing flex flex-col items-start justify-center shadow-lg rounded-t-3xl px-8"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseStart}
                >
                  <div className="w-12 h-1 bg-white/70 rounded-full mb-2"></div>
                  <div className="text-black font-semibold text-sm text-left">
                    {sliderPosition < 50 ? '👆 Swipe up to choose plan' : 'CHOOSE YOUR PLAN'}
                  </div>
                  {sliderPosition < 50 && (
                    <div className="text-black text-xs text-left mt-1">
                      Start saving ₹5,000/month for your dream jewellery
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col min-h-full justify-between">
                <div className="p-4 md:p-8 flex-1">
                  <div className="text-left mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">CHOOSE YOUR PLAN</h1>
                  </div>
                  <div className="flex justify-center mb-6">
                    <button
                      className={`px-4 py-2 mr-2 ${!isDescriptionActive ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg`}
                      onClick={() => setIsDescriptionActive(false)}
                    >
                      Plan Comparison
                    </button>
                    <button
                      className={`px-4 py-2 ${isDescriptionActive ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg`}
                      onClick={() => setIsDescriptionActive(true)}
                    >
                      Description
                    </button>
                  </div>
                  {isDescriptionActive ? (
                    <div className="max-w-6xl mx-auto">
                      <div className="bg-white rounded-3xl p-6 shadow-xl">
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold text-gray-800 mb-4">CALCULATE YOUR SAVINGS</h2>
                          <div className="text-center mb-4">
                            <input
                              type="text"
                              value="₹5,000"
                              readOnly
                              className="w-32 px-4 py-2 border rounded-lg text-center mx-auto"
                            />
                            <p className="text-sm text-gray-600 mt-2">Monthly Instalment (Multiples of ₹1,000 only)</p>
                            <div className="flex justify-center mt-4 space-x-2">
                              <button className="px-4 py-2 bg-gray-200 rounded-lg">₹2000</button>
                              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg">₹5000</button>
                              <button className="px-4 py-2 bg-gray-200 rounded-lg">₹10000</button>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row justify-center mt-6 space-y-4 md:space-y-0 md:space-x-4">
                            <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg">
                              <h3 className="text-lg font-semibold mb-2">Treasure Chest</h3>
                              <div className="flex items-center mb-2">
                                <span className="text-purple-500 mr-2">💎 ICON</span>
                              </div>
                              <p className="text-gray-700 mb-2">Your Total Instalments (9 Months)</p>
                              <p className="text-purple-500 font-semibold">₹45,000</p>
                              <p className="text-green-500 mb-2">✓ CaratLane Bonus (10th Month)</p>
                              <p className="text-purple-500 font-semibold">₹5,000</p>
                              <p className="text-red-500 mb-2">✗ Gold Value Appreciation</p>
                              <p className="text-red-500">Not Available</p>
                              <p className="mt-4 font-semibold">Total Redeemable Amount</p>
                              <p className="text-purple-500 font-semibold">₹50,000</p>
                            </div>
                            <div className="w-full md:w-2/3 bg-gray-100 p-4 rounded-lg">
                              <p className="text-gray-700">
                                With the Treasure Chest plan, you save a fixed amount of ₹5,000 every month for 9 months,
                                totaling ₹45,000, and CaratLane pays your 10th month contribution of ₹5,000. Your total
                                redeemable amount after 10 months: ₹50,000
                              </p>
                              <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Treasure Chest EDGE</h3>
                                <p className="text-gray-700">
                                  With the Treasure Chest Edge plan, your monthly contribution of ₹5,000 is invested in
                                  the gold market. Based on the simulated market performance of 5%, your investment grows
                                  to ₹55,133. CaratLane adds a bonus of ₹5,000 in the 10th month. Potential gain compared
                                  to fixed savings: +₹10,133
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-6xl mx-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-purple-100">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 text-purple-600">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                              </div>
                              <span className="text-gray-700 font-medium">Treasure Chest</span>
                            </div>
                          </div>
                          <div className="mb-8">
                            <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                              💎 ICON
                            </span>
                          </div>
                          <div className="space-y-4 mb-8">
                            <div className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 leading-relaxed">A fixed instalment for 9 months</span>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 leading-relaxed">100% assured returns on your instalment</span>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 leading-relaxed">Get the last months instalment as CaratLane discount</span>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 leading-relaxed">Buy your favourite CaratLane jewellery hassle-free</span>
                            </div>
                          </div>
                          <div className="bg-purple-50 rounded-2xl p-4 mb-6">
                            <p className="text-purple-800 font-medium text-sm">
                              <span className="font-bold">Assured Bonus</span> on redemption
                            </p>
                          </div>
                          <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            START SAVING
                          </button>
                        </div>
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-orange-100 relative overflow-hidden">
                          <div className="absolute -right-4 top-6 bg-orange-400 text-white px-8 py-1 text-xs font-bold transform rotate-12 shadow-md">
                            POPULAR
                          </div>
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 text-orange-600">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                              </div>
                              <span className="text-gray-700 font-medium">Treasure Chest</span>
                            </div>
                          </div>
                          <div className="mb-8">
                            <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                              ⭐ EDGE
                            </span>
                          </div>
                          <div className="space-y-4 mb-8">
                            <div className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 leading-relaxed">9 monthly instalments converted into grams of gold</span>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 leading-relaxed">Gold value accumulated over time with each instalment</span>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 leading-relaxed">Complete transparency ensured with real time gold rates</span>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 leading-relaxed">Enjoy CaratLane benefit— no matter how gold rates move.</span>
                            </div>
                          </div>
                          <div className="bg-orange-50 rounded-2xl p-4 mb-6">
                            <p className="text-orange-800 font-medium text-sm">
                              <span className="font-bold">Gold Value + Assured Bonus</span> on redemption
                            </p>
                          </div>
                          <button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-4 rounded-2xl font-semibold text-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            START SAVING
                          </button>
                        </div>
                      </div>
                      <div className="mt-12 text-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Trust of TATA</h3>
                            <p className="text-gray-600 text-sm">Spirit of CaratLane. 3,00,270+ enrolments.</p>
                          </div>
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Assured Bonus</h3>
                            <p className="text-gray-600 text-sm">Your 10th instalment is on us- 100% FREE.</p>
                          </div>
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Flexible Plan</h3>
                            <p className="text-gray-600 text-sm">Redeem at ease- online or in-store.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mt-auto">
                    <Footer className="p-0 m-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
   </>
      );
};

export { TreasureChestBanner };