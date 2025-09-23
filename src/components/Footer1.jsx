
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionName) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const sectionTitleColor = "#000000"; // Changed to black
  const iconColor = "#000000"; // Changed to black

  return (
    <footer className="py-8 px-4 md:px-6 bg-[#fffefe] border-t-2 border-yellow-100" > {/* Changed to white */}
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          
          {/* Know Your Jewellery */}
          <div className="lg:col-span-1 border-b md:border-b-0 border-yellow-200 pb-4 md:pb-0">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default"
              onClick={() => toggleSection('knowYourJewellery')}
            >
              <h3 className="text-base font-semibold" style={{color: sectionTitleColor}}>Know Your Jewellery</h3>
              <div className="md:hidden">
                <i className={`fas ${openSections.knowYourJewellery ? 'fa-minus' : 'fa-plus'}`} style={{color: iconColor}}></i>
              </div>
            </div>
            <ul className={`space-y-2 mt-2 ${openSections.knowYourJewellery ? 'block' : 'hidden'} md:block`}>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Diamond guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Jewellery guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Gemstones guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Gold rate</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Treasure chest</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Glossary</a></li>
            </ul>
          </div>

          {/* SonaSutra Advantage */}
          <div className="lg:col-span-1 border-b md:border-b-0 border-gray-200 pb-4 md:pb-0">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default"
              onClick={() => toggleSection('caratLaneAdvantage')}
            >
              <h3 className="text-base font-semibold" style={{color: sectionTitleColor}}>SonaSutra Advantage</h3>
              <div className="md:hidden">
                <i className={`fas ${openSections.caratLaneAdvantage ? 'fa-minus' : 'fa-plus'}`} style={{color: iconColor}}></i>
              </div>
            </div>
            <ul className={`space-y-2 mt-2 ${openSections.caratLaneAdvantage ? 'block' : 'hidden'} md:block`}>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">15-day returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Free shipping</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Postcards</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Gold exchange</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">#Wearyourwins</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Gift cards</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-1 border-b md:border-b-0 border-gray-200 pb-4 md:pb-0">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default"
              onClick={() => toggleSection('customerService')}
            >
              <h3 className="text-base font-semibold" style={{color: sectionTitleColor}}>Customer Service</h3>
              <div className="md:hidden">
                <i className={`fas ${openSections.customerService ? 'fa-minus' : 'fa-plus'}`} style={{color: iconColor}}></i>
              </div>
            </div>
            <ul className={`space-y-2 mt-2 ${openSections.customerService ? 'block' : 'hidden'} md:block`}>
              <li><a href="/return-policy" className="text-gray-600 hover:text-black transition-colors text-sm">Return policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Order status</a></li>
            </ul>
          </div>

          {/* About Us */}
          <div className="lg:col-span-1 border-b md:border-b-0 border-gray-200 pb-4 md:pb-0">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default"
              onClick={() => toggleSection('aboutUs')}
            >
              <h3 className="text-base font-semibold" style={{color: sectionTitleColor}}>About Us</h3>
              <div className="md:hidden">
                <i className={`fas ${openSections.aboutUs ? 'fa-minus' : 'fa-plus'}`} style={{color: iconColor}}></i>
              </div>
            </div>
            <ul className={`space-y-2 mt-2 ${openSections.aboutUs ? 'block' : 'hidden'} md:block`}>
              <li><Link to="/our-story" className="text-gray-600 hover:text-black transition-colors text-sm">Our story</Link></li>
              {/* <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Press</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors text-sm">Careers</a></li> */}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-1">
            <h3 className="text-base font-semibold mb-3" style={{color: sectionTitleColor}}>Contact Us</h3>
            <div className="space-y-3">
              <p className="text-black font-medium text-sm">Sonasutra Private Limited</p> {/* Changed to black */}
              <p className="text-gray-800 text-xs leading-relaxed">
                 Shop No 10 Rajpura, BIDA MART, Bhadohi, Sant Ravidas Nagar Bhadohi,  Uttar Pradesh , India ,221401. 
              </p>
              
              <div className="mt-4">
                <p className="text-black font-medium mb-1 text-sm">24X7 ENQUIRY SUPPORT (ALL DAYS)</p> {/* Changed to black */}
                <div className="space-y-1 text-xs">
                  <p className="text-gray-600">General: <a href="mailto:contactus@sonasutra.in" className="text-black hover:text-gray-800">contactus@sonasutra.in</a></p> {/* Changed to black */}
                  <p className="text-gray-600">Corporate: <a href="mailto:contactus@sonasutra.in" className="text-black hover:text-gray-800">contactus@sonasutra.in</a></p> {/* Changed to black */}
                  <p className="text-gray-600">Hr: <a href="mailto:contactus@sonasutra.in" className="text-black hover:text-gray-800">contactus@sonasutra.in</a></p> {/* Changed to black */}
                  <p className="text-gray-600">Grievance: <a href="#" className="text-black hover:text-gray-800">click here</a></p> {/* Changed to black */}
                </div>
              </div>

              {/* Contact Icons */}
              <div className="flex space-x-3 mt-4">
                <div className="text-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-1 hover:bg-gray-200 transition-colors cursor-pointer"> {/* Changed to neutral gray */}
                    <i className="fas fa-phone" style={{color: iconColor}}></i>
                  </div>
                  <span className="text-xs text-gray-600">Call Us</span>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-1 hover:bg-gray-200 transition-colors cursor-pointer"> {/* Changed to neutral gray */}
                    <i className="fas fa-comments" style={{color: iconColor}}></i>
                  </div>
                  <span className="text-xs text-gray-600">Chat</span>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-1 hover:bg-gray-200 transition-colors cursor-pointer"> {/* Changed to neutral gray */}
                    <i className="fab fa-whatsapp" style={{color: iconColor}}></i>
                  </div>
                  <span className="text-xs text-gray-600">Whatsapp</span>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-1 hover:bg-gray-200 transition-colors cursor-pointer"> {/* Changed to neutral gray */}
                    <i className="fas fa-envelope" style={{color: iconColor}}></i>
                  </div>
                  <span className="text-xs text-gray-600">Email</span>
                </div>
              </div>

              {/* Find A Store Button */}
              <button className="mt-4 w-full md:w-auto px-4 py-2 border-2 rounded-lg hover:bg-black hover:text-white transition-all duration-200 font-medium text-sm bg-gradient-to-r from-yellow-400 to-yellow-600" style={{border:"1px solid #FFD700", color: "#000000"}}> {/* Gold background, black text */}
                <i className="fas fa-map-marker-alt mr-2"></i>
                FIND A STORE
              </button>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="rounded-xl p-6 mb-5 lg:max-w-md bg-gradient-to-r from-yellow-400 to-yellow-600" > {/* Changed to white */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-black mb-1">Download the SonaSutra App</h3> {/* Changed to black */}
              <p className="text-gray-600 text-sm">Shop & Save more on app by redeeming xCLusive points</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <a href="#" className="inline-block">
                <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                  <div className="flex flex-col items-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </a>
              <a href="#" className="inline-block">
                <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                  <div className="flex flex-col items-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Social Media Only */}
        <div className="border-t border-gray-200 pt-6">
          <div className="mb-4">
            <h4 className="text-black font-medium mb-3 text-sm">Find Us On</h4> {/* Changed to black */}
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform bg-gradient-to-r from-yellow-400 to-yellow-600 " > {/* Gold background */}
                <i className="fab fa-instagram text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform bg-gradient-to-r from-yellow-400 to-yellow-600" > {/* Gold background */}
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform bg-gradient-to-r from-yellow-400 to-yellow-600" > {/* Gold background */}
                <i className="fab fa-linkedin-in text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform bg-gradient-to-r from-yellow-400 to-yellow-600" > {/* Gold background */}
                <i className="fab fa-pinterest-p text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform bg-gradient-to-r from-yellow-400 to-yellow-600" > {/* Gold background */}
                <i className="fab fa-x-twitter text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </footer>
  );
};

export default Footer;