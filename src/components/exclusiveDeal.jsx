import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';

export default function JewelryPromoCard() {
  const navigate = useNavigate();

  const { data } = useQuery(
    ["discount_high"],
    () => apiConnectorGet(endpoint.get_discount_high),
    usequeryBoolean
  );

  const discount_high = data?.data?.result || [];

  const handleClick = (product) => {
    navigate("/productdetails", { state: { product } });
  };
  
  return (
    <div className="p-4 mb-5" style={{ backgroundColor: '#ebebff' }}>
      <div className="text-center py-6">
        <h2 className="text-gray-600 text-lg font-medium mb-2">Exclusive deals</h2>
        <h1 className="text-gray-800 text-2xl font-semibold">Curated only for you</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {discount_high.map((item, index) => {
          const productImage = item?.product_details?.product_image?.p_image_url || 'https://via.placeholder.com/300x300?text=Jewelry';
          const productName = item?.product_details?.product_name || "Jewelry";
          const discountText = item?.discount_details?.[0]?.discount_value
            ? `Up to ${item.discount_details[0].discount_value}% off on MRP`
            : 'Special Discount';

          return (
            <div
              key={index}
              onClick={() => handleClick(item)}
              className="max-w-xs w-full cursor-pointer bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={productImage}
                    alt={productName}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-gray-700 whitespace-nowrap"
                    style={{ backgroundColor: '#dcd2fe' }}
                  >
                    1+ Designs
                  </div>
                </div>
              </div>

              <div className="text-center mb-2">
                <p className="text-sm text-gray-700 font-medium">{productName}</p>
              </div>

              <div className="flex justify-center">
                <button
                  className="px-6 py-2 rounded-full text-white font-semibold text-sm shadow-lg"
                  style={{ backgroundColor: '#4f3267' }}
                >
                  {discountText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
