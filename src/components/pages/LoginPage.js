import React, { useState } from 'react';
import { BrandLogo } from "../brand-logo";
import Header from "../Header1";
import NavigationBar from "../navigationbar";
import Footer from "../Footer1";
import axios from 'axios';
import { endpoint } from '../../utils/APIRoutes';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

 const handleLogin = async () => {
  setError('');
  if (!email || !password) {
    setError("Please enter both email and password.");
    return;
  }
  setLoading(true);
  try {
    const response = await axios.post(endpoint?.login_customer, {
      email,
      password,
    });
    if (response.data.success) {
      localStorage.setItem('token', response?.data?.result?.token);
      window.location.href = '/'; // Change this route as needed
    } else {
      setError(response.data.message || 'Invalid credentials.');
    }
  } catch (err) {
    console.error(err);
    setError(
      err?.response?.data?.message || 'Something went wrong. Please try again later.'
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <div className="flex items-center justify-center px-3 py-6 bg-white">
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-2xl shadow-violet-600 px-6 py-8">
          <div className="flex justify-center mb-6"> 
            <div className="flex-shrink-0 pl-2">
              <BrandLogo />
            </div>
          </div>
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800 mb-3">
              Login to SonaSutra
            </h1>
            <p className="text-gray-600 text-xs leading-relaxed px-1">
              Login to unlock best prices and become an insider for our exclusive launches & offers. Complete your profile and get ₹250 worth of xCLusive Points.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>

            {error && (
              <div className="text-red-500 text-sm text-center mt-2">
                {error}
              </div>
            )}
          </div>

      
          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="mt-4 flex justify-center space-x-3">
              <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </button>

              <button className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center hover:bg-[#166FE5] transition-all duration-200 shadow-sm hover:shadow-md">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>
          </div> */}

          <div className="mt-6 text-center">
            <span className="text-gray-600 text-xs">New to SonaSutra? </span>
            <a
              href="/sign-up"
              className="text-purple-500 text-xs font-medium hover:text-purple-600 transition-colors duration-200"
            >
              Create an Account
            </a>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              By continuing you acknowledge that you are at least 18 years old and have read and agree to SonaSutra's{' '}
              <a href="#" className="text-purple-500 hover:text-purple-600">terms and conditions</a> &{' '}
              <a href="#" className="text-purple-500 hover:text-purple-600">privacy policy</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
