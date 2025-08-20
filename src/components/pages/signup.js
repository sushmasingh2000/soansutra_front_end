import React, { useState } from 'react';
import SummaryApi from '../../common/index';
import { BrandLogo } from '../brand-logo';
import Header from "../Header1"
import NavigationBar from "../navigationbar"
import Footer from "../Footer1"
import { endpoint } from '../../utils/APIRoutes';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    password: '',
    confirmPassword: '',
    whatsappSupport: true,
    invitationCode: ''
  });


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
      errors.push('Please enter a valid 10-digit mobileNumber number');
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!formData.firstName.trim()) {
      errors.push('First name is required');
    }

    if (!formData.lastName.trim()) {
      errors.push('Last name is required');
    }

    if (!formData.gender) {
      errors.push('Please select your gender');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(endpoint.create_customer, {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.mobileNumber,
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        password: formData.password,
        confirm_password: formData.confirmPassword
      });

      const data = response.data;
       toast(data?.message);
      if (data?.success) {
        window.location.href = '/login';
      } else {
        setError(data?.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Header />
        <NavigationBar />
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to SonaSutra!</h2>
            <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Continue to Login
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <NavigationBar />
      <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-2">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-3 sm:p-4">
            {/* Header */}
            <div className="text-center mb-3">
              {/* <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div> */}
              <div className="flex justify-center mb-6">

                <div className="flex-shrink-0 pl-2">
                  <BrandLogo />
                </div>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                Signup with SonaSutra
              </h1>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Social Login Buttons */}
            <div className="flex justify-center gap-3 mb-3">
              <button className="flex items-center justify-center w-10 h-10 bg-white border-2 border-gray-200 rounded-full hover:border-purple-300 hover:shadow-lg transition-all duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </button>
              <button className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center mb-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-purple-300"></div>
              <span className="px-2 text-xs text-gray-500 font-medium">Or continue with</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-200 to-purple-300"></div>
            </div>

            {/* Form */}
            <div className="space-y-3">
              {/* mobileNumber Number */}
              <div className="w-full">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <div className="flex w-full">
                  <div className="flex items-center bg-gray-50 border border-gray-300 rounded-l-lg px-2 py-2 border-r-0 min-w-0 flex-shrink-0">
                    <span className="text-xs font-medium text-gray-700 mr-1">IN</span>
                    <span className="text-xs text-gray-600 mr-1">+91</span>
                    <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="flex-1 min-w-0 px-2 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                  required
                />
              </div>

              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                    required
                  />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                  required
                />
              </div>
              {/* Invitation Code */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Invitation Code (Optional)
                </label>
                <input
                  type="text"
                  name="invitationCode"
                  placeholder="Enter invitation code"
                  value={formData.invitationCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                />
                <p className="text-xs text-gray-500 mt-0.5">
                  Get extra rewards with a valid invitation code
                </p>
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {['Male', 'Female', 'Others'].map((gender) => (
                    <label key={gender} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleInputChange}
                        className="w-3 h-3 text-purple-600 border-gray-300 focus:ring-purple-500"
                        required
                      />
                      <span className="ml-1.5 text-xs text-gray-700">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>


              {/* Terms and Conditions */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 text-center leading-relaxed">
                  By continuing you acknowledge that you are at least 18 years old and have read and agree to SonaSutra's{' '}
                  <a href="#" className="text-purple-500 hover:text-purple-600 underline">terms and conditions</a>
                  {' '}&{' '}
                  <a href="#" className="text-purple-500 hover:text-purple-600 underline">privacy policy</a>.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-xs shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SIGNING UP...
                  </div>
                ) : (
                  'SIGN ME UP'
                )}
              </button>

              {/* Login Link */}
              <div className="flex justify-center items-center pt-3 border-t border-gray-100">
                <span className="text-gray-600 text-xs">Already have an account? </span>
                <a
                  href="/login"
                  className="text-purple-500 text-xs font-medium hover:text-purple-600 transition-colors duration-200 ml-1"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;