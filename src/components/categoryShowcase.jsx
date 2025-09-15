
import React from 'react';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const JewelryCategories = () => {
  const navigate = useNavigate();

  const { data } = useQuery(
    ["category_user"],
    () => apiConnectorGet(endpoint.get_categroy_user),
    usequeryBoolean
  );

  const category = data?.data?.result || [];

  // const handleClick = (product) => {
  //   navigate("/product_web/category_id?");
  // };

  const handleImageError = (e) => {
    const parent = e.target.parentElement;
    parent.innerHTML = `
      <div class="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
        <div class="text-center text-gray-600">
          <div class="text-2xl mb-2">💎</div>
          <div class="text-xs">Jewelry</div>
        </div>
      </div>
    `;
  };

  const giftItem = category.find(cat => cat.isGift);

  return (
    <div className="w-full p-2 sm:p-4 lg:p-6">
      <div
        className="w-full p-4 sm:p-6 lg:p-8 rounded-2xl"
        style={{ backgroundColor: 'rgb(246, 243, 249)' }}
      >

        <div className="block sm:hidden">
          <div className="flex justify-center mb-6">
            <div className="cursor-pointer">
              <div className="relative w-32 h-32 overflow-hidden">
                <img
                  src="https://assets.cltstatic.com/images/responsive/hp/hp-asset1.png"
                  alt="gift"
                  className="w-full h-full object-contain"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
              <div className="p-2 text-center">
                <h3 className="text-xs font-semibold text-purple-600">
                 Wrapped with Love
                </h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {category.map((item) => {
              return (
                <div id='viewcollection_scroll'
                  key={item.product_category_id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/products_web?category=${item.product_category_id}`)}
                  >
                  <div className="relative w-full h-24 rounded-[25px] overflow-hidden">
                    <img
                      src={item?.cat_image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-1 text-center">
                    <h3 className="text-xs font-medium text-gray-800 leading-tight">
                      {item.name}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="overflow-x-auto scrollbar-hide mt-10">
           
            <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
               <div className="cursor-pointer mr-10">
                <div className="relative w-40 h-40 overflow-hidden ">
                  <img
                    src="https://assets.cltstatic.com/images/responsive/hp/hp-asset1.png"
                    alt="gift"
                    className="w-full h-full object-contain"
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>
                <div className="p-2 text-center">
                  <h3 className="text-lg font-semibold text-purple-600">
                    Wrapped with Love
                  </h3>
                </div>
              </div>
              {category?.map((item) => {
                return (
                  <div
                    id='viewcollection_scroll'
                    key={item.product_category_id}
                    className="cursor-pointer flex-shrink-0"
                    onClick={() => navigate(`/products_web?category=${item.product_category_id}`)}
                    style={{ width: '200px' }}
                  >
                    <div className="relative w-full h-48 rounded-[25px] overflow-hidden">
                      <img
                        src={item?.cat_image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="p-2 text-center">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default JewelryCategories;