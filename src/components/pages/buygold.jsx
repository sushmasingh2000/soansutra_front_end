import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from '../../utils/ApiConnector';
import { endpoint } from '../../utils/APIRoutes';
import EgoldHeader from '../egoldheader';
import FAQBuyGold from '../faqbuygold';
import Footer from '../Footer1';
import Header from '../Header1';
import NavigationBar from '../navigationbar';
import toast from 'react-hot-toast';

const BuyGold = () => {
  const [amount, setAmount] = useState('');
  const [paymentlink, setPaymentLink] = useState("")
  const [grams, setGrams] = useState('');
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 54); // 4 minutes 54 seconds in seconds

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
  };

  // Calculate amount when grams change
  const handleGramsChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setGrams(value);

    if (value === '') {
      setAmount('');
      return;
    }

  };

  const { data } = useQuery(
    ["get_master_material_price"],
    () => apiConnectorGet(endpoint.get_master_material_price),
    usequeryBoolean
  );
  const get_price = data?.data?.result?.[0] || {};

  const unitPrice = Number(get_price.ma_price_per_unit) || 0;
  const gstPercent = Number(get_price.ma_buy_tax_percentage) || 0;
  const material_weight = unitPrice > 0 ? (amount / unitPrice).toFixed(4) : "0";
  const weightNum = Number(material_weight);
  const basePrice = unitPrice * weightNum;
  const gstAmount = basePrice * (gstPercent / 100);
  const total_price = (basePrice + gstAmount).toFixed(4);

  const buygoldFn = async()=>{
    try{
      const res= await apiConnectorPost(endpoint?.create_egold_price , {
        req_amount : amount,
        u_payment_method : 1
      })
      toast(res?.data?.message)
      const qr_url = (res?.data?.result && res?.data?.result?.payment_url) || "";
      if (qr_url) {
        setPaymentLink(qr_url);
      } else {
        res?.data?.message ? toast(res?.data?.message) : toast("Something went wrong");
      }

    }
    
    catch(e){
      console.log("something went wrong")
    }
  }

  if (paymentlink) {
    return (
      document.location.href=paymentlink
    );
  }
  return (
    <>
      <Header />
      <NavigationBar />
      <EgoldHeader />
      <div className="w-full bg-white-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-7xl">

          {/* Desktop View */}
          <div className="w-full hidden md:flex flex-col">
            <h2 className="text-3xl font-bold mb-4 text-yellow-900">Buy Gold</h2>
            <div className="flex flex-row space-x-4">
              <div className="bg-white rounded-lg p-6 shadow w-3/5">
                <div className="flex flex-row justify-between mb-2 text-gray-600 text-sm">
                  <span>Buy Gold by Amount</span>

                </div>
                <div className="flex flex-row items-center mb-2">
                  <div className="border border-yellow-300 rounded p-2 mr-2 flex items-center">
                    <span className="text-lg mr-2">₹</span>
                    <input
                      type="text"
                      className="w-32 outline-none"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </div>
                  <span className="mx-2">=</span>
                  <div className="border border-yellow-300 rounded p-2 mr-2 flex items-center">
                    <input
                      type="text"
                      className="w-32 outline-none"
                      value={material_weight}
                      onChange={handleGramsChange}
                    />
                  </div>
                  <span className="text-sm text-gray-600 ml-2">gms</span>
                  <button
                    className=" bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-2 px-4 rounded ml-2"
                    onClick={buygoldFn}
                  >
                    Proceed to Buy
                  </button>
                </div>
                <p className="text-xs text-gray-500 ml-2">Inclusive of {Number(get_price?.ma_buy_tax_percentage)?.toFixed(0, 2)}% GST</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow w-1/5">
                <h3 className="text-lg font-semibold mb-2">Buy Rate</h3>
                <p className="text-red-500">₹{Number(total_price).toFixed(2)}/gram</p>
                <p className="text-xs text-gray-500"><span>{Number(get_price?.ma_price).toFixed(2)}</span> + {Number(get_price?.ma_buy_tax_percentage)?.toFixed(0, 2)}% GST</p>
                <p className="text-xs text-gray-500">Price valid for {formatTime(timeLeft)} min</p>
                <p className="text-xs text-gray-500">24K 99.99% Purity</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow w-1/5">
                <div className="vault-icon w-12 h-12 bg-[url('https://assets.cltstatic.com/images/responsive/spriteImage1.png?v2.0')] bg-no-repeat bg-[position:-343px_-1273px] bg-[size:832px_auto] cursor-default mb-2 mx-auto"></div>
                <h3 className="text-lg font-semibold mb-2 text-yellow-600">Gold Balance</h3>
                <p className="text-lg">0.00 gms</p>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-4">
              <div className="flex items-center bg-yellow-100 rounded p-2 text-yellow-800 w-3/5">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
                <span>The minimum buy amount to purchase SonaSutra eGold is ₹10</span>
              </div>
              <div className="w-1/5 text-right pr-6">
                <button className="text-yellow-500 text-sm">Check Buy History →</button>
              </div>
              <div className="w-1/5 text-right">
                <button className="text-yellow-500 text-sm">Redeem Gold →</button>
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-yellow-900">Buy Gold</h2>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex flex-col mb-2 text-gray-600 text-sm">
                <span>Buy Gold by Amount</span>
              </div>
              <div className="flex flex-row items-center mb-2">
                <div className="border border-yellow-300 rounded p-2 mr-2 flex items-center">
                  <span className="text-lg mr-2">₹</span>
                  <input
                    type="text"
                    className="w-full outline-none"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>
                <span className="mx-2">=</span>
                <div className="border border-yellow-300 rounded p-2 mr-2 flex items-center">
                  <input
                    type="text"
                    className="w-full outline-none"
                    value={(material_weight)}
                    onChange={handleGramsChange}
                  />
                </div>
                <span className="text-sm text-gray-600 ml-2">gms</span>
              </div>
              <button
                className=" bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-2 px-4 rounded w-full mb-2"
                onClick={buygoldFn}
              >
                Proceed to Buy
              </button>
              <p className="text-xs text-gray-500 mb-2">Inclusive of {Number(get_price?.ma_buy_tax_percentage)?.toFixed(0, 2)}% GST</p>
            </div>
            <div className="flex items-center bg-yellow-100 rounded p-2 text-yellow-800 mt-4 mb-4">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              <span>The minimum buy amount to purchase SonaSutra eGold is ₹10</span>
            </div>
            <div className="bg-white rounded-lg p-4 shadow mb-4">
              <h3 className="text-lg font-semibold mb-2">Buy Rate</h3>
              <p className="text-red-500">₹{Number(total_price).toFixed(2)}/gram</p>
              <p className="text-xs text-gray-500">(₹{Number(get_price?.ma_price).toFixed(2)} + {Number(get_price?.ma_buy_tax_percentage)?.toFixed(0, 2)}% GST)</p>
              <p className="text-xs text-gray-500">Priced fo valir {formatTime(timeLeft)} min</p>
              <p className="text-xs text-gray-500">24K 99.99% Purity</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow mb-4">
              <div className="vault-icon w-12 h-12 bg-[url('https://assets.cltstatic.com/images/responsive/spriteImage1.png?v2.0')] bg-no-repeat bg-[position:-343px_-1273px] bg-[size:832px_auto] cursor-default mb-2 mx-auto"></div>
              <h3 className="text-lg font-semibold mb-2 text-yellow-600">Gold Balance</h3>
              <p className="text-lg">0.00 gms</p>
              <button className="text-yellow-500 text-sm mt-2">Redeem Gold →</button>
              <button className="text-yellow-500 text-sm mt-2 ml-4">Check Buy History →</button>
            </div>
          </div>
        </div>
      </div>
      <FAQBuyGold />
      <Footer />
    </>
  );
};

export default BuyGold;