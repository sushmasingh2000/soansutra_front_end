

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
                        src=""
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
                      src=""
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
