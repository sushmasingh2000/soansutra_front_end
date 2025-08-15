import React, { useState, useEffect } from 'react';
import { BrandLogo } from "../brand-logo"
import Header from "../Header1"
import NavigationBar from "../navigationbar"
import Footer from "../Footer1"
const LoginPage = () => {
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(31);

  useEffect(() => {
    let interval;
    if (showOTP && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOTP, resendTimer]);

  const handleContinueToLogin = () => {
    if (mobileOrEmail.trim()) {
      setShowOTP(true);
    }
  };

  const handleOTPChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleChangeNumber = () => {
    setShowOTP(false);
    setOTP(['', '', '', '', '', '']);
    setResendTimer(31);
  };

  const maskEmailOrPhone = (value) => {
    if (value.includes('@')) {
      // Email masking
      const [username, domain] = value.split('@');
      const maskedUsername = username.substring(0, 3) + '*'.repeat(Math.max(0, username.length - 3));
      return maskedUsername + '@' + domain;
    } else {
      // Phone masking - show first 3 and last 2 digits
      if (value.length >= 6) {
        const firstPart = value.substring(0, 3);
        const lastPart = value.substring(value.length - 2);
        const middlePart = '*'.repeat(value.length - 5);
        return firstPart + middlePart + lastPart;
      }
      return value;
    }
  };

  if (showOTP) {
    return (
        <>
        <Header/>
     <NavigationBar/>
      <div className=" flex items-center justify-center px-3 py-6 mt-10 mb-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg px-6 py-8">
          {/* Fingerprint Icon */}
          <div className="flex justify-center mb-6">
            
            <div className="flex-shrink-0 pl-2">
            <BrandLogo />
          </div>
          </div>
          


          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              Enter OTP
            </h1>
            <div className="mb-1">
              <span className="text-gray-800 text-base font-medium">
                {mobileOrEmail}
              </span>
              <button
                onClick={handleChangeNumber}
                className="text-purple-500 text-sm font-medium hover:text-purple-600 transition-colors duration-200 ml-1"
              >
                Change
              </button>
            </div>
            {/* <p className="text-gray-600 text-sm">
              fre***************@yahoo.com
            </p> */}
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp.join('')}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  const newOTP = value.split('').concat(Array(6 - value.length).fill(''));
                  setOTP(newOTP.slice(0, 6));
                }}
                className="w-40 px-3 py-1 text-center text-base font-semibold border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                maxLength="6"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={(e) => e.preventDefault()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl text-sm mb-4"
          >
            LOGIN
          </button>

          {/* Resend Timer */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">
              Resend in <span className="text-purple-500 font-medium">{resendTimer} sec</span>
            </p>
          </div>

          {/* Social Login */}
          <div className="flex justify-center space-x-4">
            {/* Google Button */}
            <button className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>

            {/* Facebook Button */}
            <button className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center hover:bg-[#166FE5] transition-all duration-200 shadow-sm hover:shadow-md">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Footer/>
      </>
    );
  }

  return (
    <>
    <Header/>
     <NavigationBar/>
    <div className=" flex items-center justify-center px-3 py-6 mb-20 mt-10" style={{ backgroundColor: 'white' }}>
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg px-6 py-8">
        {/* Logo */}
        {/* <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white rounded-full relative">
              <div className="absolute inset-1 border border-white rounded-full"></div>
            </div>
          </div>
        </div> */}

          <div className="flex justify-center mb-6">
            
            <div className="flex-shrink-0 pl-2">
            <BrandLogo />
          </div>
          </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-3">
            Login to SonaSutra
          </h1>
          <p className="text-gray-600 text-xs leading-relaxed px-1">
            Login to unlock best prices and become an insider for our exclusive launches & offers. Complete your profile and get ₹250 worth of xCLusive Points.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Input Field */}
          <div>
            <input
              type="text"
              placeholder="Enter Mobile Number or Email"
              value={mobileOrEmail}
              onChange={(e) => setMobileOrEmail(e.target.value)}
              className="w-full px-3 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-200 text-sm"
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinueToLogin}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
          >
            CONTINUE TO LOGIN
          </button>
        </div>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div className="mt-4 flex justify-center space-x-3">
            {/* Google Button */}
            <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>

            {/* Facebook Button */}
            <button className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center hover:bg-[#166FE5] transition-all duration-200 shadow-sm hover:shadow-md">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Create Account Link */}
        <div className="mt-6 text-center">
          <span className="text-gray-600 text-xs">New to SonaSutra? </span>
          <a
            href="/sign-up"
            className="text-purple-500 text-xs font-medium hover:text-purple-600 transition-colors duration-200"
          >
            Create an Account
          </a>
        </div>

        {/* Terms and Privacy */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            By continuing you acknowledge that you are at least 18 years old and have read and agree to SonaSutra's{' '}
            <a href="#" className="text-purple-500 hover:text-purple-600 transition-colors duration-200">
              terms and conditions
            </a>{' '}
            &{' '}
            <a href="#" className="text-purple-500 hover:text-purple-600 transition-colors duration-200">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default LoginPage;