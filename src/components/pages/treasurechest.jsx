

import React, { useState, useEffect } from 'react';
import Header from '../Header1';
import NavigationBar from '../navigationbar';
import Footer from '../Footer1';
import { Check } from 'lucide-react';
import TreasureChestFaqToggleComponent from '../faqtreasurechest';

export default function TreasureChestBanner() {
  const [sliderPosition, setSliderPosition] = useState(0); // 0 = closed, 100 = fully open
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [showStickyFooter, setShowStickyFooter] = useState(true);
  const [activeTab, setActiveTab] = useState('comparison'); // 'comparison' or 'description'
  const [selectedAmount, setSelectedAmount] = useState(5000);
  const [amountError, setAmountError] = useState('');
  const [growthPercent, setGrowthPercent] = useState(0);

  // Add scroll listener to sync slider with page scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return; // Don't update position while dragging

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll percentage
      const scrollPercentage = Math.min(scrollTop / (documentHeight - windowHeight), 1);

      // Convert scroll percentage to slider position (0-100)
      const newSliderPosition = scrollPercentage * 100;
      setSliderPosition(newSliderPosition);

      // Show sticky footer when slider is not fully open
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
    const newPosition = Math.max(0, Math.min(100, sliderPosition + (deltaY / (window.innerHeight * 2)) * 100));

    setSliderPosition(newPosition);
    setShowStickyFooter(newPosition < 90);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (sliderPosition > 30) {
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
    const newPosition = Math.max(0, Math.min(100, sliderPosition + (deltaY / (window.innerHeight * 2)) * 100));

    setSliderPosition(newPosition);
    setShowStickyFooter(newPosition < 90);
  };

  const handleMouseEnd = () => {
    setIsDragging(false);

    if (sliderPosition > 30) {
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
        {/* <NavigationBar /> */}
      </div>
      <div className="h-90 relative overflow-hidden">
        {/* Background with custom gradient - only when slider is not fully open */}
        {sliderPosition < 100 && (
          <div
            className="absolute inset-0  bg-[radial-gradient(at_17%_100%,hsla(50,100%,70%,1)_0px,transparent_50%),radial-gradient(at_1%_57%,hsla(40,100%,50%,0.57)_0px,transparent_50%),radial-gradient(at_93%_99%,hsla(0,100%,70%,1)_0px,transparent_50%)]"

          />
        )}

        {/* Content Container - only show when slider is not fully open */}
        {sliderPosition < 100 && (
          <div className="fixed inset-0 z-10 pt-20  bg-[radial-gradient(at_17%_100%,hsla(50,100%,70%,1)_0px,transparent_50%),radial-gradient(at_1%_57%,hsla(40,100%,50%,0.57)_0px,transparent_50%),radial-gradient(at_93%_99%,hsla(0,100%,70%,1)_0px,transparent_50%)]"

          >
            {/* Desktop Version */}
            <div className="hidden md:block">
              <div className="container mx-auto px-40">
                <div className="flex items-start justify-between min-h-screen">
                  {/* Left Content */}
                  <div className="flex-1 max-w-1xl pt-28">
                    <div className="flex items-center mb-6">
                      <img
                        src="https://cdn.caratlane.com/media/static/images/web/Treasure%20Chest/Landing%20Page/LOGOstatic.png"
                        alt="CaratLane Treasure Chest"
                        className="h-16 w-auto"
                      />
                    </div>
                    <div className="mb-3">
                      <h1 className="text-[38px] font-semibold text-black mb-6 leading-tight">
                        Start Saving for Jewellery,<br />
                        The Smart Way.
                      </h1>
                      <p className="text-sm text-gray-600 mb-8">
                        Pay in 9 easy instalments & get the 10th one<br />
                        free as a CaratLane discount!
                      </p>
                    </div>
                    <button
                      className="px-8 py-4 rounded-[10px] text-black font-semibold text-[12px] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-yellow-400 to-yellow-600"

                    >
                      CHOOSE YOUR PLAN & JOIN
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col justify-start items-center relative pt-12">
                    <div className="relative mb-8">
                      <img
                        src="data:image/webp;base64,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"
                        alt="Gold Ring with Diamonds"
                        className="w-96 h-auto transform rotate-12 mb-8"
                        style={{
                          animation: 'rotate180 4s ease-in-out infinite',
                          animationDirection: 'alternate'
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3 w-full max-w-2xl">
                      <div className="bg-yellow-100 backdrop-blur-sm rounded-2xl p-4 text-center">
                        <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-red-800 mb-1 text-sm">Trust of TATA</h3>
                        <p className="text-gray-600 text-xs">Spirit of CaratLane.<br />3,00,270+ enrolments.</p>
                      </div>
                      <div className="bg-yellow-100 backdrop-blur-sm rounded-2xl p-4 text-center">
                        <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-red-800 mb-1 text-sm">Assured Bonus</h3>
                        <p className="text-gray-600 text-xs">Your 10th instalment is on<br />us- 100% FREE.</p>
                      </div>
                      <div className="bg-yellow-100 backdrop-blur-sm rounded-2xl p-4 text-center">
                        <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-red-800 mb-1 text-sm">Flexible Plan</h3>
                        <p className="text-gray-600 text-xs">Redeem at ease- online or<br />in-store.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Version */}
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
                      src="data:image/webp;base64,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"
                      alt="Gold Ring with Diamonds"
                      className="w-40 h-auto transform rotate-12 mb-4"
                      style={{
                        animation: 'rotate180 4s ease-in-out infinite',
                        animationDirection: 'alternate'
                      }}
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
        )}
<div>
        {/* Mobile Sticky Footer */}
        {showStickyFooter && (
          <div className="fixed bottom-0 left-0 right-0 z-50 block md:hidden">
            <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="text-left flex-1">
                  <p className="text-gray-800 font-semibold text-xs py-[-10]">Start saving ₹5,000/month</p>
                  <p className="text-yellow-600 text-xs">for your dream jewellery</p>
                </div>
                <button
                  className="ml-4 px-6 py-3 rounded-[10px] bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                 
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

        {/* Scrollable spacer to enable scroll */}
        <div className="h-[200vh]"></div>

        {/* Custom CSS for rotation animation */}
        <style jsx>{`
          @keyframes rotate180 {
            0% {
              transform: rotate(12deg);
            }
            100% {
              transform: rotate(192deg);
            }
          }
        `}</style>

        {/* Bottom Slider */}
        <div
          className="fixed inset-x-0 shadow-2xl z-40 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(calc(100% - 80px + ${(sliderPosition * -1)}%))`,
            minHeight: '100vh',
            bottom: showStickyFooter ? '55px' : '0px',
            background: `
                  radial-gradient(at 17% 100%, hsla(240,87%,93%,1) 0px, transparent 50%),
                  radial-gradient(at 1% 57%, hsla(240,100%,70%,0.57) 0px, transparent 50%),
                  radial-gradient(at 93% 99%, hsla(287,100%,84%,1) 0px, transparent 50%)
                `
          }}
        >



          {/* Main content area */}
          <div
            className="flex flex-col min-h-full justify-between rounded-[48px]"
            style={{
              background: 'white'
            }}
          >
            <div className="p-4 md:p-8 flex-1 bg-white rounded-tl-[48px] rounded-tr-[48px] flex flex-col">
              {/* Heading for desktop */}
              <div className="hidden md:block">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center rounded-3xl">CHOOSE YOUR PLAN</h1>
              </div>

              <div className="max-w-6xl mx-auto">
                <div className="text-black font-semibold text-sm text-left mb-4 ml-2 md:hidden">
                  <p className='text-black text-xl'>Choose your plan</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8">
                  <div className="bg-white rounded-3xl p-4 md:p-8 shadow-xl border border-red-100" style={{
                    background: ` radial-gradient(at 98% 7%, hsla(0,100%,90%,1) 0px, transparent 50%),   /* Red accent */
  radial-gradient(at 0% 0%, hsla(240,33%,99%,1) 0px, transparent 50%)`,
                    border: `1px solid red`
                  }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 text-red-600">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium text-base md:text-lg">Treasure Chest</span>
                      </div>
                    </div>
                    <div className="mb-6">
                      <span className=" text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold" style={{ background: `linear-gradient(90deg, #FF9A9E 0%, #FF0000 100%)
` }}>
                        💎 ICON
                      </span>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base leading-relaxed">A fixed instalment for 9 months</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base leading-relaxed">100% assured returns on your instalment</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base leading-relaxed">Get the last months instalment as CaratLane discount</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base leading-relaxed">Buy your favourite CaratLane jewellery hassle-free</span>
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-2xl p-4 mb-6">
                      <p className="text-red-800 font-medium text-sm md:text-base">
                        <span className="font-bold">Assured Bonus</span> on redemption
                      </p>
                    </div>
                    <button className="
                      w-full 
                      text-white 
                      py-4 
                      rounded-2xl 
                      font-semibold 
                      text-base md:text-lg 
                      shadow-lg 
                      transform 
                      transition-all 
                      duration-300 
                      hover:scale-105
                       bg-gradient-to-r from-[red] to-[red]
                       hover:from-red-600 hover:to-red-700
                     
                    ">
                      START SAVING
                    </button>
                  </div>
                  <div className="rounded-3xl p-4 md:p-8 shadow-xl border border-yellow-100 relative overflow-hidden" style={{
                    background: `radial-gradient(at 98% 7%,hsla(36,100%,90%,1) 0px,transparent 50%), radial-gradient(at 0% 0%,hsla(24,100%,99%,1) 0px,transparent 50%)`,
                    border: `1px solid yellow`
                  }}>
                    <div className="absolute -right-4 top-6 bg-yellow-800 text-white px-8 py-1 text-sm md:text-base font-bold transform rotate-12 shadow-md">
                      POPULAR
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 text-orange-600">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium text-base md:text-lg">Treasure Chest</span>
                      </div>
                    </div>
                    <div className="mb-6">
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-full text-sm md:text-base font-semibold">
                        ⭐ EDGE
                      </span>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-yellow-800 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base leading-relaxed">9 monthly instalments converted into grams of gold</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-yellow-800 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base leading-relaxed">Gold value accumulated over time with each instalment</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-yellow-800 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base leading-relaxed">Complete transparency ensured with real time gold rates</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-yellow-800 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm md:text-base leading-relaxed">Enjoy CaratLane benefit— no matter how gold rates move.</span>
                      </div>
                    </div>
                    <div className="bg-yellow-50 rounded-2xl p-4 mb-6">
                      <p className="text-orange-800 font-medium text-sm md:text-base">
                        <span className="font-bold">Gold Value + Assured Bonus</span> on redemption
                      </p>
                    </div>
                    <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4 rounded-2xl font-semibold text-base md:text-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      START SAVING
                    </button>
                  </div>
                </div>

                {/* Calculator Section */}
                <div className="max-w-5xl mx-auto mt-8 mb-6">
                  <div className="bg-white rounded-2xl p-4 md:p-8">
                    {/* Header */}
                    <h2 className="text-center text-xl md:text-2xl  font-semibold text-[black] mb-6">CALCULATE YOUR SAVINGS</h2>
                    <div className="mb-6 ">
                      <div className="relative max-w-md mx-auto bg-[yellow] ">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base md:text-lg text-gray-600">₹</span>
                        <input
                          type="number"
                          value={selectedAmount}
                          onChange={(e) => {
                            const value = e.target.valueAsNumber || 0;
                            setSelectedAmount(value);
                            if (value < 1000) {
                              setAmountError('Minimum amount is ₹1000');
                            } else {
                              setAmountError('');
                            }
                          }}
                          onBlur={() => {
                            const roundedValue = Math.round(selectedAmount / 1000) * 1000;
                            const finalValue = roundedValue < 1000 ? 1000 : roundedValue;
                            setSelectedAmount(finalValue);
                            if (finalValue < 1000) {
                              setAmountError('Minimum amount is ₹1000');
                            } else {
                              setAmountError('');
                            }
                          }}
                          className={`w-full py-3 pl-10 pr-4 text-lg md:text-xl font-medium text-center border rounded-lg focus:outline-none ${amountError ? 'border-red-500' : 'border-gray-200 focus:border-purple-400'
                            }`}
                          min="1000"
                          step="1000"
                          placeholder="Enter amount (multiple of ₹1,000)"
                        />
                      </div>
                      {amountError && (
                        <p className="text-center text-xs md:text-sm text-red-500 mt-2">{amountError}</p>
                      )}
                      <p className="text-center text-xs md:text-sm text-gray-600 mt-2">Monthly Instalment (Multiples of ₹1,000 only)</p>
                      <div className="flex justify-center gap-2 mt-3">
                        <button
                          onClick={() => setSelectedAmount(1000)}
                          className="bg-yellow-50 hover:bg-yellow-200 text-gray-800 font-medium py-2 px-4 rounded-lg text-xs md:text-sm"
                        >
                          ₹1,000
                        </button>
                        <button
                          onClick={() => setSelectedAmount(5000)}
                          className="bg-yellow-50 hover:bg-yellow-200 text-gray-800 font-medium py-2 px-4 rounded-lg text-xs md:text-sm"
                        >
                          ₹5,000
                        </button>
                        <button
                          onClick={() => setSelectedAmount(10000)}
                          className="bg-yellow-100 hover:bg-yellow-200 text-gray-800 font-medium py-2 px-4 rounded-lg text-xs md:text-sm"
                        >
                          ₹10,000
                        </button>
                      </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-6">
                      <div className="flex bg-yellow-100 rounded-full p-1 max-w-md w-full">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveTab('comparison');
                          }}
                          className={`flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all ${activeTab === 'comparison'
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                            : 'text-gray-600 hover:text-[black]'
                            }`}
                        >
                          Plan Comparison
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveTab('description');
                          }}
                          className={`flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all ${activeTab === 'description'
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                            : 'text-gray-600 hover:text-[black]'
                            }`}
                        >
                          Description
                        </button>
                      </div>
                    </div>

                    {/* Content based on active tab */}
                    {activeTab === 'comparison' ? (
                      <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
                        {/* Treasure Chest ICON Plan */}
                        <div className="w-full rounded-xl p-6 md:p-8 shadow-lg" style={{ background: `#FFF5F5`, border: `1px solid #FFE5E5` }}>
                          <div className="flex items-center mb-6">
                            <div className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            </div>
                            <span className="font-medium text-gray-800 text-base md:text-lg mr-3">Treasure Chest</span>
                            <span className=" text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap" style={{background:'linear-gradient(90deg, rgb(255, 154, 158) 0%, rgb(255, 0, 0) 100%)',}}>
                              💎 ICON
                            </span>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between gap-2 sm:gap-0">
                              <div className="flex items-center">
                                <div className="w-4 h-4 text-green-500 mr-3 flex-shrink-0">
                                  <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-gray-700 text-sm md:text-base ">Your Total Instalments (9 Months)</span>
                              </div>
                              <span className="font-semibold text-gray-800 text-sm  ">₹ {(selectedAmount * 9).toLocaleString()}</span>
                            </div>

                            <div className="flex items-center justify-between gap-2 sm:gap-0">
                              <div className="flex items-center">
                                <div className="w-4 h-4 text-green-500 mr-3 flex-shrink-0">
                                  <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-gray-700 text-sm md:text-base break-words">CaratLane Bonus (10th Month)</span>
                              </div>
                              <span className="bg-[#9CA2F4] text-white px-2 py-1 rounded text-xs md:text-sm font-medium ml-7 sm:ml-0 whitespace-nowrap">₹{selectedAmount.toLocaleString()}</span>
                            </div>

                            <div className=" flex items-center justify-between gap-2 sm:gap-0">
                              <div className="flex items-center">
                                <div className="w-4 h-4 text-red-500 mr-3 flex-shrink-0">
                                  <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-gray-700 text-sm md:text-base break-words">Gold Value Appreciation</span>
                              </div>
                              <span className="text-red-500 font-medium text-sm md:text-base ml-7 sm:ml-0 whitespace-nowrap">Not Available</span>
                            </div>

                            <div className="border-t pt-4 mt-6">
                              <div className=" flex items-center justify-between gap-2 sm:gap-0">
                                <span className="font-semibold text-gray-800 text-base md:text-lg break-words">Total Redeemable Amount</span>
                                <span className="font-bold text-lg md:text-xl text-gray-800 whitespace-nowrap">₹ {(selectedAmount * 10).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Treasure Chest EDGE Plan */}
                        <div className="w-full rounded-xl p-6 md:p-8 shadow-lg" style={{
                          background: `#FFF6EC66`,
                          border: `1px solid #F5EAA8`
                        }}>
                          <div className="flex items-center mb-6">
                            <div className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            </div>
                            <span className="font-medium text-gray-800 text-base md:text-lg mr-3">Treasure Chest</span>
                            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
                              ⭐ EDGE
                            </span>
                          </div>

                          <div className="space-y-4">
                            <div className=" flex items-center justify-between gap-2 sm:gap-0">
                              <div className="flex items-center">
                                <div className="w-4 h-4 text-green-500 mr-3 flex-shrink-0">
                                  <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-gray-700 text-sm md:text-base ">Your Total Instalments (9 Months)</span>
                              </div>
                              <span className="font-semibold text-gray-800 text-sm  ">₹ {(selectedAmount * 9).toLocaleString()}</span>
                            </div>

                            <div className=" flex items-center justify-between gap-2 sm:gap-0">
                              <div className="flex items-center">
                                <div className="w-4 h-4 text-green-500 mr-3 flex-shrink-0">
                                  <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-gray-700 text-sm md:text-base ">CaratLane Bonus (10th Month)</span>
                              </div>
                              <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs md:text-sm font-medium ml-7 sm:ml-0 whitespace-nowrap">₹{selectedAmount.toLocaleString()}</span>
                            </div>

                            <div className="flex items-center justify-between gap-2 sm:gap-0">
                              <div className="flex items-center">
                                <div className="w-4 h-4 text-green-500 mr-3 flex-shrink-0">
                                  <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="text-gray-700 text-sm md:text-base break-words">Gold Value Appreciation (Adjust slider)</span>
                              </div>
                              <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs md:text-sm font-medium ml-7 sm:ml-0 whitespace-nowrap">₹{Math.round((selectedAmount * 10) * (growthPercent / 100)).toLocaleString()} ({growthPercent}%)</span>
                            </div>

                            <div className="relative mt-4">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={growthPercent}
                                onChange={(e) => setGrowthPercent(e.target.valueAsNumber)}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                                style={{
                                  background: `linear-gradient(to right, #F97316 ${growthPercent}%, #FEE2E2 ${growthPercent}%)`,
                                  color: 'darkorange',
                                }}
                              />
                            </div>

                            <div className="border-t pt-4 mt-6">
                              <div className="flex items-center justify-between gap-2 sm:gap-0">
                                <span className="font-semibold text-gray-800 text-base md:text-lg break-words">Estimated Total Redeemable Amount</span>
                                <span className="font-bold text-lg md:text-xl text-gray-800 whitespace-nowrap">₹ {Math.round(selectedAmount * 10 + (selectedAmount * 10) * (growthPercent / 100)).toLocaleString()}</span>
                              </div>
                              <p className="text-gray-600 text-xs md:text-sm mt-2 break-words">₹{(selectedAmount * 10).toLocaleString()} invested could grow to ₹{Math.round(selectedAmount * 10 + (selectedAmount * 10) * (growthPercent / 100)).toLocaleString()} at {growthPercent}% growth.</p>
                            </div>
                          </div>

                          <div className="mt-6 space-y-2">
                            <p className="text-orange-800 text-xs md:text-sm break-words">○ Returns subject to gold market performance</p>
                            <p className="text-orange-800 text-xs md:text-sm break-words">• Current 24KT Gold Rate: ₹10916</p>
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="p-4 sm:p-6 lg:p-8" >
                        <div className="max-w-4xl mx-auto space-y-2">
                          {/* Treasure Chest ICON Card */}
                          <div
                            className="rounded-lg p-6 sm:p-8 mb-5"
                            style={{
                              backgroundColor: 'rgb(255, 245, 245)',
                              border: '1px solid rgb(229, 229, 255)'
                            }}
                          >
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                              Treasure Chest ICON
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                              With the Treasure Chest plan, you save a fixed amount of ₹5,000 every
                              month for 9 months, totaling ₹45,000. and CaratLane pays your 10th
                              month contribution of ₹5,000.
                            </p>
                            <p className="text-gray-800 font-medium text-sm sm:text-base">
                              Your total redeemable amount after 10 months: <span className="font-semibold">₹50,000</span>
                            </p>
                          </div>

                          {/* Treasure Chest EDGE Card */}
                          <div
                            className="rounded-lg p-6 sm:p-8"
                            style={{
                              backgroundColor: 'rgba(255, 246, 236, 0.4)',
                              border: '1px solid rgb(245, 234, 168)'
                            }}
                          >
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                              Treasure Chest EDGE
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                              With the Treasure Chest Edge plan, your monthly contribution
                              of ₹5,000 is invested in the gold market. Based on the simulated market
                              performance of 5%, your investment grows to ₹55,133. CaratLane adds a
                              bonus of ₹5,000 in the 10th month.
                            </p>
                            <p className="text-gray-800 font-medium text-sm sm:text-base mb-4">
                              Potential gain compared to fixed savings: <span className="font-semibold text-green-600">+₹10,133</span>
                            </p>

                            {/* Warning Banner */}
                            <div
                              className="flex items-center gap-3 p-3 sm:p-4 rounded-lg"
                              style={{ backgroundColor: 'rgb(254, 243, 199)' }}
                            >
                              <div className="flex-shrink-0">
                                <svg
                                  className="w-5 h-5 text-amber-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <p className="text-amber-800 text-sm font-medium">
                                Returns are subject to gold market performance
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="w-full rounded-xl p-6 md:p-8 shadow-lg mt-10" style={{
                      background: `#E1F8D4`,
                      border: `1px solid #F5EAA8`
                    }}>
                      <img
                        src="https://cdn.caratlane.com/media/static/images/web/Treasure%20Chest/Landing%20Page/Talktoexpert.png"
                        alt="Questions and Butterfly Pendant"
                        className="w-full max-w-xs mb-4 mx-auto block"
                      />
                      <h2 className="text-xl font-semibold text-purple-900 mb-6 text-left">
                        Confused between plans? Let us guide you
                      </h2>
                      <div className="flex flex-col sm:flex-row items-center w-full gap-2">
                        <input
                          type="text"
                          placeholder="Mobile Number"
                          className="flex-1 px-4 py-2 rounded-full border-none focus:outline-none text-gray-700 bg-white"
                        />
                        <button className="bg-green-500 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 whitespace-nowrap">
                          🗣 TALK TO AN EXPERT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <TreasureChestFaqToggleComponent />
              </div>
              <div >
                <Footer  />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export { TreasureChestBanner };
