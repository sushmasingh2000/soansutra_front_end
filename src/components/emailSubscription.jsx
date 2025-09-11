import React, { useState } from 'react';
import { apiConnectorPost } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';
import toast from 'react-hot-toast';

export default function CaratLaneSignup() {
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('1');

  const handleSubmit = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.", { id: "signup-toast" });
      return;
    }
    const reqbody = { email, gender };
    try {
      const response = await apiConnectorPost(endpoint?.email_insider, reqbody);
      toast(response?.data?.message);
      setEmail('');
      setGender('1');
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };
  const genderOptions = [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
    { label: 'Other', value: '3' },
  ];
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6">
      <div className="w-full px-6 sm:px-8 md:px-10 py-6 sm:py-8 rounded-2xl bg-yellow-700 "
        >
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left Content */}
          <div className="flex items-center gap-2 text-left">
            <img
              src="https://assets.cltstatic.com/images/responsive/purple-gift-icon.png"
              alt="Gift Icon"
              className="w-16 h-16 md:w-20 md:h-20"
            />
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Join SonaSutra Insider
              </h1>
              <p className="text-sm md:text-base text-gray-200">
                To discover enticing deals, latest arrivals, & more
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full max-w-xs md:max-w-sm flex-shrink-0">
            <div className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-800 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-purple-400 text-sm"
              />

              <button
                onClick={handleSubmit}
                className='w-full text-white font-medium py-2.5 rounded-lg transition-all duration-200 text-sm'
                style={{ background: "linear-gradient(to left, #facc15, #ca8a04)" }}
              >
                Submit
              </button>


              <div className="flex items-center justify-center gap-4 pt-1">
                {genderOptions.map(({ label, value }) => (
                  <div
                    key={value}
                    className="flex items-center cursor-pointer"
                    onClick={() => setGender(value)}
                    aria-label={`Select gender ${label}`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${gender === value ? 'bg-white' : 'bg-transparent'}`}>
                      {gender === value && <div className="w-2 h-2 rounded-full bg-yellow-600"></div>}
                    </div>
                    <span className="ml-2 text-white text-sm">{label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
