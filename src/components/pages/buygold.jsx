import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from '../../utils/ApiConnector';
import { endpoint, mode } from '../../utils/APIRoutes';
import EgoldHeader from '../egoldheader';
import FAQBuyGold from '../faqbuygold';
import Footer from '../Footer1';
import Header from '../Header1';
import NavigationBar from '../navigationbar';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import Loader from '../../Shared/Loader';

const BuyGold = () => {
  const [amount, setAmount] = useState('');
  const [paymentlink, setPaymentLink] = useState("")
  const [grams, setGrams] = useState('');
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 54);
  const [showShippingPopup, setShowShippingPopup] = useState(false);
  const [showPaymentMethodPopup, setShowPaymentMethodPopup] = useState(false);
  const [loader, setLoading] = useState(false);

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
  const [newAddress, setNewAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    state: 'State',
    country: 'India',
    mobile: '',
    type: 'Home',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  const countries = ['India'];


  const saveAddress = async () => {
    const addressPayload = {
      address_line1: newAddress.address,
      address_line2: newAddress.landmark,
      city: newAddress.city,
      state: newAddress.state,
      postal_code: newAddress.pincode,
      country: newAddress.country,
      phone_number: newAddress.mobile,
      is_default: 1, // or 0 if needed
    };

    try {
      const response = await apiConnectorPost(endpoint?.add_shipping_Address, addressPayload);
      if (response?.data?.success) {
        toast(response?.data?.message);
        setShowShippingPopup(false);
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast('Something went wrong. Try again later.');
    }
  };
  const isAmountValid = Number(amount) >= 1;

  const { data: profile } = useQuery(
    ['profile'],
    () =>
      apiConnectorGet(endpoint?.get_customer_profile),
    usequeryBoolean
  );

  const profileData = profile?.data?.result || [];

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

  const loadCashfreeSdk = () => {
    return new Promise((resolve, reject) => {
      if (window.Cashfree) return resolve(window.Cashfree);

      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.onload = () => resolve(window.Cashfree);
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  };
  const buygoldFn = async (rcv_type) => {
    setLoading(true)
    try {
      const res = await apiConnectorPost(endpoint.create_egold_price, {
        req_amount: amount,
        u_payment_method: 1,
        receiving_type: 1,
        // receiving_type: rcv_type,
      });
      toast(res?.data?.message);
      const payment_session_id = res?.data?.payment_session_id
      let cashfree;
      try {
        cashfree = await loadCashfreeSdk();
      } catch (err) {
        console.error("Cannot load Cashfree SDK:", err);
        alert("Payment SDK load failed");
        return;
      }

      // 3️⃣ initiate checkout
      try {
        cashfree = cashfree({ mode: mode });
        cashfree.checkout({
          paymentSessionId: payment_session_id,
          redirectTarget: "_self",
        });
      } catch (err) {
        console.error("Checkout error:", err);
        alert("Checkout failed");
      }
      // if (res?.data?.message === "Your Shipping Address not found") {
      //   setShowShippingPopup(true);
      //   return;
      // }
      const qr_url = res?.data?.result?.payment_url || "";
      if (qr_url) {
        setPaymentLink(qr_url);
      } else {
        toast(res?.data?.message || "Something went wrong");
      }
    } catch (e) {
      console.log("something went wrong");
    }
    setLoading(false)
  };
  if (paymentlink) {
    return (
      document.location.href = paymentlink
    );
  }
  return (
    <>
      <Header />
      <NavigationBar />
      <EgoldHeader />
      <Loader isLoading={loader} />
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
                    className={`bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-2 px-4 rounded ml-2 ${!isAmountValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => isAmountValid && buygoldFn()}
                    disabled={!isAmountValid}
                  >
                    Proceed to Buy
                  </button>

                </div>
                <p className="text-xs text-gray-500 ml-2">Inclusive of {Number(get_price?.ma_buy_tax_percentage || 0)?.toFixed(0, 2)}% GST</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow w-1/5">
                <h3 className="text-lg font-semibold mb-2">Buy Rate</h3>
                <p className="text-red-500">  ₹{(
                  Number(get_price?.ma_price || 0) +
                  (Number(get_price?.ma_price || 0) * Number(get_price?.ma_buy_tax_percentage || 0) / 100)
                ).toFixed(2)} /gram</p>
                <p className="text-xs text-gray-500"><span>{Number(get_price?.ma_price || 0).toFixed(2)}</span> + {Number(get_price?.ma_buy_tax_percentage || 0)?.toFixed(0, 2)}% GST</p>
                <p className="text-xs text-gray-500">Price valid for {formatTime(timeLeft)} min</p>
                <p className="text-xs text-gray-500">24K 99.99% Purity</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow w-1/5">
                <div className="vault-icon w-12 h-12 bg-[url('https://assets.cltstatic.com/images/responsive/spriteImage1.png?v2.0')] bg-no-repeat bg-[position:-343px_-1273px] bg-[size:832px_auto] cursor-default mb-2 mx-auto"></div>
                <h3 className="text-lg font-semibold mb-2 text-yellow-600">Gold Balance</h3>
                <p className="text-lg">{profileData?.gold_wallet} gms</p>
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
                className={`bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-2 px-4 rounded ml-2 ${!isAmountValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => isAmountValid && buygoldFn()}
                disabled={!isAmountValid}
              >
                Proceed to Buy
              </button>

              <p className="text-xs text-gray-500 mb-2">Inclusive of {Number(get_price?.ma_buy_tax_percentage || 0)?.toFixed(0, 2)}% GST</p>
            </div>
            <div className="flex items-center bg-yellow-100 rounded p-2 text-yellow-800 mt-4 mb-4">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              <span>The minimum buy amount to purchase SonaSutra eGold is ₹10</span>
            </div>
            <div className="bg-white rounded-lg p-4 shadow mb-4">
              <h3 className="text-lg font-semibold mb-2">Buy Rate</h3>
              <p className="text-red-500"> ₹{(
                Number(get_price?.ma_price || 0) +
                (Number(get_price?.ma_price || 0) * Number(get_price?.ma_buy_tax_percentage || 0) / 100)
              ).toFixed(2)} /gram</p>
              <p className="text-xs text-gray-500">(₹{Number(get_price?.ma_price || 0).toFixed(2)} + {Number(get_price?.ma_buy_tax_percentage || 0)?.toFixed(0, 2)}% GST)</p>
              <p className="text-xs text-gray-500">Priced fo valir {formatTime(timeLeft)} min</p>
              <p className="text-xs text-gray-500">24K 99.99% Purity</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow mb-4">
              <div className="vault-icon w-12 h-12 bg-[url('https://assets.cltstatic.com/images/responsive/spriteImage1.png?v2.0')] bg-no-repeat bg-[position:-343px_-1273px] bg-[size:832px_auto] cursor-default mb-2 mx-auto"></div>
              <h3 className="text-lg font-semibold mb-2 text-yellow-600">Gold Balance</h3>
              <p className="text-lg">{profileData?.gold_wallet} gms</p>
              <button className="text-yellow-500 text-sm mt-2">Redeem Gold →</button>
              <button className="text-yellow-500 text-sm mt-2 ml-4">Check Buy History →</button>
            </div>
          </div>
        </div>
      </div>
      {showPaymentMethodPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Choose Receiving Type</h3>

            <div className="flex flex-col space-y-4">
              <button
                className="py-2 px-4 bg-yellow-500 text-white rounded"
                onClick={() => {
                  setShowPaymentMethodPopup(false);
                  buygoldFn('1'); // ✅ pass directly
                }}

              >
                Wallet
              </button>


              <button
                className="py-2 px-4 bg-yellow-500 text-white rounded"
                onClick={() => {
                  setShowPaymentMethodPopup(false);
                  buygoldFn('2'); // ✅ pass directly
                }}

              >
                Home Delivery
              </button>

            </div>

            <button
              className="mt-4 text-gray-600 underline"
              onClick={() => setShowPaymentMethodPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showShippingPopup && (
        <Dialog open={showShippingPopup} onClose={() => setShowShippingPopup(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Enter Shipping Address
            <IconButton onClick={() => setShowShippingPopup(false)}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            <h3 className="font-semibold mb-2">Contact Details</h3>
            <div className="flex space-x-2 mb-4">
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={newAddress.firstName}
                onChange={handleInputChange}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={newAddress.lastName}
                onChange={handleInputChange}
                variant="outlined"
              />
            </div>

            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={newAddress.mobile}
              onChange={handleInputChange}
              variant="outlined"
              InputProps={{
                startAdornment: <span className="text-gray-500 mr-2">+91</span>,
              }}
              className="mb-4"
            />

            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={newAddress.address}
              onChange={handleInputChange}
              variant="outlined"
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Landmark (Optional)"
              name="landmark"
              value={newAddress.landmark}
              onChange={handleInputChange}
              variant="outlined"
              className="mb-4"
            />
            <div className="flex space-x-2 mb-4">
              <TextField
                fullWidth
                label="City"
                name="city"
                value={newAddress.city}
                onChange={handleInputChange}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Pincode"
                name="pincode"
                value={newAddress.pincode}
                onChange={handleInputChange}
                variant="outlined"
              />
            </div>
            <div className="flex space-x-2 mb-4">
              <TextField
                fullWidth
                select
                label="State"
                name="state"
                value={newAddress.state}
                onChange={handleInputChange}
                variant="outlined"
              >
                <MenuItem value="State" disabled>State</MenuItem>
                {indianStates.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                select
                label="Country"
                name="country"
                value={newAddress.country}
                onChange={handleInputChange}
                variant="outlined"
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            {/* 
            <h3 className="font-semibold mb-2">Address Type</h3>
            <div className="flex space-x-2 mb-2">
              <Button
                variant={newAddress.type === 'Home' ? 'contained' : 'outlined'}
                color="warning"
                onClick={() => handleAddressTypeChange('Home')}
              >
                Home (7am–10pm)
              </Button>
              <Button
                variant={newAddress.type === 'Office' ? 'contained' : 'outlined'}
                color="warning"
                onClick={() => handleAddressTypeChange('Office')}
              >
                Office (10am–7pm)
              </Button>
            </div> */}
            <p className="text-xs text-gray-500 mb-4">
              Preferences will help us plan your delivery. However, shipments can sometimes arrive early or later than planned.
            </p>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              onClick={saveAddress}
            >
              SAVE ADDRESS
            </Button>
          </DialogActions>
        </Dialog>

      )}


      <FAQBuyGold />
      <Footer />
    </>
  );
};

export default BuyGold;