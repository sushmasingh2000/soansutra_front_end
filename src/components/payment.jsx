import React, { useEffect, useState } from 'react';
import { apiConnectorGet, apiConnectorPost } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';
import toast from 'react-hot-toast';
import QRScreen from './pages/QRScreen';

const Payment = ({ selectedOrderId }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(true);
  const [OrderData, setOrderData] = React.useState("");
  const [paymentlink, setPaymentLink] = useState("")
  // Current address data
  const [currentAddress, setCurrentAddress] = useState({
    firstName: 'abhishek',
    lastName: 'chaurasia',
    mobile: '7905140270',
    address: 'BETA 1 C-120',
    landmark: '',
    city: 'Gautam buddh nagar',
    pincode: '201308',
    state: 'Uttar Pradesh',
    country: 'India',
    type: 'Home'
  });

  // New address being edited
  const [newAddress, setNewAddress] = useState({ ...currentAddress });

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const countries = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressTypeChange = (type) => {
    setNewAddress(prev => ({
      ...prev,
      type: type
    }));
  };

  const openEditModal = () => {
    setNewAddress({ ...currentAddress });
    setShowEditModal(true);
  };

  const closeAddEditModal = () => {
    setShowEditModal(false);
  };

  const saveAddress = () => {
    setCurrentAddress({ ...newAddress });
    setShowEditModal(false);
  };
  const [defaultAddress, setDefaultAddress] = useState(null);

  const addres_fn = async () => {
    try {
      const response = await apiConnectorGet(endpoint?.get_shipping_Address);
      const addressList = response?.data?.result || [];
      const activeAddress = addressList.find(addr => addr.is_default === "Active");
      if (activeAddress) {
        setDefaultAddress(activeAddress);
      }
    } catch (e) {
      console.log("Error fetching address:", e);
    }
  };
  useEffect(() => {
    addres_fn()
  }, [])

  const order_paymentFn = async () => {
    try {
      const response = await apiConnectorPost(endpoint?.create_order_payment, {
        order_id: selectedOrderId
      });
      toast(response?.data?.message , {id:1})
      const qr_url = (response?.data?.result && response?.data?.result?.payment_url) || "";
      const orderdata = response?.data?.result?.order_id || "";
      if (qr_url) {
        setPaymentLink(qr_url);
        setOrderData(orderdata);
      } else {
        response?.data?.message ? toast(response?.data?.message) : toast("Something went wrong");
      }
    } catch (e) {
      console.log("Error fetching address:", e);
    }
  };

  if (paymentlink) {
    return (
      document.location.href=paymentlink
      // <QRScreen deposit_req_data={paymentlink} OrderData={OrderData} />
    );
  }
  return (
    <>

      <div className="max-w-md mx-auto bg-white p-6 min-h-screen">
        {/* Preferred Payment Options */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Preferred Payment Options</h2>

          {/* Gift Cards Section */}
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-700 mb-3">Gift Cards</h3>

            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-lg p-2 mr-3">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Have a gift card?</p>
                  <p className="text-sm text-gray-600">Avail additional discounts with gift cards</p>
                </div>
              </div>
              <button className="text-purple-500 font-medium text-sm px-3 py-1 hover:bg-purple-100 rounded">
                Add
              </button>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mb-6">
            <h3 className="text-base font-medium text-gray-700 mb-3">Payment Options</h3>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-lg p-2 mr-3">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Pay Online</p>
                  <p className="text-sm text-gray-600">Credit, Debit, Net Banking, UPI & More</p>
                </div>
              </div>
              <div className="bg-purple-500 rounded-full p-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pay Now Button */}
          <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white 
          font-medium py-4 rounded-lg text-lg hover:from-purple-600 hover:to-purple-700 transition-all 
          duration-200 shadow-lg" onClick={order_paymentFn}>
            PAY NOW
          </button>
        </div>

        {/* Delivery Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">{defaultAddress?.address_line1}</p>
              {defaultAddress?.address_line2 && (
                <p className="text-sm text-gray-600 mb-1">{defaultAddress.address_line2}</p>
              )}
              <p className="text-sm text-gray-600 mb-1">
                {defaultAddress?.city}, {defaultAddress?.state}, {defaultAddress?.postal_code}
              </p>
              <p className="text-sm text-gray-600 mb-3">{defaultAddress?.country}</p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Phone:</span> +91 {defaultAddress?.phone_number}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Address Type:</span>{" "}
                <span className="text-blue-600">{defaultAddress?.type || "Default"}</span>
              </p>
            </div>
            {/* <button 
              onClick={openEditModal}
              className="text-purple-500 font-medium text-sm hover:text-purple-600"
            >
              Edit
            </button> */}
          </div>
        </div>

        {/* Gift Options */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-700">No gift wrap added</p>
            <button className="text-purple-500 font-medium text-sm hover:text-purple-600">
              Edit
            </button>
          </div>
          <p className="text-gray-700">No Gift message</p>
        </div>
      </div>

      {/* Edit Address Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-start justify-end z-50">
          <div
            className="bg-white w-full md:w-1/3 h-auto max-h-[80vh] md:max-h-full rounded-t-lg md:rounded-lg shadow-lg overflow-y-auto
            transition-transform duration-300 ease-in-out transform translate-y-0 md:translate-y-0 md:right-0 md:top-0 md:bottom-0 md:h-screen"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold">{editingAddress ? 'Edit Address' : 'Add Address'}</h2>
              <button onClick={closeAddEditModal} className="text-gray-600 text-2xl">
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              <h3 className="font-semibold">Contact Details</h3>
              <div className="flex space-x-2">
                <input
                  name="firstName"
                  value={newAddress.firstName}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="First Name"
                />
                <input
                  name="lastName"
                  value={newAddress.lastName}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Last Name"
                />
              </div>
              <div className="flex">
                <span className="p-2 border-r border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">+91</span>
                <input
                  name="mobile"
                  value={newAddress.mobile}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Mobile Number"
                />
              </div>

              <h3 className="font-semibold">Shipping Address</h3>
              <input
                name="address"
                value={newAddress.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Address (Flat No./House No./Street, Area)"
              />
              <input
                name="landmark"
                value={newAddress.landmark}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Landmark (Optional)"
              />
              <div className="flex space-x-2">
                <input
                  name="city"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="City"
                />
                <input
                  name="pincode"
                  value={newAddress.pincode}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Pincode"
                />
              </div>
              <div className="flex space-x-2">
                <select
                  name="state"
                  value={newAddress.state}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <select
                  name="country"
                  value={newAddress.country}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <h3 className="font-semibold">Address Type</h3>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${newAddress.type === 'Home' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  onClick={() => handleAddressTypeChange('Home')}
                >
                  Home (7am-10pm)
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${newAddress.type === 'Office' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  onClick={() => handleAddressTypeChange('Office')}
                >
                  Office (10am-7pm)
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Preferences will help us plan your delivery. However, shipments can sometimes arrive early or later than
                planned.
              </p>
            </div>
            <div className="p-4 border-t">
              <button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                onClick={saveAddress}
              >
                SAVE ADDRESS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;