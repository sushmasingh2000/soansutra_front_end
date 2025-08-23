import {
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BrandLogo } from "./brand-logo";
import { TreasureChestIcon } from "./treasure-chest-icon";
import { apiConnectorGet } from "../utils/ApiConnector";
import { endpoint } from "../utils/APIRoutes";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import SubcategoryView from "./SubcategoryView";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMoreJewellery, setShowMoreJewellery] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [categories, setCategories] = useState([]);
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const placeholders = ["Search Relationship", "Search Price"];

  useEffect(() => {
    const placeholderInterval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(placeholderInterval);
  }, []);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiConnectorGet(endpoint.get_categroy_user);
      setCategories(response?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories()
  }, [])
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiConnectorGet(endpoint?.get_customer_profile);
        setProfile(response?.data?.result)
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const slides = [
    {
      image:
        "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/22kt_m.png",
      alt: "22KT Everyday Collection",
    },
    {
      image:
        "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/slide/wearyourwins_m.png",
      alt: "Wear Your Wins",
    },
  ];

  // New category sections
  const categorySections = [
    {
      name: "Best Sellers",
      image:
        "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/bestsellers/bestsellers_m.png",
      bgColor: "bg-gradient-to-r from-blue-100 to-blue-50",
    },
    {
      name: "Latest",
      image:
        "https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/Hamburger/02/latest_m.png",
      bgColor: "bg-gradient-to-r from-gray-100 to-gray-50",
    },
    {
      name: "Trending",
      image:
        "https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/Hamburger/02/trending_m.png",
      bgColor: "bg-gradient-to-r from-yellow-100 to-yellow-50",
    },
    {
      name: "Collections",
      image:
        "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/bestsellers/collections_t.png",
      bgColor: "bg-gradient-to-r from-purple-100 to-purple-50",
    },
  ];

  // Products & Services
  const productsServices = [
    {
      name: "Treasure Chest",
      description:
        "Pay 9 instalments, and get the 10th FREE as a CaratLane Benefit!",
      image:
        "https://cdn.caratlane.com/media/static/images/web/Treasure-Chest-1-26-may-25.png",
      icon: "🎁",
    },
    {
      name: "Stores",
      description:
        "Visit the nearest store today to try your favourite jewellery.",
      image:
        "https://cdn.caratlane.com/media/static/images/web/Store-Vector-25.png",
      icon: "🏪",
    },
    {
      name: "Digital Gold",
      description:
        "Invest in 24K gold hassle-free with CaratLane's Digital Gold.",
      image:
        "https://cdn.caratlane.com/media/static/images/discovery/responsive-hamburger-menu/egold-1x.png",
      icon: "🥇",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Changes slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual slide functions
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const user = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState([]);

  const getCart = async () => {
    try {
      const response = await apiConnectorGet(endpoint?.get_cart);
      if (response?.data?.success) {
        setCartItems(response.data.result);
      } else {
        console.error("Failed to fetch cart:", response?.data?.message);
      }
    } catch (e) {
      console.log("something went wrong", e);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative">
      <div className="w-full">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-3">
          {/* Sidebar Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-purple-600 transition-colors"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Brand Logo */}
          <Link to={"/"} className="flex-shrink-0">
            <BrandLogo />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 mx-3 max-w-xs">
            <div className="relative">
              <input
                type="text"
                placeholder={placeholders[currentPlaceholder]}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-purple-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm border-r-0 transition-all duration-500"
                style={{
                  animation: "placeholderSlide 0.5s ease-in-out",
                }}
              />
              <button
                className="absolute right-0 top-0 h-full px-3 hover:opacity-90 text-white border-0 transition-all overflow-hidden"
                style={{
                  background:
                    "linear-gradient(to right, #de57e5 0%, #8863fb 100%)",
                  borderTopRightRadius: "0.5rem",
                  borderBottomRightRadius: "0.5rem",
                  border: "none",
                  outline: "none",
                  width: "44px",
                  right: "-6px",
                  top: "0px",
                  height: "calc(100% - 0px)",
                }}
              >
                <MagnifyingGlassIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Heart and Cart Icons */}
          <div className="flex items-center space-x-1">
            <Link
              to={"/myaccount/profile"}
              className="p-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <HeartIcon className="h-6 w-6" />
            </Link>
            <Link
              to={"/shopping-cart"}
              className="p-2 text-gray-700 hover:text-purple-600 transition-colors relative"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems?.length}
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between h-16 px-2">
          {/* Logo - close to left edge */}
          <Link to={"/"} className="flex-shrink-0 pl-2">
            <BrandLogo />
          </Link>

          <div className="flex flex-1 max-w-4xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={placeholders[currentPlaceholder]}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 border border-purple-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm border-r-0 transition-all duration-500"
                style={{
                  animation: "placeholderSlide 0.5s ease-in-out",
                }}
              />
              <button
                className="absolute right-0 top-0 h-full px-4 hover:opacity-90 text-white border-0 transition-all overflow-hidden"
                style={{
                  background:
                    "linear-gradient(to right, #de57e5 0%, #8863fb 100%)",
                  borderTopRightRadius: "0.5rem",
                  borderBottomRightRadius: "0.5rem",
                  border: "none",
                  width: "54px",
                  right: "-9px",
                  top: "0px",
                  height: "calc(100% - 0px)",
                }}
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation - close to right edge */}
          <div className="flex items-center space-x-2 pr-2">
            {/* Treasure Chest */}
            <button className="flex items-center space-x-2 px-3 py-2 bg-[#F8EBFB] text-gray-700 hover:text-purple-600 transition-colors rounded-lg border border-purple-500">
              <TreasureChestIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Treasure Chest</span>
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-1">
                NEW
              </span>
            </button>

            {/* Store Locator */}
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors rounded-lg border border-[rgb(176,0,21)]">
              <MapPinIcon className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium">Store locator</span>
            </button>

            {/* Gold/Location Info */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-100 rounded-lg border border-[rgb(176,135,0)]">
              <img
                src="https://cdn.caratlane.com/static/images/discovery/responsive-hamburger-menu/egold-1x.png"
                alt="e-Gold"
                className="h-6 w-auto"
              />
            </div>

            {/* Indian Flag */}
            <div className="px-2">
              <img
                src="https://th.bing.com/th/id/OIP.EDvMPBoxcb7F3r0YRni4YAHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc2"
                alt="Indian Flag"
                className="w-6 h-auto"
              />
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-1">
              {/* User Icon with Dropdown */}
              {user ? (
                <>
                  <div
                    className="relative"
                    onMouseEnter={() => setShowUserDropdown(true)}
                    onMouseLeave={() => setShowUserDropdown(false)}
                  >
                    <Link className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
                      <UserIcon className="h-6 w-6" />
                    </Link>
                    {/* Desktop User Dropdown */}
                    {showUserDropdown && (
                      <div className="absolute top-full right-0  w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-[100]">
                        <div className="p-4">
                          <div className="text-center mb-4">
                            <h3 className="text-lg font-semibold text-purple-700 mb-1">{profile?.name}</h3>
                            <p className="text-gray-600 text-sm">{profile?.cl_email}</p>
                          </div>

                          <hr className="border-t-2 border-purple-300 mb-4" />

                          <div className="space-y-2">
                            <Link
                              to="/myaccount/profile"
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded transition-colors"
                            >
                              MY ACCOUNTS
                            </Link>
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded transition-colors">
                              LOGOUT
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  to={"/login"}
                  className="p-2 text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <Lock className="h-6 w-6" />
                </Link>
              )}
              <Link
                to={"/myaccount/profile"}
                className="p-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <HeartIcon className="h-6 w-6" />
              </Link>
              <Link
                to={"/shopping-cart"}
                className="p-2 text-gray-700 hover:text-purple-600 transition-colors relative"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems?.length}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[100]">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <div className="relative w-full bg-white h-full shadow-xl overflow-y-auto flex flex-col">
              {showSubcategory ? (
                <SubcategoryView
                  category={selectedCategory} // Pass category object here
                  onBack={() => setShowSubcategory(false)} // Optional: pass a back function
                />
              ) : (
                <>
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between p-2 border-b">
                    {/* Left side - Close button and Flag */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-1 text-gray-600 hover:text-gray-800"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                      <div className="flex items-center space-x-1">
                        <img
                          src="https://th.bing.com/th/id/OIP.EDvMPBoxcb7F3r0YRni4YAHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc2"
                          alt="Indian Flag"
                          className="w-5 h-auto"
                        />
                        <span className="font-medium text-sm text-gray-800">
                          INDIA
                        </span>
                      </div>
                    </div>

                    {/* Right side - Account, Heart, and Cart icons */}
                    <div className="flex items-center space-x-0">
                      {user ? (
                        <Link
                          to={"/myaccount/profile"}
                          className="p-1.5 text-gray-700 hover:text-purple-600 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <UserIcon className="h-5 w-5" />
                        </Link>
                      ) : (
                        <Link
                          to={"/login"}
                          className="p-1.5 text-gray-700 hover:text-purple-600 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Lock className="h-5 w-5" />
                        </Link>
                      )}

                      <Link
                        to={"/shopping-cart"}
                        className="p-1.5 text-gray-700 hover:text-purple-600 transition-colors relative"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ShoppingCartIcon className="h-5 w-5" />
                        <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {cartItems?.length}
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Login Button */}
                  {user ? (
                    ""
                  ) : (
                    <div className="px-4 py-3">
                      <Link
                        to={"/login"}
                        className="flex items-center space-x-2 w-full px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <UserIcon className="h-5 w-5" />
                        <span className="font-medium text-sm">LOGIN</span>
                      </Link>
                    </div>
                  )}
                  <div className="px-4 py-2">
                    <div className="grid grid-cols-2 gap-4">
                      {categories.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedCategory(item); // Set selected category
                            setShowSubcategory(true); // Show the SubcategoryView
                          }}
                        >
                          <div className="flex flex-col items-center text-center space-y-2">
                            <img
                              src={item.cat_image}
                              alt={item.name}
                              className="w-12 h-12 object-contain"
                            />
                            <span className="text-sm font-medium text-gray-800 leading-tight">
                              {item.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* More Jewellery Button */}
                    <button
                      onClick={() => setShowMoreJewellery(!showMoreJewellery)}
                      className="flex items-center justify-center space-x-2 w-full mt-4 py-3 text-purple-600 font-medium text-sm hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <span>
                        {showMoreJewellery
                          ? "Less Jewellery"
                          : "More Jewellery"}
                      </span>
                      <ChevronRightIcon
                        className={`h-4 w-4 transition-transform ${
                          showMoreJewellery ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Promotional Slides */}
                  <div className="px-4 py-2">
                    <div className="relative rounded-lg overflow-hidden group">
                      <img
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].alt}
                        className="w-full h-auto object-cover transition-all duration-500 ease-in-out"
                      />

                      {/* Previous Arrow */}
                      <button
                        onClick={prevSlide}
                        className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                      >
                        <ChevronLeftIcon className="w-3 h-3" />
                      </button>

                      {/* Next Arrow */}
                      <button
                        onClick={nextSlide}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                      >
                        <ChevronRightIcon className="w-3 h-3" />
                      </button>

                      {/* Slide Navigation Dots */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {slides.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              index === currentSlide
                                ? "bg-white"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Slide Counter */}
                    <div className="flex justify-center mt-2">
                      <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                        {currentSlide + 1}/{slides.length}
                      </span>
                    </div>
                  </div>

                  {/* Category Sections Grid */}
                  <div className="px-4 py-2">
                    <div className="grid grid-cols-2 gap-3">
                      {categorySections.map((category, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-300"
                        >
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-16 object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <span className="text-sm font-semibold text-gray-800 bg-white/80 px-2 py-1 rounded">
                              {category.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Products & Services Section */}
                  <div className="px-4 py-2">
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1"></div>
                        <span className="text-sm font-semibold text-purple-700 px-2">
                          Products & Services
                        </span>
                        <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1"></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {productsServices.map((service, index) => (
                        <div
                          key={index}
                          className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                src={service.image}
                                alt={service.name}
                                className="w-12 h-10 object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                {service.name}
                              </h3>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile User Profile Section at Bottom */}
                  <div className="px-4 py-3 border-t border-gray-200 mt-auto">
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-purple-700 mb-1">
                            abhishek chaurasia
                          </h3>
                          <p className="text-gray-600 text-xs">
                            freefireprouser456@yahoo.com
                          </p>
                        </div>
                        <button className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                          LOGOUT
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CSS Animation for placeholder slide effect */}
      <style>{`
  @keyframes placeholderSlide {
    0% {
      transform: translateY(-10px);
      opacity: 0.7;
    }
    50% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`}</style>
    </header>
  );
}
