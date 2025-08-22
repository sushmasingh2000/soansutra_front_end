import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { endpoint } from '../utils/APIRoutes';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';

const NavigationBar = () => {
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const { data: categoryData } = useQuery(
    ['get_product_category'],
    () => axios.get(endpoint?.get_categroy_user),
    { keepPreviousData: true }
  );

  const categories = categoryData?.data?.result || [];

  const handleHomeClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };
  const handleServiceClick = (slug) => {
    navigate(slug);
    setIsServicesOpen(false);
    setIsMenuOpen(false);
  };
  const serviceLinks = [
    { name: 'Store Locator', slug: '/store-locator' },
    { name: 'Customer Service', slug: '/customer-service' },
    { name: 'Size Guide', slug: '/size-guide' },
    { name: 'Care Instructions', slug: '/care-instructions' }
  ];
  const fetchSubcategories = async (categoryId) => {
    if (activeCategoryId === categoryId && isDrawerOpen) {
      setIsDrawerOpen(false);
      setSubcategories([]);
      return;
    }

    try {
      setActiveCategoryId(categoryId);
      const response = await axios.get(
        `${endpoint.get_sub_categroy_user}?category_id=${categoryId}`
      );
      setSubcategories(response?.data?.result || []);
      setIsDrawerOpen(true);
    } catch (err) {
      toast.error('Failed to fetch subcategories.');
    }
  };

  const handleSubcategoryClick = (subcategoryId) => {
    setIsDrawerOpen(false);
    navigate(`/products_web/${subcategoryId}`);
  };

  return (
    <nav className="bg-purple-700 text-white ">
      <div className=" px-4 lg:block hidden">
        <div className="relative">
          <div className="flex space-x-10 py-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="group"
                onMouseEnter={() => fetchSubcategories(cat.product_category_id)}
              // onMouseLeave={() => {
              //   setActiveCategoryId(null);
              //   setSubcategories([]);
              // }}
              >
                <button className="text-sm font-semibold hover:text-pink-300  hover:font-bold">{cat.name}</button>
              </div>
            ))}
          </div>

          {activeCategoryId && subcategories.length > 0 && (
            <div className="absolute left-0 top-full !w-screen bg-white text-black shadow-lg z-50 p-6 grid grid-cols-6 gap-4">
              <div>
                <h3 className="text-sm font-bold  text-purple-700 mb-2">Featured</h3>
                <ul className="space-y-1 text-sm text-gray-500 font-semibold">
                  <li>Latest Designs</li>
                  <li>Best sellers</li>
                  <li>Fast Delivery</li>
                  <li>Special Deals</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold  text-purple-700 mb-2">By Style</h3>
                <ul className="space-y-1 text-sm text-gray-500 font-semibold">
                  {subcategories.map((sub) => (
                    <li key={sub.product_subcategory_id}>
                      <button
                        className="text-sm hover:text-pink-600 transition"
                        onClick={() => handleSubcategoryClick(sub.product_subcategory_id)}
                      >
                        {sub.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold  text-purple-700 mb-2">By Metal & Stone</h3>
                <ul className="space-y-1 text-sm text-gray-500 font-semibold">
                  <li>Diamond</li>
                  <li>Pearl</li>
                  <li>Navratna</li>
                  <li>Gemstone</li>
                  <li>Platinum</li>
                  <li>Gold</li>
                  <li>Rose Gold</li>
                  <li>White Gold</li>
                  <li>22KT Gold</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold  text-purple-700 mb-2">By Price</h3>
                <ul className="space-y-1 text-sm text-gray-500 font-semibold">
                  <li>Under ₹ 10k</li>
                  <li>₹ 10k - ₹ 20k</li>
                  <li>₹ 20k - ₹ 30k</li>
                  <li>₹ 30k - ₹ 50k</li>
                  <li>₹ 50k - ₹ 75k</li>
                  <li>₹ 75k & Above</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold  text-purple-700">Preview</h3>
                {subcategories[0]?.subcat_image ? (
                  <img
                    src={subcategories[0].subcat_image}
                    alt="Preview"
                    className="w-48 h-48 rounded shadow"
                  />
                ) : (
                  <div className="text-sm text-gray-400">No image available</div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold  text-purple-700">Preview</h3>
                {subcategories[1]?.subcat_image ? (
                  <img
                    src={subcategories[1].subcat_image}
                    alt="Preview"
                    className="w-48 h-48 rounded shadow"
                  />
                ) : (
                  <div className="text-sm text-gray-400">No image available</div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
   
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={handleHomeClick}
            className="text-lg font-semibold hover:text-pink-200 transition-colors duration-200"
          >
            CaratLane
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="px-4 py-4 border-t border-white/20">
            {/* Mobile Categories */}
            <div className="space-y-1">
              {categories.map((item) => (
                <div key={item.id} className="mb-2">
                  <button
                    onClick={() => fetchSubcategories(item.product_category_id)}
                    className="block w-full text-left px-3 py-3 text-sm font-medium hover:bg-white/10 rounded-md transition-colors duration-200"
                  >
                    {item.name}
                  </button>

                  {activeCategoryId === item.product_category_id && subcategories.length > 0 && (
                    <div className="pl-6 mt-1 space-y-1">
                      {subcategories.map((sub) => (
                        <button
                          key={sub.product_subcategory_id}
                          onClick={() => handleSubcategoryClick(sub.product_subcategory_id)}
                          className="block w-full text-left py-2 text-sm text-pink-200 hover:text-white transition-colors duration-200"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}


            </div>

            {/* Mobile Services */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium hover:bg-white/10 rounded-md transition-colors duration-200"
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isServicesOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="pl-6 pr-3 py-2 space-y-1">
                  {serviceLinks.map((service, index) => (
                    <button
                      key={index}
                      onClick={() => handleServiceClick(service.slug)}
                      className="block w-full text-left py-2 text-sm text-pink-200 hover:text-white transition-colors duration-200"
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Drawer */}
      {/* {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-4 relative text-black">
            <div className="flex items-center mb-4">
              <button onClick={() => setIsDrawerOpen(false)} className="text-purple-700 text-lg font-semibold mr-2">
                ←
              </button>
              <h2 className="text-lg font-bold text-purple-700">{
                categories.find(cat => cat.product_category_id === activeCategoryId)?.name || "Category"
              }</h2>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Latest Designs", "Bestsellers", "Fast Delivery", "Special Deals"].map((item) => (
                <button key={item} className="px-3 py-1 bg-purple-100 text-sm text-purple-700 rounded-full">
                  {item}
                </button>
              ))}
            </div>
            <h3 className="text-sm font-bold text-purple-700 mb-2">By Style</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {subcategories.map((sub) => (
                <div
                  key={sub.product_subcategory_id}
                  onClick={() => handleSubcategoryClick(sub.product_subcategory_id)}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <img
                    src={sub.subcat_image || '/placeholder.png'} // fallback image
                    alt={sub.name}
                    className="w-10 h-10 rounded border object-cover"
                  />
                  <span className="text-sm font-medium text-gray-800">{sub.name}</span>
                </div>
              ))}
            </div>
            <h3 className="text-sm font-bold text-purple-700 mb-2">By Metal & Stone</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6 text-sm text-gray-700">
              {[
                { name: 'Diamond', color: '#ccc', icon: '💎' },
                { name: 'Pearl', color: '#eee', icon: '⚪' },
                { name: 'Navratna', color: '#FF5733', icon: '🔴' },
                { name: 'Gemstone', color: '#000', icon: '💠' },
                { name: 'Platinum', color: '#B0BEC5', icon: '⚙️' },
                { name: 'Gold', color: '#FFD700', icon: '🟡' },
                { name: 'Rose Gold', color: '#E0BFB8', icon: '🌸' },
                { name: 'Yellow Gold', color: '#F7DC6F', icon: '🟡' },
                { name: 'White Gold', color: '#F0F0F0', icon: '⚪' },
                { name: '22KT Gold', color: '#FFD700', icon: '🟡' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-bold text-purple-700 mb-2">By Price</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                'Under ₹ 10k',
                '₹ 10k – ₹ 20k',
                '₹ 20k – ₹ 30k',
                '₹ 30k – ₹ 50k',
                '₹ 40k – ₹ 50k',
                '₹ 50k – ₹ 75k',
                '₹ 75k & Above',
              ].map((price, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                >
                  {price}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {subcategories.slice(0, 2).map((sub, idx) => (
                <div key={idx}>
                  {sub.subcat_image ? (
                    <img
                      src={sub.subcat_image}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-sm"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-sm text-gray-400 rounded">
                      No image
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )} */}

    </nav>
  );
};

export default NavigationBar;
