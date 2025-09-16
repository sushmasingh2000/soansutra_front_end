


import { useFormik } from 'formik';
import { MapPin, Tag, Truck, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from '../../utils/ApiConnector';
import { endpoint, rupees } from '../../utils/APIRoutes';
import AssurityComponent from '../assuritycomponent';
import CartHeader from '../shoppingCartHeader';
import Loader from '../../Shared/Loader';

export default function ResponsiveCart() {
  const navigate = useNavigate();
  const orderSummaryRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [pincode, setPincode] = useState('222137');
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [newPincode, setNewPincode] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [coupon, setCoupon] = useState([])
    const [isLoading, setIsLoading] = useState(false);
  

  // Placeholder images for modal carousel
  const placeholderImages = [
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1586796676849-bc85c38e8b25?w=300&h=200&fit=crop'
  ];

  const getCart = async () => {
    try {
      const response = await apiConnectorGet(endpoint?.get_cart);
      if (response?.data?.success) {
        setCartItems(response.data.result);
      } else {
        console.error('Failed to fetch cart:', response?.data?.message);
      }
    } catch (e) {
      console.log("something went wrong", e);
    }
  };

  // Auto scroll images in modal
  useEffect(() => {
    if (showPincodeModal) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % placeholderImages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showPincodeModal, placeholderImages.length]);

  useEffect(() => {
    getCart();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const removeItem = async (id) => {
    try {
      const response = await apiConnectorGet(`${endpoint?.remove_cart}?cart_item_id=${id}`);
      toast(response?.data?.message);
      if (response?.data?.success) {
        getCart();
      }
    } catch (e) {
      console.log("something went wrong");
    }
  };

  // Handle pincode change
  const handlePincodeChange = () => {
    if (newPincode.length === 6 && /^\d+$/.test(newPincode)) {
      setPincode(newPincode);
      setShowPincodeModal(false);
      setNewPincode('');
      toast.success('Pincode updated successfully!');
    } else {
      toast.error('Please enter a valid 6-digit pincode');
    }
  };

  const openPincodeModal = () => {
    setShowPincodeModal(true);
    setCurrentImageIndex(0);
  };

  const closePincodeModal = () => {
    setShowPincodeModal(false);
    setNewPincode('');
  };

  const openCouponModal = () => {
    handleApplyCoupon();
    setShowCouponModal(true);
  };



  const closeCouponModal = () => {
    setShowCouponModal(false);
    setCouponCode('');
  };

  const applyCouponFromModal = (couponCode) => {
    setCouponCode(couponCode);
    handleApplyCoupon(couponCode);
    setShowCouponModal(false);
  };
    const handlePlaceOrder = async () => {
    try {
      setIsLoading(true)
      const orderItems = cartItems.map(item => ({
        varient_id: item.varient_id,
        quantity: item.quantity
      }));

      const totalAmount = Math.round(subtotal - couponDiscount); 

      const payload = {
        status: "Pending",
        payment_method: 1, 
        payment_status: "Unpaid",
        notes: "N/A",
        items: orderItems,
        payment: {
          method: 1,
          status: "Unpaid",
          amount: totalAmount
        },
        isCoupon: Boolean(appliedCoupon)
      };

      const response = await apiConnectorPost(endpoint?.create_order, payload);
      setIsLoading(false)
      if (!response?.data?.message === "Order placed successfully.") {
        toast(response?.data?.message);
      };
      if (response?.data?.success) {
        toast.success("Order Verified !  Confirm Your Address");
        navigate("/checkout", { state: { orderId: response?.data?.result?.orderId } });
      } else {
        toast.error(response?.data?.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong. Please try again.");
    }
      setIsLoading(false)
  };

  const handleApplyCoupon = async () => {
    // if (!code.trim()) {
    //   toast.error('Please enter a coupon code');
    //   return;
    // }

    const variantIds = cartItems.map(item => item.varient_id);
    const productAmount = subtotal;

    try {
      const response = await apiConnectorPost(endpoint.get_coupon_varient, {
        v_id: JSON.stringify(variantIds || []),
        product_amount: productAmount,
      });

      if (!response?.data?.success) {
        toast.error(response?.data?.message || 'Failed to apply coupon');
        return;
      }
      setCoupon(response?.data?.result || [])
      // setAppliedCoupon(coupon_details);
      // setCouponDiscount(discount_amount);
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast.error('Something went wrong while applying the coupon');
    }
  };

  const removeCoupon = (bool) => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode('');

    bool && toast.success('Coupon removed');
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const materialTotal = item?.final_varient_price;
    return sum + (materialTotal * item.quantity);
  }, 0);

  const totalSavings = cartItems.reduce((sum, item) => {
    const discounts = item.varient_details.discount_details || [];
    const activeDiscounts = discounts.filter(d => d.discount_is_active === 'Active');
    if (activeDiscounts.length === 0) return sum;
    const totalDiscountPercent = activeDiscounts.reduce((acc, d) => acc + d.discount_value, 0);
    const discountAmount = (item.varient_details.varient_price * totalDiscountPercent / 100) * item.quantity;
    return sum + discountAmount;
  }, 0);

  const totalCost = subtotal - totalSavings;

  const handleClick = (product) => {
    navigate("/productdetails", {
      state: {
        product: {
          product_id: product?.product_id,
          selected_variant_id: product?.varient_id
        }
      },
    });
  };

  const updateQuantity = (cart_item_id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.cart_item_id === cart_item_id ? { ...item, quantity: newQuantity } : item
    ));
    couponDiscount && removeCoupon(false)
  };

  const formatPrice = (price) => `₹${price.toLocaleString()}`;

  const scrollToOrderSummary = () => {
    orderSummaryRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-16 overflow-x-hidden">
      <Loader isLoading={isLoading}/>
      <CartHeader onBackClick={handleBackClick} cartItems={cartItems} />
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6">
          {/* Cart Items - Desktop */}
          <div className="flex-1 space-y-2">
            <div className="max-h-[70vh] overflow-y-auto no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-lg shadow-sm m-4 text-center">
                  <svg
                    className="w-16 h-16 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Cart is Empty</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Looks like you haven't added any items to your cart yet. Start shopping now to find your perfect items!
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="text-black py-2 px-6 rounded-lg font-medium text-sm bg-gradient-to-r from-yellow-400 to-yellow-600"

                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => {
                  const { varient_details } = item;
                  const product = varient_details.product_details;

                  return (
                    <div key={item.cart_item_id} className="bg-white rounded-lg shadow-sm p-3 m-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden"
                          onClick={() => handleClick(item)}>
                          <img
                            src={product.product_image.p_image_url}
                            alt={product.product_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-sm font-medium text-gray-900 pr-2">
                              {product.product_name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.cart_item_id)}
                              className="text-gray-400 hover:text-gray-600 p-1"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <div className="text-xs text-gray-600 mb-1">
                            SKU: {varient_details.varient_sku}
                          </div>
                          <div className="text-xs text-gray-600 mb-1">
                            Weight: {varient_details.varient_weight} {varient_details.unit_name}
                          </div>
                          <div className="text-base font-bold text-gray-900 mb-1">
                            ₹{Number(item?.final_varient_price).toFixed(2)}
                          </div>
                          <div className="flex items-center gap-4 mb-1">
                            <span className="text-xs text-gray-600">Quantity:</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                                className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 text-xs"
                              >
                                -
                              </button>
                              <span className="w-5 text-center text-xs font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                                className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 text-xs"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Order Summary - Desktop (only when cart is not empty) */}
          {cartItems.length > 0 && (
            <div className="w-80 space-y-3">
              <div
                className="rounded-lg p-3 cursor-pointer bg-yellow-50"

              >
                <div className="w-full flex items-center justify-between text-yellow-700 font-medium text-sm">
                  <div className="flex items-center gap-2"
                    onClick={openCouponModal}
                  >
                    <Tag size={16} />
                    <span>Apply Coupon</span>
                  </div>
                  <span>→</span>
                </div>
                {appliedCoupon && (
                  <div className="mt-2 flex justify-between items-center text-xs">
                    <span className="text-green-600">Coupon Applied!</span>
                    <button onClick={() => removeCoupon(true)} className="text-red-600">Remove</button>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-gray-600" />
                  <span className="text-gray-700 text-sm">Delivering to</span>
                  <span className="font-medium text-sm">{pincode}</span>
                  <button
                    onClick={openPincodeModal}
                    className="text-yellow-700 text-xs ml-auto"
                  >
                    Change Pincode
                  </button>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700 text-sm">Subtotal</span>
                    <span className="font-medium text-sm">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-700 text-sm">Coupon Discount</span>
                    <span className="font-medium text-green-600 text-sm">{formatPrice(couponDiscount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 flex items-center gap-1 text-sm">
                      <Truck size={14} />
                      Shipping (Standard)
                    </span>
                    <span className="font-medium text-green-600 text-sm">Free</span>
                  </div>
                </div>

                <div className="border-t pt-3 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium text-gray-900">Total Cost</span>
                    <span className="text-lg font-bold text-gray-900">{formatPrice(totalCost)}</span>
                  </div>
                </div>

                <button
                  className="w-full text-black py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg font-medium hover:bg-yellow-700 transition-colors text-sm"
                 onClick={handlePlaceOrder}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="pb-2">
            <div className="space-y-2 mb-3">
              <div className="max-h-[80vh] overflow-y-auto no-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-lg shadow-sm m-4 text-center">
                    <svg
                      className="w-16 h-16 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Cart is Empty</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Looks like you haven't added any items to your cart yet. Start shopping now to find your perfect items!
                    </p>
                    <button
                      onClick={() => navigate('/')}
                      className="text-black py-2 px-6 rounded-lg font-medium text-sm bg-gradient-to-r from-yellow-400 to-yellow-600"

                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const { varient_details } = item;
                    const product = varient_details.product_details;

                    return (
                      <div key={item.cart_item_id} className="bg-white rounded-lg shadow-sm p-3 m-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                            <img
                              src={product.product_image.p_image_url}
                              alt={product.product_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="text-sm font-medium text-gray-900 pr-2">
                                {product.product_name}
                              </h3>
                              <button
                                onClick={() => removeItem(item.cart_item_id)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <div className="text-xs text-gray-600 mb-1">
                              SKU: {varient_details.varient_sku}
                            </div>
                            <div className="text-xs text-gray-600 mb-1">
                              Weight: {varient_details.varient_weight} {varient_details.unit_name}
                            </div>
                            <div className="text-base font-bold text-gray-900 mb-1">
                              ₹{Number(item?.final_varient_price).toFixed(2)}
                            </div>
                            <div className="flex items-center gap-4 mb-1">
                              <span className="text-xs text-gray-600">Quantity:</span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                                  className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 text-xs"
                                >
                                  -
                                </button>
                                <span className="w-5 text-center text-xs font-medium">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                                  className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 text-xs"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Mobile Apply Coupon, Order Summary, Pincode, and Footer (only when cart is not empty) */}
            {cartItems.length > 0 && (
              <>
                <div className='text-xs text-black mb-2'>
                  Sonasutra Offers
                </div>
                <div
                  className="rounded-lg p-3 mb-3 cursor-pointer bg-yellow-50"


                >
                  <div className="w-full flex items-center justify-between text-yellow-700 font-medium text-sm mb-2"
                    onClick={openCouponModal}>
                    <div className="flex items-center gap-2" >
                      <Tag size={16} />
                      <span>Apply Coupon</span>
                    </div>
                    <span>→</span>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 flex justify-between items-center text-xs">
                      <span className="text-green-600">Coupon Applied!</span>
                      <button onClick={removeCoupon} className="text-red-600">Remove</button>
                    </div>
                  )}
                </div>

                <div className='text-xs text-black mb-2' ref={orderSummaryRef}>
                  Order Summary
                </div>
                <div className="bg-white rounded-lg p-3 mb-20">
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="font-medium">{rupees}{Number(subtotal)?.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-gray-700">Coupon Discount</span>
                      <span className="font-medium text-green-600">{formatPrice(couponDiscount)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-700">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                  </div>
                  <div className="border-t pt-2 mb-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900 text-sm">Total Cost</span>
                      <span className="text-base font-bold text-gray-900">{rupees}{Math.round(subtotal - couponDiscount)}</span>
                    </div>
                  </div>
                </div>

                <div className="fixed bottom-20 left-0 right-0 bg-white border-t shadow-lg p-5 z-40" style={{ marginBottom: "-5px" }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-600" />
                      <span className="text-gray-700 text-sm">Delivering to</span>
                      <span className="font-medium text-sm">{pincode}</span>
                    </div>
                    <button
                      onClick={openPincodeModal}
                      className="text-yellow-600 text-sm font-medium"
                    >
                      Change Pincode
                    </button>
                  </div>
                </div>

                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900">{rupees}{Math.round(totalCost)}</span>
                      <button
                        onClick={scrollToOrderSummary}
                        className="text-yellow-600 text-xs underline text-left"
                      >
                        View Order Summary
                      </button>
                    </div>
                    <button
                      className="text-black py-3 px-6 rounded-lg font-medium text-sm bg-gradient-to-r from-yellow-400 to-yellow-600"
                    onClick={handlePlaceOrder}
                    >
                      PLACE ORDER
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-b-yellow-300">
              <h2 className="text-lg font-semibold text-gray-900">Apply Coupon</h2>
              <button
                onClick={closeCouponModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} className='text-red-800' />
              </button>
            </div>
            <div className="p-4 border-b border-b-yellow-300">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon?.applicableCoupon?.coupon_data?.coupon_code}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-yellow-300 rounded-md text-sm"
                />
                <button
                  onClick={() => {
                    setCouponDiscount(Number(coupon?.applicableCoupon?.coupon_data?.deductable_coupon_amount || 0)?.toFixed(2));
                    setShowCouponModal(false);
                    setAppliedCoupon(true);
                  }}
                  className="px-4 py-2 bg-yellow-600 text-black text-sm rounded-md hover:bg-yellow-700"
                >
                  APPLY
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Other Offers at CaratLane</h3>
              <div className="space-y-3">
                {coupon?.allCoupon?.map((coupon, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border border-yellow-300 cursor-pointer hover:bg-gray-50 ${!coupon.isApplicable ? 'opacity-60' : ''}`}
                    onClick={() => coupon.isApplicable && applyCouponFromModal(coupon.code)}
                  >
                    <div className="flex-shrink-0 bg-gray-100 text-gray-600 text-xs font-bold px-2 py-4 rounded text-center min-w-[50px] flex items-center justify-center">
                      {coupon?.coupon_discount_type === "Percentage" ? " % " : ""} {Number(coupon.coupon_value)?.toFixed(2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-gray-900">{coupon.coupon_code}</span>
                        {!coupon.isApplicable ?
                          <span className="text-xs text-gray-400">Not Applicable</span> :
                          <span className="text-xs text-green-400">Applicable</span>
                        }
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{coupon.coupon_end_date}</p>
                      <p className="text-xs text-gray-700">{coupon.applied_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pincode Change Modal */}
      {showPincodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 relative">
            <button
              onClick={closePincodeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X size={20} className='text-red-700'/>
            </button>
            <div className="p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Your PIN Code unlocks
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Fastest delivery date, Try-at-Home availability,<br />
                Nearest store and In-store design!
              </p>
              <div className="mb-6 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={placeholderImages[currentImageIndex]}
                  alt="Service illustration"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-blue-400 text-sm mb-6">In-Store Design</p>
              <div className="relative mb-4">
                <div className="flex items-center border border-yellow-300 rounded-lg p-3 bg-gray-50">
                  <MapPin size={16} className="text-gray-600 mr-2" />
                  <input
                    type="text"
                    value={newPincode}
                    onChange={(e) => setNewPincode(e.target.value)}
                    placeholder={pincode}
                    maxLength="6"
                    className="flex-1 bg-transparent outline-none text-gray-900 font-medium"
                  />
                  <button
                    onClick={handlePincodeChange}
                    className="text-red-600 font-medium text-sm"
                  >
                    CHANGE
                  </button>
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 flex items-center">
                <div className="bg-orange-500 text-white rounded-lg p-2 mr-3 text-xs font-bold min-w-max">
                  51.3<br />KM
                </div>
                <div className="text-left">
                  <p className="text-gray-600 text-xs">Nearest Store</p>
                  <p className="text-gray-900 font-medium text-sm">Vinayak Plaza</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AssurityComponent />
    </div>
  );
}

