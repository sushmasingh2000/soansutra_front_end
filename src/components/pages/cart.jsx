import React, { useState } from 'react';
import { X, MapPin, Tag, Truck, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; // Import navigate hook
// import Header from '../Header1';
import WarrantyFeatures from '../trustBadge';
import CartHeader from '../shoppingCartHeader';

export default function ResponsiveCart() {
  const navigate = useNavigate(); // Initialize navigate hook
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Rewrite your Future Gemstone Ring",
      price: 44558,
      originalPrice: null,
      discount: 0,
      image: "https://cdn.caratlane.com/media/catalog/product/cache/6/image/480x480/9df78eab33525d08d6e5fb8d27136e95/J/R/JR08870-1YP9A0_11_listfront.jpg",
      sku: "JR08870-1YP9A0",
      size: "12",
      quantity: 1,
      delivery: "11th Jul"
    },
    {
      id: 2,
      name: "Oceanic Blue Gemstone Ring",
      price: 25278,
      originalPrice: null,
      discount: 0,
      image: "https://cdn.caratlane.com/media/catalog/product/J/R/JR09896-8YS3SS_1_lar.jpg",
      sku: "JR09896-8YS3SS",
      size: "12",
      quantity: 2,
      delivery: "14th Jul"
    },
    {
      id: 3,
      name: "Birdy Gold Stud Earrings",
      price: 6715,
      originalPrice: 8415,
      discount: 1700,
      image: "https://cdn.caratlane.com/media/catalog/product/U/E/UE06254-1R0000_1_lar.jpg",
      sku: "UE06254-1R0000",
      size: null,
      quantity: 1,
      delivery: "Tomorrow 6PM-9PM"
    }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = 1700;
  const totalCost = subtotal - totalSavings;

  // Back button handler
  const handleBackClick = () => {
    navigate(-1); // Goes back to previous page in history
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CartHeader onBackClick={handleBackClick}/>
      
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6">
          {/* Cart Items - Desktop */}
          <div className="flex-1 space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-medium text-gray-900 pr-2">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-1">
                      <div className="text-base font-bold text-gray-900">
                        {formatPrice(item.price)}
                      </div>
                      {item.originalPrice && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 line-through text-xs">
                            {formatPrice(item.originalPrice)}
                          </span>
                          <span className="text-green-600 font-medium text-xs">
                            Save {formatPrice(item.discount)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-600 mb-1">
                      {item.sku}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-1">
                      {item.size && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">Size:</span>
                          <span className="text-xs font-medium">{item.size}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">Quantity:</span>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 text-xs"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs" style={{color:"#DE57E5"}}>
                      Delivery by - {item.delivery}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary - Desktop */}
          <div className="w-80 space-y-3">
            <div className="rounded-lg p-3" style={{
              background:"#E8E1FF"
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
              
              <button className="w-full text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm" style={{background:"linear-gradient(90deg,#E56EEB 0%,#8863FB 100%)"}}>
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Cart Items */}
          <div className="space-y-2 mb-3">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-2.5">
                <div className="flex gap-2.5">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xs font-medium text-gray-900 pr-2 leading-tight">
                        {item.name}
                      </h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    
                    <div className="mb-1">
                      <div className="text-sm font-bold text-gray-900">
                        {formatPrice(item.price)}
                      </div>
                      {item.originalPrice && (
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-gray-500 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                          <span className="text-green-600 font-medium">
                            Save {formatPrice(item.discount)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-600 mb-1">
                      {item.sku}
                    </div>
                    
                    <div className="flex items-center justify-between mb-1">
                      {item.size && (
                        <div className="text-xs text-gray-600">
                          Size: <span className="font-medium">{item.size}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-600">Quantity:</span>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="w-4 text-center text-xs">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-purple-600">
                      Delivery by - {item.delivery}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            
            <button className="w-full text-white py-2 rounded-lg font-medium text-sm" style={{background:"linear-gradient(90deg,#E56EEB 0%,#8863FB 100%)"}}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
      
      {/* Warranty Features with reduced gap */}
      <div className="mt-3 lg:mt-50">
        <WarrantyFeatures/>
      </div>
    </div>
  );
}