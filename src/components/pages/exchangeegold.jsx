

import React from 'react';
import NavigationBar from '../navigationbar';
import Footer from '../Footer1';
import EgoldHeader from '../egoldheader';
import Header from '../Header1';
import ExchangeRedeemFAQ from '../faqexchangegold';
import { useQuery } from 'react-query';
import { apiConnectorGet, usequeryBoolean } from '../../utils/ApiConnector';
import { endpoint } from '../../utils/APIRoutes';

const ExchangeRedeemComponent = () => {
  const { data } = useQuery(
    ["get_master_material_price_sell"],
    () => apiConnectorGet(endpoint.get_master_material_price),
    usequeryBoolean
  );
  const get_price = data?.data?.result?.[0] || {};

  return (

    <div className="w-full bg-gray-50 min-h-screen">
      {/* Desktop View */}
      <Header />
      {/* <NavigationBar /> */}
      <EgoldHeader />
      <div className="hidden lg:block max-w-6xl mx-auto p-6">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-12">Exchange / Redeem</h1>

        {/* Main Process Flow */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="flex items-center justify-between">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="relative mb-4 w-[89px] h-[92px]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'url(/image/jewellery.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </div>
              <p className="text-gray-700 font-medium max-w-40">
                Add to cart any Gold coin(s) or Jewellery
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="mx-8">
              <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="relative mb-4 w-[89px] h-[92px]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'url(/image/hand.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </div>
              <p className="text-gray-700 font-medium max-w-40">
                Pay by Digital Gold option at Checkout
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="mx-8">
              <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="relative mb-4 w-[89px] h-[92px]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'url(/image/delivery.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </div>
              <p className="text-gray-700 font-medium max-w-48">
                Get it delivered at your Doorstep, free of cost!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section Desktop */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <button className="px-6 py-3 border border-yellow-300 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors">
                View Jewellery designs
              </button>
              <span className="text-gray-500 font-medium">OR</span>
              <button className="px-6 py-3 border border-yellow-300 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors">
                View all Gold coins
              </button>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 flex items-start gap-3 max-w-lg">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-600 text-sm">
                  You can also Redeem your Gold Balance online as well as offline stores of
                  SonaSutra & our Jewellery Partner
                </p>
              </div>
              <button className="text-yellow-600 text-sm font-medium hover:text-yellow-700 flex items-center gap-1 whitespace-nowrap">
                Exchange History
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm ml-8 min-w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">EXCHANGE Rate</h3>
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">i</span>
              </div>
            </div>

            <div className="mb-2">
              <span className="text-sm text-gray-500">Price valid for </span>
              <span className="text-sm text-red-500 font-medium">3 : 11 min</span>
            </div>

            <div className="text-2xl font-bold text-gray-800 mb-1">
              {Number(get_price?.ma_price_per_unit).toFixed(2)} /gram
              {/* ₹{(
                Number(get_price?.ma_price) +
                (Number(get_price?.ma_price) * Number(get_price?.ma_sell_tax_percentage) / 100)
              ).toFixed(2)} /gram */}
            </div>

            <div className="text-sm text-gray-600">
              24K 99.99% Purity
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {/* Header */}
        <div className="p-4 bg-white">
          <h1 className="text-2xl font-bold text-gray-800">Exchange / Redeem</h1>
        </div>

        {/* Mobile Process Flow - Vertical */}
        <div className="bg-gray-50 p-4">
          <div className="bg-white rounded-xl p-6 mb-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-4 w-[89px] h-[92px]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'url(/image/jewellery.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </div>
              <p className="text-gray-700 font-medium text-center max-w-48">
                Add to cart any Gold coin(s) or Jewellery
              </p>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center mb-8">
              <svg className="w-6 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-4 w-[89px] h-[92px]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'url(/image/hand.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </div>
              <p className="text-gray-700 font-medium text-center max-w-48">
                Pay by Digital Gold option at Checkout
              </p>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center mb-8">
              <svg className="w-6 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4 w-[89px] h-[92px]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'url(/image/delivery.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </div>
              <p className="text-gray-700 font-medium text-center max-w-48">
                Get it delivered at your Doorstep, free of cost!
              </p>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="space-y-4 mb-6">
            <button className="w-full py-3 px-4 border border-yellow-300 text-yellow-600 rounded-lg bg-white hover:bg-yellow-50 transition-colors">
              View Jewellery designs
            </button>
            <div className="text-center text-gray-500 font-medium">OR</div>
            <button className="w-full py-3 px-4 border border-yellow-300 text-yellow-600 rounded-lg bg-white hover:bg-yellow-50 transition-colors">
              View all Gold coins
            </button>
          </div>

          {/* Mobile Info Box */}
          <div className="bg-yellow-50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-3">
                  You can also Redeem your Gold Balance online as well as offline stores of
                  SonaSutra & our Jewellery Partner
                </p>
                <button className="text-yellow-600 text-sm font-medium hover:text-yellow-700 flex items-center gap-1">
                  Exchange History
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Exchange Rate */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">EXCHANGE Rate</h3>
              <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">i</span>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-4">
              Price is only valid for 5 mins
            </div>

            <button className="w-full py-3 px-4 border border-yellow-300 text-yellow-600 rounded-lg bg-white hover:bg-yellow-50 transition-colors">
              Refresh Gold Rate
            </button>
          </div>
        </div>
      </div>
      <ExchangeRedeemFAQ />
      <Footer />
    </div>
  );
};

export default ExchangeRedeemComponent;