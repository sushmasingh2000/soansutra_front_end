import React, { useEffect, useState } from "react";
import {
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Shield,
  Truck,
  Copy,
} from "lucide-react";
import Header from "../Header1";
import NavigationBar from "../navigationbar";
import Footer from "../Footer1";
import CustomerReviewSection from "../customerReview";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../../utils/APIRoutes";
import { format, addDays } from "date-fns";
import { apiConnectorGet } from "../../utils/ApiConnector";
import toast from "react-hot-toast";
import { Discount } from "@mui/icons-material";

// Custom icons
const GoldIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="8" fill="#FFD700"/>
  </svg>
);

const DiamondIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9l-5.91 5.91L22 22l-6.26-3.09L12 22l-3.09-3.09L2 22l5.91-5.91L2 9l6.91-.74L12 2z" fill="#87CEEB"/>
  </svg>
);

const ProductDetailWebPage = () => {
  const location = useLocation();
  const productData = location.state?.product;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [showPriceBreakupModal, setShowPriceBreakupModal] = useState(false);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showLess, setShowLess] = useState(true);
  const navigate = useNavigate();

  const handleWishlist = async (productId, varientId) => {
    try {
      const response = await apiConnectorGet(
        `${endpoint?.create_wishlist}?product_id=${productId}&varient_id=${varientId}`
      );
      toast(response.data.message, { id: 1 });
      setIsWishlisted(true);
    } catch (error) {
      console.error("Wishlist API error:", error);
      toast("Please Login");
      navigate('/login');
    }
  };

  const handlePriceBreakupClick = () => {
    setShowPriceBreakupModal(true);
  };

  const handleTouchStart = (e) => {
    // Touch handling logic for mobile swipe
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
  };

  const handleTouchMove = (e) => {
    // Touch handling logic for mobile swipe
  };

  const handleTouchEnd = (e) => {
    // Touch handling logic for mobile swipe
  };

  const handleDotClick = (index) => {
    setSelectedImage(index);
  };

  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await axios.get(`${endpoint?.u_get_variant}?product_id=${productData.product_id}`);
        if (response.data.success) {
          setVariants(response.data.result);
          if (response.data.result.length > 0) {
            setSelectedVariant(response.data.result[0]);
          }
        } else {
          setVariants([]);
        }
      } catch (error) {
        console.error("Error fetching variants:", error);
        setVariants([]);
      }
    };

    if (productData?.product_id) {
      fetchVariants();
    }
  }, [productData?.product_id]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showCustomizationModal || showPriceBreakupModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showCustomizationModal, showPriceBreakupModal]);

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        No product data found.
      </div>
    );
  }

  const images = (productData.product_images || [])
    .filter((img) => img?.p_image_url)
    .map((img) => img.p_image_url);

  const formatPrice = (price) => {
    const num = Number(price);
    if (isNaN(num)) return "₹0";
    return `₹${num.toLocaleString()}`;
  };

  const originalPrice = productData.originalPrice || null;
  const discount = productData.discount || null;
  const priceNum = Number(productData.price);
  const originalPriceNum = Number(originalPrice);
  const savings =
    originalPriceNum && originalPriceNum > priceNum
      ? originalPriceNum - priceNum
      : 0;

  const deliveryDays = Number(productData.deliveryTime?.split(" ")[0]) || 5;
  const estimatedDeliveryDate = format(
    addDays(new Date(), deliveryDays),
    "dd MMM yyyy"
  );

  const tabs = ["Description", "Specifications", "Product Tax"];
  const variantButtons = variants || [];

  const handleCloseModal = () => {
    setShowPriceBreakupModal(false);
    setShowCustomizationModal(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleCopySKU = () => {
    navigator.clipboard.writeText(
      selectedVariant?.varient_sku || "Default SKU"
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const ProductDetailsSection = () => (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden self-start">
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-2 flex justify-between items-center">
        <h1 className="text-base font-semibold text-gray-800">
          Product Details
        </h1>
        <button
          onClick={handlePriceBreakupClick}
          className="bg-purple-200 hover:bg-purple-300 text-purple-800 px-2 py-1 rounded-full text-xs font-medium transition-colors"
        >
          + PRICE BREAKUP
        </button>
      </div>
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-purple-600 font-medium">
            SKU: {selectedVariant?.varient_sku || "Default"}
          </span>
          <button
            onClick={handleCopySKU}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>
      </div>
      {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm">SKU copied to clipboard!</span>
          </div>
        </div>
      )}
      <div className="px-3 py-2 border-b border-gray-100">
        <p className="text-xs text-gray-700">
          {productData.description || "No description available."}
        </p>
      </div>
      {productData.specifications && (
        <>
          <div className="bg-orange-50 rounded-lg p-3 mb-3 border border-orange-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center">
                <GoldIcon />
              </div>
              <span className="font-medium text-gray-800 text-sm">GOLD</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-gray-600 mb-1">Dimensions</p>
                <p className="text-gray-800">
                  {productData.specifications.dimensions ||
                    "Width: N/A, Height: N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Weight</p>
                <p className="text-gray-800">
                  {selectedVariant?.varient_weight || productData.weight || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Purity</p>
                <p className="text-gray-800">
                  {productData.specifications.purity || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 mb-3 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-blue-800">
                <DiamondIcon />
              </div>
              <span className="font-medium text-gray-800 text-sm">DIAMOND</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-gray-600 mb-1">Type</p>
                <p className="text-gray-800">
                  {productData.specifications.diamondType || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Setting</p>
                <p className="text-gray-800">
                  {productData.specifications.setting || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Total Weight</p>
                <p className="text-gray-800">
                  {productData.specifications.diamondWeight || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {!showLess && (
        <>
          <div className="px-3 py-2 border-t border-gray-100">
            <p className="text-gray-600 text-xs mb-1">Manufactured by</p>
            <p className="text-gray-800 text-xs font-medium">
              {productData.manufacturer || "N/A"}
            </p>
          </div>
          <div className="px-3 py-2 border-t border-gray-100">
            <p className="text-gray-600 text-xs mb-1">Quantity</p>
            <p className="text-gray-800 text-xs">1N</p>
          </div>
          <div className="px-3 py-2 border-t border-gray-100">
            <p className="text-gray-600 text-xs mb-1">Country of Origin</p>
            <p className="text-gray-800 text-xs">India</p>
          </div>
        </>
      )}
      <div className="px-3 py-2 border-t border-gray-100">
        <button
          onClick={() => setShowLess(!showLess)}
          className="text-purple-600 hover:text-purple-800 text-xs font-medium transition-colors"
        >
          {showLess ? "Show More" : "Show Less"}
        </button>
      </div>
      <div className="px-3 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-col items-center text-center flex-1">
            <img
              src="https://cdn.caratlane.com/media/static/images/web/BIS_-_Bureau_of_Indian_Standards-1.png"
              alt="BIS Certified"
              className="h-6 object-contain mb-1"
            />
            <div className="text-xs text-gray-700">
              <div className="font-medium text-xs">BIS*</div>
              <div className="text-xs">Hallmarked Jewellery</div>
            </div>
          </div>
          <div className="flex flex-col items-center text-center flex-1">
            <img
              src="https://cdn.caratlane.com/media/static/images/web/Tata-Certified-1.png"
              alt="Tata Certified"
              className="h-6 object-contain mb-1"
            />
            <div className="text-xs text-gray-700">
              <div className="font-medium text-xs">Trust of TATA</div>
              <div className="text-xs">Spirit of CaratLane</div>
            </div>
          </div>
          <div className="flex flex-col items-center text-center flex-1">
            <img
              src="https://cdn.caratlane.com/media/static/images/web/Certificate-2.png"
              alt="Certificate"
              className="h-6 object-contain mb-1"
            />
            <div className="text-xs text-gray-700">
              <div className="font-medium text-xs">100% Certified</div>
              <div className="text-xs">by CaratLane</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6 items-start">
          <div className="space-y-3">
            {/* Mobile Image Slider */}
            <div className="md:hidden relative -mx-2 sm:-mx-4">
              {/* Main Image Container */}
              <div className="relative bg-white overflow-hidden">
                <div
                  className="w-full h-96 overflow-hidden cursor-pointer"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {images.length > 0 && (
                    <img
                      src={images[selectedImage]}
                      alt={`${productData.name} ${selectedImage + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="absolute bottom-2 left-2 z-10">
                  <span className="bg-yellow-400 text-black text-xs font-semibold px-1.5 py-0.5 rounded">
                    BESTSELLER
                  </span>
                </div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-1">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === selectedImage
                            ? "bg-purple-500 shadow-lg"
                            : "bg-gray-300 bg-opacity-70 hover:bg-purple-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm rounded px-1.5 py-0.5">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium text-gray-800">5</span>
                    <span className="text-xs text-gray-600">|</span>
                    <span className="text-xs text-gray-600">0</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleWishlist(productData.product_id, selectedVariant?.varient_id)}
                aria-label="Add to Wishlist"
                className={`absolute top-4 right-4 p-3 rounded-full bg-white shadow-md text-xl transition-colors ${
                  isWishlisted ? "text-red-600" : "text-gray-400 hover:text-red-600"
                }`}
              >
                <Heart fill={isWishlisted ? "red" : "none"} strokeWidth={2} className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-3 overflow-x-auto scrollbar-hide py-2">
              {images.length > 0 ? (
                images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 border-2 rounded-lg overflow-hidden w-20 h-20 focus:outline-none ${
                      selectedImage === idx
                        ? "border-indigo-600 shadow-lg"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="w-full h-full overflow-hidden">
                      <img
                        src={img}
                        alt={`${productData.name} ${idx + 1}`}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </button>
                ))
              ) : (
                <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">No Image</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="md:hidden flex items-center justify-between px-1">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-1.5 text-gray-600 hover:text-purple-500 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? "text-red-500 fill-current" : ""
                    }`}
                  />
                </button>
                <button className="p-1.5 text-gray-600 hover:text-purple-500 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-600 hover:text-purple-500 transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2 mt-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(No reviews yet)</span>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-extrabold text-gray-900">
                    {formatPrice(selectedVariant?.varient_price || productData.price)}
                  </span>

                  {/* ✅ Show active discount percentage in green next to price */}
                  {selectedVariant?.discount_details?.length > 0 && (
                    selectedVariant.discount_details
                      .filter((d) => d.discount_is_active === "Active")
                      .slice(0, 1) // Show only the first active discount
                      .map((d, i) => (
                        <span
                          key={i}
                          className="text-sm font-semibold text-green-600"
                        >
                          {d.discount_value}
                          {d.discount_type === "Percentage" ? "%" : "₹"} Discount
                        </span>
                      ))
                  )}
                </div>

                {savings > 0 && (
                  <p className="text-green-700 font-semibold mt-1">
                    You save {formatPrice(savings)}
                  </p>
                )}

                <p className="text-gray-500 text-sm mt-1">Price inclusive of all taxes</p>
              </div>

              {selectedVariant?.discount_details?.length > 0 && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-center space-x-3 mb-2">
                    <Discount className="w-5 h-5 text-yellow-600" />
                    <h3 className="text-yellow-800 font-semibold text-md">Available Discounts</h3>
                  </div>
                  <ul className="text-sm text-yellow-700 list-disc pl-6 space-y-1">
                    {selectedVariant.discount_details
                      ?.filter((discount) => discount.discount_is_active === "Active")
                      .map((discount, idx) => (
                        <li key={idx}>
                          <span className="font-medium">{discount.discount_name}</span> -{" "}
                          {discount.discount_value}
                          {discount.discount_type === "Percentage" ? "%" : "₹"} off (
                          <span className="text-green-600">{discount.discount_is_active}</span>)
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Available Variants</h2>
                <div className="mt-4">
                  {variantButtons.length <= 3 ? (
                    // Show buttons if 3 or fewer variants
                    <div className="flex flex-wrap gap-3">
                      {variantButtons.map((variant) => (
                        <button
                          key={variant.varient_id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`px-5 py-2 rounded-lg border transition-colors whitespace-nowrap ${
                            selectedVariant?.varient_id === variant.varient_id
                              ? "border-indigo-700 bg-indigo-100 text-indigo-700 font-semibold"
                              : "border-gray-300 hover:border-indigo-500 hover:bg-indigo-50"
                          }`}
                        >
                          SKU: {variant.varient_sku}
                        </button>
                      ))}
                    </div>
                  ) : (
                    // Show dropdown if more than 3 variants
                    <div>
                      <select
                        value={selectedVariant?.varient_id || ""}
                        onChange={(e) => {
                          const selected = variantButtons.find(v => v.varient_id === Number(e.target.value));
                          setSelectedVariant(selected);
                        }}
                        className="border border-gray-300 px-4 py-2 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {variantButtons.map((variant) => (
                          <option key={variant.varient_id} value={variant.varient_id}>
                            SKU: {variant.varient_sku}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-1">
                <div className="flex border-b border-gray-300">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 -mb-px text-sm font-semibold ${
                        activeTab === tab
                          ? "border-b-4 border-indigo-600 text-indigo-700"
                          : "text-gray-600 hover:text-indigo-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="mt-6 text-gray-700 text-sm space-y-4">
                  {activeTab === "Description" && (
                    <div>
                      <p>{productData.description || "No description available."}</p>
                    </div>
                  )}
                  {activeTab === "Specifications" && (
                    <div>
                      <table className="w-full text-left text-sm">
                        <tbody>
                          {/* Default specifications if any */}
                          {productData.specifications &&
                            Object.entries(productData.specifications).map(([key, val]) => (
                              <tr key={key} className="border-b border-gray-200">
                                <th className="py-2 pr-4 font-medium text-gray-800">{key}</th>
                                <td className="py-2">{val}</td>
                              </tr>
                            ))}

                          {/* Variant-based specifications */}
                          {selectedVariant && (
                            <>
                              <tr className="border-b border-gray-200">
                                <th className="py-2 pr-4 font-medium text-gray-800">Weight</th>
                                <td className="py-2">{selectedVariant.varient_weight || "N/A"}</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <th className="py-2 pr-4 font-medium text-gray-800">Unit</th>
                                <td className="py-2">{selectedVariant.unit_name || "N/A"}</td>
                              </tr>
                            </>
                          )}

                          {/* Material Details */}
                          {selectedVariant?.material_details?.length > 0 && (
                            <>
                              <tr>
                                <th colSpan="2" className="pt-6 pb-2 text-indigo-600 text-sm font-bold">
                                  Material Details
                                </th>
                              </tr>
                              {selectedVariant.material_details.map((mat, idx) => (
                                <tr key={idx} className="border-b border-gray-200">
                                  <td className="py-2 pr-4 text-gray-700">
                                    {mat.material_name} ({mat.percentage}%)
                                  </td>
                                  <td className="py-2 text-gray-700">
                                    {mat.weight} {mat.v_un_name || ""}
                                  </td>
                                </tr>
                              ))}
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {activeTab === "Product Tax" && (
                    <div>
                      {selectedVariant?.tax_details?.length > 0 ? (
                        <table className="w-full text-left text-sm">
                          <tbody>
                            {selectedVariant.tax_details.map((tax, idx) => (
                              <tr key={idx} className="border-b border-gray-200">
                                <td className="py-2 pr-4">{idx + 1}</td>
                                <td className="py-2 pr-4">{tax.tax_name}</td>
                                <td className="py-2">{tax.tax_percentage}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-gray-600 text-sm">No tax information available.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center space-x-3">
                <Truck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-green-800 font-semibold">
                    Free Delivery by {estimatedDeliveryDate}
                  </p>
                  <p className="text-green-700 text-xs">
                    Order within {deliveryDays} days for free delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details Section - Desktop */}
            <div className="hidden md:block">
              <ProductDetailsSection />
            </div>
          </div>
        </div>

        {/* Price Breakup Modal */}
        {showPriceBreakupModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Price Breakup</h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price</span>
                    <span>{formatPrice(selectedVariant?.varient_price || productData.price)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(savings)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(selectedVariant?.varient_price || productData.price)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customization Modal */}
        {showCustomizationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Customize Product</h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">Select your customization options:</p>
                {/* Add customization options here */}
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3">
                <button
                  onClick={() => setShowCustomizationModal(false)}
                  className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm"
                >
                  CONFIRM CUSTOMISATION
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sticky Add to Cart Button - Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
          <div className="flex space-x-3">
            <button className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={() => setShowCustomizationModal(true)}
              className="px-4 py-3 border border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Customize
            </button>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-8">
          <CustomerReviewSection />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailWebPage;