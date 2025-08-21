import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { endpoint } from '../utils/APIRoutes';
import toast from 'react-hot-toast';

const NavigationBar = () => {
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: categoryData, isLoading: loadingCategories } = useQuery(
    ['get_product_category'],
    () => axios.get(endpoint?.get_categroy_user),
    { keepPreviousData: true }
  );

  const categories = categoryData?.data?.result || [];

  const fetchSubcategories = async (categoryId) => {
    if (activeCategoryId === categoryId) {
      setActiveCategoryId(null);
      setSubcategories([]);
      return;
    }

    try {
      setActiveCategoryId(categoryId);
      const response = await axios.get(
        `${endpoint.get_sub_categroy_user}?category_id=${categoryId}`
      );
      setSubcategories(response?.data?.result || []);
    } catch (err) {
      toast.error('Failed to fetch subcategories.');
    }
  };

  const handleSubcategoryClick = (productSubcategoryId) => {
    navigate(`/products_web/${productSubcategoryId}`);
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };


  const handleServiceClick = (slug) => {
    navigate(slug);
    setIsServicesOpen(false);
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const serviceLinks = [
    { name: 'Store Locator', slug: '/store-locator' },
    { name: 'Customer Service', slug: '/customer-service' },
    { name: 'Size Guide', slug: '/size-guide' },
    { name: 'Care Instructions', slug: '/care-instructions' }
  ];

  if (loadingCategories) {
    return (
      <nav className="text-white sticky top-0 z-50 bg-purple-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <h1 className="text-lg font-semibold">CaratLane</h1>
            <div className="flex space-x-4 animate-pulse">
              <div className="h-4 bg-white/20 rounded w-16"></div>
              <div className="h-4 bg-white/20 rounded w-20"></div>
              <div className="h-4 bg-white/20 rounded w-18"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="text-white sticky top-0 z-50 bg-purple-700">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-8">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => {
                    setActiveCategoryId(cat.product_category_id);
                    fetchSubcategories(cat.product_category_id);
                  }}
                  onMouseLeave={() => {
                    setActiveCategoryId(null);
                  }}
                >
                  <button
                    type="button"
                    className="text-sm font-medium hover:text-pink-200 transition-colors duration-200 whitespace-nowrap"
                  >
                    {cat.name}
                  </button>

                  {/* Subcategory Dropdown */}
                  {activeCategoryId === cat.product_category_id && subcategories.length > 0 && (
                    <div className="absolute top-full left-0  w-64 bg-white text-black shadow-lg z-50">
                      <div className="py-2 grid grid-cols-1 gap-2">
                        {subcategories.map((sub) => (
                          <button
                            key={sub.product_subcategory_id}
                            onClick={() => handleSubcategoryClick(sub.product_subcategory_id)}
                            className="flex items-center space-x-3 w-full text-left px-4 border-t hover:bg-gray-100 transition"
                          >
                            <img
                              src={sub.subcat_image}
                              alt={sub.name}
                              className="w-3 h-3 object-cover rounded"
                            />
                            <span className="text-sm">{sub.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
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
    </nav>
  );
};

export default NavigationBar;
