import React, { useState } from 'react';

const CertificateVerification = () => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log('Certificate Number:', certificateNumber);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-yellow-600 text-white p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">CERTIFICATION</h1>
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-yellow-700 rounded-full blur opacity-75 animate-ping"></div>
            <div className="relative bg-white text-yellow-600 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-600 rounded-full"></span>
              100%
            </div>
          </div>
        </div>

        {/* Subtitle and Assurance */}
        <div className="p-6 text-center">
          <p className="text-gray-700 text-sm mb-1">All our jewellery is Hallmarked & Certified.</p>
          <p className="text-gray-600 text-xs leading-relaxed">
            Be assured of exceptional trust & quality in all CaratLane designs. Always!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 bg-yellow-50">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2 text-center">
              Enter Your Certificate Number:
            </label>
            <input
              type="text"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              placeholder="Type here..."
              className="w-full px-4 py-3 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-center text-lg"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full font-semibold py-3 px-4 rounded-md transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 ${
              isSubmitted
                ? 'bg-gradient-to-r from-red-200 to-red-300 text-gray-800 hover:from-red-300 hover:to-red-400'
                : 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black'
            }`}
          >
            {isSubmitted ? 'View Certificate' : 'Submit'}
          </button>
        </form>

        {/* Hallmark Section */}
        <div className="p-6 bg-yellow-50 border-t border-yellow-200">
          <div className="flex flex-col items-center justify-center gap-2 text-xs text-yellow-700">
            {/* Hallmark Logo */}
            <div className="w-8 h-8 rounded flex items-center justify-center">
              <img 
                src="https://cdn.caratlane.com/media/static/images/web/BIS_-_Bureau_of_Indian_Standards-1.png" 
                alt="BIS Hallmark" 
                className="w-full h-full object-contain"
              />
            </div>
            <span>100% Hallmarked Jewellery</span>
          </div>
        </div>

        {/* Footer Link */}
        <div className="p-6 text-center text-xs text-gray-600">
          <p className="mb-2">Don't remember your certificate number?</p>
          <p>
            Download your certificate from your Order details in the{' '}
            <a href="#" className="text-yellow-600 hover:underline font-medium">
              My Accounts Page
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerification;