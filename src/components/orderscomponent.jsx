import {
  Calendar,
  CreditCard,
  Download,
  ImagePlus,
  MapPin,
  Package,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { endpoint } from "../utils/APIRoutes";
import {
  apiConnectorGet,
  apiConnectorPost,
  usequeryBoolean,
} from "../utils/ApiConnector";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import Loader from "../Shared/Loader";
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const OrdersContent = () => {
  const [activeTab, setActiveTab] = useState("myOrders");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productType, setProductType] = useState("PRODUCT");
  const [egoldType, setEgoldType] = useState("Buy");
  const getValue = (val) =>
    val === null || val === undefined || val === "" ? "--" : val;

  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "--");
  const { data: listData, isLoading } = useQuery(
    ["orders_list", productType, egoldType], // Add productType as a key
    () =>
      apiConnectorGet(
        `${endpoint.get_order}?product_type=${productType}&order_type=${egoldType}`
      ),
    usequeryBoolean
  );

  const orders = listData?.data?.result?.data || [];

  // Fetch detailed order only when selectedOrderId is set
  const { data: detailData, isLoading: isDetailLoading } = useQuery(
    ["order_details", selectedOrderId],
    () =>
      apiConnectorGet(
        `${endpoint.get_order_detail_by}?order_id=${selectedOrderId}`
      ),
    {
      ...usequeryBoolean,
      enabled: !!selectedOrderId,
    }
  );
  const detail = detailData?.data?.result;

  // When detailData comes, open modal
  useEffect(() => {
    if (detail) {
      setShowOrderDetails(true);
    }
  }, [detail]);

  const { data } = useQuery(["customer-review"], () =>
    apiConnectorGet(endpoint.get_customer_review)
  );

  const reviews = data?.data?.result?.currentPage || [];

  const handleViewDetails = (order) => {
    setSelectedOrderId(order.order_unique); // here use the order_id from orders list
  };

  const closeOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrderId(null);
  };

  // Helper for status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-blue-100 text-red-800";
      case "Confirmed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Order card component
  const OrderCard = ({ order, productType }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          {productType === "PRODUCT" ? (
            <img
              src={order.order_items?.[0]?.p_image_url || ""}
              alt="Order item"
              className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover flex-shrink-0"
            />
          ) : (
            <p className="text-red-500 font-semibold">{order?.order_type}</p>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
              <h3 className="font-semibold text-xs text-gray-900">
                Order #{order.order_unique}
              </h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  order.status
                )} w-fit`}
              >
                {order.status}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {moment?.utc(order.order_date).format("DD-MM-YYYY HH:mm:ss")}
                </span>
              </div>
              {productType === "PRODUCT" && (
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  <span>
                    {order.order_items?.length || 0} item
                    {(order.order_items?.length || 0) > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                <span>₹ {order.grand_total}</span>
              </div>
            </div>
            {productType === "PRODUCT" ? (
              <div className="flex items-start gap-1 mt-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">
                  {order.shipping_details?.address || "No Address"}
                </span>
              </div>
            ) : (
              <p className="text-sm ">
                Weight :{" "}
                <span className="text-blue-600">{order?.total_weight}</span>
              </p>
            )}
          </div>
        </div>
        {productType === "PRODUCT" ? (
          <div className="flex flex-col md:flex-row gap-2 md:ml-4">
            <button
              onClick={() => handleViewDetails(order)}
              className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              View Details
            </button>
          </div>
        ) : (
          <div>
            {detail?.status !== "Pending" && detail?.status !== "Failed" && (
              <div className="flex flex-col md:flex-row gap-2 md:ml-4">
                <button
                  className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  onClick={() => {
                    navigate(`/invoice/${order?.order_unique}`);
                  }}
                >
                  View / Download Invoice
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const ReviewModal = ({ onClose, product }) => {
    const [rating, setRating] = useState(0);
    const [improveSelected, setImproveSelected] = useState([]);
    const [impressSelected, setImpressSelected] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [media, setMedia] = useState(null);

    const productImage = product?.p_image_url || "";
    const productName = product?.sku || "Product";
    const productId = product?.p_id;

    const options = [
      "Design",
      "Size/Fit",
      "Quality",
      "Delivery",
      "Packaging",
      "Customer Service",
      "Overall Experience",
      "Others",
    ];

    const toggleOption = (setFunc, selected, option) => {
      if (selected.includes(option)) {
        setFunc(selected.filter((o) => o !== option));
      } else {
        setFunc([...selected, option]);
      }
    };

    const handleSubmit = async () => {
      if (!rating || !productId) {
        toast.error("Please complete the review form.");
        return;
      }

      const tagMap = {
        Design: "disign",
        "Size/Fit": "size_fit",
        Quality: "quality",
        Delivery: "delivery",
        Packaging: "packaging",
        "Customer Service": "customer_service",
        "Overall Experience": "overall_exp",
        Others: "other",
      };

      const reviewData = {
        product_id: product?.p_id,
        rating,
        review_text: feedback,
      };

      Object.values(tagMap).forEach((key) => {
        reviewData[`rev_${key}`] = 0;
        reviewData[`rev_${key}_impr`] = 0;
      });

      impressSelected.forEach((tag) => {
        const key = tagMap[tag];
        if (key) reviewData[`rev_${key}`] = 1;
      });

      improveSelected.forEach((tag) => {
        const key = tagMap[tag];
        if (key) reviewData[`rev_${key}_impr`] = 1;
      });

      const formData = new FormData();
      Object.entries(reviewData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (media) {
        formData.append("file", media);
      }

      try {
        const response = await apiConnectorPost(
          endpoint.review_customer,
          formData
        );
        toast.success(response?.data?.msg || "Review submitted successfully!");
        onClose();
      } catch (error) {
        console.error(error);
        toast.error("Failed to submit review. Try again.");
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto text-sm">
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              <img
                src={productImage}
                alt={productName}
                className="w-8 h-8 rounded"
              />
              <h2 className="text-md font-medium">{productName}</h2>
            </div>
            <button onClick={onClose}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-10">
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 cursor-pointer ${i < rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                    }`}
                  onClick={() => setRating(i + 1)}
                />
              ))}
            </div>
            <p className="text-center text-xs text-gray-600 mt-1">
              Tap on the stars to rate your experience
            </p>
            <h3 className="mt-4 text-md font-medium">
              Write a review for the product
            </h3>

            {rating > 0 && rating <= 3 && (
              <>
                <h4 className="mt-3 text-sm font-medium">
                  What can we improve?
                </h4>
                <p className="text-green-600 text-xs">
                  You can select multiple options.
                </p>
                <div className="grid grid-cols-3 gap-1 mt-1">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      className={`py-1 px-2 border rounded text-xs ${improveSelected.includes(opt)
                        ? "bg-yellow-100 text-yellow-800"
                        : "text-gray-600"
                        }`}
                      onClick={() =>
                        toggleOption(setImproveSelected, improveSelected, opt)
                      }
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}

            <h4 className="mt-3 text-sm font-medium">
              What did we impress you with?
            </h4>
            <p className="text-green-600 text-xs">
              You can select multiple options.
            </p>
            <div className="grid grid-cols-3 gap-1 mt-1">
              {options.map((opt) => (
                <button
                  key={opt}
                  className={`py-1 px-2 border rounded text-xs ${impressSelected.includes(opt)
                    ? "bg-yellow-100 text-yellow-800"
                    : "text-gray-600"
                    }`}
                  onClick={() =>
                    toggleOption(setImpressSelected, impressSelected, opt)
                  }
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="mt-3">
              <label
                htmlFor="media-upload"
                className="w-full border border-yellow-200 rounded flex justify-center items-center py-4 cursor-pointer"
              >
                <div className="bg-yellow-50 rounded p-3">
                  <ImagePlus className="w-6 h-6 text-yellow-600" />
                </div>
                <input
                  id="media-upload"
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => setMedia(e.target.files[0])}
                />
              </label>
              {media && (
                <p className="text-xs text-gray-600 mt-1">{media.name}</p>
              )}
            </div>

            <div className="mt-4">
              <textarea
                className="w-full border rounded p-2 text-xs"
                rows={4}
                maxLength={500}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Our designers would love to hear your feedback"
              />
              <p className=" text-right text-xs text-gray-500">
                {500 - feedback.length}
              </p>
            </div>
            <button
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-2 rounded mt-3 font-medium text-sm"
              onClick={handleSubmit}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    );
  };

  // OrderDetailsModal using detail (from API)
  const OrderDetailsModal = ({ detail, onClose }) => {
    if (isDetailLoading) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
          <div className="bg-white rounded-lg p-6">Loading...</div>
        </div>
      );
    }
    if (!detail) return null;
    const products = detail.order_items?.map((item, idx) => ({
      name: item.sku || "Unknown",
      quantity: item?.quantity,
      price: parseFloat(item.unit_price || 0),
      image: item?.p_image_url || "",
    }));
    const addressParts = detail?.shipping_details || {};
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Order Details</h2>
              <p className="text-xs text-gray-500">Order #{detail?.order_unique}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Products */}
          {/* Products */}
          <div className="px-6 py-5 border-b">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Items in this order</h3>

            <div className="space-y-4">
              {products?.map((prod, i) => {
                const canReview = detail?.status === 'Delivered' || detail?.status === 'Completed';
                const avgRating = parseFloat(reviews?.[i]?.rating || 0);

                return (
                  <div key={i} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                    <div className="flex items-start gap-4">
                      <img
                        src={prod?.image}
                        alt={prod?.name}
                        className="w-14 h-14 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">{prod?.name}</p>
                        <p className="text-xs text-gray-500">Qty: {prod?.quantity}</p>

                        <div className="grid grid-cols-2 gap-x-4 text-xs text-gray-700 mt-2">
                          <p>Discount: ₹{detail?.order_items[i]?.discount}</p>
                          <p>Tax: ₹{detail?.order_items[i]?.tax_amount}</p>
                          <p>Total Price: ₹{detail?.order_items[i]?.total_price}</p>
                          <p className="font-semibold text-gray-900">
                            Grand Total: ₹{detail?.order_items[i]?.grand_total}
                          </p>
                        </div>

                        {/* Inline Review Stars (only if status allows) */}
                        {canReview && (
                          <div className="mt-3">
                            <div className="flex items-center gap-1 mb-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  onClick={() => {
                                    setSelectedProduct(detail?.order_items[i]);
                                    setShowReviewModal(true);
                                  }}
                                  className={`w-5 h-5 cursor-pointer transition ${star <= Math.floor(avgRating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : star - 0.5 === avgRating
                                      ? 'fill-yellow-400 text-yellow-200'
                                      : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                            <button
                              onClick={() => {
                                setSelectedProduct(detail?.order_items[i]);
                                setShowReviewModal(true);
                              }}
                              className="text-xs text-red-500 hover:underline"
                            >
                              Write a Review
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">₹{prod?.price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="pt-5 mt-5 border-t">
              <div className="flex justify-between font-semibold text-gray-800 text-sm">
                <span>Total</span>
                <span className="font-bold text-base">₹{detail?.grand_total}</span>
              </div>
            </div>
          </div>


          {/* Review Section */}
          {detail?.status !== "Pending" && (
            <div className="px-6 py-4 border-b">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setSelectedProduct(detail?.order_items[0]);
                  setShowReviewModal(true);
                }}
              >
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const avgRating = parseFloat(reviews?.[0]?.rating || 0);
                    return (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <= Math.floor(avgRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : star - 0.5 === avgRating
                            ? "fill-yellow-400 text-yellow-200"
                            : "text-gray-300"
                          }`}
                      />
                    );
                  })}
                </div>
                <button className="bg-red-500 text-white text-xs font-medium px-3 py-1 rounded hover:bg-red-600">
                  Add Review
                </button>
                <p className="text-xs text-gray-500 mt-1">Tap on stars to rate your experience</p>
              </div>
            </div>
          )}

          {/* Shipping & Payment */}
          <div className="px-6 py-4 border-b">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-sm text-gray-900 mb-2">Shipping Address</h4>
                <div className="flex gap-2 text-xs text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                  <p>
                    {addressParts?.address}, {addressParts?.city}, {addressParts?.state}, {addressParts?.country} - {addressParts?.postal_code}
                  </p>
                </div>
              </div>
              {/* <div>
                <h4 className="font-semibold text-sm text-gray-900 mb-2">Payment Method</h4>
                <div className="flex gap-2 text-xs text-gray-600">
                  <CreditCard className="w-4 h-4 mt-0.5 text-gray-400" />
                  <p>Paid via Credit Card</p>
                </div>
              </div> */}
            </div>
          </div>

          {/* Order Status */}
            <div className="px-6 py-5 border-b">
              <h4 className="text-base font-semibold text-gray-800 mb-3">Status Track</h4>

              {(() => {
                // Count how many steps are beyond "Pending" and "Confirmed"
                const meaningfulSteps = detail?.status_dates?.filter((s) => {
                  const statusText = getValue(s?.od_status);
                  return statusText !== "Pending" && statusText !== "Confirmed";
                });

                // Only render if there's more than just pending/confirmed
                if (meaningfulSteps?.length > 0) {
                  return (
                    <Stepper
                      orientation="vertical"
                      nonLinear
                      activeStep={detail.status_dates.length - 1}
                    >
                      {detail.status_dates.map((status, idx) => {
                        const statusText = getValue(status?.od_status);
                        const statusDate = formatDate(status?.od_date);
                        const statusColorMap = {
                          Pending: "info",
                          Confirmed: "primary",
                          Processing: "info",
                          Shipped: "warning",
                          Delivered: "success",
                          Completed: "success",
                          Cancelled: "error",
                        };
                        const stepColor = statusColorMap[statusText] || "inherit";

                        return (
                          <Step key={idx} completed={idx < detail.status_dates.length} expanded>
                            <StepLabel StepIconProps={{ color: stepColor }}>
                              <span className="font-medium">{statusText}</span>
                            </StepLabel>
                            <StepContent>
                              <Typography variant="body2" className="text-xs text-gray-600">
                                <strong>Date:</strong> {statusDate}
                              </Typography>
                            </StepContent>
                          </Step>
                        );
                      })}
                    </Stepper>
                  );
                }

                // If not enough steps to show
                return <p className="text-xs text-gray-500">Tracking info not available yet.</p>;
              })()}
            </div>

          {/* Notes */}
          {/* {detail?.notes && (
            <div className="px-6 py-4 border-b">
              <h4 className="font-semibold text-sm text-gray-900 mb-2">Order Notes</h4>
              <p className="text-xs text-gray-600 bg-gray-50 rounded-md p-3">
                {detail?.notes}
              </p>
            </div>
          )} */}

          {/* Invoice */}
          {detail?.status !== "Pending" && detail?.status !== "Failed" && (
            <div className="px-6 py-4 border-b">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5 text-blue-500" />
                <button
                  className="text-sm font-medium text-blue-600 hover:underline"
                  onClick={() => navigate(`/invoice/${detail?.order_unique}`)}
                >
                  View / Download Invoice
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Get a printable copy of your order</p>
            </div>
          )}


          {/* Footer Action */}
          <div className="px-6 py-4 flex justify-end">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-5 py-2 rounded-md shadow"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>


    );
  };

  // Filter cancelled orders if you have status etc.
  const cancelledOrders = orders.filter((o) => o.status === "Cancelled");

  // Show active orders
  const activeOrders = orders.filter((o) => o.status !== "Cancelled");

  const currentOrders =
    activeTab === "myOrders" ? activeOrders : cancelledOrders;

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white-50 p-4 md:p-6 lg:p-8">
      <Loader isLoading={isLoading} />
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 flex flex-col justify-end items-end gap-2">
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option>Select Order Type</option>
            <option value="PRODUCT">Product</option>
            <option value="EGOLD">E-GOLD</option>
          </select>
        </div>
        {productType === "EGOLD" && (
          <div className="mb-4 flex flex-col justify-end items-end gap-2">
            <select
              value={egoldType}
              onChange={(e) => setEgoldType(e.target.value)}
              className="w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="BUY">Buy</option>
              <option value="SELL">Sell</option>
            </select>
          </div>
        )}
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            My Orders
          </h1>
          <p className="text-gray-600 text-[15px]">
            Track and manage your orders
          </p>
        </div>

        {/* Tabs */}
        {/* <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('myOrders')}
              className={`flex-1 px-4 md:px-6 py-4 text-sm md:text-base font-medium rounded-l-lg transition-colors ${activeTab === 'myOrders'
                ? 'bg-yellow-50 text-gray-900 border-b-2 border-red-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-yellow-50'
                }`}
            >
              MY ORDERS
              {currentOrders.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-yellow-500 rounded-full">
                  {currentOrders.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('cancelledOrders')}
              className={`flex-1 px-4 md:px-6 py-4 text-sm md:text-base font-medium rounded-r-lg transition-colors ${activeTab === 'cancelledOrders'
                ? 'bg-yellow-50 text-gray-900 border-b-2 border-red-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-yellow-50'
                }`}
            >
              CANCELLED ORDERS
              {cancelledOrders.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {cancelledOrders.length}
                </span>
              )}
            </button>
          </div>
        </div> */}

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-sm min-h-96">
          {currentOrders.length === 0 ? (
            <div className="py-12 md:py-20">
              <p className="text-gray-500 text-center">
                {activeTab === "myOrders"
                  ? "You don't have any active orders."
                  : "You don't have any cancelled orders."}
              </p>
            </div>
          ) : (
            <div className="p-4 md:p-6 space-y-4">
              {currentOrders.map((order) => (
                <OrderCard
                  key={order?.order_id}
                  order={order}
                  productType={productType}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && detail && (
        <OrderDetailsModal detail={detail} onClose={closeOrderDetails} />
      )}
      {showReviewModal && selectedProduct && (
        <ReviewModal
          onClose={() => {
            setShowReviewModal(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default OrdersContent;
