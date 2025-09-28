import React, { useState } from 'react';
import DeliveryAdminPanel from '../deliverymangementadmin';
import DeliveryBoyPanel from '../deliveryboy';

const DeliveryApp = () => {
  const [view, setView] = useState('admin'); // 'admin' or 'boy'
  const [orders, setOrders] = useState([
    // Your mock orders array here (copy from original code)
  ]);
  const [deliveryBoys, setDeliveryBoys] = useState([
    // Your mock deliveryBoys array here
  ]);
  const [notifications, setNotifications] = useState([]);
  const statuses = [ // Copy statuses array from original
    "Ready to Dispatch", "Assigned", "Dispatched", "Ready to Shipped", "Shipped", "Out for Delivery", "Delivered"
  ];
  const currentBoy = "Amit Kumar"; // Hardcoded as in original

  const addNotification = (message) => {
    setNotifications([...notifications, { message, timestamp: new Date().toLocaleTimeString() }]);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-center space-x-4 p-4 bg-white shadow mb-4">
        <button
          className={`px-4 py-2 rounded ${view === 'admin' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setView('admin')}
        >
          Admin Panel
        </button>
        <button
          className={`px-4 py-2 rounded ${view === 'boy' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setView('boy')}
        >
          Delivery Boy
        </button>
      </div>
      {view === 'admin' && (
        <DeliveryAdminPanel
          orders={orders}
          setOrders={setOrders}
          deliveryBoys={deliveryBoys}
          setDeliveryBoys={setDeliveryBoys}
          notifications={notifications}
          setNotifications={setNotifications}
          statuses={statuses}
        />
      )}
      {view === 'boy' && (
        <DeliveryBoyPanel
          orders={orders}
          setOrders={setOrders}
          statuses={statuses}
          currentBoy={currentBoy}
          addNotification={addNotification}
        />
      )}
    </div>
  );
};

export default DeliveryApp;