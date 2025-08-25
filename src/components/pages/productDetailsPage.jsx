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
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../../utils/APIRoutes";
import { format, addDays } from "date-fns";
import WarrantyFeatures from "../trustBadge";
import BannerSlidder from "../bannerSlidder";
import YouMayLike from "../productyoumaylike";
import SimilarProducts from "../similarproduct";
import RecentlyViewed from "../recentlyviewed";
import ContinueBrowsing from "../continuebrowsing";
import More18KProducts from "../moreproduct";
import CaratLaneSignup from "../emailSubscription";
import MobileVideoSlider from "../mobilevideoslider";
import RelatedCategories from "../relatedcategories";
import ShopByProducts from "../shopbyproduct";
import toast from "react-hot-toast";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { useQuery } from "react-query";

const GoldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="8" />
  </svg>
);

const DiamondIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 2L12 8L18 2L22 6L12 22L2 6L6 2Z" />
  </svg>
);

const ProductDetailWebPage = () => {
  const location = useLocation();
  const productData = location.state?.product;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const [showPriceBreakupModal, setShowPriceBreakupModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [selectedMetal, setSelectedMetal] = useState("18 KT Yellow Gold");
  const [selectedDiamond, setSelectedDiamond] = useState("IJ-SI");
  const [selectedSize, setSelectedSize] = useState("5");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedMaterialGroup, setSelectedMaterialGroup] = useState([]);


  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await axios.get(
          `${endpoint?.u_get_variant}?product_id=${productData.product_id}`
        );
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

  const image = (
    typeof productData.product_images === "string"
      ? JSON.parse(productData.product_images)
      : productData.product_images
  ) || [];

  const images = image
    .filter((img) => img?.p_image_url)
    .map((img) => img.p_image_url);

  // let images = [];

  // try {
  //   const parsed = JSON.parse(productData?.product_images || "[]");
  //   images = parsed
  //     .filter((img) => img?.p_image_url)
  //     .map((img) => img?.p_image_url);
  // } catch (e) {
  //   console.error("Failed to parse product images", e);
  //   images = [];
  // }

  const formatPrice = (price) => {
    const num = Number(price);
    if (isNaN(num)) return "₹0";
    return `₹${num.toLocaleString()}`;
  };

  const originalPrice = productData.originalPrice || null;
  const discount = productData.discount || null;
  const priceNum = Number(productData.price);
  const originalPriceNum = Number(originalPrice);
  const calculateMaterialValue = (material) => {
    const pricePerGram = Number(material.material_price);
    const weight = Number(material.weight);
    if (isNaN(pricePerGram) || isNaN(weight)) return 0;
    return pricePerGram * weight;
  };

  const deliveryDays = Number(productData.deliveryTime?.split(" ")[0]) || 5;
  const estimatedDeliveryDate = format(
    addDays(new Date(), deliveryDays),
    "dd MMM yyyy"
  );

  const handleDotClick = (index) => {
    setSelectedImage(index);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
    if (isRightSwipe && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handlePriceBreakupClick = () => {
    setShowPriceBreakupModal(true);
  };

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

  const handleAddToCart = async () => {
    if (!productData || !selectedVariant) {
      toast.error("Product or variant not selected");
      return;
    }

    const payload = {
      product_id: productData.product_id,
      varient_id: selectedVariant.varient_id,
      quantity: quantity,
    };

    try {
      const response = await apiConnectorPost(endpoint.create_cart, payload);
      toast(response.data.message);
    } catch (error) {
      toast.error("Error adding to cart");
      console.error("Add to cart error:", error);
    }
  };

  const handleWishlist = async () => {
    if (!productData || !selectedVariant) {
      toast.error("Product or variant not selected");
      return;
    }
    const { product_id } = productData;
    const { varient_id } = selectedVariant;
    try {
      const response = await apiConnectorGet(
        `${endpoint.create_wishlist}?product_id=${product_id}&varient_id=${varient_id}`
      );
      if (response.data.success) {
        setIsWishlisted(!isWishlisted);
        toast.success(response.data.message || "Wishlist updated");
      } else {
        toast.error(response.data.message || "Failed to update wishlist");
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Error updating wishlist");
    }
  };
  const groupedMaterials = {};

  selectedVariant?.material_details.forEach((mat) => {
    const group = mat.master_mat_name;
    if (!groupedMaterials[group]) {
      groupedMaterials[group] = [];
    }
    groupedMaterials[group].push(mat);
  });

  const totalGoldValue = selectedVariant?.material_details
    ?.filter((m) => m.master_mat_name.toLowerCase() === "gold")
    .reduce((acc, cur) => acc + calculateMaterialValue(cur), 0) || 0;

  const totalDiamondValue = selectedVariant?.material_details
    ?.filter((m) => m.master_mat_name.toLowerCase() === "diamond")
    .reduce((acc, cur) => acc + calculateMaterialValue(cur), 0) || 0;

  // Static making charges example:
  const makingCharges = 2000 + 5000; // Gold + Diamond

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
                  {selectedVariant?.varient_weight ||
                    productData.weight ||
                    "N/A"}
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
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
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
                  <img
                    src={images[selectedImage]}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
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
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${index === selectedImage
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
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-3">
                {(() => {
                  const displayImages = [...images];
                  while (displayImages.length < 8) {
                    displayImages.push(...images);
                  }
                  return displayImages.slice(0, 8).map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(index % images.length)}
                      className={`relative bg-white rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${selectedImage === index % images.length
                        ? "border-purple-500 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <div className="w-full h-100 overflow-hidden">
                        <img
                          src={image}
                          alt={`${productData.name} ${index + 1}`}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {index === 0 && (
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={handleWishlist}
                            className={`p-1.5 rounded-full bg-white shadow-md ${isWishlisted ? "text-red-500" : "text-gray-400"
                              } hover:text-red-500 transition-colors`}
                          >
                            <Heart
                              className={`w-3 h-3 ${isWishlisted ? "fill-current" : ""
                                }`}
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="md:hidden flex items-center justify-between px-1">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleWishlist}
                  className="p-1.5 text-gray-600 hover:text-purple-500 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${isWishlisted ? "text-red-500 fill-current" : ""
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
            </div>
            <div className="space-y-1 px-1 md:px-0">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(
                    selectedVariant?.varient_price || productData.price
                  )}
                </span>
                {originalPrice && originalPriceNum > priceNum && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                (MRP Inclusive of all taxes)
              </p>
            </div>
            <div className="px-1 md:px-0">
              <h1 className="text-lg lg:text-xl font-medium text-gray-900 mb-2">
                {productData.name || "Unnamed Product"}
              </h1>
            </div>
            {discount && (
              <div className="-mx-1 md:mx-0 md:rounded-lg">
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                  <span className="text-sm font-medium text-red-800">
                    Flat {discount}% off on Diamond Prices
                  </span>
                </div>
              </div>
            )}
            <div className="flex items-stretch w-fit bg-white border border-yellow-200 rounded-lg overflow-hidden mx-1 md:mx-0">
              {groupedMaterials &&
                Object.keys(groupedMaterials).map((groupName, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const group = groupedMaterials[groupName] || [];
                      setSelectedMaterialGroup(group);
                      setShowCustomizationModal(true);
                    }}

                    className="px-4 py-2 border-l border-yellow-300 text-sm text-gray-700 hover:bg-yellow-50 transition-colors"
                  >
                    {groupName}
                  </button>
                ))}

              {/* {groupedMaterials &&
                Object.keys(groupedMaterials).map((groupName, index) => (
                  <button
                    key={index}
                    onClick={() => setShowCustomizationModal(true)}
                    className="px-4 py-2 border-l border-yellow-300 text-sm text-gray-700 hover:bg-yellow-50 transition-colors"
                  >
                    {groupName}
                  </button>
                ))} */}
              <button
                onClick={() => {
                  setSelectedMaterialGroup(selectedVariant?.material_details); // all materials
                  setShowCustomizationModal(true);
                }}
                className="bg-yellow-400 px-6 flex items-center justify-center flex-shrink-0 hover:bg-yellow-500 transition-colors"
              >
                <span className="text-sm font-bold text-black">CUSTOMISE</span>
              </button>
            </div>
            <div className="px-3 py-2 border-t border-gray-100">
              <label className="text-gray-600 text-xs mb-1 font-semibold block">
                Quantity
              </label>
              <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden w-max">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 font-bold text-lg"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="text"
                  readOnly
                  value={quantity}
                  className="w-10 text-center outline-none border-l border-r border-gray-300"
                  aria-label="Quantity"
                />
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 font-bold text-lg"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Available Variants
              </h2>
              <div className="flex flex-wrap gap-3">
                {variants.length
                  ? variants.map((variant) => (
                    <button
                      key={variant.varient_id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-5 py-2 rounded-lg border transition-colors whitespace-nowrap ${selectedVariant?.varient_id === variant.varient_id
                        ? "border-purple-700 bg-purple-100 text-purple-700 font-semibold"
                        : "border-gray-300 hover:border-purple-500 hover:bg-purple-50"
                        }`}
                    >
                      SKU: {variant.varient_sku}
                    </button>
                  ))
                  : [
                    {
                      varient_id: "default",
                      varient_sku: "Default",
                      varient_price: productData.price,
                      varient_weight: productData.weight || "",
                      unit_name: productData.unit_name || "",
                    },
                  ].map((variant) => (
                    <button
                      key={variant.varient_id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-5 py-2 rounded-lg border transition-colors whitespace-nowrap ${selectedVariant?.varient_id === variant.varient_id
                        ? "border-purple-700 bg-purple-100 text-purple-700 font-semibold"
                        : "border-gray-300 hover:border-purple-500 hover:bg-purple-50"
                        }`}
                    >
                      SKU: {variant.varient_sku}
                    </button>
                  ))}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 text-white py-3 px-6 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #E56EEB -13.59%, #8863FB 111.41%)",
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>

                <button
                  onClick={handleWishlist}
                  className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted
                      ? "text-red-500 fill-current"
                      : "text-gray-600"
                      }`}
                  />
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="self-start">
              <ProductDetailsSection />
            </div>
        
          </div>
        </div>
      </div>
      <div className="w-full">
        <WarrantyFeatures />
        <BannerSlidder />
        <YouMayLike />
        <SimilarProducts productData={productData} />
        <CustomerReviewSection productId={productData.product_id} />
        <RecentlyViewed />
        <ContinueBrowsing />
        <More18KProducts />
        <CaratLaneSignup />
        <MobileVideoSlider />
        <RelatedCategories productData={productData} />
        <ShopByProducts />
        <Footer />
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-40">
        <div className="flex justify-end">
          <button
            onClick={handleAddToCart}
            className="flex-1 text-white py-3 px-6 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
            style={{
              background:
                "linear-gradient(90deg, #E56EEB -13.59%, #8863FB 111.41%)",
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
      {showPriceBreakupModal && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-[#77778870] bg-opacity-10 z-50 flex items-end md:items-stretch md:justify-end overflow-hidden"
          onClick={handleBackdropClick}
        >
          <div
            className={`bg-white w-full md:max-w-lg md:mx-0 h-auto md:h-full max-h-[80vh] md:max-h-full rounded-t-3xl md:rounded-none md:rounded-l-lg overflow-y-auto transform transition-transform duration-300 ease-in-out ${showPriceBreakupModal
              ? "translate-y-0 md:translate-x-0"
              : "translate-y-full md:translate-x-full"
              }`}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-purple-800">
                  {productData.name || "Product"}
                </h2>

                <button
                  onClick={handleCloseModal}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4 space-y-6 mb-10">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4">PRICE BREAKUP</h3>

                {/* Header Row */}
                <div className="grid grid-cols-4 gap-2 mb-3 text-xs font-medium text-purple-600">
                  <div>COMPONENT</div>
                  <div>RATE</div>
                  <div>WEIGHT</div>
                  <div>FINAL VALUE</div>
                </div>

                {/* GOLD Section */}
                {selectedVariant?.material_details?.some(
                  (m) => m.master_mat_name.toLowerCase() === "gold"
                ) && (
                    <>
                      <div className="text-xs text-gray-700 font-semibold mb-1">GOLD</div>
                      {selectedVariant.material_details
                        .filter((m) => m.master_mat_name.toLowerCase() === "gold")
                        .map((material, index) => (
                          <div
                            key={`gold-${index}`}
                            className="grid grid-cols-4 gap-2 text-xs text-gray-800 py-1"
                          >
                            <div>{material.material_name}</div>
                            <div>₹{material.material_price} / {material.v_un_name}</div>
                            <div>{material.weight}</div>
                            <div>{formatPrice(calculateMaterialValue(material))}</div>
                          </div>
                        ))}

                      {/* Total Gold */}
                      <div className="grid grid-cols-4 gap-2 text-xs text-gray-800 border-t pt-2 mt-2 font-semibold">
                        <div>Total Gold Value</div>
                        <div>-</div>
                        <div>-</div>
                        <div>
                          {formatPrice(totalGoldValue)}
                        </div>
                      </div>
                    </>
                  )}

                {/* DIAMOND Section */}
                {selectedVariant?.material_details?.some(
                  (m) => m.master_mat_name.toLowerCase() === "diamond"
                ) && (
                    <>
                      <div className="text-xs text-gray-700 font-semibold mt-4 mb-1">DIAMOND</div>
                      {selectedVariant.material_details
                        .filter((m) => m.master_mat_name.toLowerCase() === "diamond")
                        .map((material, index) => (
                          <div
                            key={`diamond-${index}`}
                            className="grid grid-cols-4 gap-2 text-xs text-gray-800 py-1"
                          >
                            <div>{material.material_name}</div>
                            <div>₹{material.material_price} / {material.v_un_name}</div>
                            <div>{material.weight}</div>
                            <div>{formatPrice(calculateMaterialValue(material))}</div>
                          </div>
                        ))}

                      {/* Total Diamond */}
                      <div className="grid grid-cols-4 gap-2 text-xs text-gray-800 border-t pt-2 mt-2 font-semibold">
                        <div>Total Diamond Value</div>
                        <div>-</div>
                        <div>-</div>
                        <div>
                          {formatPrice(totalDiamondValue)}
                        </div>
                      </div>
                    </>
                  )}

                {/* Making Charges (static display) */}
               
                <div className="grid grid-cols-4 gap-2 text-xs text-black pt-2 font-bold border-t mt-2">
                  <div>SubTotal</div>
                  <div>-</div>
                  <div>-</div>
                  <div>{formatPrice(totalGoldValue + totalDiamondValue)}</div>
                </div>
                 <div className="grid grid-cols-4 gap-2 text-xs text-gray-800 pt-2 font-semibold">
                  <div>Making Charges</div>
                  <div>-</div>
                  <div>-</div>
                  <div>+{formatPrice(makingCharges)}</div>
                </div>
                {/* Final Subtotal */}
                <div className="grid grid-cols-4 gap-2 text-xs text-purple-700 pt-2 font-bold border-t mt-2">
                  <div>GrandTotal</div>
                  <div>-</div>
                  <div>-</div>
                  <div>{formatPrice(totalGoldValue + totalDiamondValue + makingCharges)}</div>
                </div>
              </div>
            </div>




            {/* <div className="p-4 space-y-6 mb-10">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4">
                  PRICE BREAKUP
                </h3>
                <div className="grid grid-cols-4 gap-2 mb-3 text-xs font-medium text-purple-600">
                  <div>COMPONENT</div>
                  <div>RATE</div>
                  <div>WEIGHT</div>
                  <div>VALUE</div>
                </div>
                {selectedVariant?.material_details?.map((material, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 text-xs text-gray-800">
                    <div>{material.material_name}</div>
                    <div>₹{material.material_price}</div>
                    <div>{material.weight} {material.v_un_name}</div>
                    <div>{formatPrice(calculateMaterialValue(material))}</div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      )}
      {showCustomizationModal && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-[#77778870] bg-opacity-10 z-50 flex items-end md:items-stretch md:justify-end overflow-hidden"
          onClick={handleBackdropClick}
        >
          <div
            className={`bg-white w-full md:max-w-lg md:mx-0 h-auto md:h-full max-h-[80vh] md:max-h-full rounded-t-3xl md:rounded-none md:rounded-l-lg overflow-y-auto transform transition-transform duration-300 ease-in-out ${showCustomizationModal
              ? "translate-y-0 md:translate-x-0"
              : "translate-y-full md:translate-x-full"
              }`}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-3 rounded-t-3xl md:rounded-t-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-xs text-gray-500">Estimated price</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(
                        selectedVariant?.varient_price || productData.price
                      )}
                    </span>
                    {originalPrice && originalPriceNum > priceNum && (
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(originalPrice)}
                      </span>
                    )}
                  </div>
                 
                </div>
                <button
                  onClick={() => setShowCustomizationModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-3 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Choice of Metal
                </h3>
                {Array.isArray(selectedMaterialGroup) && selectedMaterialGroup.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {selectedMaterialGroup.map((metal, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMetal(metal)}
                        className={`p-2 rounded-lg border-2 text-center transition-all ${selectedMetal === metal
                          ? "border-purple-300 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="text-xs font-medium text-gray-900">
                          {metal.material_name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Made to Order</div>
                      </button>
                    ))}
                  </div>
                )}

              </div>
              {/* <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    Diamond Quality
                  </h3>
                  <button className="text-xs text-purple-600 font-medium">
                    DIAMOND GUIDE
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {["IJ-SI"].map((diamond) => (
                    <button
                      key={diamond}
                      onClick={() => setSelectedDiamond(diamond)}
                      className={`p-2 rounded-lg border-2 text-center transition-all ${selectedDiamond === diamond
                        ? "border-purple-300 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <div className="text-xs font-medium text-gray-900">
                        {diamond}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Made to Order
                      </div>
                    </button>
                  ))}
                </div>
              </div> */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    Select Size
                  </h3>
                  <button className="text-xs text-purple-600 font-medium">
                    SIZE GUIDE
                  </button>
                </div>
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="grid grid-cols-4 gap-5 space-x-2 pb-2">
                    {[
                      { size: "5", mm: "44.8 mm", status: "Made to Order" },
                      { size: "6", mm: "45.9 mm", status: "Made to Order" },
                      { size: "7", mm: "47.1 mm", status: "Only 1 left!" },
                      { size: "8", mm: "48.1 mm", status: "Made to Order" },
                      { size: "9", mm: "49.0 mm", status: "Made to Order" },
                      { size: "10", mm: "50.0 mm", status: "Only 1 left!" },
                      { size: "11", mm: "50.9 mm", status: "Made to Order" },
                      { size: "12", mm: "51.8 mm", status: "Only 2 left!" },
                      { size: "13", mm: "52.8 mm", status: "Made to Order" },
                      { size: "14", mm: "54.0 mm", status: "Made to Order" },
                      { size: "15", mm: "55.0 mm", status: "Made to Order" },
                      { size: "16", mm: "55.9 mm", status: "Made to Order" },
                      { size: "17", mm: "56.9 mm", status: "Only 2 left!" },
                      { size: "18", mm: "57.8 mm", status: "Made to Order" },
                      { size: "19", mm: "59.1 mm", status: "Made to Order" },
                      { size: "20", mm: "60.0 mm", status: "Only 1 left!" },
                      { size: "21", mm: "60.9 mm", status: "Made to Order" },
                      { size: "22", mm: "61.9 mm", status: "Made to Order" },
                      { size: "23", mm: "62.8 mm", status: "Made to Order" },
                      { size: "24", mm: "63.8 mm", status: "Made to Order" },
                      { size: "25", mm: "64.7 mm", status: "Made to Order" },
                    ].map((item) => (
                      <button
                        key={item.size}
                        onClick={() => setSelectedSize(item.size)}
                        className={`p-2 rounded-lg border-2 text-center transition-all flex-shrink-0 w-28 ${selectedSize === item.size
                          ? "border-purple-300 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="text-sm font-bold text-gray-900">
                          {item.size}
                        </div>
                        <div className="text-xs text-gray-600">{item.mm}</div>
                        <div
                          className={`text-xs mt-1 ${item.status.includes("left")
                            ? "text-red-600"
                            : "text-gray-500"
                            }`}
                        >
                          {item.status}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default ProductDetailWebPage;
