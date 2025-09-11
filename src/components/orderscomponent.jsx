
import React, { useState } from 'react';
import { Package, Calendar, MapPin, CreditCard, X, Truck, CheckCircle, Star, RotateCcw, Repeat2, Wrench, Mail, Printer, Award, ImagePlus } from 'lucide-react';
import { useQuery } from 'react-query';
import { endpoint } from '../utils/APIRoutes';
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from '../utils/ApiConnector';
import toast from 'react-hot-toast';

const OrdersContent = () => {
  const [activeTab, setActiveTab] = useState('myOrders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { data } = useQuery(
    ["order"],
    () => apiConnectorGet(endpoint.get_order),
    usequeryBoolean
  );

  // Mock static completed order for frontend testing
  // This is a static order to help frontend developers see the review modal
  const mockCompletedOrder = {
    id: "EZVNSVPZB1150-JR",
    date: new Date("2025-01-01").toISOString(),
    status: "Delivered",
    items: 1,
    total: 24935.00,
    address: "123 Main St, Mumbai, Maharashtra, India - 400001",
    image: "https://example.com/images/diamond-earrings.jpg",
    products: [{
      name: "Starlight Kids' Diamond Earrings",
      price: 24935.00,
      quantity: 1,
      image: "https://example.com/images/diamond-earrings.jpg",
    }],
    trackingNumber: "",
    estimatedDelivery: "",
    paymentMethod: "Paid via Credit Card",
    orderNotes: "",
  };

  const order_api = (data?.data?.result?.data || []).map((order) => {
    const orderDate = new Date(order.order_date);
    const products = order.order_items.map((item) => ({
      name: item?.product_details?.name || 'Unknown',
      price: parseFloat(item?.unit_price || 0),
      quantity: parseInt(item?.quantity || 1),
      image: item?.product_details?.product_images?.p_image_url,
    }));

    return {
      id: order.order_id,
      date: orderDate.toISOString(),
      status: order.status,
      items: products.length,
      total: parseFloat(order.grand_total),
      address: `${order.shipping_details?.address || ''}, ${order.shipping_details?.city || ''}, ${order.shipping_details?.state || ''}, ${order.shipping_details?.country || ''} - ${order.shipping_details?.postal_code || ''}`,
      image: products[0]?.image || '',
      products: products,
      trackingNumber: '',
      estimatedDelivery: '',
      paymentMethod: 'Paid via Credit Card',
      orderNotes: order.notes || '',
    };
  });
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setSelectedOrderId(order.id); // <-- set id here
    setShowOrderDetails(true);
  };

  const { data: order_details } = useQuery(
    ["order_details", selectedOrderId],
    () => apiConnectorGet(`${endpoint.get_order_detail_by}?order_id=${selectedOrderId}`),
    {
      ...usequeryBoolean,
      enabled: !!selectedOrderId,  // only fetch when selectedOrderId is set
    }
  );



  const cancelledOrders = [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const closeOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const OrderDetailsModal = ({ order, onClose, orderDetails }) => {
    // Use detailed data if available, else fallback to order.products
    const products = orderDetails?.data?.result?.order_items?.map(item => ({
      name: item.product_details?.name || 'Unknown',
      quantity: item.quantity,
      price: parseFloat(item.unit_price || 0),
      image: item.product_details?.product_images?.p_image_url || '',
    })) || order.products;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto text-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-yellow-200">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Order Details</h2>
              <p className="text-xs text-gray-600">Order #{order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-yellow-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Order Status */}
          <div className="p-4 border-b border-yellow-200">
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
              <span className="text-xs text-gray-600">
                Ordered on {new Date(order.date).toLocaleDateString()}
              </span>
            </div>

            {order.status === 'Shipped' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-1 mb-1">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900 text-sm">On the way</span>
                </div>
                <p className="text-xs text-blue-700">
                  Tracking: {order.trackingNumber}
                </p>
                <p className="text-xs text-blue-700">
                  Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>
            )}

            {order.status === 'Delivered' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-1 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-900 text-sm">Delivered</span>
                </div>
                <p className="text-xs text-green-700">
                  Delivered on {new Date(order.deliveredDate).toLocaleDateString()}
                </p>
              </div>
            )}

            {order.status === 'Processing' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center gap-1 mb-1">
                  <Package className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-900 text-sm">Processing</span>
                </div>
                <p className="text-xs text-yellow-700">
                  Your order is being prepared for shipment
                </p>
              </div>
            )}
          </div>

          {/* Products */}
          <div className="p-4 border-b border-yellow-200">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Items in this order</h3>
            <div className="space-y-3">
              {products.map((product, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                    <p className="text-xs text-gray-600">Quantity: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 text-sm">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-yellow-200 mt-3 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 text-sm">Total</span>
                <span className="font-bold text-md text-gray-900">${order.total}</span>
              </div>
            </div>

            {order.status === 'Delivered' && (
              <div className="mt-4">
                <div className="flex justify-start cursor-pointer" onClick={() => setShowReviewModal(true)}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gray-300" />
                  ))}
                </div>
                  <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-2 py-0.5 mt-2 mb-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg" onClick={() => setShowReviewModal(true)}>
          Add Review
        </button>
                <p className="text-xs text-gray-600">Tap on the stars to rate your experience</p>
              </div>
            )}
          </div>

          {/* Shipping & Payment Info */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Shipping Address</h3>
                <div className="flex items-start gap-1">
                  <MapPin className="w-3 h-3 text-gray-500 mt-1" />
                  <p className="text-xs text-gray-600">{order.address}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Payment Method</h3>
                <div className="flex items-start gap-1">
                  <CreditCard className="w-3 h-3 text-gray-500 mt-1" />
                  <p className="text-xs text-gray-600">{order.paymentMethod}</p>
                </div>
              </div>
            </div>

            {order.orderNotes && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Order Notes</h3>
                <p className="text-xs text-gray-600 bg-yellow-50 rounded-lg p-2">{order.orderNotes}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t border-yellow-200">
            {order.status === 'Delivered' ? (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                <button className="flex flex-col items-center gap-1">
                  <div className="p-1 bg-yellow-100 rounded-full">
                    <RotateCcw className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-xs">Replace Item</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <div className="p-1 bg-yellow-100 rounded-full">
                    <Repeat2 className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-xs">Exchange Item</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <div className="p-1 bg-yellow-100 rounded-full">
                    <Wrench className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-xs">Request Repair</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <div className="p-1 bg-yellow-100 rounded-full">
                    <Mail className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-xs">Email Invoice</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <div className="p-1 bg-yellow-100 rounded-full">
                    <Printer className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-xs">Print Invoice</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <div className="p-1 bg-yellow-100 rounded-full">
                    <Award className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-xs">E-Certificate</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                {order.trackingNumber && (
                  <button className="flex-1 bg-yellow-600 text-white px-3 py-1 rounded-lg font-medium hover:bg-yellow-700 transition-colors text-sm">
                    Track Package
                  </button>
                )}
                <button className="flex-1 bg-yellow-100 text-gray-700 px-3 py-1 rounded-lg font-medium hover:bg-yellow-200 transition-colors text-sm">
                  Contact Support
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const ReviewModal = ({ onClose, productName, productImage }) => {
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
      if (!rating || !selectedOrder.products?.[0]) {
        toast.error("Please complete the review form.");
        return;
      }
    
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
        product_id: selectedOrder.products[0].id || '15', // fallback
        rating,
        review_text: feedback,
      };
    
      // Add all possible review fields and set them to 0 by default
      Object.values(tagMap).forEach(key => {
        reviewData[`rev_${key}`] = 0;
        reviewData[`rev_${key}_impr`] = 0;
      });
    
      // Set 1 for selected positive tags
      impressSelected.forEach(tag => {
        const key = tagMap[tag];
        if (key) reviewData[`rev_${key}`] = 1;
      });
    
      // Set 1 for selected negative tags
      improveSelected.forEach(tag => {
        const key = tagMap[tag];
        if (key) reviewData[`rev_${key}_impr`] = 1;
      });
    
      const formData = new FormData();
    
      // Append structured review fields
      Object.entries(reviewData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    
      // Append optional file
      if (media) {
        formData.append("file", media);
      }
    
      try {
        const response = await apiConnectorPost(endpoint.review_customer, formData);
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
              <img src={productImage} alt={productName} className="w-8 h-8 rounded" />
              <h2 className="text-md font-medium">{productName}</h2>
            </div>
            <button onClick={onClose}><X className="w-4 h-4" /></button>
          </div>
          <div className="p-10">
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
            <h3 className="mt-4 text-md font-medium">Write a review for the product</h3>
            {rating > 0 && rating <= 3 && (
              <>
                <h4 className="mt-3 text-sm font-medium">What can we improve?</h4>
                <p className="text-green-600 text-xs">You can select multiple options.</p>
                <div className="grid grid-cols-3 gap-1 mt-1">
                  {options.map(opt => (
                    <button 
                      key={opt}
                      className={`py-1 px-2 border rounded text-xs ${improveSelected.includes(opt) ? 'bg-yellow-100 text-yellow-800' : 'text-gray-600'}`}
                      onClick={() => toggleOption(setImproveSelected, improveSelected, opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
            <h4 className="mt-3 text-sm font-medium">What did we impress you with?</h4>
            <p className="text-green-600 text-xs">You can select multiple options.</p>
            <div className="grid grid-cols-3 gap-1 mt-1">
              {options.map(opt => (
                <button 
                  key={opt}
                  className={`py-1 px-2 border rounded text-xs ${impressSelected.includes(opt) ? 'bg-yellow-100 text-yellow-800' : 'text-gray-600'}`}
                  onClick={() => toggleOption(setImpressSelected, impressSelected, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <label htmlFor="media-upload" className="w-full border border-yellow-200 rounded flex justify-center items-center py-4 cursor-pointer">
                <div className="bg-yellow-50 rounded p-3">
                  <ImagePlus className="w-6 h-6 text-yellow-600" />
                </div>
                <input id="media-upload" type="file" accept="image/*,video/*" className="hidden" onChange={(e) => setMedia(e.target.files[0])} />
              </label>
              {media && <p className="text-xs text-gray-600 mt-1">{media.name}</p>}
            </div>
            <div className="mt-4 ">
              <textarea 
                className="w-full border rounded p-2 text-xs" 
                rows={4}
                maxLength={500}
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Our designers would love to hear your feedback"
              />
              <p className=" text-right text-xs text-gray-500">{500 - feedback.length}</p>
            </div>
            <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-2 rounded mt-3 font-medium text-sm" onClick={handleSubmit}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EmptyState = ({ type }) => (
    <div className="flex flex-col items-center justify-center py-12 md:py-20">
      <div className="relative mb-6">
        <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-yellow-300 rounded-full flex items-center justify-center">
          <Package className="w-8 h-8 md:w-12 md:h-12 text-yellow-400" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
        No {type === 'cancelled' ? 'cancelled' : 'active'} orders
      </h3>
      <p className="text-gray-500 text-sm md:text-base mb-6 text-center px-4">
        {type === 'cancelled'
          ? "You haven't cancelled any orders yet."
          : "You don't have any orders at the moment."}
      </p>
      <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 md:px-8 md:py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-600 transition-colors">
        Continue Shopping
      </button>
    </div>
  );

  const OrderCard = ({ order }) => (
    <div className="bg-white rounded-lg border border-yellow-200 p-4 md:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <img
            src={order.image}
            alt="Order item"
            className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
              <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)} w-fit`}>
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Package className="w-4 h-4" />
                <span>{order.items} item{order.items > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                <span>${order.total}</span>
              </div>
            </div>

            <div className="flex items-start gap-1 mt-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{order.address}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:ml-4">
          <button
            onClick={() => handleViewDetails(order)}
            className="px-4 py-2 text-sm font-medium text-yellow-600 bg-red-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            View Details
          </button>
          <button className="px-4 py-2 text-sm font-medium text-yellow-600 bg-red-50 rounded-lg hover:bg-yellow-100 transition-colors">
            Track Order
          </button>
        </div>
      </div>
    </div>
  );

  const currentOrders = activeTab === 'myOrders' ? [mockCompletedOrder, ...order_api] : cancelledOrders;

  return (
    <div className="min-h-screen bg-white-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-1xl md:text-2xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600 text-[15px]">Track and manage your orders</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
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
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm min-h-96">
          {currentOrders.length === 0 ? (
            <EmptyState type={activeTab === 'cancelledOrders' ? 'cancelled' : 'active'} />
          ) : (
            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {/* Only showing one order card as per request */}
                {currentOrders[0] && <OrderCard key={currentOrders[0].id} order={currentOrders[0]} />}
              </div>
            </div>
          )}
        </div>

        {/* Pagination for when there are orders */}
        {currentOrders.length > 0 && (
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-yellow-300 rounded-md hover:bg-yellow-50">
                Previous
              </button>
              <button className="px-3 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md">
                1
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-yellow-300 rounded-md hover:bg-yellow-50">
                2
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-yellow-300 rounded-md hover:bg-yellow-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={closeOrderDetails}
        />
      )}

      {/* Review Modal */}
      {showReviewModal && selectedOrder && selectedOrder.products[0] && (
        <ReviewModal
          onClose={() => setShowReviewModal(false)}
          productName={selectedOrder.products[0].name}
          productImage={selectedOrder.products[0].image}
        />
      )}
    </div>
  );
};

export default OrdersContent;