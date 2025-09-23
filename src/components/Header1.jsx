
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
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/desklogo.png";
import { TreasureChestIcon } from "./treasure-chest-icon";
import {
  apiConnectorGet,
  apiConnectorPost,
  usequeryBoolean,
} from "../utils/ApiConnector";
import { endpoint, frontend } from "../utils/APIRoutes";
import { Lock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import SubcategoryView from "./SubcategoryView";
import { useQuery } from "react-query";
import { debounce } from "lodash";
import LoginModal from "./pages/LoginPage";
import copy from "copy-to-clipboard";
import hearticon from "../assets/hearticon.png"



export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMoreJewellery, setShowMoreJewellery] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [categories, setCategories] = useState([]);
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const searchRef = useRef(null);

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
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);


  const { data: profile_user } = useQuery(
    ["profile_user"],
    () =>
      apiConnectorGet(endpoint?.get_customer_profile),
    usequeryBoolean
  );

  const profile = profile_user?.data?.result || [];

  const navigate = useNavigate();
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const debouncedSetSearchQuery = useCallback(
    debounce((query) => {
      setDebouncedSearchQuery(query);
    }, 500), // 500ms debounce delay
    []
  );

  // Update on input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debouncedSetSearchQuery(e.target.value);
  };



  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!", { id: 1 });
  };


  const { data } = useQuery(
    ["search_product", debouncedSearchQuery],
    () =>
      apiConnectorPost(endpoint.get_search_product, {
        search: debouncedSearchQuery?.trim(),
      }),

    {
      ...usequeryBoolean,
      enabled: !!debouncedSearchQuery,
    }
  );

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
      bgColor: "bg-gradient-to-r from-[#CDA035] to-[#FFF2A6]",
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
      bgColor: "bg-gradient-to-r from-[#CDA035] to-[#FFF2A6]",
    },
    {
      name: "Collections",
      image:
        "https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Banner/Mobile/bestsellers/collections_t.png",
      bgColor: "bg-gradient-to-r from-yellow-100 to-yellow-50",
    },
  ];

  // Products & Services
   const productsServices = [
  {
    name: "Treasure Chest",
    description:
      "Pay 9 instalments, and get the 10th FREE as a SonaSutra Benefit!",
    image:
      "https://cdn.caratlane.com/media/static/images/web/Treasure-Chest-1-26-may-25.png",
    icon: "🎁",
    path: "/treasure-chest",   // 👈 Add path
  },
  {
    name: "Stores",
    description:
      "Visit the nearest store today to try your favourite jewellery.",
    image:
      "https://cdn.caratlane.com/media/static/images/web/Store-Vector-25.png",
    icon: "🏪",
    path: "/",   // 👈 Add path (if you want navigation)
  },
  {
    name: "Digital Gold",
    description:
      "Invest in 24K gold hassle-free with SonaSutra Digital Gold.",
    image:
      "https://cdn.caratlane.com/media/static/images/discovery/responsive-hamburger-menu/egold-1x.png",
    icon: "🥇",
    path: "/e-gold",   // 👈 Add path
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
  const { data: cart } = useQuery(
    ["get_cart"],
    () => apiConnectorGet(endpoint.get_cart),
    usequeryBoolean
  );

  const cartItems = cart?.data?.result || [];

  const { data: wish } = useQuery(
    ["get_wish"],
    () => apiConnectorGet(endpoint.get_wishlist),
    usequeryBoolean
  );

  const wishlistitems = wish?.data?.result || [];

  const { data: distri } = useQuery(
    ["profile_distributor"],
    () => apiConnectorGet(endpoint.get_profile_distributor),
    usequeryBoolean
  );
  const distri_pro = distri?.data?.result?.[0] || [];

  return (
    <header className="bg-white shadow-lg border-b border-yellow-600 relative">
      <div className="w-full">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-3 bg-white">
          {/* Sidebar Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-black hover:text-yellow-600 transition-colors"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Brand Logo */}
          <Link to={"/"} className="flex-shrink-0">
            <img src={logo} alt="" className="w-10 h-5" />
          </Link>

          {/* Search Bar */}
          <div className="flex flex-1 max-w-4xl mx-4" ref={searchRef}>
            <div className="relative w-full">
              <input
                type="text"
                placeholder={placeholders[currentPlaceholder]}
                value={searchQuery}
                onChange={(e) => {
                  handleSearchChange(e);
                  setShowDropdown(true); // show dropdown when typing
                }}
                className="w-full pl-4 pr-12 py-2.5 border border-yellow-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm border-r-0 transition-all duration-500 bg-white text-black placeholder-gray-500"
                style={{
                  animation: "placeholderSlide 0.5s ease-in-out",
                }}
              />
              <button
                className="absolute right-0 top-0 h-full px-4 hover:opacity-90 text-black border-0 transition-all overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-[#B8922E] hover:to-[#E6E599]"
                style={{
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

              {debouncedSearchQuery &&
                showDropdown &&
                data?.data?.result?.length > 0 && (
                  <div className="absolute z-50 bg-white shadow-xl w-full mt-1 rounded-md max-h-80 overflow-auto border border-yellow-200">
                    {data.data.result.map((item, index) => (
                      <div
                        key={`${item.product_id}-${index}`}
                        onMouseDown={() => {
                          navigate(`/products_web?subcategory=${item?.product_sub_cat_id}`);
                          setShowDropdown(false);
                        }}
                        className="block px-4 py-2 hover:bg-yellow-50 text-sm text-black border-b border-yellow-200 cursor-pointer transition-colors"
                      >
                        <div className="font-medium text-black">{item.pro_name}</div>
                        <div className="text-xs text-gray-600">
                          {item.cat_name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>

          {/* Heart and Cart Icons */}
          <div className="flex items-center space-x-1">

            {user ? (
              <>
                <Link
                  to={"/myaccount/profile"}
                  className="p-2 text-black hover:text-yellow-600 transition-colors"
                >
                  <UserIcon className="h-6 w-6" />
                </Link>
                <Link
                  to="/shopping-cart"
                  className="p-2 text-black hover:text-yellow-600 transition-colors relative"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#CDA035] to-[#FFF2A6] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                    {cartItems?.length}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="p-2 text-black hover:text-yellow-600 transition-colors relative"
                >
                  <UserIcon className="h-6 w-6" />

                </button>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="p-2 text-black hover:text-yellow-600 transition-colors relative"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#CDA035] to-[#FFF2A6] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                    {cartItems?.length}
                  </span>
                </button>
              </>
            )}

          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between px-4 h-20 w-full border-b border-yellow-600 shadow-lg bg-white">
          {/* Left - Logo */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="" className="h-10 w-28" />
            </Link>
          </div>

          {/* Middle - Search Bar */}
          <div className="flex flex-1 max-w-3xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={placeholders[currentPlaceholder]}
                value={searchQuery}
                onChange={(e) => {
                  handleSearchChange(e);
                  setShowDropdown(true);
                }}
                className="w-full pl-4 pr-12 py-2.5 border border-yellow-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 text-sm border-r-0 bg-white text-black placeholder-gray-500"
              />
              <button
                className="absolute top-0 right-0 h-full px-4 text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-[#B8922E] hover:to-[#E6E599] transition-all"
                style={{
                  borderTopRightRadius: "0.5rem",
                  borderBottomRightRadius: "0.5rem",
                  marginRight: '-5px',
                }}
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              {debouncedSearchQuery &&
                showDropdown &&
                data?.data?.result?.length > 0 && (
                  <div className="absolute z-50 bg-white shadow-xl w-full mt-1 rounded-md max-h-80 overflow-auto border border-yellow-200">
                    {data.data.result.map((item, index) => (
                      <div
                        key={`${item.product_id}-${index}`}
                        onMouseDown={() => {
                          navigate(`/products_web?subcategory=${item?.product_sub_cat_id}`);
                          setShowDropdown(false);
                        }}
                        className="block px-4 py-2 hover:bg-yellow-50 text-sm text-black border-b border-yellow-200 cursor-pointer transition-colors"
                      >
                        <div className="font-medium text-black">{item.pro_name}</div>
                        <div className="text-xs text-gray-600">
                          {item.cat_name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>

          {/* Right - Icons & Actions */}
          <div className="flex items-center space-x-3">
            {/* Treasure Chest */}
            <button className="flex items-center px-3 py-1.5 text-sm rounded-md bg-gradient-to-r from-[#CDA035] to-[#FFF2A6] 
            border border-yellow-500 text-black hover:from-[#B8922E] hover:to-[#E6E599] transition-colors"
              onClick={() => {
                if (user) {
                  navigate('/treasure-chest');
                } else {
                  setShowLoginModal(true);
                }
              }}>
              <TreasureChestIcon className="h-5 w-5 mr-1 text-yellow-800" />
              <span className="text-black">Treasure Chest</span>
              <span className="ml-2 bg-yellow-800 text-white text-xs px-2 py-0.5 rounded-full">NEW</span>
            </button>

            {/* Store Locator */}
            <button className="flex items-center px-3 py-1.5 text-sm rounded-md border border-yellow-600 text-black
             hover:bg-yellow-50 transition-colors" >
              <MapPinIcon className="h-5 w-5 mr-1 text-yellow-600" />
              <span className="text-black">Store Locator</span>
            </button>

            {/* e-Gold */}
            <div className="px-3 py-1.5 bg-white border border-yellow-500 rounded-md hover:from-[#B8922E] hover:to-[#E6E599]
             transition-colors cursor-pointer"
              onClick={() => {
                if (user) {
                  navigate('/e-gold');
                } else {
                  setShowLoginModal(true);
                }
              }}>
              <img
                src="https://cdn.caratlane.com/static/images/discovery/responsive-hamburger-menu/egold-1x.png"
                alt="e-Gold"
                className="h-6"
              />
            </div>

            {/* Flag */}
            <img
              src="https://th.bing.com/th/id/OIP.EDvMPBoxcb7F3r0YRni4YAHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc2"
              alt="India"
              className="h-5 w-6 rounded-sm border border-yellow-300"
            />

            {/* User */}
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <UserIcon className="h-6 w-6 text-black hover:text-yellow-600 cursor-pointer transition-colors" />
                {showUserDropdown && (
                  <div className="absolute right-0  w-72 bg-white shadow-xl border border-yellow-200 rounded-md z-50">
                    {/* User Dropdown content here */}
                    <div className="p-4">
                      <div className="text-center mb-3">
                        <h3 className="text-lg font-semibold text-black">{profile?.name}</h3>
                        <p className="text-sm text-gray-600">{profile?.cl_email}</p>
                      </div>
                      <hr className="border-yellow-200" />
                      <div className="mt-3 space-y-2">
                        <Link to="/myaccount/profile" className="block text-sm text-left text-black hover:bg-yellow-50 px-3 py-2 rounded transition-colors">My Account</Link>
                        {distri_pro?.mlm_is_distributor === 1 && (
                          <button
                            onClick={() => functionTOCopy(frontend + "/sign-up?referral_id=" + profile?.cust_unique_id)}
                            className="flex items-center justify-between w-full text-left text-sm text-black hover:bg-yellow-50 px-3 py-2 rounded transition-colors"
                          >
                            <span>Referral Code</span>
                            <ClipboardDocumentIcon className="w-5 h-5 text-yellow-600" />
                          </button>
                        )}

                        {/* <Toaster position="top-right" reverseOrder={false} /> */}
                        <button
                          onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                          }}
                          className="block w-full text-left text-sm text-black hover:bg-yellow-50 px-3 py-2 rounded transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setShowLoginModal(true)}>
                <UserIcon className="h-6 w-6 text-yellow-600 hover:text-yellow-700 transition-colors" />
              </button>
            )}
            {/* Wishlist */}
            <button
              onClick={() => user ? navigate("/wish") : setShowLoginModal(true)}
              className="relative text-black hover:text-yellow-600 transition-colors"
            >
              {/* <HeartIcon className="h-6 w-6" /> */}
              <div>
                <img src={hearticon} className="h-6 w-6" />
              </div>

              <span className="absolute -top-3 -right-2 bg-gradient-to-r from-[#CDA035] to-[#FFF2A6] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                {wishlistitems?.length}
              </span>
            </button>
            {/* Cart */}
            <button
              onClick={() => user ? navigate("/shopping-cart") : setShowLoginModal(true)}
              className="relative text-black hover:text-yellow-600 transition-colors"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-3 -right-2 bg-gradient-to-r from-[#CDA035] to-[#FFF2A6] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                {cartItems?.length}
              </span>
            </button>


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
                  category={selectedCategory}
                  onBack={() => setShowSubcategory(false)}
                  onCloseDrawer={() => setIsMobileMenuOpen(false)}
                />
              ) : (
                <>
                  {/* Sidebar Header */}
                  {/* Left side - Close button and Flag */}
                  <div className="flex items-center justify-between p-2 border-b border-yellow-200 bg-white">
                    {/* Left side - Close button and Flag */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-1 text-black hover:text-yellow-600 transition-colors"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                      <div className="flex items-center space-x-1">
                        <img
                          src="https://th.bing.com/th/id/OIP.EDvMPBoxcb7F3r0YRni4YAHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc2"
                          alt="Indian Flag"
                          className="w-5 h-auto border border-yellow-300 rounded-sm"
                        />
                        <span className="font-medium text-sm text-black">INDIA</span>
                      </div>
                    </div>

                    {/* Right side - Account, Heart, and Cart icons */}
                    <div className="flex items-center space-x-0">

                      {user ? <>
                        <Link
                          to={"/myaccount/profile"}
                          className="p-1.5 text-black hover:text-yellow-600 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <UserIcon className="h-5 w-5" />

                        </Link>
                        {/* Wishlist */}
                        <Link
                          to={"/wish"}
                          className="p-1.5 text-black hover:text-yellow-600 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <HeartIcon className="h-5 w-5" />
                          <span className="absolute top-2 right-10 bg-gradient-to-r from-[#CDA035] to-[#FFF2A6] text-black text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-lg">
                            {wishlistitems?.length}
                          </span>
                        </Link>

                        {/* Cart */}
                        <Link
                          to={"/shopping-cart"}
                          className="p-1.5 text-black hover:text-yellow-600 transition-colors relative mr-3"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <ShoppingCartIcon className="h-5 w-5" />
                          <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-[#CDA035] to-[#FFF2A6] text-black text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-lg">
                            {cartItems?.length}
                          </span>
                        </Link>

                      </>
                        :
                        <>
                          <Link
                            className="flex items-center gap-1 p-1.5 text-black hover:text-yellow-600 transition-colors"
                            onClick={() => { setShowLoginModal(true); setIsMobileMenuOpen(false) }}
                          >
                            <UserIcon className="h-5 w-5" />
                            <span className="font-medium text-sm">Account</span>
                          </Link>
                          <Link
                            className="p-1.5 text-black hover:text-yellow-600 transition-colors"
                            onClick={() => { setShowLoginModal(true); setIsMobileMenuOpen(false) }}
                          >
                            <HeartIcon className="h-5 w-5" />
                            <span className="absolute top-1 right-10 bg-gradient-to-r from-[#CDA035] to-[#FFF2A6] text-black text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-lg">
                              {wishlistitems?.length}
                            </span>
                          </Link>

                          <Link
                            className="p-1.5 text-black hover:text-yellow-600 transition-colors relative mr-3"
                            onClick={() => { setShowLoginModal(true); setIsMobileMenuOpen(false) }}
                          >
                            <ShoppingCartIcon className="h-5 w-5" />
                            <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-[#CDA035] to-[#FFF2A6] text-black text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-lg">
                              {cartItems?.length}
                            </span>
                          </Link>

                        </>
                      }
                    </div>
                  </div>

                  {/* Login Button */}
                  {user ? (
                    <div className="px-4 py-3">
                      {distri_pro?.mlm_is_distributor === 1 && (
                        <button
                          onClick={() => functionTOCopy(frontend + "/sign-up?referral_id=" + profile?.cust_unique_id)}
                          className="flex items-center justify-between w-full text-left px-3 py-2 bg-gradient-to-r from-[#CDA035] to-[#FFF2A6] border border-yellow-500 rounded-lg hover:from-[#B8922E] hover:to-[#E6E599] transition-colors"
                        >
                          <span className="text-black">Referral Code</span>
                          <ClipboardDocumentIcon className="w-5 h-5 text-yellow-800" />
                        </button>
                      )}

                      {/* <Toaster position="top-right" reverseOrder={false} /> */}
                    </div>
                  ) : (
                    <div className="px-4 py-3">
                      <button
                        className="flex items-center space-x-2 w-full px-3 py-2 bg-gradient-to-r from-[#CDA035] to-[#FFF2A6] border border-yellow-500 rounded-lg hover:from-[#B8922E] hover:to-[#E6E599] transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setShowLoginModal(true)
                        }}
                      >
                        <UserIcon className="h-5 w-5 text-yellow-800" />
                        <span className="font-medium text-sm text-black">LOGIN</span>
                      </button>
                    </div>
                  )}
                  <div className="px-4 py-2">
                    <div className="grid grid-cols-2 gap-4">
                      {loading
                        ? Array.from({ length: 6 }).map((_, index) => (
                          <div key={index} className="bg-white border border-yellow-200 rounded-lg p-4 shadow-sm">
                            <div className="flex flex-col items-center text-center space-y-2">
                              <div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse" />
                              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                            </div>
                          </div>
                        ))
                        : categories.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white border border-yellow-200 rounded-lg p-4 hover:bg-yellow-50 hover:border-yellow-500 transition-all cursor-pointer shadow-sm"
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
                              <span className="text-sm font-medium text-black leading-tight">
                                {item.name}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* More Jewellery Button */}
                    <button
                      onClick={() => setShowMoreJewellery(!showMoreJewellery)}
                      className="flex items-center justify-center space-x-2 w-full mt-4 py-3 text-yellow-600 font-medium text-sm hover:bg-yellow-50 rounded-lg transition-colors border border-yellow-500"
                    >
                      <span>
                        {showMoreJewellery
                          ? "Less Jewellery"
                          : "More Jewellery"}
                      </span>
                      <ChevronRightIcon
                        className={`h-4 w-4 transition-transform ${showMoreJewellery ? "rotate-90" : ""
                          }`}
                      />
                    </button>
                  </div>

                  {/* Promotional Slides */}
                  <div className="px-4 py-2">
                    <div className="relative rounded-lg overflow-hidden group border border-yellow-200">
                      <img
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].alt}
                        className="w-full h-auto object-cover transition-all duration-500 ease-in-out"
                      />

                      {/* Previous Arrow */}
                      <button
                        onClick={prevSlide}
                        className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-600/70"
                      >
                        <ChevronLeftIcon className="w-3 h-3" />
                      </button>

                      {/* Next Arrow */}
                      <button
                        onClick={nextSlide}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-600/70"
                      >
                        <ChevronRightIcon className="w-3 h-3" />
                      </button>

                      {/* Slide Navigation Dots */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {slides.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${index === currentSlide
                              ? "bg-yellow-600"
                              : "bg-white/50"
                              }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Slide Counter */}
                    <div className="flex justify-center mt-2">
                      <span className="bg-gradient-to-r from-[#CDA035] to-[#FFF2A6] text-black text-xs px-2 py-0.5 rounded-full">
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
                          className="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-all duration-300 border border-yellow-200 hover:border-yellow-500 hover:shadow-md"
                        >
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-16 object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <span className="text-sm font-semibold text-black bg-white/90 px-2 py-1 rounded border border-yellow-500">
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
                        <div className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent flex-1"></div>
                        <span className="text-sm font-semibold text-yellow-600 px-2">
                          Products & Services
                        </span>
                        <div className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent flex-1"></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {productsServices.map((service, index) => (
                        <div
                          key={index}
                          onClick={() =>navigate(service.path)}
                          className="bg-white border border-yellow-200 rounded-lg p-3 hover:shadow-lg hover:border-yellow-500 transition-all duration-300 cursor-pointer"
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
                              <h3 className="text-sm font-semibold text-black mb-1">
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
                  <div className="px-4 py-3 border-t border-yellow-200 mt-auto bg-white">
                    <div className="bg-gradient-to-r from-[#CDA035] to-[#FFF2A6] border border-yellow-500 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-black mb-1">
                            {profile?.name}
                          </h3>
                          <p className="text-gray-700 text-xs">
                            {profile?.cl_email}
                          </p>
                        </div>
                        <button className="bg-white text-black border border-yellow-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-50 
                        transition-colors" onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                          }}>
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
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
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