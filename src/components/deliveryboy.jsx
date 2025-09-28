// DeliveryBoyPanel.jsx

import React, { useState } from 'react';

const DeliveryBoyPanel = ({ orders, setOrders, statuses, currentBoy, addNotification }) => {
  const [activeTab, setActiveTab] = useState('orders');

  const acceptOrder = (orderId) => {
    const newOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: 'Dispatched' } : o
    );
    setOrders(newOrders);
    addNotification(`Order #${orderId} accepted and dispatched by ${currentBoy}`);
    alert('Order accepted!');
  };

  const rejectOrder = (orderId) => {
    const reason = prompt('Enter reject reason:');
    if (reason) {
      const newOrders = orders.map((o) =>
        o.id === orderId ? { ...o, status: 'Ready to Dispatch', assignee: '', awb: '' } : o
      );
      setOrders(newOrders);
      addNotification(`Order #${orderId} rejected by ${currentBoy}: ${reason}`);
      alert(`Order rejected: ${reason}`);
    }
  };

  const updateBoyStatus = (orderId, status) => {
    const newOrders = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(newOrders);
    if (status === 'Delivered') {
      const otp = prompt('Enter OTP for delivery:');
      if (otp) {
        addNotification(`Order #${orderId} delivered by ${currentBoy} with OTP`);
        alert('Order delivered with OTP verification!');
      }
    } else {
      addNotification(`Order #${orderId} status updated to ${status} by ${currentBoy}`);
      alert(`Status updated to ${status}`);
    }
  };

  const localOrders = orders.filter((o) => o.assignee === `Local: ${currentBoy}`);

  return (
    <div className="hidden" id="boyPanel">
      <h1 className="text-2xl font-bold mb-4">Delivery Boy Dashboard</h1>
      <div className="flex justify-around mb-4">
        <button
          className={`tabBtn px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders
        </button>
        <button
          className={`tabBtn px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </div>
      {activeTab === 'orders' && (
        <div className="tabContent block">
          <div id="boyOrderList">
            {localOrders.length === 0 ? (
              <p className="text-center text-gray-600">No assigned orders.</p>
            ) : (
              localOrders.map((order) => (
                <div key={order.id} className="bg-white p-4 rounded-lg shadow mb-4">
                  <div className="flex">
                    <img src={order.image} alt={order.item} className="w-16 h-16 object-cover rounded mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        {order.item} - ₹{order.price}
                      </p>
                      <p className="text-sm text-gray-600">{order.address}</p>
                      <p className="text-sm text-gray-600">Distance: {order.distance}km</p>
                      <p className="text-sm font-medium">Status: {order.status}</p>
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
                    <div className="mt-4">
                      <select
                        className="border p-1 rounded w-full"
                        value={order.status}
                        onChange={(e) => updateBoyStatus(order.id, e.target.value)}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {activeTab === 'profile' && (
        <div className="tabContent hidden">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Profile</h2>
            <p className="text-sm">Name: Amit Kumar</p>
            <p className="text-sm">Orders Completed: 15</p>
            <p className="text-sm">Earnings: ₹750</p>
            <label className="flex items-center space-x-2 mt-4">
              <input type="checkbox" checked />
              <span>Available for Orders</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryBoyPanel;