import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Header from '../Header1';
import NavigationBar from '../navigationbar';
import Footer from '../Footer1';

const OurStory = () => {
  return (

    <div className="min-h-screen bg-white">
        <Header/>
       <div className="hidden lg:block">
         <NavigationBar />
       </div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-100 to-red-50 px-3 sm:px-4 lg:px-6 py-6 lg:py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-yellow-500 text-sm font-medium mb-2">WHO ARE WE</h2>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight mb-3">
                SonaSutra was founded in 2008 to address a common dilemma among women:
              </h1>
              <p className="text-gray-600 text-sm lg:text-base mb-4 leading-relaxed">
                The lack of jewellery that combined exquisite design with everyday wearability. 
                Bridging the gap between special-occasion designs and dynamic lifestyles, 
                SonaSutra made diamond jewellery accessible, affordable, and effortlessly timeless.
              </p>
              <p className="text-gray-800 text-sm lg:text-base font-semibold">
                Today, we are India's largest omni-channel jeweller, with over 300 stores across 116 cities.
              </p>
            </div>
            
            {/* Right Image */}
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.caratlane.com/media/static/images/web/top-banner.gif" 
                  alt="SonaSutra Jewelry" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="bg-[#100919] px-3 sm:px-4 lg:px-6 py-8 mb-2 mt-2">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Mission */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
              <div className="flex-shrink-0">
                <div 
                  className="mission-icon"
                  style={{
                    width: '70px',
                    height: '74px',
                    background: 'url(https://assets.cltstatic.com/images/responsive/About-us-sprite.png?v2.0) -13px -82px / 426px no-repeat',
                    display: 'inline-block'
                  }}
                ></div>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-orange-400 text-lg font-bold mb-2">Our Mission</h3>
                <p className="text-white text-sm leading-relaxed">
                  Capture hearts with exquisite designs at an exceptional value, and an unmatched customer experience.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
              <div className="flex-shrink-0">
                <div 
                  className="vision-icon"
                  style={{
                    width: '75px',
                    height: '54px',
                    background: 'url(https://assets.cltstatic.com/images/responsive/About-us-sprite.png?v2.0) -130px -82px / 426px no-repeat',
                    display: 'inline-block'
                  }}
                ></div>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-orange-400 text-lg font-bold mb-2">Our Vision</h3>
                <p className="text-white text-sm leading-relaxed">
                  Become the most loved jewellery brand in India & beyond!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advantages Section */}
      <div className="bg-[#100919] px-3 sm:px-4 lg:px-6 py-8 mb-2 mt-2">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-3">
            SonaSutra Advantages
          </h2>
          <p className="text-gray-300 text-sm text-center mb-6 max-w-3xl mx-auto leading-relaxed">
            At SonaSutra, expect only the highest quality standards. Every design is meticulously crafted, 
            rigorously quality-checked and certified to perfection.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Advantage 1 */}
            <div className="bg-gray-800 rounded-lg p-4 border-t-4 border-yellow-500 text-center">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white text-base font-bold mb-2">100% Certified & Free Shipping</h3>
              <p className="text-gray-400 text-sm">Our jewellery always comes with a certificate of authenticity.</p>
            </div>

            {/* Advantage 2 */}
            <div className="bg-gray-800 rounded-lg p-4 border-t-4 border-orange-500 text-center">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-white text-base font-bold mb-2">15 Day Exchange</h3>
              <p className="text-gray-400 text-sm">Changed your mind? Exchange it for a new design in 15 days!</p>
            </div>

            {/* Advantage 3 */}
            <div className="bg-gray-800 rounded-lg p-4 border-t-4 border-green-500 text-center">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-white text-base font-bold mb-2">Lifetime Exchange</h3>
              <p className="text-gray-400 text-sm">Your style, forever evolving with our latest designs.</p>
            </div>

            {/* Advantage 4 */}
            <div className="bg-gray-800 rounded-lg p-4 border-t-4 border-red-500 text-center">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white text-base font-bold mb-2">One Year Warranty*</h3>
              <p className="text-gray-400 text-sm">If your jewellery has a defect, we will fix it.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-gradient-to-r from-pink-50 to-yellow-50 px-3 sm:px-4 lg:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <p className="text-gray-600 text-sm mb-1">We are part of</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-yellow-600 mb-4">
                3.2 million smiles
              </h2>
              
              <div className="mb-4">
                <h3 className="text-gray-700 text-base font-semibold mb-2">FOLLOW US FOR</h3>
                <p className="text-gray-600 text-sm mb-3">Style, Stories, and Brilliance!</p>
                
                {/* Social Media Icons */}
                <div className="flex gap-3 justify-center lg:justify-start">
                  <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center hover:bg-yellow-700 transition-colors cursor-pointer">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors cursor-pointer">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 13.5C14.8 13.8 14.4 14 14 14H10C9.6 14 9.2 13.8 9 13.5L3 7V9C3 10.1 3.9 11 5 11V21C5 21.6 5.4 22 6 22H18C18.6 22 19 21.6 19 21V11C20.1 11 21 10.1 21 9Z"/>
                    </svg>
                  </div>
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
                    <Twitter className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Gallery */}
            <div className="relative">
              <div className="text-center lg:text-right mb-3">
                <span className="text-yellow-600 font-semibold text-sm">#MySonaSutraStory</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Large Image */}
                <div className="row-span-2">
                  <img 
                    src="https://cdn.caratlane.com/media/static/images/web/Insta-image-29feb-5.png" 
                    alt="SonaSutra jewelry showcase" 
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                
                {/* Top Right */}
                <div className="grid grid-cols-2 gap-2">
                  <img 
                    src="https://cdn.caratlane.com/media/static/images/web/Insta-image-29feb-1.png" 
                    alt="SonaSutra customer" 
                    className="w-full h-20 sm:h-24 object-cover rounded-lg shadow-lg"
                  />
                  <img 
                    src="https://cdn.caratlane.com/media/static/images/web/Insta-image-29feb-2.png" 
                    alt="SonaSutra jewelry" 
                    className="w-full h-20 sm:h-24 object-cover rounded-lg shadow-lg"
                  />
                </div>
                
                {/* Bottom Right */}
                <div className="grid grid-cols-2 gap-2">
                  <img 
                    src="https://cdn.caratlane.com/media/static/images/web/Insta-image-29feb-4.png" 
                    alt="SonaSutra accessories" 
                    className="w-full h-20 sm:h-24 object-cover rounded-lg shadow-lg"
                  />
                  <img 
                    src="https://cdn.caratlane.com/media/static/images/web/Insta-image-29feb-3.png" 
                    alt="SonaSutra happy customer" 
                    className="w-full h-20 sm:h-24 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default OurStory;