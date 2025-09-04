
import axios from "axios";
import { addDays, format } from "date-fns";
import {
  Copy,
  Heart,
  Share2,
  ShoppingCart,
  Star
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { endpoint, rupees } from "../../utils/APIRoutes";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import Footer from "../Footer1";
import Header from "../Header1";
import BannerSlidder from "../bannerSlidder";
import ContinueBrowsing from "../continuebrowsing";
import CustomerReviewSection from "../customerReview";
import CaratLaneSignup from "../emailSubscription";
import MobileVideoSlider from "../mobilevideoslider";
import More18KProducts from "../moreproduct";
import YouMayLike from "../productyoumaylike";
import RecentlyViewed from "../recentlyviewed";
import RelatedCategories from "../relatedcategories";
import ShopByProducts from "../shopbyproduct";
import SimilarProducts from "../similarproduct";
import WarrantyFeatures from "../trustBadge";
import { useLoginModal } from "../../context/Login";
import DeliveryStoresUI from "../deliverystorestrails";
import ScrollSpyNavigation from "../scrollspynavigation";
import FeaturesComponent from "../featuregrid";

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
  const [selectedMetal, setSelectedMetal] = useState("");
  const [selectedSize, setSelectedSize] = useState("5");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedMaterialGroup, setSelectedMaterialGroup] = useState([]);
  const { setShowLoginModal } = useLoginModal();

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await axios.get(
          `${endpoint?.u_get_variant}?product_id=${productData.product_id}&varient_id=${productData.selected_variant_id}`
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

  console.log(selectedVariant?.tax_details)

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

  const image =
    (typeof productData.product_images === "string"
      ? JSON.parse(productData.product_images)
      : productData.product_images) || [];

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

  const discount = productData.discount || null;
  const priceNum = Number(productData.price);

  const StaticSize = [
    { size: "5", value: "44.8 mm", status: "Made to Order" },
    { size: "6", value: "45.9 mm", status: "Made to Order" },
    { size: "7", value: "47.1 mm", status: "Made to Order" },
    { size: "8", value: "48.1 mm", status: "Made to Order" },
    { size: "9", value: "49.0 mm", status: "Made to Order" },
    { size: "10", value: "50.0 mm", status: "Made to Order" },
    { size: "11", value: "50.9 mm", status: "Made to Order" },
    { size: "12", value: "51.8 mm", status: "Made to Order" },
    { size: "13", value: "52.8 mm", status: "Made to Order" },
    { size: "14", value: "54.0 mm", status: "Made to Order" },
    { size: "15", value: "55.0 mm", status: "Made to Order" },
    { size: "16", value: "55.9 mm", status: "Made to Order" },
    { size: "17", value: "56.9 mm", status: "Made to Order" },
    { size: "18", value: "57.8 mm", status: "Made to Order" },
    { size: "19", value: "59.1 mm", status: "Made to Order" },
    { size: "20", value: "60.0 mm", status: "Made to Order" },
    { size: "21", value: "60.9 mm", status: "Made to Order" },
    { size: "22", value: "61.9 mm", status: "Made to Order" },
    { size: "23", value: "62.8 mm", status: "Made to Order" },
    { size: "24", value: "63.8 mm", status: "Made to Order" },
    { size: "25", value: "64.7 mm", status: "Made to Order" },
  ];

  const getAttributeValue = (variant, attrName) => {
    return (
      variant?.attributes?.find((attr) => attr.attribute_name === attrName)
        ?.value || null
    );
  };

  const getThicknessUnit = (variant) => {
    return (
      variant?.attributes?.find((attr) => attr.attribute_name === "Thickness")
        ?.un_name || "mm"
    );
  };

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

  const handleConfirmCustomization = async () => {
    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }

    const product_id = selectedVariant.product_id;
    const size = getAttributeValue(selectedVariant, "Size");
    const thickness = getAttributeValue(selectedVariant, "Thickness");

    const payload = {
      product_id,
      request: JSON.stringify({
        Size: size,
        Thickness: thickness,
      }),
    };

    try {
      const res = await apiConnectorPost(endpoint.create_custom_order, payload);
      if (res?.data?.message !== "Unauthorised User!") {
        toast(res?.data?.message, { id: 1 })
      }

      if (res?.data?.message === "Unauthorised User!") {
        setShowLoginModal(true);
      }
      if (res?.data?.success) {
        toast.success("Customization confirmed!");
        setShowCustomizationModal(false);
      }
    } catch (err) {
      toast.error("API error while confirming customization");
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
      if (response?.data?.message !== "Unauthorised User!") {
        toast(response?.data?.message, { id: 1 })
      }
      if (response?.data?.message === "Unauthorised User!") {
        setShowLoginModal(true);
      }
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
      if (response?.data?.message !== "Unauthorised User!") {
        toast(response?.data?.message, { id: 1 })
      }

      if (response?.data?.message === "Unauthorised User!") {
        setShowLoginModal(true);
      }
      if (response.data.success) {
        setIsWishlisted(!isWishlisted);
        toast.success(response.data.message, { id: 1 });
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Error updating wishlist");
    }
  };
  const groupedMaterials = {};

  if (Array.isArray(selectedVariant?.material_details)) {
    selectedVariant.material_details.forEach((mat) => {
      const group = mat.master_mat_name;
      if (!groupedMaterials[group]) {
        groupedMaterials[group] = [];
      }
      groupedMaterials[group].push(mat);
    });
  }

  // selectedVariant?.material_details.forEach((mat) => {
  //   const group = mat.master_mat_name;
  //   if (!groupedMaterials[group]) {
  //     groupedMaterials[group] = [];
  //   }
  //   groupedMaterials[group].push(mat);
  // });

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
      {selectedVariant?.material_details?.map((material, index) => (
        <div
          key={index}
          className="bg-orange-50 rounded-lg mb-3 border mx-2 border-orange-100"
        >
          {/* Material Header */}
          <div className="flex items-center gap-2 rounded-tr-lg rounded-tl-lg p-2 mb-2 bg-orange-100">
            <div className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center">
              <GoldIcon />
            </div>
            <span className="font-medium text-[#45289b] text-sm">
              {material.master_mat_name} ({material.material_name})
            </span>
          </div>

          {/* Data Grid */}
          <div className="grid grid-cols-3 text-xs p-3">
            {/* Headings */}
            <div className=" mb-3  border-r font-semibold text-[#45289b] border-orange-200  ">Dimensions</div>
            <div className=" mb-3 font-semibold border-r text-[#45289b] border-orange-200 text-center">Weight</div>
            <div className=" mb-3 font-semibold text-[#45289b] text-center">Purity</div>

            {/* Values */}
            <div className="text-gray-800 border-r border-orange-200 ">
              {selectedVariant?.attributes?.map((attr, i) => (
                <p key={i}>
                  {attr?.attribute_name} : {attr?.value}
                </p>
              ))}
            </div>

            <div className="text-gray-800 border-r border-orange-200 ">
              <p className="text-center">{material?.weight}</p>
            </div>

            <div className="text-gray-800">
              <p className="text-center">{material?.pur_stamp_name}</p>
            </div>
          </div>
        </div>
      ))}


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
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-white shadow-sm">
        <Header />
      </div>
      <ScrollSpyNavigation />
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 overflow-x-hidden sm:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6 items-start ">
          <div className="space-y-3">
            {/* Mobile Image Slider */}
            {/* <div className="md:hidden relative -mx-2 sm:-mx-4"> */}
            <div className="md:hidden relative -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12">
              {/* Main Image Container */}
              <div className="relative bg-white overflow-hidden">
                <div
                  className="w-full h-120 overflow-hidden cursor-pointer"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={images[selectedImage]}
                    alt=""
                    className="w-full h-full object-contain transition-transform duration-300"
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
                    className={`w-4 h-4 ${isWishlisted ? "text-red-500 fill-current" : ""}`}
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
            <div className="px-1 md:px-0">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{" "}
                      {Number(
                        selectedVariant?.material_details?.reduce(
                          (acc, mat) => acc + (Number(mat?.sub_total_price || 0) || 0),
                          0
                        ) || 0
                      ).toFixed(2)
                      }
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">(MRP Inclusive of all taxes)</p>
                  <h1 className="text-lg lg:text-xl font-medium text-gray-900">
                    {productData.name || "Unnamed Product"}
                  </h1>
                </div>
                <div className="flex-shrink-0">
                  <div
                    className="text-white text-center font-semibold w-20 ml-2.5"
                    style={{
                      background: "linear-gradient(90deg, #FD8B64 0%, #FF5B6C 100%)",
                      borderRadius: "8px 8px 0 0",
                      textTransform: "uppercase",
                      fontSize: "0.6rem",
                      padding: "1px 0",
                      lineHeight: "10px",
                    }}
                  >
                    BUY FOR LESS
                  </div>
                  <div
                    className="bg-[#F5F1FF] rounded-lg p-2 w-[100px] border border-purple-300"
                  >
                    <div className="text-center">

                      <div className="text-purple-700 font-bold text-xs flex items-center justify-center mb-1"
                        style={{
                          background: "#E5DDFF",

                          color: "#4F3267",
                          padding: "8px 6px",
                          marginbottom: "10px",
                          borderRadius: "8px",
                          fontSize: "11px",
                          position: "relative",
                          texttransform: "uppercase",
                          height: "30px",
                        }}>
                        9+1 SAVINGS
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-[10px] text-gray-600 leading-tight">
                        Pay for 9 months, 100% off on the 10th
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {discount && (
              <div className="px-1 md:px-0">
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                  <span className="text-sm font-medium text-red-800">
                    Flat {discount}% off on Diamond Prices
                  </span>
                </div>
              </div>
            )}
            <div id="customise" className="flex items-stretch w-fit bg-white border border-yellow-200 rounded-lg overflow-hidden px-1 md:px-0">
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
              <button
                onClick={() => {
                  setSelectedMaterialGroup(selectedVariant?.material_details);
                  setShowCustomizationModal(true);
                }}
                className="bg-yellow-400 px-6 flex items-center justify-center flex-shrink-0 hover:bg-yellow-500 transition-colors"
              >
                <span className="text-sm font-bold text-black">CUSTOMISE</span>
              </button>
            </div>
            <div className="flex justify-start gap-5 items-center px-1 md:px-0">
              {selectedVariant?.inventory_details?.stock_status &&
                selectedVariant?.inventory_details?.stock_status !== "OK" && (
                  <div>
                    <label className="text-gray-600 text-xs mb-1 font-semibold block">
                      Stock
                    </label>
                    <span className="text-sm font-medium text-red-600">
                      {selectedVariant?.inventory_details?.stock_status}
                    </span>
                  </div>
                )}
              <div className="px-3 py-2 border-t border-gray-100">
                <label className="text-gray-600 text-xs mb-1 font-semibold block">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden w-max">
                  <button
                    onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
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
            </div>
            <div className="mt-6 px-1 md:px-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Available Variants</h2>
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
            <div className="hidden md:block px-1 md:px-0">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 text-white py-3 px-6 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
                  style={{
                    background: "linear-gradient(90deg, #E56EEB -13.59%, #8863FB 111.41%)",
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
                    className={`w-5 h-5 ${isWishlisted ? "text-red-500 fill-current" : "text-gray-600"}`}
                  />
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div id="delivery-stores" className="w-full px-1 md:px-0">
              <DeliveryStoresUI />
            </div>
            <FeaturesComponent />
            <div id="details" className="self-start w-full space-y-6 px-1 md:px-0">
              <ProductDetailsSection />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">

        <BannerSlidder />
        <YouMayLike />
        <SimilarProducts productData={productData} />
        <div id="reviews">
          <CustomerReviewSection productId={productData.product_id} />
        </div>
        <RecentlyViewed />
        <ContinueBrowsing />
        <More18KProducts />
        <CaratLaneSignup />
        <MobileVideoSlider />
        <RelatedCategories productData={productData} />
        <ShopByProducts />
        <div className="mb-10">
          <Footer />
        </div>

      </div>
      {/* <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-40"> */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-30">
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
          className="fixed inset-0 backdrop-blur-sm bg-[#77778870] bg-opacity-10 z-[10000] flex items-end md:items-stretch md:justify-end overflow-hidden"
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
            <div className="p-4 space-y-6 mb-1">
              <div>
                <h3 className="text-sm mt-10 font-semibold text-gray-800 mb-4">
                  PRICE BREAKUP
                </h3>

                {/* Header Row */}
                <div className="grid grid-cols-4 gap-2 mb-3 text-xs font-medium text-purple-600">
                  <div>COMPONENT</div>
                  <div>RATE</div>
                  <div>WEIGHT</div>
                  <div>FINAL VALUE</div>
                </div>

                {/* Start of Dynamic Material Grouping */}
                {(() => {
                  let totalMaterialValue = 0;

                  const uniqueMaterials = [
                    ...new Set(
                      selectedVariant?.material_details?.map(
                        (m) => m.master_mat_name?.toLowerCase()
                      )
                    ),
                  ];

                  return (
                    <>
                      {uniqueMaterials.map((matName, i) => {
                        const materials = selectedVariant.material_details.filter(
                          (m) => m.master_mat_name?.toLowerCase() === matName
                        );
                        const totalValue = materials.reduce(
                          (acc, m) => acc + (Number(m.sub_total_price) || 0),
                          0
                        );
                        totalMaterialValue += totalValue;
                        return (
                          <div key={i} className="mb-4">
                            {/* Material Group Name */}
                            <div className="text-xs text-gray-700 font-semibold mb-1 capitalize">
                              {matName}
                            </div>

                            {/* Material Rows */}
                            {materials?.map((material, index) => (
                              <div
                                key={`mat-${i}-${index}`}
                                className="grid grid-cols-4 gap-2 text-xs text-gray-800 py-1"
                              >
                                <div>
                                  {material?.pur_stamp_name} {material?.material_name}
                                </div>
                                <div>
                                  ₹{Number(material?.final_mat_price_per_unit)?.toFixed(2)} / {material?.ma_unit}
                                </div>
                                <div>{Number(material?.weight)?.toFixed(3)} / {material?.ma_unit}</div>
                                <div>{Number(material?.sub_total_price)?.toFixed(2)}</div>
                              </div>
                            ))}

                            {/* Total per Material */}
                            <div className="grid grid-cols-4 gap-2 text-xs text-gray-800 border-t pt-2 mt-2 font-semibold">
                              <div>Total {matName} Value</div>
                              <div>-</div>
                              <div>-</div>
                              <div>₹{totalValue.toFixed(2)}</div>
                            </div>
                          </div>
                        );
                      })}

                      {/* SubTotal (All Materials) */}
                      <div className="grid grid-cols-4 gap-2 text-xs text-black pt-2 font-bold border-t mt-2">
                        <div>SubTotal</div>
                        <div>-</div>
                        <div>-</div>
                        <div>{rupees}{Number(totalMaterialValue)?.toFixed(2)}</div>
                      </div>

                      {/* Making Charges */}
                      <div className="grid grid-cols-4 gap-2 text-xs text-gray-800 pt-2 font-semibold">
                        <div>Making Charges</div>
                        <div>-</div>
                        <div>-</div>
                        {selectedVariant?.mak_price_type === "Flat" ?
                          <div>+{formatPrice(selectedVariant?.making_price || 0)}</div>
                          : <div>
                            <span className="text-xs font-extrabold ">+ {rupees}
                              {(Number(totalMaterialValue) * Number(selectedVariant?.making_price) / 100).toFixed(2)}</span>
                            {" "}
                            {/* ({Number(selectedVariant?.making_price)?.toFixed(0, 2) || 0}%) */}
                          </div>}
                      </div>
                      {/* {total} */}
                      <div className="grid grid-cols-4 gap-2 text-xs pt-2 text-gray-800 font-bold border-t mt-2">
                        <div> Total</div>
                        <div>-</div>
                        <div>-</div>
                        <div>
                          {/* {formatPrice(
                            totalMaterialValue +
                            (selectedVariant?.mak_price_type === "Percent"
                              ? (Number(selectedVariant?.making_price || 0) / 100 * totalMaterialValue)
                              : Number(selectedVariant?.making_price || 0))
                          )} */}
                          {formatPrice(
                            (
                              totalMaterialValue +
                              (selectedVariant?.mak_price_type === "Percent"
                                ? (Number(selectedVariant?.making_price || 0) / 100) * totalMaterialValue
                                : Number(selectedVariant?.making_price || 0))
                            ).toFixed(2) // Ensures the final number has 2 decimal places
                          )}

                        </div>
                      </div>


                      {/* {tax} */}
                      <p className="text-left font-bold mt-2">Tax</p>
                      {selectedVariant?.tax_details?.map((items) => {
                        return <div className="grid grid-cols-4 gap-2 text-xs  text-gray-800 font-bold border-t pt-1">
                          <div>{items?.tax_name}</div>
                          <div>-</div>
                          <div>-</div>
                          <div>{items?.tax_percentage}% </div>
                        </div>
                      })}
                      <div className="grid grid-cols-4 gap-2 text-xs  text-gray-800 font-bold border-t pt-1">
                        <div>Total Tax</div>
                        <div>-</div>
                        <div>-</div>
                        <div>
                          + {
                            (() => {
                              const makingCharge = selectedVariant?.mak_price_type === "Percent"
                                ? (Number(selectedVariant?.making_price || 0) / 100) * totalMaterialValue
                                : Number(selectedVariant?.making_price || 0);

                              const total = totalMaterialValue + makingCharge;

                              const totalTaxPercentage = selectedVariant?.tax_details
                                ?.reduce((acc, item) => acc + Number(item?.tax_percentage || 0), 0) || 0;

                              const taxAmount = (total * totalTaxPercentage) / 100;

                              return taxAmount.toFixed(2); // Optional: format to 2 decimal places
                            })()
                          }

                        </div>

                      </div>
                      {/* Discount */}
                      <p className="text-left font-bold mt-2">Discount</p>
                      {selectedVariant?.discount_details?.map((items) => {
                        return <div className="grid grid-cols-4 gap-2 text-xs  text-gray-800 font-bold border-t pt-1">
                          <div>{items?.discount_name}</div>
                          <div>-</div>
                          <div>-</div>
                          <div>{items?.discount_type === "Flat" && rupees}{items?.discount_value}{items?.discount_type === "Percentage" && '%'}</div>
                        </div>
                      })}
                      <div className="grid grid-cols-4 gap-2 text-xs  text-gray-800 font-bold border-t pt-1">
                        <div>Total Discount</div>
                        <div>-</div>
                        <div>-</div>
                        <div>
                          - {
                            (() => {
                              const makingCharge = selectedVariant?.mak_price_type === "Percent"
                                ? (Number(selectedVariant?.making_price || 0) / 100) * totalMaterialValue
                                : Number(selectedVariant?.making_price || 0);

                              const total = totalMaterialValue + makingCharge;

                              const totalDiscountPercentage =
                                (total *
                                  (
                                    selectedVariant?.discount_details
                                      ?.filter((i) => i?.discount_type === "Percentage")
                                      ?.reduce((acc, item) => acc + (item?.discount_value || 0), 0) || 0
                                  )) / 100;

                              const totalDiscountFlat =
                                (
                                  (
                                    selectedVariant?.discount_details
                                      ?.filter((i) => i?.discount_type === "Flat")
                                      ?.reduce((acc, item) => acc + (item?.discount_value || 0), 0) || 0
                                  ));


                              return (totalDiscountPercentage + totalDiscountFlat).toFixed(2);
                            })()
                          }
                        </div>

                      </div>
                      {/* Grand Total */}
                      <div className="grid grid-cols-4 gap-2 text-xs text-purple-700 pt-2 font-bold border-t mt-2">
                        <div>Grand Total</div>
                        <div>-</div>
                        <div>-</div>
                        <div>
                          {rupees}  {
                            (() => {
                              const makingCharge = selectedVariant?.mak_price_type === "Percent"
                                ? (Number(selectedVariant?.making_price || 0) / 100) * totalMaterialValue
                                : Number(selectedVariant?.making_price || 0);

                              const total = totalMaterialValue + makingCharge;

                              const totalDiscountPercentage =
                                (total *
                                  (
                                    selectedVariant?.discount_details
                                      ?.filter((i) => i?.discount_type === "Percentage")
                                      ?.reduce((acc, item) => acc + (item?.discount_value || 0), 0) || 0
                                  )) / 100;

                              const totalDiscountFlat =
                                (
                                  (
                                    selectedVariant?.discount_details
                                      ?.filter((i) => i?.discount_type === "Flat")
                                      ?.reduce((acc, item) => acc + (item?.discount_value || 0), 0) || 0
                                  ));

                              const totalDiscount = totalDiscountPercentage + totalDiscountFlat;

                              const totalTaxPercentage = selectedVariant?.tax_details
                                ?.reduce((acc, item) => acc + Number(item?.tax_percentage || 0), 0) || 0;

                              const taxAmount = (total * totalTaxPercentage) / 100;

                              return (total + taxAmount - totalDiscount).toFixed(2);
                            })()
                          }
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
      {showCustomizationModal && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-[#77778870] bg-opacity-10 z-[10000] flex items-end md:items-stretch md:justify-end overflow-hidden"
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
                      ₹ {selectedVariant?.material_details?.reduce(
                        (acc, mat) => acc + (Number(mat?.sub_total_price || 0) || 0),
                        0
                      ).toLocaleString()}
                    </span>

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
                {Array.isArray(selectedMaterialGroup) &&
                  selectedMaterialGroup.length > 0 && (
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
                          <div className="text-xs text-gray-500 mt-1">
                            Made to Order
                          </div>
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
                  <div className="grid grid-cols-4 gap-4  pb-2">
                    {StaticSize.map((staticSize, index) => {
                      const variantSize = getAttributeValue(
                        selectedVariant,
                        "Size"
                      );
                      const thickness = getAttributeValue(
                        selectedVariant,
                        "Thickness"
                      );
                      const thicknessUnit = getThicknessUnit(selectedVariant);

                      const isSizeMatch = variantSize === staticSize.size;

                      const stockStatus =
                        isSizeMatch &&
                          selectedVariant?.inventory_details?.stock_status &&
                          selectedVariant?.inventory_details?.stock_status !==
                          "OK"
                          ? selectedVariant.inventory_details.stock_status
                          : isSizeMatch
                            ? "Made to Order"
                            : staticSize.status;

                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedSize(staticSize.size)}
                          className={`p-2 rounded-lg border-2 text-center transition-all flex-shrink-0 w-24 ${isSizeMatch || selectedSize === staticSize.size
                            ? "border-purple-300 bg-purple-50"
                            : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                          <div className="text-sm font-bold text-gray-900">
                            {staticSize.size}
                          </div>

                          <div className="text-xs text-gray-600">
                            {isSizeMatch && thickness
                              ? `${thickness} ${thicknessUnit}`
                              : staticSize.value}
                          </div>

                          <div
                            className={`text-xs mt-1 ${stockStatus?.toLowerCase().includes("made")
                              ? "text-purple-600"
                              : "text-red-600"
                              }`}
                          >
                            {stockStatus}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3">
              <button
                onClick={handleConfirmCustomization}
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
