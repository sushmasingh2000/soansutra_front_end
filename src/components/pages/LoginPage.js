// components/LoginModal.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { endpoint } from '../../utils/APIRoutes';
import logo from "../../assets/desklogo.png";

const LoginModal = ({ isOpen, onClose }) => {
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
        window.location.href = '/';
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-lg p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold">&times;</button>
        
        <div className="flex justify-center mb-4">
          <img src={logo} alt="" className="w-10 h-5" />
        </div>

        <h2 className="text-lg font-semibold text-center text-gray-800 mb-2">Login to SonaSutra</h2>
        <p className="text-xs text-gray-600 text-center mb-4">
          Login to unlock best prices and become an insider for our exclusive launches & offers.
        </p>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-2 rounded-lg text-sm "
          >
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
          {error && <div className="text-red-500 text-xs text-center">{error}</div>}
        </div>

        <div className="mt-4 text-center text-xs text-gray-600">
          New to SonaSutra? <a href="/sign-up" className="text-[#ca8a04] hover:text-purple-600 font-medium">Create an Account</a>
        </div>

        <p className="mt-4 text-center text-[10px] text-gray-400">
          By continuing, you agree to our <a href="/terms-and-conditions" className="text-[#ca8a04]">terms</a> & <a href="terms-and-conditions" className="text-[#ca8a04]">privacy policy</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
