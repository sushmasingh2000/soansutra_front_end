import React, { useEffect, useState } from 'react';
import { Menu, X, User, Package, CreditCard, RefreshCw, Calendar, Gift, UserCircle, Award, Trash2, Key } from 'lucide-react';
import Header from '../Header1';
import NavigationBar from '../navigationbar';
import Footer from '../Footer1';
import { apiConnectorGet, apiConnectorPost } from '../../utils/ApiConnector';
import { endpoint } from '../../utils/APIRoutes';
import toast from 'react-hot-toast';

// Sidebar Component
const Sidebar = ({ activeSection, setActiveSection, isMobileMenuOpen, setIsMobileMenuOpen, userData }) => {
  const menuItems = [
    { id: 'orders', label: 'ORDERS AND RETURNS', icon: Package, section: 'ORDERS' },
    { id: 'payment', label: 'PAYMENT', icon: CreditCard, section: 'ORDERS' },
    { id: 'refunds', label: 'MANAGE REFUNDS', icon: RefreshCw, section: 'ORDERS' },
    { id: 'offers', label: 'COUPONS', icon: Gift, section: 'OFFERS' },
    { id: 'profile', label: 'PROFILE', icon: UserCircle, section: 'ACCOUNTS' },
    { id: 'credits', label: 'XCLUSIVE', icon: Award, section: 'CREDITS' },
    { id: 'egold', label: 'CARATLANE eGold', icon: Award, section: 'CREDITS' },
    { id: 'treasure', label: 'CARATLANE TREASURE CHEST', icon: Gift, section: 'CREDITS' },
  ];

  const sections = ['ORDERS', 'OFFERS', 'ACCOUNTS', 'CREDITS'];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-80 bg-gray-50 border-r border-gray-200 
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        flex flex-col h-full lg:h-auto overflow-y-auto
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontSize: '16px' }}>{userData.name || 'User'}</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-200"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-gray-600 mb-2" style={{ fontSize: '10px' }}>{userData.email || 'No email provided'}</p>
          <button className="text-purple-600 font-medium hover:text-purple-700" style={{ fontSize: '10px' }}>
            Edit Profile
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-4">
          {sections.map(section => (
            <div key={section} className="mb-6">
              <h3 className="px-6 font-semibold text-gray-500 uppercase tracking-wider mb-3" style={{ fontSize: '10px' }}>
                {section}
              </h3>
              {menuItems
                .filter(item => item.section === section)
                .map(item => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`
                        w-full px-6 py-3 text-left flex items-center space-x-3
                        transition-colors duration-200 hover:bg-gray-100
                        ${activeSection === item.id ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600' : 'text-gray-700'}
                      `}
                      style={{ fontSize: '10px' }}
                    >
                      <IconComponent size={14} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Profile Content Component
const ProfileContent = ({ userData, setUserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...userData });
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiConnectorGet(endpoint?.get_customer_profile);
        const { success, result } = response.data;

        if (success) {
          setUserData({
            name: result.name || '',
            email: result.cl_email || '',
            mobile: result.cl_phone || '',
            address: result.address || '',
            pincode: result.pincode || '',
            country: result.country || '',
            state: result.state || '',
            city: result.city || ''
          });

        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);


  // Calculate profile completion percentage
  const calculateProfileCompletion = (data) => {
    const fields = ['name', 'email', 'mobile', 'address', 'pincode', 'country', 'state', 'city'];
    const filledFields = fields.filter(field => data[field] && data[field].toString().trim() !== '');
    return Math.round((filledFields.length / fields.length) * 100);
  };


  const completionPercentage = calculateProfileCompletion(userData);
  const isProfileIncomplete = completionPercentage < 100;

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: editData.name,
        email: editData.email,
        phone: editData.mobile,
        address: editData.address || '',
        city: editData.city || '',
        state: editData.state || '',
        country: editData.country || '',
        pincode: editData.pincode
      };

      const response = await apiConnectorPost(endpoint.update_customer_profile, payload);
      toast(response?.data?.message);
      if (response?.data?.success) {
        setUserData(editData);
        setIsEditing(false);

      } else {
        toast.error(response?.data?.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("An error occurred while updating.");
    }
  };


  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Reward Banner - Only show if profile is incomplete */}
      {isProfileIncomplete && (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 md:p-6 rounded-t-lg border-b">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontSize: '14px' }}>
                Complete your profile & get rewards!
              </h3>
              <p className="text-gray-600" style={{ fontSize: '10px' }}>
                Don't miss out on EXTRA discounts! Update your profile details now and get instant xClusive Points,
                and an Extra 5%* off during your Birthday and Anniversary months! *T&CA.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h2 className="font-semibold text-gray-800" style={{ fontSize: '16px' }}>Your Profile</h2>
            <p className="text-purple-600 font-medium" style={{ fontSize: '12px' }}>{completionPercentage}% Complete</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 self-start sm:self-auto"
              style={{ fontSize: '10px' }}
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                style={{ fontSize: '10px' }}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200"
                style={{ fontSize: '10px' }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <div className="p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '10px' }}>NAME</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ fontSize: '10px' }}
                placeholder="Enter your name"
              />
            ) : (
              <div className={`p-3 rounded-lg ${userData.name ? 'text-gray-900 bg-gray-50' : 'text-gray-400 bg-gray-50'}`} style={{ fontSize: '10px' }}>
                {userData.name || '-'}
              </div>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '10px' }}>EMAIL</label>
            {isEditing ? (
              <input
                type="email"
                value={editData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent break-all"
                style={{ fontSize: '10px' }}
                placeholder="Enter your email"
              />
            ) : (
              <div className={`p-3 rounded-lg break-all ${userData.email ? 'text-gray-900 bg-gray-50' : 'text-gray-400 bg-gray-50'}`} style={{ fontSize: '10px' }}>
                {userData.email || '-'}
              </div>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '10px' }}>MOBILE NO.</label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.mobile || ''}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ fontSize: '10px' }}
                placeholder="Enter your mobile number"
              />
            ) : (
              <div className={`p-3 rounded-lg ${userData.mobile ? 'text-gray-900 bg-gray-50' : 'text-gray-400 bg-gray-50'}`} style={{ fontSize: '10px' }}>
                {userData.mobile || '-'}
              </div>
            )}
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '10px' }}>Address</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ fontSize: '10px' }}
              />
            ) : (
              <div className={`p-3 rounded-lg ${userData.address ? 'text-gray-900 bg-gray-50' : 'text-gray-400 bg-gray-50'}`} style={{ fontSize: '10px' }}>
                {userData.address || '-'}
              </div>
            )}
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '10px' }}>PINCODE</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.pincode || ''}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ fontSize: '10px' }}
                placeholder="Enter your pincode"
              />
            ) : (
              <div className={`p-3 rounded-lg ${userData.pincode ? 'text-gray-900 bg-gray-50' : 'text-gray-400 bg-gray-50'}`} style={{ fontSize: '10px' }}>
                {userData.pincode || '-'}
              </div>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '10px' }}>City</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.city || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ fontSize: '10px' }}
              />
            ) : (
              <div className={`p-3 rounded-lg ${userData.city ? 'text-gray-900 bg-gray-50' : 'text-gray-400 bg-gray-50'}`} style={{ fontSize: '10px' }}>
                {userData.city || '-'}
              </div>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '10px' }}>Country</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.country || ''}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ fontSize: '10px' }}
              />
            ) : (
              <div className={`p-3 rounded-lg ${userData.country ? 'text-gray-900 bg-gray-50' : 'text-gray-400 bg-gray-50'}`} style={{ fontSize: '10px' }}>
                {userData.country || '-'}
              </div>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '10px' }}>State</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.state || ''}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                style={{ fontSize: '10px' }}
                placeholder="Enter your state"
              />
            ) : (
              <div className={`p-3 rounded-lg ${userData.state ? 'text-gray-900 bg-gray-50' : 'text-gray-400 bg-gray-50'}`} style={{ fontSize: '10px' }}>
                {userData.state || '-'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="p-4 md:p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2" style={{ fontSize: '10px' }}>
            <Key size={14} />
            <span>Change Password</span>
          </button>
          <button className="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center justify-center space-x-2" style={{ fontSize: '10px' }}>
            <Trash2 size={14} />
            <span>Delete My Account</span>
          </button>
        </div>
      </div> */}
    </div>
  );
};

