import React, { useState, useEffect } from 'react';
import { X, MapPin, Tag, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WarrantyFeatures from '../trustBadge';
import CartHeader from '../shoppingCartHeader';
import { apiConnectorGet } from '../../utils/ApiConnector';
import { endpoint } from '../../utils/APIRoutes';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ResponsiveCart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
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

  useEffect(() => {
    getCart();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const removeItem = async(id)=>{
      try{
        const response = await apiConnectorGet(`${endpoint?.remove_cart}?cart_item_id=${id}`)
        toast(response?.data?.message)
        if(response?.data?.success){
          getCart()
        }
      }
      catch(e){
        console.log("somthing went wrong")
      }
  }
  // Calculate subtotal by summing variant price * quantity
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.varient_details.varient_price * item.quantity),
    0
  );

  // Calculate total savings if you want (assuming discount is percentage on price)
  const totalSavings = cartItems.reduce((sum, item) => {
    // Sum discount from all active discounts if any
    const discounts = item.varient_details.discount_details || [];
    const activeDiscounts = discounts.filter(d => d.discount_is_active === 'Active');

    if (activeDiscounts.length === 0) return sum;

    // Assuming percentage discounts sum up (adjust logic if needed)
    const totalDiscountPercent = activeDiscounts.reduce((acc, d) => acc + d.discount_value, 0);

    // Calculate discount amount on price * quantity
    const discountAmount = (item.varient_details.varient_price * totalDiscountPercent / 100) * item.quantity;

    return sum + discountAmount;
  }, 0);

  const totalCost = subtotal - totalSavings;



  const updateQuantity = (cart_item_id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.cart_item_id === cart_item_id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Price formatter
  const formatPrice = (price) => `₹${price.toLocaleString()}`;


  return (
    <div className="min-h-screen bg-gray-50">
      <CartHeader onBackClick={handleBackClick} cartItems={cartItems} />
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6">
          {/* Cart Items - Desktop */}
          <div className="flex-1 space-y-2">
            {cartItems.map((item) => {
              const { varient_details } = item;
              const product = varient_details.product_details;

              return (
                <div key={item.cart_item_id} className="bg-white rounded-lg shadow-sm p-3">
                  <div className="flex items-start gap-3">
                    {/* Product Image */}
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      <img
                        src={product.product_image.p_image_url}
                        alt={product.product_name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
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

                      {/* Variant SKU */}
                      <div className="text-xs text-gray-600 mb-1">
                        SKU: {varient_details.varient_sku}
                      </div>

                      {/* Variant Weight and Unit */}
                      <div className="text-xs text-gray-600 mb-1">
                        Weight: {varient_details.varient_weight} {varient_details.unit_name}
                      </div>

                      {/* Price */}
                      <div className="text-base font-bold text-gray-900 mb-1">
                        ₹{varient_details.varient_price.toLocaleString()}
                      </div>

                      {/* Quantity */}
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
            })}

          </div>

          {/* Order Summary - Desktop */}
          <div className="w-80 space-y-3">
            <div className="rounded-lg p-3" style={{
              background: "#E8E1FF"
            }}>
              <button className="w-full flex items-center justify-between text-purple-700 font-medium text-sm">
                <div className="flex items-center gap-2">
                  <Tag size={16} />
                  <span>Apply Coupon</span>
                </div>
                <span>→</span>
              </button>
            </div>

            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-gray-600" />
                <span className="text-gray-700 text-sm">Delivering to</span>
                <span className="font-medium text-sm">201308</span>
                <button className="text-purple-600 text-xs ml-auto">Change Pincode</button>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-700 text-sm">Subtotal</span>
                  <span className="font-medium text-sm">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 text-sm">You Saved</span>
                  <span className="font-medium text-green-600 text-sm">{formatPrice(totalSavings)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 text-sm">Coupon Discount</span>
                  <button className="text-purple-600 text-xs">Apply Coupon</button>
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

              <button className="w-full text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm" style={{ background: "linear-gradient(90deg,#E56EEB 0%,#8863FB 100%)" }}>
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Cart Items */}
          <div className="space-y-2 mb-3">
            {cartItems.map((item) => {
              const { varient_details } = item;
              const product = varient_details.product_details;

              return (
                <div key={item.cart_item_id} className="bg-white rounded-lg shadow-sm p-3">
                  <div className="flex items-start gap-3">
                    {/* Product Image */}
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      <img
                        src={product.product_image.p_image_url}
                        alt={product.product_name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
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

                      {/* Variant SKU */}
                      <div className="text-xs text-gray-600 mb-1">
                        SKU: {varient_details.varient_sku}
                      </div>

                      {/* Variant Weight and Unit */}
                      <div className="text-xs text-gray-600 mb-1">
                        Weight: {varient_details.varient_weight} {varient_details.unit_name}
                      </div>

                      {/* Price */}
                      <div className="text-base font-bold text-gray-900 mb-1">
                        ₹{varient_details.varient_price.toLocaleString()}
                      </div>

                      {/* Quantity */}
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
            })}

          </div>

          {/* Mobile Order Summary */}
          <div className="bg-white rounded-lg p-3 sticky bottom-0 shadow-lg">
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-700">You Saved</span>
                <span className="font-medium text-green-600">{formatPrice(totalSavings)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-700">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
            </div>

            <div className="border-t pt-2 mb-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 text-sm">Total Cost</span>
                <span className="text-base font-bold text-gray-900">{formatPrice(totalCost)}</span>
              </div>
            </div>

            <button className="w-full text-white py-2 rounded-lg font-medium text-sm" style={{ background: "linear-gradient(90deg,#E56EEB 0%,#8863FB 100%)" }}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>

      {/* Warranty Features with reduced gap */}
      <div className="mt-3 lg:mt-50">
        <WarrantyFeatures />
      </div>
    </div>
  );
}