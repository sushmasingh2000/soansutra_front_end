
import React, { useState } from 'react';
import { Package, Calendar, MapPin, CreditCard, X, Truck, CheckCircle } from 'lucide-react';
import { useQuery } from 'react-query';
import { endpoint } from '../utils/APIRoutes';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';

const OrdersContent = () => {
  const [activeTab, setActiveTab] = useState('myOrders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const { data } = useQuery(
    ["order"],
    () => apiConnectorGet(endpoint.get_order),
    usequeryBoolean
  );

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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <p className="text-sm text-gray-600">Order #{order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Order Status */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
              <span className="text-sm text-gray-600">
                Ordered on {new Date(order.date).toLocaleDateString()}
              </span>
            </div>

            {order.status === 'Shipped' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">On the way</span>
                </div>
                <p className="text-sm text-blue-700">
                  Tracking: {order.trackingNumber}
                </p>
                <p className="text-sm text-blue-700">
                  Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>
            )}

            {order.status === 'Delivered' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">Delivered</span>
                </div>
                <p className="text-sm text-green-700">
                  Delivered on {new Date(order.deliveredDate).toLocaleDateString()}
                </p>
              </div>
            )}

            {order.status === 'Processing' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-900">Processing</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Your order is being prepared for shipment
                </p>
              </div>
            )}
          </div>

          {/* Products */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Items in this order</h3>
            <div className="space-y-4">
              {products.map((product, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-lg text-gray-900">${order.total}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                  <p className="text-sm text-gray-600">{order.address}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
                <div className="flex items-start gap-2">
                  <CreditCard className="w-4 h-4 text-gray-500 mt-1" />
                  <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                </div>
              </div>
            </div>

            {order.orderNotes && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Order Notes</h3>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{order.orderNotes}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3">
              {order.trackingNumber && (
                <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Track Package
                </button>
              )}
              <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

    const EmptyState = ({ type }) => (
      <div className="flex flex-col items-center justify-center py-12 md:py-20">
        <div className="relative mb-6">
          <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-purple-300 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 md:w-12 md:h-12 text-purple-400" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
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
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 md:px-8 md:py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors">
          Continue Shopping
        </button>
      </div>
    );

    const OrderCard = ({ order }) => (
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow">
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
              className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              View Details
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              Track Order
            </button>
          </div>
        </div>
      </div>
    );

    const currentOrders = activeTab === 'myOrders' ? order_api : cancelledOrders;

    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
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
                  ? 'bg-gray-50 text-gray-900 border-b-2 border-purple-500'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                MY ORDERS
                {order_api.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-purple-500 rounded-full">
                    {order_api.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('cancelledOrders')}
                className={`flex-1 px-4 md:px-6 py-4 text-sm md:text-base font-medium rounded-r-lg transition-colors ${activeTab === 'cancelledOrders'
                  ? 'bg-gray-50 text-gray-900 border-b-2 border-purple-500'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
                  {currentOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pagination for when there are orders */}
          {currentOrders.length > 0 && (
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md">
                  1
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
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
      </div>
    );
  };

  export default OrdersContent;