// Placeholder Content Component
const PlaceholderContent = ({ title }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Package className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="font-semibold text-gray-800 mb-2" style={{ fontSize: '16px' }}>{title}</h3>
      <p className="text-gray-600" style={{ fontSize: '12px' }}>This section is under development</p>
    </div>
  );
};

// Mock Header Component (since original imports aren't available)

// Main Dashboard Component
const ProfileDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize empty user data
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
    pincode: '',
    country: '',
    state: '',
    city: ''
  });


  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileContent userData={userData} setUserData={setUserData} />;
      case 'orders':
        return <PlaceholderContent title="Orders & Returns" />;
      case 'payment':
        return <PlaceholderContent title="Payment" />;
      case 'refunds':
        return <PlaceholderContent title="Manage Refunds" />;
      case 'offers':
        return <PlaceholderContent title="Coupons" />;
      case 'credits':
        return <PlaceholderContent title="xClusive" />;
      case 'egold':
        return <PlaceholderContent title="CaratLane eGold" />;
      case 'treasure':
        return <PlaceholderContent title="Treasure Chest" />;
      default:
        return <ProfileContent userData={userData} setUserData={setUserData} />;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      profile: 'Profile',
      orders: 'Orders & Returns',
      payment: 'Payment',
      refunds: 'Manage Refunds',
      offers: 'Coupons',
      credits: 'xClusive',
      egold: 'CaratLane eGold',
      treasure: 'Treasure Chest'
    };
    return titles[activeSection] || 'Profile';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <NavigationBar />
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          userData={userData}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile Header */}
          {/* <div className="lg:hidden bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <Menu size={24} />
              </button>
              <h1 className="font-semibold text-gray-800" style={{fontSize: '14px'}}>{getSectionTitle()}</h1>
              <div className="w-10"></div>
            </div>
          </div> */}

          {/* Content Area */}
          <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
              {/* Desktop Header */}
              <div className="hidden lg:block mb-6">
                <h1 className="font-bold text-gray-800" style={{ fontSize: '18px' }}>{getSectionTitle()}</h1>
              </div>

              {/* Dynamic Content */}
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ProfileDashboard;