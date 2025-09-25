import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { endpoint } from "../utils/APIRoutes";
import { apiConnectorGet, usequeryBoolean } from "../utils/ApiConnector";
import SubcategoryView from "./SubcategoryView";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  Loader,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import { useLoginModal } from "../context/Login";
import { Skeleton } from "@mui/material";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMoreJewellery, setShowMoreJewellery] = useState(false);
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activecategoryId, setActivecategoryId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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
      bgColor: "bg-gradient-to-r from-yellow-100 to-yellow-50",
    },
  ];
  const productsServices = [
    {
      name: "Treasure Chest",
      description:
        "Pay 9 instalments, and get the 10th FREE as a SonaSutra Benefit!",
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

  const { data: categoryData, isLoading } = useQuery(
    ["get_product_category"],
    () => axios.get(endpoint?.get_categroy_user),
    usequeryBoolean
  );

  const categories = categoryData?.data?.result || [];
  const subcategoryCache = useRef({});

  const fetchSubcategories = async (categoryId) => {
    // If subcategories are cached, use them
    if (subcategoryCache.current[categoryId]) {
      setSubcategories(subcategoryCache.current[categoryId]);
      setActiveCategoryId(categoryId);
      setActivecategoryId(categoryId);
      setIsDrawerOpen(true);
      return;
    }

    try {
      setLoader(true);
      setActiveCategoryId(categoryId);
      setActivecategoryId(categoryId);

      const response = await axios.get(
        `${endpoint.get_sub_categroy_user}?category_id=${categoryId}`
      );

      const fetchedSubcategories = response?.data?.result || [];

      // Cache the result
      subcategoryCache.current[categoryId] = fetchedSubcategories;

      setSubcategories(fetchedSubcategories);
      setIsDrawerOpen(true);
    } catch (err) {
      toast.error("Failed to fetch subcategories.");
    } finally {
      setLoader(false);
    }
  };

  // const fetchSubcategories = async (categoryId) => {
  //   if (activeCategoryId === categoryId && isDrawerOpen) {
  //     setIsDrawerOpen(false);
  //     setSubcategories([]);
  //     return;
  //   }
  //   try {
  //     setLoader(true)
  //     setActiveCategoryId(categoryId);
  //     setActivecategoryId(categoryId);
  //     const response = await axios.get(
  //       `${endpoint.get_sub_categroy_user}?category_id=${categoryId}`
  //     );
  //     setSubcategories(response?.data?.result || []);
  //     setIsDrawerOpen(true);
  //   } catch (err) {
  //     toast.error("Failed to fetch subcategories.");
  //   }
  //   finally {
  //     setLoader(false)
  //   }
  // };

  const handleSubcategoryClick = (subcategoryId) => {
    setIsDrawerOpen(false);
    navigate(`/products_web?subcategory=${subcategoryId}`);
  };
  const handleMobileJewelryClick = (item) => {
    setIsMenuOpen(true);
    setSelectedCategory(item);
    setShowSubcategory(true);
    fetchSubcategories(item.product_category_id);
  };

  const { data } = useQuery(
    ["sub_cate_product", activecategoryId],
    () =>
      apiConnectorGet(
        `${endpoint.get_categroy_filtered_item}?product_category_id=${activecategoryId}`
      ),
    {
      ...usequeryBoolean,
      enabled: !!activecategoryId,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    }
  );

  const sub_cate_product = data?.data?.result || [];

  const { data: cart } = useQuery(
    ["get_cart"],
    () => apiConnectorGet(endpoint.get_cart),
    usequeryBoolean
  );

  const cartItems = cart?.data?.result || [];

  const { data: profile_user } = useQuery(
    ["profile_user"],
    () => apiConnectorGet(endpoint?.get_customer_profile),
    usequeryBoolean
  );

  const profile = profile_user?.data?.result || [];

  const { data: bannner } = useQuery(
    ["banner_data"],
    () => apiConnectorGet(endpoint?.get_banner),
    usequeryBoolean
  );

  const slides = bannner?.data?.result || [];

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

  const { setShowLoginModal } = useLoginModal();

  const user = localStorage.getItem("token");

  return (
    <nav className="bg-yellow-700 text-white ">
      <div className=" px-4 lg:block hidden">
        <div className="relative">
          <div className="flex space-x-10 py-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton variant="rectangular" className="w-16 h-10" />
                ))
              : categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="group"
                    onMouseEnter={() =>
                      fetchSubcategories(cat.product_category_id)
                    }
                    // onMouseLeave={() => {
                    //   setActiveCategoryId(null);
                    //   setSubcategories([]);
                    // }}
                  >
                    <button className="text-sm font-semibold hover:text-yellow-300  hover:font-bold">
                      {cat.name}
                    </button>
                  </div>
                ))}
          </div>

          {activeCategoryId && subcategories.length > 0 && (
            <div className="absolute left-0 top-full !w-screen bg-white text-black shadow-lg z-50 p-6 grid grid-cols-6 gap-4">
              <div>
                <h3 className="text-sm font-bold  text-yellow-700 mb-2">
                  Featured
                </h3>
                <ul className="space-y-1 text-sm text-gray-500 font-semibold">
                  <li>Latest Designs</li>
                  <li>Best sellers</li>
                  <li>Fast Delivery</li>
                  <li>Special Deals</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold  text-yellow-700 mb-2">
                  By Style
                </h3>
                <ul className="space-y-1 text-sm text-gray-500 font-semibold">
                  {loader
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                          variant="rectangular"
                          className="!w-16 !h-4 !rounded-lg"
                        />
                      ))
                    : subcategories.map((sub) => (
                        <li key={sub.product_subcategory_id}>
                          <button
                            className="text-sm hover:text-pink-600 transition"
                            onClick={() =>
                              handleSubcategoryClick(sub.product_subcategory_id)
                            }
                          >
                            {sub.name}
                          </button>
                        </li>
                      ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-yellow-700 mb-2">
                  By Metal & Stone
                </h3>

                {loader
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        variant="rectangular"
                        className="!w-16 !h-4 !my-1 !rounded-lg"
                      />
                    ))
                  : (() => {
                      const seen = new Set();
                      return sub_cate_product?.map((item, index) => {
                        const {
                          master_mat_name,
                          material_name,
                          product_subcategory_id,
                        } = item;

                        if (seen.has(master_mat_name)) return null;
                        seen.add(master_mat_name);

                        return (
                          <ul
                            key={index}
                            className="space-y-1 text-sm text-gray-500 font-semibold cursor-pointer"
                          >
                            {/* Master Material Name */}
                            <li
                              onClick={() =>
                                handleSubcategoryClick(product_subcategory_id)
                              }
                            >
                              {master_mat_name}
                            </li>

                            {/* Material Name — only if different */}
                            {material_name !== master_mat_name && (
                              <li
                                onClick={() =>
                                  handleSubcategoryClick(product_subcategory_id)
                                }
                              >
                                {material_name}
                              </li>
                            )}
                          </ul>
                        );
                      });
                    })()}
              </div>

              <div>
                <h3 className="text-sm font-bold  text-yellow-700 mb-2">
                  By Price
                </h3>
                <div className="space-y-2">
                  {loader
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                          variant="rectangular"
                          className="!w-16 !h-4 !rounded-lg"
                        />
                      ))
                    : [
                        ...new Set(
                          sub_cate_product.map((item) => item.price_group)
                        ),
                      ]
                        .sort((a, b) => {
                          const getSortValue = (label) => {
                            const match = label.match(/(\d+)(?!.*\d)/);
                            return match
                              ? parseInt(match[1])
                              : Number.MAX_SAFE_INTEGER;
                          };
                          return getSortValue(a) - getSortValue(b);
                        })
                        .map((priceGroup, index) => {
                          const item = sub_cate_product.find(
                            (p) => p.price_group === priceGroup
                          );
                          return (
                            <div
                              key={index}
                              onClick={() =>
                                item &&
                                handleSubcategoryClick(
                                  item.product_subcategory_id
                                )
                              }
                              className="text-sm text-gray-600 font-semibold cursor-pointer hover:bg-gray-100 rounded transition-all duration-150 "
                            >
                              ₹ {priceGroup}
                            </div>
                          );
                        })}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold  text-yellow-700">Preview</h3>
                {loader ? (
                  Array.from({ length: 1 }).map((_, index) => (
                    <Skeleton
                      variant="rectangular"
                      className="!w-48 !h-48 !rounded"
                    />
                  ))
                ) : subcategories[0]?.subcat_image ? (
                  <img
                    src={subcategories[0].subcat_image}
                    alt="Preview"
                    className="w-48 h-48 rounded shadow"
                  />
                ) : (
                  <div className="text-sm text-gray-400">
                    No image available
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold  text-yellow-700">Preview</h3>
                {loader ? (
                  Array.from({ length: 1 }).map((_, index) => (
                    <Skeleton
                      variant="rectangular"
                      className="!w-48 !h-48  !rounded"
                    />
                  ))
                ) : subcategories[1]?.subcat_image ? (
                  <img
                    src={subcategories[1].subcat_image}
                    alt="Preview"
                    className="w-48 h-48 rounded shadow"
                  />
                ) : (
                  <div className="text-sm text-gray-400">
                    No image available
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden bg-white shadow-md">
        <div className="px-4 py-2 relative">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {isLoading
              ? Array.from({ length: 2 }).map((_, index) => (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div
                      key={index}
                      className="w-full h-full flex-shrink-0 relative"
                    >
                      <img className="w-20 h-20 rounded-xl object-cover mb-2" />
                      <span className="text-xs text-gray-800" />
                    </div>
                  </div>
                ))
              : categories.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMobileJewelryClick(item)}
                    className="flex flex-col items-center w-24 flex-shrink-0"
                  >
                    <img
                      src={item.cat_image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover mb-2"
                    />
                    <span className="text-xs text-gray-800">{item.name}</span>
                  </button>
                ))}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
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
                      onClick={() => setIsMenuOpen(false)}
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
                  <div className="flex items-center ">
                    {/* Account */}
                    {user ? (
                      <>
                        <Link
                          to={"/myaccount/profile"}
                          className="flex items-center p-1.5 text-gray-700 hover:text-yellow-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <HeartIcon className="h-5 w-5" />
                        </Link>

                        {/* Cart (icon only with badge) */}
                        <Link
                          to={"/shopping-cart"}
                          className="flex items-center p-1.5 text-gray-700 hover:text-yellow-600 transition-colors relative mr-3"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <ShoppingCartIcon className="h-5 w-5" />
                          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {cartItems?.length}
                          </span>
                        </Link>
                      </>
                    ) : (
                      <Link
                        className="flex items-center gap-1 p-1.5 text-gray-700 hover:text-yellow-600 transition-colors"
                        onClick={() => {
                          setShowLoginModal(true);
                          setIsMenuOpen(false);
                        }}
                      >
                        <UserIcon className="h-5 w-5" />
                        <span className="font-medium text-sm">Account</span>
                      </Link>
                    )}

                    {/* Wishlist (icon only) */}
                  </div>
                </div>
                {/* Jewelry Categories */}
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
                  <button
                    onClick={() => setShowMoreJewellery(!showMoreJewellery)}
                    className="flex items-center justify-center space-x-2 w-full mt-4 py-3 text-yellow-600 font-medium text-sm hover:bg-yellow-50 rounded-lg transition-colors"
                  >
                    <span>
                      {showMoreJewellery ? "Less Jewellery" : "More Jewellery"}
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
                            index === currentSlide ? "bg-white" : "bg-white/50"
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
                      <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1"></div>
                      <span className="text-sm font-semibold text-yellow-700 px-2">
                        Products & Services
                      </span>
                      <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1"></div>
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
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-yellow-700 mb-1">
                          {" "}
                          {profile?.name}
                        </h3>
                        <p className="text-gray-600 text-xs">
                          {" "}
                          {profile?.cl_email}
                        </p>
                      </div>
                      <button
                        className="bg-white text-yellow-700 px-4 py-2 rounded-lg text-sm font-medium
                       hover:bg-yellow-50 transition-colors"
                        onClick={() => {
                          localStorage.clear();
                          window.location.reload();
                        }}
                      >
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
    </nav>
  );
};

export default NavigationBar;
