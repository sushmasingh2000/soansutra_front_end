// DeliveryAdminPanel.jsx

import React, { useState, useEffect } from 'react';

const DeliveryAdminPanel = ({ orders, setOrders, deliveryBoys, setDeliveryBoys, notifications, setNotifications, statuses, renderBoyManagement, renderOrders }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Status: All');
  const [distanceFilter, setDistanceFilter] = useState('Distance: All');
  const [boyName, setBoyName] = useState('');
  const [boyAvailability, setBoyAvailability] = useState('true');
  const [editBoyId, setEditBoyId] = useState(null);
  const [editBoyName, setEditBoyName] = useState('');
  const [editBoyAvailability, setEditBoyAvailability] = useState('true');
  const [modalOrderId, setModalOrderId] = useState(null);
  const [modalDistance, setModalDistance] = useState(null);
  const [modalSuggestion, setModalSuggestion] = useState('');
  const [localBoy, setLocalBoy] = useState('');
  const [thirdParty, setThirdParty] = useState('');
  const [awbNumber, setAwbNumber] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEditBoyModal, setShowEditBoyModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const addNotification = (message) => {
    setNotifications([...notifications, { message, timestamp: new Date().toLocaleTimeString() }]);
  };

  const dismissNotification = (index) => {
    const newNotifications = [...notifications];
    newNotifications.splice(index, 1);
    setNotifications(newNotifications);
  };

  const openAssignModal = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    setModalOrderId(order.id);
    setModalDistance(order.distance);
    setModalSuggestion(order.distance <= 3 ? 'Local Boy' : 'Third-Party');
    setShowAssignModal(true);
  };

  const confirmAssign = () => {
    if (!localBoy && !thirdParty) {
      alert('Please select a delivery option.');
      return;
    }
    if (thirdParty && !awbNumber) {
      alert('Please enter AWB number for third-party.');
      return;
    }
    const newOrders = orders.map((o) =>
      o.id === modalOrderId
        ? {
            ...o,
            assignee: localBoy ? `Local: ${localBoy}` : `Third-Party: ${thirdParty}`,
            awb: thirdParty ? awbNumber : '',
            status: 'Assigned',
          }
        : o
    );
    setOrders(newOrders);
    addNotification(`Order #${modalOrderId} assigned to ${localBoy || thirdParty}`);
    alert('Order assigned successfully!');
    setShowAssignModal(false);
    setLocalBoy('');
    setThirdParty('');
    setAwbNumber('');
  };

  const openEditBoyModal = (boyId) => {
    const boy = deliveryBoys.find((b) => b.id === boyId);
    setEditBoyId(boy.id);
    setEditBoyName(boy.name);
    setEditBoyAvailability(boy.available.toString());
    setShowEditBoyModal(true);
  };

  const saveEditBoy = () => {
    if (!editBoyName) {
      alert('Please enter a name.');
      return;
    }
    const newDeliveryBoys = deliveryBoys.map((b) =>
      b.id === editBoyId ? { ...b, name: editBoyName, available: editBoyAvailability === 'true' } : b
    );
    setDeliveryBoys(newDeliveryBoys);
    alert('Delivery boy updated!');
    setShowEditBoyModal(false);
  };

  const addBoy = () => {
    if (!boyName) {
      alert('Please enter a name.');
      return;
    }
    setDeliveryBoys([
      ...deliveryBoys,
      { id: Date.now(), name: boyName, available: boyAvailability === 'true' },
    ]);
    setBoyName('');
    alert('Delivery boy added!');
  };

  const deleteBoy = (boyId) => {
    if (window.confirm('Are you sure you want to delete this delivery boy?')) {
      setDeliveryBoys(deliveryBoys.filter((b) => b.id !== boyId));
      alert('Delivery boy deleted!');
    }
  };

  const updateStatus = (orderId, status) => {
    const newOrders = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(newOrders);
    addNotification(`Admin updated Order #${orderId} status to ${status}`);
    alert(`Status updated to ${status}`);
  };

  const filteredOrders = orders.filter((order) => {
    if (searchTerm && !order.id.toLowerCase().includes(searchTerm.toLowerCase()) && !order.customer.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (statusFilter !== 'Status: All' && order.status !== statusFilter) return false;
    if (distanceFilter !== 'Distance: All') {
      if (distanceFilter === '≤3km' && order.distance > 3) return false;
      if (distanceFilter === '>3km' && order.distance <= 3) return false;
    }
    return true;
  });

  return (
    <div className="block">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Order Management Dashboard</h1>
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
        </div>
      </div>
      {showNotifications && (
        <div className="mb-4 max-h-64 overflow-y-auto bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <div>
            {notifications.map((notif, index) => (
              <div key={index} className="notification p-2 bg-yellow-100 rounded mb-2 flex justify-between items-center">
                <p className="text-sm">{notif.message}</p>
                <button onClick={() => dismissNotification(index)} className="text-red-500 hover:text-red-700">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-around mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'boys' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('boys')}
        >
          Manage Boys
        </button>
      </div>
      {activeTab === 'orders' && (
        <div>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Search Order ID/Customer"
              className="border p-2 rounded w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select className="border p-2 rounded" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>Status: All</option>
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select className="border p-2 rounded" value={distanceFilter} onChange={(e) => setDistanceFilter(e.target.value)}>
              <option>Distance: All</option>
              <option>≤3km</option>
              <option>{'>3km'}</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOrders.map((order) => {
              let buttonsHTML = '';
              if (order.status === 'Ready to Dispatch') {
                buttonsHTML = (
                  <button onClick={() => openAssignModal(order.id)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                    Assign
                  </button>
                );
              } else if (order.assignee.startsWith('Third-Party:')) {
                buttonsHTML = (
                  <select
                    className="border p-1 rounded"
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                );
              }
              return (
                <div
                  key={order.id}
                  className={`bg-white p-4 rounded-lg shadow border-l-4 ${order.distance <= 3 ? 'border-green-500' : 'border-red-500'}`}
                >
                  <div className="flex">
                    <img src={order.image} alt={order.item} className="w-16 h-16 object-cover rounded mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        {order.item} - ₹{order.price}
                      </p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm text-gray-600">{order.address}</p>
                      <p className="text-sm font-medium">
                        Distance: {order.distance}km
                        <span
                          className={`ml-2 px-2 py-1 rounded text-white text-xs ${order.distance <= 3 ? 'bg-green-500' : 'bg-red-500'}`}
                        >
                          {order.distance <= 3 ? 'Local' : 'Third-Party'}
                        </span>
                      </p>
                      <p className="text-sm font-medium">Status: {order.status}</p>
                      {order.assignee && (
                        <p className="text-sm text-gray-600">
                          Assigned to: {order.assignee}
                          {order.awb ? ` (AWB: ${order.awb})` : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">{buttonsHTML}</div>
                  <div className="mt-2 flex space-x-2 timeline">
                    {statuses.map((s, i) => (
                      <div
                        key={s}
                        className={`${order.status === s || i < statuses.indexOf(order.status) ? 'bg-yellow-500' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {activeTab === 'boys' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Manage Delivery Boys</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Boy Name"
              className="border p-2 rounded mr-2"
              value={boyName}
              onChange={(e) => setBoyName(e.target.value)}
            />
            <select
              className="border p-2 rounded mr-2"
              value={boyAvailability}
              onChange={(e) => setBoyAvailability(e.target.value)}
            >
              <option value="true">Available</option>
              <option value="false">Busy</option>
            </select>
            <button onClick={addBoy} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Add Boy
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {deliveryBoys.map((boy) => (
              <div key={boy.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{boy.name}</h3>
                  <p className="text-sm text-gray-600">{boy.available ? 'Available' : 'Busy'}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => openEditBoyModal(boy.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteBoy(boy.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="modal active">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Assign Order #{modalOrderId}</h2>
            <p className="text-sm mb-2">Distance: {modalDistance}km</p>
            <p className="text-sm mb-4">Suggestion: {modalSuggestion}</p>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Assign To:</label>
              <select
                className="border p-2 rounded w-full"
                value={localBoy}
                onChange={(e) => {
                  setLocalBoy(e.target.value);
                  setThirdParty('');
                  setAwbNumber('');
                }}
              >
                <option value="">Select Local Boy</option>
                {deliveryBoys.map((boy) => (
                  <option key={boy.id} value={boy.name}>
                    {boy.name} ({boy.available ? 'Available' : 'Busy'})
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Or Third-Party:</label>
              <select
                className="border p-2 rounded w-full"
                value={thirdParty}
                onChange={(e) => {
                  setThirdParty(e.target.value);
                  setLocalBoy('');
                }}
              >
                <option value="">Select Third-Party</option>
                <option value="Ekart">Ekart</option>
                <option value="Bluedart">Bluedart</option>
              </select>
            </div>
            {thirdParty && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">AWB Number:</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Enter AWB Number"
                  value={awbNumber}
                  onChange={(e) => setAwbNumber(e.target.value)}
                />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowAssignModal(false)} className="px-4 py-2 bg-gray-200 rounded">
                Cancel
              </button>
              <button onClick={confirmAssign} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Boy Modal */}
      {showEditBoyModal && (
        <div className="modal active">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Delivery Boy</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name:</label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                value={editBoyName}
                onChange={(e) => setEditBoyName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Availability:</label>
              <select
                className="border p-2 rounded w-full"
                value={editBoyAvailability}
                onChange={(e) => setEditBoyAvailability(e.target.value)}
              >
                <option value="true">Available</option>
                <option value="false">Busy</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowEditBoyModal(false)} className="px-4 py-2 bg-gray-200 rounded">
                Cancel
              </button>
              <button onClick={saveEditBoy} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryAdminPanel;