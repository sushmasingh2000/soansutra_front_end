
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { endpoint } from '../../utils/APIRoutes';
import Footer from "../Footer1";
import NavigationBar from '../navigationbar';
import Header from '../Header1';
import LoginModal from '../pages/LoginPage';
import logo from '../../assets/desklogo.png';
import { useNavigate } from 'react-router-dom';

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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
      errors.push('Please enter a valid 10-digit mobile number');
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
  const navigate = useNavigate()
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
        setSuccess(true);
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

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  if (success) {
    return (
      <>
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">Welcome to SonaSutra!</h2>
            <p className="text-black mb-6">Your account has been created successfully.</p>
            <button
              onClick={openLoginModal}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
            >
              Continue to Login
            </button>
          </div>
        </div>
        <Footer />
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      </>
    );
  }

  return (
    <>
      <Header />
      <NavigationBar />
      <div className="bg-white flex items-center justify-center p-2">
        <div className="w-full max-w-md rounded-lg overflow-hidden">
          <div className="p-3 sm:p-4">
            <div className="text-center mb-3">
              <div className="flex justify-center mb-6">
                <div className="flex-shrink-0 pl-2">
                  <img src={logo} alt="" className="w-20 h-10" />
                </div>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-black mb-1">
                Signup with SonaSutra
              </h1>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <div className="w-full">
                <label className="block text-xs font-medium text-black mb-1">
                  Mobile Number *
                </label>
                <div className="flex w-full">
                  <div className="flex items-center bg-white border border-gray-300 rounded-l-lg px-2 py-3 border-r-0 min-w-0 flex-shrink-0">
                    <span className="text-xs font-medium text-black mr-1">IN</span>
                    <span className="text-xs text-black mr-1">+91</span>
                    <svg className="w-3 h-3 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="flex-1 min-w-0 px-2 py-2 border bg-white border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-xs text-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-black mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-xs text-black"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-black mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-xs text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-black mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-xs text-black"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-black mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-xs text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-black mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-xs text-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-black mb-1">
                  Invitation Code (Optional)
                </label>
                <input
                  type="text"
                  name="invitationCode"
                  placeholder="Enter invitation code"
                  value={formData.invitationCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-xs text-black"
                />
                <p className="text-xs text-gray-600 mt-0.5">
                  Get extra rewards with a valid invitation code
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-black mb-2">
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
                        className="w-3 h-3 text-yellow-500 border-gray-400 focus:ring-yellow-500"
                        required
                      />
                      <span className="ml-1.5 text-xs text-black">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-xs text-black text-center leading-relaxed">
                  By continuing you acknowledge that you are at least 18 years old and have read and agree to SonaSutra's{' '}
                  <a href="/terms-and-conditions" className="text-yellow-600 hover:text-yellow-700 underline">terms and conditions</a>
                  {' '}&{' '}
                  <a href="/terms-and-conditions" className="text-yellow-600 hover:text-yellow-700 underline">privacy policy</a>.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-3 rounded-lg transition-all duration-200 text-xs shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SIGNING UP...
                  </div>
                ) : (
                  'SIGN ME UP'
                )}
              </button>

              <div className="flex justify-center items-center pt-3 border-t border-gray-300">
                <span className="text-black text-xs">Already have an account? </span>
                <button
                  onClick={openLoginModal}
                  className="text-yellow-600 text-xs font-medium hover:text-yellow-700 transition-colors duration-200 ml-1"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default SignUpPage;