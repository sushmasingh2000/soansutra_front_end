
import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const { image, title, size, qty, price, originalPrice, discountPercent } = product;
  return (
    <div className="flex items-center bg-white rounded-md border border-gray-200 p-3 min-w-[250px] md:min-w-0">
      <img src={image} alt={title} className="w-20 h-16 object-contain mr-4 rounded" />
      <div className="flex-1">
        <p className="font-semibold text-sm text-black">{title}</p>
        <p className="text-xs text-black">Size: {size} Qty: {qty}</p>
        <div className="flex items-center mt-1">
          <p className="font-bold text-sm text-black">₹{price.toLocaleString('en-IN')}</p>
          {originalPrice && (
            <p className="ml-2 text-xs text-red-500 line-through">₹{originalPrice.toLocaleString('en-IN')}</p>
          )}
          {discountPercent && <p className="ml-1 text-xs text-red-500">({discountPercent}%)</p>}
        </div>
      </div>
    </div>
  );
};

const PriceBreakdown = ({ subtotal, cartDiscount, shipping, total }) => {
  return (
    <div className="mt-6 space-y-2">
      <div className="flex justify-between text-sm text-black">
        <p>Subtotal</p>
        <p>₹{subtotal.toLocaleString('en-IN')}</p>
      </div>
      <div className="flex justify-between text-sm text-black">
        <p>Cart Discount</p>
        <p>- ₹{cartDiscount.toLocaleString('en-IN')}</p>
      </div>
      <div className="flex justify-between text-sm text-black">
        <p>Shipping (Standard)</p>
        <p>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</p>
      </div>
      <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200 text-black">
        <p>TOTAL COST</p>
        <p>₹{total.toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
};

const CheckoutOrderSummary = ({ products: propProducts = [], cartDiscount = 4549, shipping = 0, deliveryInfo = 'Est. Delivery by Tomorrow 4PM-9PM' }) => {
  let products = propProducts;
  if (!products.length) {
    products = [
      {
        image: 'https://via.placeholder.com/80?text=Ring1',
        title: 'Rewrite your Future Gemstone Ring',
        size: 12,
        qty: 1,
        price: 41806,
        originalPrice: 46355,
        discountPercent: 9,
      },
      {
        image: 'https://via.placeholder.com/80?text=Ring2',
        title: 'Oceanic Blue Gemstone Ring',
        size: 12,
        qty: 2,
        price: 27256,
      },
      {
        image: 'https://via.placeholder.com/80?text=Ring3',
        title: 'Emerald Green Gemstone Ring',
        size: 10,
        qty: 1,
        price: 35000,
        originalPrice: 40000,
        discountPercent: 12,
      },
      {
        image: 'https://via.placeholder.com/80?text=Ring4',
        title: 'Ruby Red Gemstone Ring',
        size: 14,
        qty: 3,
        price: 15000,
      },
      {
        image: 'https://via.placeholder.com/80?text=Ring5',
        title: 'Sapphire Sparkle Ring',
        size: 11,
        qty: 1,
        price: 28000,
        originalPrice: 30000,
        discountPercent: 7,
      },
      {
        image: 'https://via.placeholder.com/80?text=Ring6',
        title: 'Diamond Delight Ring',
        size: 13,
        qty: 2,
        price: 50000,
      },
      {
        image: 'https://via.placeholder.com/80?text=Ring7',
        title: 'Amethyst Aura Ring',
        size: 12,
        qty: 1,
        price: 22000,
        originalPrice: 25000,
        discountPercent: 12,
      },
      {
        image: 'https://via.placeholder.com/80?text=Ring8',
        title: 'Topaz Twilight Ring',
        size: 15,
        qty: 4,
        price: 18000,
      },
      {
        image: 'https://via.placeholder.com/80?text=Ring9',
        title: 'Pearl Paradise Ring',
        size: 9,
        qty: 1,
        price: 12000,
        originalPrice: 15000,
        discountPercent: 20,
      },
      {
        image: 'https://via.placeholder.com/80?text=Ring10',
        title: 'Garnet Glow Ring',
        size: 12,
        qty: 2,
        price: 26000,
      },
    ];
  }

  const subtotal = products.reduce((acc, p) => acc + p.price * p.qty, 0);
  const total = subtotal - cartDiscount + shipping;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full md:w-[500px] md:ml-auto md:sticky md:top-4 bg-gray-50 shadow-md overflow-hidden md:min-h-[calc(100vh)]">
      {/* Toggle bar for mobile */}
      <div
        className="md:hidden flex justify-between items-center bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 cursor-pointer text-sm font-medium text-black"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <p>{isExpanded ? 'Hide' : 'Show'} Order Summary</p>
          <span className="ml-2">{isExpanded ? '▲' : '▼'}</span>
        </div>
        <p className="font-bold text-black">₹{total.toLocaleString('en-IN')}</p>
      </div>

      {/* Desktop title */}
      <h2 className="hidden md:block text-lg font-bold p-4 border-b border-gray-200 text-black">Order Summary</h2>

      {/* Content */}
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isExpanded ? 'max-h-[1000px]' : 'max-h-0'
        } md:max-h-none md:block md:flex md:flex-col md:h-full`}
      >
        <div className="p-4 md:flex-1 md:overflow-y-auto">
          {/* Products list */}
          <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto md:max-h-full gap-4 md:gap-0 pb-4 md:pb-0 h-60 overflow-y-auto no-scrollbar">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          {/* Delivery info */}
          <div className="flex items-center text-sm text-yellow-600 bg-white rounded-md p-2 mt-4">
            <span className="mr-2">🚚</span>
            <p>{deliveryInfo}</p>
          </div>

          {/* Price breakdown */}
          <PriceBreakdown subtotal={subtotal} cartDiscount={cartDiscount} shipping={shipping} total={total} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;