import React from 'react';
import Footer from './Footer1';
import Header from './Header1';
import NavigationBar from './navigationbar';
import EgoldHeader from './egoldheader';
import { useQuery } from 'react-query';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';
import { Link, useNavigate } from 'react-router-dom';

const GoldLockerUI = () => {
    // Hardcoded data
    const goldAmount = '0';
    const currentValue = '₹0';
    // const valueChange = '+₹0 (0%)';

    const token = localStorage.getItem("token");

    const { data: profile } = useQuery(
        ["profile"],
        () => apiConnectorGet(endpoint?.get_customer_profile),
        {
          ...usequeryBoolean,
          enabled: !!token,
        }
      );
    
      const profileData = profile?.data?.result || [];

      const navigate = useNavigate();
    return (
        <>
            <Header />
            <NavigationBar />
            <EgoldHeader />
            <div className=" max-w-2xl bg-white font-sans antialiased align-items-center justify-center mx-auto min-h-screen flex flex-col  rounded-xl border border-yellow-200">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-yellow-200 bg-white">
                    <button className="text-gray-500 hover:text-gray-700">

                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">Your Gold Locker</h1>
                    <button className="text-gray-500 hover:text-gray-700">

                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-4 py-6">
                    {/* Gold Locker Card */}
                    <div className="bg-amber-50 rounded-xl p-6 mb-6 relative overflow-hidden">
                        {/* Sparkle overlay - subtle */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-300/20 to-transparent rounded-full"></div>
                        <h2 className="text-sm font-medium text-gray-600 mb-2">Gold in Locker</h2>
                        <div className="flex items-baseline justify-between mb-4">
                            <div className="text-3xl font-bold text-gray-900">{profileData?.gold_wallet} gm</div>
                            <div className="text-sm text-gray-500">Og</div>
                        </div>
                        <div className="flex items-baseline justify-between mb-6">
                            <span className="text-sm font-medium text-gray-600">Current Value</span>
                            <div className="text-xl font-bold text-green-600 flex items-baseline">
                                {profileData?.wallet_status?.current_inr_value}
                                <span className="ml-1 text-sm text-green-600">({`+₹${profileData?.wallet_status?.inr_increase} (${profileData?.wallet_status?.percent_increase}%)`})</span>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <Link to={"/view-e-gold-history"} className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
                                View All transactions
                            </Link>
                            <button className="flex-1 bg-yellow-600 text-black py-3 px-4 rounded-lg text-sm font-medium hover:bg-yellow-700"
                            onClick={()=>navigate("/buy-gold")}>
                                Buy more Gold
                            </button>
                        </div>
                    </div>

                    {/* Bottom Navigation / Carousel Indicators */}
                    <div className="flex items-center justify-between mb-4">
                        <button className="w-6 h-6  rounded-full flex items-center justify-center text-white text-xs">

                        </button>
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                        <button className="w-6 h-6  rounded-full flex items-center justify-center text-black text-xs ">

                        </button>
                    </div>

                    {/* SIP Card */}
                    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-yellow-100">
                        <div className="flex items-start space-x-3 mb-3">
                            <div className="flex-shrink-0">
                                {/* Placeholder for illustration - in real app, use SVG or img */}
                                <div className="w-12 h-12 bg-gradient-to-br from-yellow-800 to-red-300 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">🌱</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-900 mb-1">Grow your gold reserve with SIP</h3>
                                <p className="text-xs text-gray-600">Buy Gold of desired amount automatically every month</p>
                            </div>
                        </div>
                        <button className="w-full bg-yellow-600 text-black py-2 px-4 rounded-lg text-sm font-medium hover:bg-yellow-700">
                            SET UP SIP
                        </button>
                    </div>

                    {/* Sell Gold Card */}
                    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-yellow-100">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-white-100 rounded-lg flex items-center justify-center">
                                <div className="flex-shrink-0 w-[65px] h-[65px] bg-white rounded-lg flex items-center justify-center overflow-hidden">
                                <img
                                    src="/image/jewellery.png"
                                    alt="Sonasutra Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-900">Sell Gold</h3>
                            </div>
                        </div>
                        <button className="w-full bg-yellow-600 text-black py-2 px-4 rounded-lg text-sm font-medium
                         hover:bg-yellow-700"
                         onClick={()=>navigate("/sell-gold")}>

                            Sell Gold →
                        </button>
                    </div>

                    {/* Get Delivery Card */}
                    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-yellow-100">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-white-100 rounded-lg flex items-center justify-center">
                               <div className="flex-shrink-0 w-[65px] h-[65px] bg-white rounded-lg flex items-center justify-center overflow-hidden">
                                <img
                                    src="/image/delivery.png"
                                    alt="Sonasutra Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-900">Get Delivery</h3>
                                <p className="text-xs text-gray-600">automatically</p>
                            </div>
                        </div>
                        <button className="w-full bg-yellow-600 text-black py-2 px-4 rounded-lg text-sm font-medium hover:bg-yellow-700">
                            Get Delivery →
                        </button>
                    </div>

                    {/* Convert to Jewellery Card */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-100 relative overflow-hidden">
                        {/* Purple accent overlay */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full"></div>
                        <div className="flex items-center space-x-3 mb-3 relative z-10">
                            <div className="flex-shrink-0 w-[65px] h-[65px] bg-white rounded-lg flex items-center justify-center overflow-hidden">
                                <img
                                    src="/image/hand.png"
                                    alt="Sonasutra Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-gray-900">
                                    Convert to Sonasutra Jewellery
                                </h3>
                            </div>
                        </div>

                        <button className="w-full bg-yellow-600 text-black py-2 px-4 rounded-lg text-sm font-medium hover:bg-yellow-700 relative z-10">
                            Convert to Sonasutra Jewellery →
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default GoldLockerUI;