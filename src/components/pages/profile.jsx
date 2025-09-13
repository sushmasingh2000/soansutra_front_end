import {
  Award,
  ChevronRight,
  CreditCard,
  Gem,
  Home,
  Menu,
  Package,
  RefreshCcw,
  Star,
  Ticket,
  User,
  X
} from 'lucide-react';
import React, { useState } from 'react';

// Import your separate components here
import { useQuery } from 'react-query';
import { apiConnectorGet, usequeryBoolean } from '../../utils/ApiConnector';
import { endpoint } from '../../utils/APIRoutes';
import CouponsContent from '../coupnscontent';
import EGoldContent from '../egoldcontent';
import Footer from '../Footer1';
import Header1 from '../Header1';
import ManageRefundsContent from '../managerefundcontent';
import OrdersContent from '../orderscomponent';
import PaymentContent from '../paymentcontent';
import ProfileContent from '../profilecontent';
import TreasureChestContent from '../treasurechestcontent';
import TryAtHomeContent from '../tryathomecontent';
import XclusiveContent from '../xclusivecontent';
import Distributer from '../distributer';
import { useLocation } from 'react-router-dom';

const ProfileDashboard = () => {
 const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hasTxnParams = searchParams.has('client_txn_id') && searchParams.has('txn_id');
  const defaultTab = hasTxnParams ? 'ORDERS_EXCHANGE' : 'PROFILE';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sidebar navigation items
  const navigationItems = [
    {
      category: 'ORDERS',
      items: [
        { id: 'ORDERS_EXCHANGE', label: 'ORDERS AND EXCHANGE', icon: Package },
        { id: 'PAYMENT', label: 'PAYMENT', icon: CreditCard },
        { id: 'MANAGE_REFUNDS', label: 'MANAGE REFUNDS', icon: RefreshCcw }
      ]
    },
    {
      category: 'DISTRIBUTER',
      items: [
        { id: 'DISTRIBUTER', label: 'DISTRIBUTER', icon: Home }
      ]
    },
    {
      category: 'APPOINTMENTS',
      items: [
        { id: 'TRY_AT_HOME', label: 'TRY AT HOME', icon: Home }
      ]
    },
    {
      category: 'OFFERS',
      items: [
        { id: 'COUPONS', label: 'COUPONS', icon: Ticket }
      ]
    },
    {
      category: 'ACCOUNTS',
      items: [
        { id: 'PROFILE', label: 'PROFILE', icon: User }
      ]
    },
    {
      category: 'CREDITS',
      items: [
        { id: 'XCLUSIVE', label: 'XCLUSIVE', icon: Award },
        { id: 'SonaSutra_EGOLD', label: 'SonaSutra eGold', icon: Gem },
        { id: 'SonaSutra_TREASURE_CHEST', label: 'SonaSutra TREASURE CHEST', icon: Star }
      ]
    }
  ];

  const { data } = useQuery(
    ['profile'],
    () =>
      apiConnectorGet(endpoint?.get_customer_profile),
    usequeryBoolean
  );

  const profileData = data?.data?.result || [];


  // Handle navigation click for mobile
  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'PROFILE':
        return <ProfileContent />;
      case 'ORDERS_EXCHANGE':
        return <OrdersContent />;
      case 'PAYMENT':
        return <PaymentContent />;
      case 'MANAGE_REFUNDS':
        return <ManageRefundsContent />;
      case 'DISTRIBUTER':
        return <Distributer />;
      case 'TRY_AT_HOME':
        return <TryAtHomeContent />;
      case 'COUPONS':
        return <CouponsContent />;
      case 'XCLUSIVE':
        return <XclusiveContent />;
      case 'CARATLANE_EGOLD':
        return <EGoldContent />;
      case 'CARATLANE_TREASURE_CHEST':
        return <TreasureChestContent />;
      default:
        return (
          <div className="p-3 md:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {navigationItems
                .flatMap(category => category.items)
                .find(item => item.id === activeTab)?.label || 'Content'}
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-gray-500 text-sm">Content for {activeTab} will be displayed here</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header1 />

      <div className="max-w-full mx-auto flex">
        {/* Sidebar - Always visible on desktop, toggleable on mobile */}
        <div className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 
          w-80 bg-white border-r border-gray-200 min-w-screen 
          transition-transform duration-300 ease-in-out
        `}>
          {/* Mobile Close Button */}
          <div className="md:hidden flex justify-end p-3 border-b border-gray-200">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-base">{profileData.name}</h3>
            <p className="text-xs text-gray-500">{profileData.cl_email}</p>

          </div>

          {/* Navigation */}
          <div className="py-2">
            {navigationItems.map((category) => (
              <div key={category.category} className="mb-3">
                <h4 className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {category.category}
                </h4>
                <nav className="space-y-0">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${activeTab === item.id
                            ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                      >
                        <div className="flex items-center">
                          <Icon className="w-3 h-3 mr-2" />
                          {item.label}
                        </div>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Backdrop for mobile */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 md:ml-0">
          {/* Mobile Menu Button */}
          <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Menu className="w-5 h-5 mr-2" />
              <span className="text-[16px] font-medium">Menu</span>
            </button>
            <h1 className="text-xs font-semibold text-gray-900">
              {navigationItems
                .flatMap(category => category.items)
                .find(item => item.id === activeTab)?.label || 'Profile'}
            </h1>
          </div>

          {renderContent()}
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default ProfileDashboard;