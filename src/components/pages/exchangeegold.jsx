import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faHandHoldingHeart, faTruck } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header1';
import NavigationBar from '../navigationbar';
import Footer from '../Footer1';
import EgoldHeader from '../egoldheader';
const ExchangeRedeemComponent = () => {
  return (
    <>
    <Header/>
    <NavigationBar/>
    <EgoldHeader/>
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-10 mb-10">
      <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">Exchange / Redeem</h2>
      
      {/* Desktop View */}
      <div className="hidden md:flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <FontAwesomeIcon icon={faSun} className="text-purple-500 text-4xl mb-2" />
          <p className="text-gray-700">Add to cart any Gold coin(s) or Jewellery</p>
        </div>
        <div className="text-purple-500 mx-4 my-2 hidden md:block">→</div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <FontAwesomeIcon icon={faHandHoldingHeart} className="text-yellow-500 text-4xl mb-2" />
          <p className="text-gray-700">Pay by Digital Gold option at Checkout</p>
        </div>
        <div className="text-purple-500 mx-4 my-2 hidden md:block">→</div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <FontAwesomeIcon icon={faTruck} className="text-green-500 text-4xl mb-2" />
          <p className="text-gray-700">Get it delivered at your Doorstep, free of cost!</p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg mb-4">
          <FontAwesomeIcon icon={faSun} className="text-purple-500 text-4xl mb-2" />
          <p className="text-gray-700">Add to cart any Gold coin(s) or Jewellery</p>
        </div>
        <div className="text-purple-500 mb-4">↓</div>
        <div className="text-center p-4 bg-gray-50 rounded-lg mb-4">
          <FontAwesomeIcon icon={faHandHoldingHeart} className="text-yellow-500 text-4xl mb-2" />
          <p className="text-gray-700">Pay by Digital Gold option at Checkout</p>
        </div>
        <div className="text-purple-500 mb-4">↓</div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <FontAwesomeIcon icon={faTruck} className="text-green-500 text-4xl mb-2" />
          <p className="text-gray-700">Get it delivered at your Doorstep, free of cost!</p>
        </div>
      </div>

      {/* Buttons and Info */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <button className="w-full md:w-auto bg-purple-100 text-purple-700 px-4 py-2 rounded-lg mr-2">View Jewellery designs</button>
          <span className="hidden md:inline mx-2">OR</span>
          <button className="w-full md:w-auto bg-purple-100 text-purple-700 px-4 py-2 rounded-lg">View all Gold coins</button>
        </div>
        <div className="w-full md:w-1/2 text-center md:text-right">
          <p className="text-purple-700">You can also Redeem your Gold Balance online as well as offline stores of caratlane & our Jewellery Partner</p>
          <a href="#" className="text-purple-500 underline">Exchange History</a>
        </div>
      </div>

      {/* Exchange Rate */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900">EXCHANGE Rate</h3>
        <p className="text-xl font-bold text-gray-900">₹10055.33/gram</p>
        <p className="text-red-500">Price valid for : 4:43 min</p>
        <p className="text-gray-600">24K 99.99% Purity</p>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default ExchangeRedeemComponent;