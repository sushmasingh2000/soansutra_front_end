import React, { useEffect, useState } from "react";
import {
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Shield,
  Truck,
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

const ProductDetailWebPage = () => {
  const location = useLocation();
  const productData = location.state?.product;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
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
  const estimatedDeliveryDate = format(addDays(new Date(), deliveryDays), "dd MMM yyyy");

  const tabs = ["Description", "Specifications", "Product Tax"];

  const variantButtons = variants.length
    ? variants
    : [
      {
        varient_id: "default",
        varient_sku: "Default",
        varient_price: productData.price,
        varient_weight: productData.weight || "",
        unit_name: productData.unit_name || "",
      },
    ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NavigationBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:flex lg:space-x-10">
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2 space-y-4">
            <div className="relative bg-white rounded-lg overflow-hidden shadow border">
              <div className="w-full h-[450px] overflow-hidden">
                <img
                  src={images[selectedImage] || "https://via.placeholder.com/450?text=No+Image"}
                  alt={productData.name || "Product"}
                  className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-110"
                />
              </div>
              <button
                onClick={() => handleWishlist(productData.product_id, selectedVariant?.varient_id)}
                aria-label="Add to Wishlist"
                className={`absolute top-4 right-4 p-3 rounded-full bg-white shadow-md text-xl transition-colors ${isWishlisted ? "text-red-600" : "text-gray-400 hover:text-red-600"
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
                    className={`flex-shrink-0 border-2 rounded-lg overflow-hidden w-20 h-20 focus:outline-none ${selectedImage === idx
                      ? "border-indigo-600 shadow-lg"
                      : "border-gray-200 hover:border-gray-400"
                      }`}
                  >
                    <img src={img} alt={`${productData.name} image ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))
              ) : (
                <p className="text-gray-500 px-2">No images available</p>
              )}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:w-1/2 mt-8 lg:mt-0 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-semibold text-gray-900">{productData.name || "Unnamed Product"}</h1>
                <button
                  aria-label="Share Product"
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Share2 className="w-5 h-5 text-gray-600" />
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
                          className={`px-5 py-2 rounded-lg border transition-colors whitespace-nowrap ${selectedVariant?.varient_id === variant.varient_id
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
                      className={`px-6 py-3 -mb-px text-sm font-semibold ${activeTab === tab
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

            {/* Bottom Buttons */}
            <div className="mt-10 flex space-x-4">
              <Link
                to="/cart"
                state={{ product: { ...productData, selectedVariant } }}
                className="flex-grow inline-flex items-center justify-center gap-2 rounded-md border border-indigo-700 bg-indigo-700 px-5 py-3 text-white text-lg font-semibold hover:bg-indigo-800 transition"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Link>
              <button
                onClick={() => alert("Buy Now clicked!")}
                className="flex-grow inline-flex items-center justify-center gap-2 rounded-md border border-indigo-700 bg-white px-5 py-3 text-indigo-700 text-lg font-semibold hover:bg-indigo-50 transition"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex space-x-10 text-gray-700 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-indigo-600" />
                <span>100% Authentic Products</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-6 h-6 text-indigo-600" />
                <span>Fast & Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-indigo-600" />
                <span>Easy Returns & Refunds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerReviewSection productId={productData.product_id} />
      <Footer />
    </div>
  );
};

export default ProductDetailWebPage;
