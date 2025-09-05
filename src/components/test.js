import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useQuery } from 'react-query';
import { apiConnectorGet } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';

const tagLabels = {
  rev_disign: "DESIGN",
  rev_size_fit: "SIZE/FIT",
  rev_quality: "QUALITY",
  rev_delivery: "DELIVERY",
  rev_packaging: "PACKAGING",
  rev_customer_service: "CUSTOMER SERVICE",
  rev_overall_exp: "OVERALL EXPERIENCE",
  rev_other: "OTHERS"
};

const CustomerReviewSection = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery(
    ['customer-review', page],
    () => apiConnectorGet(`${endpoint.get_customer_review}?page=${page}`), // <-- Pass page param
    {
      keepPreviousData: true,
    }
  );

  const reviews = data?.data?.result?.currentPage || [];
  const totalPages = data?.data?.result?.totalPage || 1;
  const currPage = data?.data?.result?.currPage || 1;

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
    }
  };

  if (isLoading) return <div className="text-center p-10">Loading reviews...</div>;
  if (isError) return <div className="text-center text-red-500 p-10">Failed to load reviews.</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
            <p className="text-gray-600 text-sm mb-6">Based on {reviews.length} Ratings & Reviews</p>
            <button className="w-full sm:w-auto bg-purple-400 hover:bg-purple-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              WRITE A REVIEW
            </button>
          </div>
        </div>

        {/* Right Column - Reviews */}
        <div className="lg:col-span-2 border-t border-gray-200 pt-6">
          <p className="text-gray-600 text-sm mb-6">
            Customer Reviews : Showing page {currPage} of {totalPages}
          </p>

          {/* Reviews List */}
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

            return (
              <div key={review_id} className="mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 text-sm font-medium">{name?.charAt(0) || "U"}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-800">{name}</span>
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
                            className={`w-3.5 h-3.5 ${
                              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{rating}/5</span>
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
                        <span key={tag} className="bg-purple-100 text-purple-700 text-xs px-2.5 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {review_text}
                </p>

                <div className="flex gap-2">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Review image ${idx + 1}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-2 text-sm border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                onClick={() => goToPage(1)}
                disabled={currPage === 1}
              >
                FIRST
              </button>
              <button
                className="w-8 h-8 flex items-center justify-center text-sm border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                onClick={() => goToPage(currPage - 1)}
                disabled={currPage === 1}
              >
                &lt;
              </button>

              {/* Page Buttons */}
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => goToPage(pg)}
                  className={`w-8 h-8 flex items-center justify-center text-sm border rounded-lg ${
                    pg === currPage
                      ? "bg-purple-200 text-purple-800 border-purple-300"
                      : "border-purple-300 text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {pg}
                </button>
              ))}

              <button
                className="w-8 h-8 flex items-center justify-center text-sm border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                onClick={() => goToPage(currPage + 1)}
                disabled={currPage === totalPages}
              >
                &gt;
              </button>
              <button
                className="px-3 py-2 text-sm border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                onClick={() => goToPage(totalPages)}
                disabled={currPage === totalPages}
              >
                LAST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewSection;
