import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const NavigationBar = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock API call - replace with your actual API endpoint
  const fetchNavigationData = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - Updated with category slugs
      const mockData = [
        { id: 1, name: 'Rings', slug: 'rings', category: 'rings' },
        { id: 2, name: 'Earrings', slug: 'earrings', category: 'earrings' },
        { id: 3, name: 'Bracelets & Bangles', slug: 'bracelets-bangles', category: 'bracelets-bangles' },
        { id: 4, name: 'Solitaires', slug: 'solitaires', category: 'solitaires' },
        { id: 5, name: 'Mangalsutras', slug: 'mangalsutras', category: 'mangalsutras' },
        { id: 6, name: 'Necklaces & Pendants', slug: 'necklaces-pendants', category: 'necklaces-pendants' },
        { id: 7, name: 'More Jewellery', slug: 'more-jewellery', category: 'more-jewellery' },
        { id: 8, name: 'Silver by Shaya', slug: 'silver-collection', category: 'silver-collection' },
        { id: 9, name: 'Gifting', slug: 'gifting', category: 'gifting' },
        { id: 10, name: 'Trending', slug: 'trending', category: 'trending' },
        { id: 11, name: 'Collections', slug: 'collections', category: 'collections' }
      ];
      
      setNavItems(mockData);
    } catch (error) {
      console.error('Failed to fetch navigation data:', error);
      // Fallback data
      setNavItems([
        { id: 1, name: 'Rings', slug: 'rings', category: 'rings' },
        { id: 2, name: 'Earrings', slug: 'earrings', category: 'earrings' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavigationData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  // Updated navigation handler for product categories
  const handleNavClick = (item) => {
    if (item.category) {
      // Navigate to products page with category parameter
      navigate(`/products/${item.category}`);
    } else {
      // For other pages like home
      navigate('/');
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  // Handler for services navigation
  const handleServiceClick = (slug) => {
    navigate(slug);
    setIsServicesOpen(false);
    setIsMenuOpen(false);
  };

  // Handler for home/logo click
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

  if (loading) {
    return (
      <nav style={{ backgroundColor: '#4f3267' }} className="text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <h1 className="text-lg font-semibold">CaratLane</h1>
            <div className="flex items-center space-x-4">
              <div className="animate-pulse flex space-x-4">
                <div className="h-4 bg-white/20 rounded w-16"></div>
                <div className="h-4 bg-white/20 rounded w-20"></div>
                <div className="h-4 bg-white/20 rounded w-18"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav style={{ backgroundColor: '#4f3267' }} className="text-white sticky top-0 z-50">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button 
              onClick={handleHomeClick}
              className="text-lg font-semibold hover:text-pink-200 transition-colors duration-200"
            >
              CaratLane
            </button>

            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="text-sm font-medium hover:text-pink-200 transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                </button>
              ))}

              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleServices}
                  className="flex items-center space-x-1 text-sm font-medium hover:text-pink-200 transition-colors duration-200"
                >
                  <span>Services</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isServicesOpen ? 'rotate-180' : ''
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

                {/* Desktop Services Dropdown Menu */}
                {isServicesOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {serviceLinks.map((service, index) => (
                        <button
                          key={index}
                          onClick={() => handleServiceClick(service.slug)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                        >
                          {service.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (< lg) */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-4 h-14">
          <button 
            onClick={handleHomeClick}
            className="text-lg font-semibold hover:text-pink-200 transition-colors duration-200"
          >
            CaratLane
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                isMenuOpen ? 'rotate-90' : ''
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

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 border-t border-white/20">
            {/* Mobile Navigation Items */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left px-3 py-3 text-sm font-medium hover:bg-white/10 rounded-md transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Services Section */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <button
                onClick={toggleServices}
                className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium hover:bg-white/10 rounded-md transition-colors duration-200"
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isServicesOpen ? 'rotate-180' : ''
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

              {/* Mobile Services Dropdown */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isServicesOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
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