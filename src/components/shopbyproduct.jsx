
import React from 'react';
import { useQuery } from 'react-query';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';

const ShopByProducts = () => {
  
  const navigate = useNavigate();
  const { data } = useQuery(
    ["category_user_shop_by_products"],
    () => apiConnectorGet(endpoint.get_categroy_user),
    usequeryBoolean
  );

  const products = data?.data?.result || [];
  return (
    <div className="w-full bg-white py-4 px-8 mb-10">
      <div className="max-w-7xl mx-auto">
        {/* name */}
        <h2 className="text-1xl md:text-2xl font-semibold text-gray-800 text-center mb-8">
          Shop by Products
        </h2>
        
        {/* Mobile Layout - First row: 3 items, Second row: 2 items centered */}
        <div className="block lg:hidden">
          {/* First row - 3 items */}
          <div className="grid grid-cols-3 gap-1 mb-4">
            {products.slice(0, 3).map((product) => (
              <div key={product.product_category_id} className="flex flex-col items-center">
                <div className="w-[80%] aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-lg
                 transition-shadow duration-300 cursor-pointer" 
                 onClick={() => navigate(`/products_web?category=${product.product_category_id}`)}
>
                  <img 
                    src={product.cat_image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="eager"
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium mt-2 text-center leading-tight">
                  all {product.name}
                </p>
              </div>
            ))}
          </div>
          
          {/* Second row - 2 items centered */}
          <div className="flex justify-center gap-[1px]">
            {products.slice(3, 5).map((product) => (
              <div key={product.product_category_id} className="flex flex-col items-center w-1/3"
            onClick={() => navigate(`/products_web?category=${product.product_category_id}`)}
            >
                <div className="w-[70%] aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <img 
                    src={product.cat_image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="eager"
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium mt-2 text-center leading-tight">
                  all {product.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop Layout - All 5 items in a horizontal row */}
        <div className="hidden lg:flex justify-center items-start gap-6 xl:gap-8">
          {products.map((product) => (
            <div key={product.product_category_id} className="flex flex-col items-center"
            onClick={() => navigate(`/products_web?category=${product.product_category_id}`)}
            >
              <div className="w-44 h-44 xl:w-48 xl:h-48 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <img 
                  src={product.cat_image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="eager"
                />
              </div>
              <p className="text-base xl:text-lg text-gray-700 font-medium mt-4 text-center">
               all {product.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByProducts;