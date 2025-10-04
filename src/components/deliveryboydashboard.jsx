import React, { useContext, useState } from 'react';
import DeliveryContext from '../context/DeliveryContext';

const DeliveryBoyDashboard = () => {
  const { orders, setOrders, addNotification, statuses, currentBoy } = useContext(DeliveryContext);

  const [activeTab, setActiveTab] = useState('orders');
  const [isUpdateLocationModalOpen, setIsUpdateLocationModalOpen] = useState(false);
  const [modalOrder, setModalOrder] = useState(null);
  const [orderLocation, setOrderLocation] = useState('');

  const localOrders = orders.filter((o) => o.assignee === `Local: ${currentBoy}`);

  const acceptOrder = (orderId) => {
    const updatedOrders = orders.map((o) => (o.id === orderId ? { ...o, status: 'Dispatched' } : o));
    setOrders(updatedOrders);
    addNotification(`Order #${orderId} accepted and dispatched by ${currentBoy}`);
    alert('Order accepted!');
  };

  const rejectOrder = (orderId) => {
    const reason = prompt('Enter reject reason:');
    if (reason) {
      const updatedOrders = orders.map((o) =>
        o.id === orderId ? { ...o, status: 'Ready to Dispatch', assignee: '', awb: '' } : o
      );
      setOrders(updatedOrders);
      addNotification(`Order #${orderId} rejected by ${currentBoy}: ${reason}`);
      alert(`Order rejected: ${reason}`);
    }
  };

  const updateBoyStatus = (orderId, status) => {
    if (status === 'Delivered') {
      const otp = prompt('Enter OTP for delivery:');
      if (!otp) return;
      addNotification(`Order #${orderId} delivered by ${currentBoy} with OTP`);
      alert('Order delivered with OTP verification!');
    } else {
      addNotification(`Order #${orderId} status updated to ${status} by ${currentBoy}`);
      alert(`Status updated to ${status}`);
    }
    const updatedOrders = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updatedOrders);
  };

  const openUpdateLocationModal = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    setModalOrder(order);
    setOrderLocation(order.currentLocation || '');
    setIsUpdateLocationModalOpen(true);
  };

  const confirmLocationUpdate = () => {
    if (!orderLocation) {
      alert('Please enter a location.');
      return;
    }
    const updatedOrders = orders.map((o) =>
      o.id === modalOrder.id ? { ...o, currentLocation: orderLocation } : o
    );
    setOrders(updatedOrders);
    addNotification(`Order #${modalOrder.id} location updated to ${orderLocation} by ${currentBoy}`);
    alert('Location updated!');
    setIsUpdateLocationModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Delivery Boy Dashboard</h1>
      <div className="flex justify-around mb-4">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        >
          My Orders
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        >
          Profile
        </button>
      </div>

      {activeTab === 'orders' && (
        <div>
          {localOrders.length === 0 ? (
            <p className="text-center text-gray-600">No assigned orders.</p>
          ) : (
            localOrders.map((order) => (
              <div key={order.id} className="bg-white p-4 rounded-lg shadow mb-4">
                <div className="flex">
                  <img src={order.image} alt={order.item} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.item} - ₹{order.price}</p>
                    <p className="text-sm text-gray-600">{order.address}</p>
                    <p className="text-sm text-gray-600">Distance: {order.distance}km</p>
                    <p className="text-sm font-medium">Status: {order.status}</p>
                    {order.currentLocation && <p className="text-sm text-gray-600">Current Location: {order.currentLocation}</p>}
                  </div>
                </div>
                {order.status === 'Assigned' ? (
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => acceptOrder(order.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectOrder(order.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-col space-y-2">
                    <select
                      onChange={(e) => updateBoyStatus(order.id, e.target.value)}
                      className="border p-1 rounded w-full"
                      value={order.status}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => openUpdateLocationModal(order.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Update Location
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="text-sm">Name: Amit Kumar</p>
          <p className="text-sm">Orders Completed: 15</p>
          <p className="text-sm">Earnings: ₹750</p>
          <label className="flex items-center space-x-2 mt-4">
            <input type="checkbox" defaultChecked />
            <span>Available for Orders</span>
          </label>
        </div>
      )}

      {isUpdateLocationModalOpen && modalOrder && (
        <div className="modal active">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Order Location for #{modalOrder.id}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Current Location:</label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Enter current location/address"
                value={orderLocation}
                onChange={(e) => setOrderLocation(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setIsUpdateLocationModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">
                Cancel
              </button>
              <button onClick={confirmLocationUpdate} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryBoyDashboard;