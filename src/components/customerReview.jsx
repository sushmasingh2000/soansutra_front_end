import React, { useState } from "react";
import { ImagePlus, Star, X } from "lucide-react";
import { useQuery } from "react-query";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../utils/ApiConnector";
import { endpoint } from "../utils/APIRoutes";
import ReviewModal from "./ReviewModal";
import { useLoginModal } from "../context/Login";
import toast from "react-hot-toast";

const tagLabels = {
  rev_disign: "DESIGN",
  rev_size_fit: "SIZE/FIT",
  rev_quality: "QUALITY",
  rev_delivery: "DELIVERY",
  rev_packaging: "PACKAGING",
  rev_customer_service: "CUSTOMER SERVICE",
  rev_overall_exp: "OVERALL EXPERIENCE",
  rev_other: "OTHERS",
};

const CreateReviewModal = ({ onClose, product, productId }) => {
  const [rating, setRating] = useState(0);
  const [improveSelected, setImproveSelected] = useState([]);
  const [impressSelected, setImpressSelected] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [media, setMedia] = useState(null);

  const options = ['Design', 'Size/Fit', 'Quality', 'Delivery', 'Packaging', 'Customer Service', 'Overall Experience', 'Others'];

  const toggleOption = (setFunc, selected, option) => {
    if (selected.includes(option)) {
      setFunc(selected.filter(o => o !== option));
    } else {
      setFunc([...selected, option]);
    }
  };

  const handleSubmit = async () => {

    const tagMap = {
      'Design': 'disign',
      'Size/Fit': 'size_fit',
      'Quality': 'quality',
      'Delivery': 'delivery',
      'Packaging': 'packaging',
      'Customer Service': 'customer_service',
      'Overall Experience': 'overall_exp',
      'Others': 'other',
    };

    const reviewData = {
      product_id: productId,
      rating,
      review_text: feedback,
    };

    Object.values(tagMap).forEach(key => {
      reviewData[`rev_${key}`] = 0;
      reviewData[`rev_${key}_impr`] = 0;
    });

    impressSelected.forEach(tag => {
      const key = tagMap[tag];
      if (key) reviewData[`rev_${key}`] = 1;
    });

    improveSelected.forEach(tag => {
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
      const response = await apiConnectorPost(endpoint.review_customer, formData);
      toast(response?.data?.message);
      if (response?.data?.success) {
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[70vh] overflow-y-auto text-sm">
        <div className="flex items-center justify-between p-3 border-b">
          <p className="text-black font-bold">Write a Review</p>
          <button onClick={onClose}><X className="w-4 h-4" /></button>
        </div>
        <h3 className="mt-4 text-md px-5  font-medium">Write a review for the product</h3>
        <div className="p-5">
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 cursor-pointer ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>
          <p className="text-center text-xs text-gray-600 mt-1">Tap on the stars to rate your experience</p>
          <div className="flex gap-5 my-3">
            <div>
              <h4 className="mt-3 text-sm font-medium">What can we improve?</h4>
              <p className="text-green-600 text-xs">You can select multiple options.</p>
              <div className="grid grid-cols-3 gap-1 mt-1">
                {options.map(opt => (
                  <button
                    key={opt}
                    className={`py-1 px-2 border rounded text-xs
                   ${improveSelected.includes(opt) ? 'bg-purple-100 text-purple-800'
                        : 'text-gray-600'}`}
                    onClick={() => toggleOption(setImproveSelected, improveSelected, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mt-3 text-sm font-medium">What did we impress you with?</h4>
              <p className="text-green-600 text-xs">You can select multiple options.</p>
              <div className="grid grid-cols-3 gap-1 mt-1">
                {options.map(opt => (
                  <button
                    key={opt}
                    className={`py-1 px-2 border rounded text-xs ${impressSelected.includes(opt) ? 'bg-purple-100 text-purple-800' : 'text-gray-600'}`}
                    onClick={() => toggleOption(setImpressSelected, impressSelected, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="media-upload" className="w-full border border-gray-200 rounded flex justify-center items-center py-4 cursor-pointer">
              <div className="bg-purple-50 rounded p-3">
                <ImagePlus className="w-6 h-6 text-purple-600" />
              </div>
              <input id="media-upload" type="file" accept="image/*,video/*" className="hidden" onChange={(e) => setMedia(e.target.files[0])} />
            </label>
            {media && <p className="text-xs text-gray-600 mt-1">{media.name}</p>}
          </div>
          <div className="mt-4">
            <textarea
              className="w-full border rounded p-2 text-xs"
              rows={4}
              maxLength={500}
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="Our designers would love to hear your feedback"
            />
            <p className="text-right text-xs text-gray-500">{500 - feedback.length}</p>
          </div>

          <button className="w-full bg-purple-600 text-white py-2 rounded mt-3 font-medium text-sm"
            onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};


const CustomerReviewSection = ({ productId }) => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedReviewId, setExpandedReviewId] = useState(null);
  const user = localStorage.getItem("token");
  const { setShowLoginModal } = useLoginModal();

  const { data, isLoading, isError } = useQuery(
    ["customer-review", page], () =>
    apiConnectorGet(endpoint.get_customer_review)
  );

  const reviews = data?.data?.result?.currentPage || [];
  const totalPages = data?.data?.result?.totalPage || 1;
  const currPage = data?.data?.result?.currPage || 1;
  const { data: order_check, } = useQuery(
    ["order_check", page], () =>
    apiConnectorGet(endpoint.checkd_order_placed)
  );


  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
    }
  };

  const { data: single } = useQuery(
    ["customer-review_single"], () =>
    apiConnectorGet(endpoint.get_customer_single_review)
  );
  const singlereviews = single?.data?.result;
  const customerImages = reviews.filter((r) => r.review_image);

  const reviewHighlights = [
    { label: "DESIGN", count: parseInt(singlereviews?.[0]?.design_count || 0) },
    {
      label: "SIZE/FIT",
      count: parseInt(singlereviews?.[0]?.size_fit_count || 0),
    },
    {
      label: "QUALITY",
      count: parseInt(singlereviews?.[0]?.quality_count || 0),
    },
    {
      label: "DELIVERY",
      count: parseInt(singlereviews?.[0]?.delivery_count || 0),
    },
    {
      label: "PACKAGING",
      count: parseInt(singlereviews?.[0]?.packaging_count || 0),
    },
    {
      label: "CUSTOMER SERVICE",
      count: parseInt(singlereviews?.[0]?.customer_service_count || 0),
    },
    {
      label: "OVERALL EXPERIENCE",
      count: parseInt(singlereviews?.[0]?.overall_exp_count || 0),
    },
    { label: "OTHERS", count: parseInt(singlereviews?.[0]?.others_count || 0) },
  ];

  if (isLoading)
    return <div className="text-center p-10">Loading reviews...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500 p-10">
        Failed to load reviews.
      </div>
    );

  return (
    <div className="max-w-9xl mx-auto p-4 sm:p-6 lg:p-8 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Customer Reviews
              </h2>

              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const avgRating = parseFloat(
                      singlereviews?.[0]?.avg_rating || 0
                    );

                    return (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <= Math.floor(avgRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : star - 0.5 === avgRating
                            ? "fill-yellow-400 text-yellow-200" // optional: lighter color for half
                            : "text-gray-300"
                          }`}
                      />
                    );
                  })}
                </div>
                <span className="text-2xl font-bold text-gray-800">
                  {" "}
                  {parseFloat(singlereviews?.[0]?.avg_rating || 0).toFixed(0,2)}/5
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-6">
                Based on {singlereviews?.[0]?.total_reviews || 0} Ratings &
                Reviews
              </p>

              <button
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:bg-yellow-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                onClick={() => {
                  if (!user) {
                    setShowLoginModal(true);
                    return;
                  }
                  if (order_check?.data?.message !== "Order exist") {
                    alert("Please purchase your order first.");
                    return;
                  }
                  setSelectedProduct();
                  setShowReviewModal(true);
                }}
              >
                WRITE A REVIEW
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              What Customers Liked
            </h3>
            <p className="text-gray-600 text-sm mb-4">Review Highlights</p>

            <div className="flex flex-wrap gap-2">
              {reviewHighlights
                ?.filter((item) => item.count > 0)
                ?.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors duration-200 cursor-pointer"
                  >
                    {item.label} ({item.count})
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Images by Customers({customerImages.length})
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
              {customerImages.slice(0, 2).map((review, index) => (
                <div key={index} className="relative group">
                  <img
                    src={review.review_image}
                    alt={`Customer review ${index + 1}`}
                    onClick={() => {
                      setSelectedReview(review);
                      setShowModal(true);
                    }}
                    className="w-full h-24 sm:h-28 lg:h-32 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  />
                </div>
              ))}

              {customerImages.length > 2 && (
                <div
                  className="relative group cursor-pointer"
                  onClick={() => {
                    setSelectedReview({
                      isGallery: true,
                      allReviews: customerImages,
                    });
                    setShowModal(true);
                  }}
                >
                  <img
                    src={customerImages[2]?.review_image}
                    alt={`More customer reviews`}
                    className="w-full h-24 sm:h-28 lg:h-32 object-cover rounded-lg brightness-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      +{customerImages?.length - 2}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white mt-6">
        <div className="border-t border-yellow-200 pt-6">
          <p className="text-gray-600 text-sm mb-6">
            Customer Reviews : Showing {reviews.length} out of {reviews.length}
          </p>

          {reviews.map((review) => {
            const {
              review_id,
              name,
              rating,
              review_text,
              review_image,
              review_date,
              ...tags
            } = review;

            const reviewTags = Object.entries(tags)
              .filter(([key, value]) => tagLabels[key] && value === 1)
              .map(([key]) => tagLabels[key]);

            const images = review_image ? [review_image] : [];
            const isExpanded = expandedReviewId === review_id;
            const shortText =
              review_text.length > 100
                ? review_text.slice(0, 100) + "..."
                : review_text;

            return (
              <div
                className="mb-8 pb-6 border-b border-yellow-100"
                key={review_id}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 text-sm font-medium">
                      {name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-800">
                        {name}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        VERIFIED PURCHASE
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${star <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {rating}/5
                      </span>
                      {review_date && (
                        <span className="text-xs text-gray-500">
                          {new Date(review_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {reviewTags.length > 0 && (
                  <div className="mb-3">
                    <div className="inline-flex items-center gap-1 text-xs text-green-600 mb-3">
                      <div className="w-3 h-3 bg-green-100 rounded flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      </div>
                      Positives
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {reviewTags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-yellow-100 text-red-700 text-xs px-2.5 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {isExpanded ? review_text : shortText}
                  {review_text.length > 100 && (
                    <span
                      className="text-red-500 cursor-pointer ml-2 hover:underline"
                      onClick={() =>
                        setExpandedReviewId(isExpanded ? null : review_id)
                      }
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </span>
                  )}
                </p>

                <div className="flex gap-2">
                  {images.map((img, idx) => (
                    <img
                      src={img}
                      alt={`Review image ${idx + 1}`}
                      className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                      onClick={() => {
                        setSelectedReview({
                          ...review,
                          fullReviewText: review_text,
                        });
                        setShowModal(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                onClick={() => goToPage(1)}
                disabled={currPage === 1}
              >
                FIRST
              </button>
              <button
                className="w-8 h-8 flex items-center justify-center text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                onClick={() => goToPage(currPage - 1)}
                disabled={currPage === 1}
              >
                &lt;
              </button>

              {/* Page Buttons */}
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (pg) => (
                  <button
                    key={pg}
                    onClick={() => goToPage(pg)}
                    className={`w-8 h-8 flex items-center justify-center text-sm border rounded-lg ${
                      pg === currPage
                        ? "bg-yellow-200 text-red-800 border-yellow-300"
                        : "border-yellow-300 text-red-600 hover:bg-yellow-50"
                    }`}
                  >
                    {pg}
                  </button>
                )
              )}

              <button
                className="w-8 h-8 flex items-center justify-center text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                onClick={() => goToPage(currPage + 1)}
                disabled={currPage === totalPages}
              >
                &gt;
              </button>
              <button
                className="px-3 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                onClick={() => goToPage(totalPages)}
                disabled={currPage === totalPages}
              >
                LAST
              </button>
            </div>
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        review={selectedReview}
      />
      {showReviewModal && (
        <CreateReviewModal
          onClose={() => {
            setShowReviewModal(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          productId={productId}
        />
      )}



    </div>
  );
};

export default CustomerReviewSection;
