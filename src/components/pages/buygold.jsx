import React, { useState, useEffect } from 'react';
import EgoldHeader from '../egoldheader';
import Header from '../Header1';
import { Navigation } from 'lucide-react';
import NavigationBar from '../navigationbar';
import Footer from '../Footer1';

const BuyGold = () => {
  const [amount, setAmount] = useState('');
  const [grams, setGrams] = useState('');
  const [buyRate, setBuyRate] = useState(10670.19); // Price per gram including GST
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 46); // 4 minutes 46 seconds in seconds

  // Update timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate grams when amount changes
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
    
    if (value === '') {
      setGrams('');
      return;
    }
    
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      const calculatedGrams = numericValue / buyRate;
      setGrams(calculatedGrams.toFixed(4));
    }
  };

  // Calculate amount when grams change
  const handleGramsChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setGrams(value);
    
    if (value === '') {
      setAmount('');
      return;
    }
    
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      const calculatedAmount = numericValue * buyRate;
      setAmount(calculatedAmount.toFixed(2));
    }
  };

  // Validate before proceeding to buy
  const handleProceedToBuy = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount < 10) {
      alert('Minimum purchase amount is ₹10');
      return;
    }
    
    // Proceed with the purchase logic here
    alert(`Proceeding to buy ${grams}g of gold for ₹${amount}`);
  };

  return (
    <>
      <Header />
      <NavigationBar />
      <EgoldHeader />
      <div className="w-full bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-7xl">

          {/* Desktop View */}
          <div className="w-full hidden md:flex flex-col md:flex-row justify-between items-start">
            <div className="w-full md:w-2/3 p-4">
              <h2 className="text-2xl font-bold mb-4">Buy Gold</h2>
              <div className="flex flex-col md:flex-row items-center mb-4">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <label className="block text-sm font-medium mb-2">Buy Gold by Amount</label>
                  <div className="flex items-center border rounded-lg p-2">
                    <span className="text-lg mr-2">₹</span>
                    <input 
                      type="text" 
                      className="w-full outline-none" 
                      placeholder="Enter amount"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 md:ml-4">
                  <label className="block text-sm font-medium mb-2">or Buy in Grams</label>
                  <div className="flex items-center border rounded-lg p-2">
                    <input 
                      type="text" 
                      className="w-full outline-none" 
                      placeholder="gms"
                      value={grams}
                      onChange={handleGramsChange}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-4">Inclusive of 3% GST</p>
              <button 
                className="w-full bg-gradient-to-r from-[#de57e5] to-[#8863fb] text-white py-2 rounded-lg mb-4"
                onClick={handleProceedToBuy}
              >
                Proceed to Buy
              </button>
              <div className="flex items-center text-yellow-500 bg-yellow-100 p-2 rounded-lg">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
                <span>The minimum buy amount to purchase CaratLane eGold is ₹10</span>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Buy Rate</h3>
                <p className="text-red-500">₹{buyRate.toFixed(2)}/gram</p>
                <p className="text-xs text-gray-500">(₹{(buyRate / 1.03).toFixed(2)} + 3% GST)</p>
                <p className="text-xs text-gray-500">Price valid for {formatTime(timeLeft)} min</p>
                <p className="text-xs text-gray-500">24K 99.99% Purity</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Gold Balance</h3>
                <p className="text-lg">0.00 gms</p>
                <button className="text-[#de57e5] text-sm mt-2">Redeem Gold &gt;</button>
                <button className="text-[#de57e5] text-sm mt-2 ml-4">Check Buy History &gt;</button>
              </div>
              <div className="vault-icon w-12 h-12 bg-[url('https://assets.cltstatic.com/images/responsive/spriteImage1.png?v2.0')] bg-no-repeat bg-[position:-343px_-1273px] bg-[size:832px_auto] cursor-default mb-3"></div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Buy Gold</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Buy Gold by Amount</label>
              <div className="flex items-center border rounded-lg p-2">
                <span className="text-lg mr-2">₹</span>
                <input 
                  type="text" 
                  className="w-full outline-none" 
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">or Buy in Grams</label>
              <div className="flex items-center border rounded-lg p-2">
                <input 
                  type="text" 
                  className="w-full outline-none" 
                  placeholder="gms"
                  value={grams}
                  onChange={handleGramsChange}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-4">Inclusive of 3% GST</p>
            <button 
              className="w-full bg-gradient-to-r from-[#de57e5] to-[#8863fb] text-white py-2 rounded-lg mb-4"
              onClick={handleProceedToBuy}
            >
              Proceed to Buy
            </button>
            <div className="flex items-center text-yellow-500 bg-yellow-100 p-2 rounded-lg mb-4">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              <span>The minimum buy amount to purchase CaratLane eGold is ₹10</span>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Buy Rate</h3>
              <p className="text-red-500">₹{buyRate.toFixed(2)}/gram</p>
              <p className="text-xs text-gray-500">(₹{(buyRate / 1.03).toFixed(2)} + 3% GST)</p>
              <p className="text-xs text-gray-500">Price valid for {formatTime(timeLeft)} min</p>
              <p className="text-xs text-gray-500">24K 99.99% Purity</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Gold Balance</h3>
              <p className="text-lg">0.00 gms</p>
              <button className="text-[#de57e5] text-sm mt-2">Redeem Gold &gt;</button>
              <button className="text-[#de57e5] text-sm mt-2 ml-4">Check Buy History &gt;</button>
            </div>
            <div className="vault-icon w-12 h-12 bg-[url('https://assets.cltstatic.com/images/responsive/spriteImage1.png?v2.0')] bg-no-repeat bg-[position:-343px_-1273px] bg-[size:832px_auto] cursor-default mb-3"></div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default BuyGold;