import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';

export default function ViewMyVault() {
  const navigate = useNavigate();
  const { data } = useQuery(
    ["profile"],
    () => apiConnectorGet(endpoint?.get_customer_profile),
    usequeryBoolean
  );

  const profileData = data?.data?.result || [];
  return (
    <div className=" bg-gray-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg border border-yellow-200 p-4 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
            <h1 className="text-base text-gray-800">Hi {profileData?.name}</h1>
            <div className="w-px h-6 bg-yellow-300 hidden sm:block"></div>
            <div className="flex items-center justify-between sm:justify-start gap-2">
              <span className="text-gray-700 text-sm">Gold balance - {profileData?.gold_wallet}gms</span>
              <div
                className="inline-block ml-4 sm:ml-8 transform scale-75"
                style={{
                  width: '54px',
                  height: '54px',
                  background: 'url(https://assets.cltstatic.com/images/responsive/spriteImage1.png?v2.0) -343px -1273px / 832px no-repeat'
                }}
              ></div>
            </div>
          </div>
          <button
            className="px-4 py-2 rounded-lg text-black text-sm  bg-gradient-to-r from-yellow-400 to-yellow-600"

          >
            View my Vault
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Know More Section */}
            <div>
              <p className="text-yellow-500 text-sm mb-3">Know More</p>
              <h2 className="text-2xl lg:text-3xl text-gray-900 leading-tight mb-6">
                Invest in a high-payoff digital gold. Buy, sell, or redeem your SonaSutra eGold in exchange for beautiful jewellery.
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="px-6 py-2.5 rounded-lg text-black text-base bg-gradient-to-r from-yellow-400 to-yellow-600"

                  onClick={() => navigate('/buy-gold')} >
                  Buy eGold Now
                </button>
                <button className="flex items-center justify-center lg:justify-start gap-2 text-gray-700 text-sm">
                  How to redeem?
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6 lg:pl-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-start gap-4">
              <div className="flex-shrink-0">
                <div
                  className="inline-block w-[89px] h-[92px]"
                  style={{
                    backgroundImage: 'url(/image/jewellery.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </div>
              <div>
                <h3 className="text-lg text-gray-900 mb-2">Unparalleled convenience</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Buy in-store or online 24×7. Purchase gold online or offline through one of our jewellery stores.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-start gap-4">
              <div className="flex-shrink-0">
                <div
                 className="inline-block w-[89px] h-[92px]"
                 style={{
                    backgroundImage: 'url(/image/hand.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </div>
              <div>
                <h3 className="text-lg text-gray-900 mb-2">What you buy is what you get</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  No carrying cost or hidden charges. Every gram of SonaSutra eGold you buy online is backed by real gold deposits worth the same.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-start gap-4">
              <div className="flex-shrink-0">
                <div
                   className="inline-block w-[89px] h-[92px]"
                 style={{
                    backgroundImage: 'url(/image/delivery.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </div>
              <div>
                <h3 className="text-lg text-gray-900 mb-2">100% guaranteed buyback</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Redeem your SonaSutra eGold balance across our 330+ online stores and physical outlets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}