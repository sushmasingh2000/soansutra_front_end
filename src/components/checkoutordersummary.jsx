
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';

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
          {/* {discountPercent && <p className="ml-1 text-xs text-red-500">({discountPercent}%)</p>} */}
        </div>
      </div>
    </div>
  );
};

const PriceBreakdown = ({ subtotal, cartDiscount, shipping, total ,tax }) => {
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
        <p>Total Tax </p>
        <p> + ₹{tax.toLocaleString('en-IN')}</p>
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

const CheckoutOrderSummary = ({ selectedOrderId, shipping = 0, deliveryInfo = 'Est. Delivery by Tomorrow 4PM-9PM' }) => {
  const { data: order_details } = useQuery(
    ["order_details", selectedOrderId],
    () => apiConnectorGet(`${endpoint.get_order_detail_by}?order_id=${selectedOrderId}`),
    {
      ...usequeryBoolean,
      enabled: !!selectedOrderId,
    }
  );

  const orderData = order_details?.data?.result;
  const orderItems = orderData?.order_items || [];

  const products = orderItems.map((item) => ({
    image: item.p_image_url,
    title: item.sku || 'Product',
    size: '-', // You can add size if available in the variant
    qty: item.quantity,
    price: item.grand_total, // Use grand total after discount
    originalPrice: item.total_price, // Before discount
    // discountPercent: item.discount ? Math.round((item.discount / item.unit_price) * 100) : null,
  }));

  const subtotal = Number(orderData?.total_amount || 0);
  const cartDiscount = Number(orderData?.total_discount || 0);
  const total = Number(orderData?.grand_total || 0);
  const tax = Number(orderData?.total_tax || 0)

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
          <PriceBreakdown
           subtotal={subtotal} 
           cartDiscount={cartDiscount}
            shipping={shipping}
            tax={tax}
             total={total} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;