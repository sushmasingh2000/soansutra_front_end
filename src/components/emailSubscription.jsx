import React, { useState } from 'react';

export default function CaratLaneSignup() {
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Female');

  const handleSubmit = () => {
    console.log('Form submitted:', { email, gender });
    alert(`Submitted with email: ${email} and gender: ${gender}`);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6">
      <div className="w-full px-6 sm:px-8 md:px-10 py-6 sm:py-8 rounded-2xl" style={{
        background: 'linear-gradient(135deg, rgb(0, 0, 0), rgb(116, 67, 191))',
        minHeight: '200px'
      }}>
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left Section - Content */}
          <div className="flex items-center gap-2 text-left">
            {/* Gift Icon */}
            <div className="flex-shrink-0">
              <img 
                src="https://assets.cltstatic.com/images/responsive/purple-gift-icon.png" 
                alt="Gift Icon" 
                className="w-16 h-16 md:w-20 md:h-20"
              />
            </div>
            
            {/* Text Content */}
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Join SonaSutra Insider
              </h1>
              <p className="text-sm md:text-base text-gray-200">
                To discover enticing deals, latest arrivals, & more
              </p>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="w-full max-w-xs md:max-w-sm flex-shrink-0">
            <div className="space-y-3">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-800 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full hover:opacity-90 text-white font-medium py-2.5 rounded-lg transition-all duration-200 text-sm"
                style={{background:"#DE57E5"}}>
                submit
              </button>

              {/* Gender Selection */}
              <div className="flex items-center justify-center gap-4 pt-1">
                <div className="flex items-center cursor-pointer" onClick={() => setGender('Female')}>
                  <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${gender === 'Female' ? 'bg-white' : 'bg-transparent'}`}>
                    {gender === 'Female' && <div className="w-2 h-2 rounded-full bg-purple-600"></div>}
                  </div>
                  <span className="ml-2 text-white text-sm">Female</span>
                </div>

                <div className="flex items-center cursor-pointer" onClick={() => setGender('Male')}>
                  <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${gender === 'Male' ? 'bg-white' : 'bg-transparent'}`}>
                    {gender === 'Male' && <div className="w-2 h-2 rounded-full bg-purple-600"></div>}
                  </div>
                  <span className="ml-2 text-white text-sm">Male</span>
                </div>

                <div className="flex items-center cursor-pointer" onClick={() => setGender('Other')}>
                  <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${gender === 'Other' ? 'bg-white' : 'bg-transparent'}`}>
                    {gender === 'Other' && <div className="w-2 h-2 rounded-full bg-purple-600"></div>}
                  </div>
                  <span className="ml-2 text-white text-sm">Other</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}