import React from "react";

const ReviewModal = ({ isOpen, onClose, review }) => {
    if (!isOpen || !review) return null;
  
    const isGallery = review.isGallery;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center overflow-auto">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-xl text-gray-600 hover:text-black"
          >
            &times;
          </button>
  
          {isGallery ? (
            <>
              <h2 className="text-lg font-bold mb-4 text-gray-800">
                All Customer Images
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {review.allReviews.map((r, idx) => (
                  <div key={idx}>
                    <img
                      src={r.review_image}
                      alt={`Review ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <p className="text-xs text-gray-700 mb-1 font-semibold">
                      {r.name}
                    </p>
                    <p className="text-xs text-gray-600">{r.review_text}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <img
                src={review.review_image}
                alt="Review"
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {review.rating}/5
                </span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {review.review_text}
              </p>
            </>
          )}
        </div>
      </div>
    );
  };
  

export default ReviewModal;
