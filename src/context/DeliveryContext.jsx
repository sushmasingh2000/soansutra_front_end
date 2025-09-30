// src/context/DeliveryContext.jsx
import React, { createContext, useState } from 'react';

export const DeliveryContext = createContext();

export const DeliveryProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: "1234",
      customer: "Priya Sharma",
      item: "Gold Necklace",
      price: 5000,
      address: "123, MG Road, Mumbai",
      distance: 2.5,
      status: "Ready to Dispatch",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png",
      assignee: "",
      awb: ""
    },
    {
      id: "1235",
      customer: "Rahul Verma",
      item: "Diamond Ring",
      price: 15000,
      address: "456, Park Street, Delhi",
      distance: 5.0,
      status: "Ready to Dispatch",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png",
      assignee: "",
      awb: ""
    },
    {
      id: "1236",
      customer: "John Doe",
      item: "Silver Bracelet",
      price: 3000,
      address: "789, Elm St, Bangalore",
      distance: 1.5,
      status: "Assigned",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelets.png",
      assignee: "Local: Amit Kumar",
      awb: ""
    },
    {
      id: "1237",
      customer: "Jane Smith",
      item: "Pearl Earrings",
      price: 2000,
      address: "101, Oak Ave, Chennai",
      distance: 4.0,
      status: "Dispatched",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/earrings.png",
      assignee: "Third-Party: Ekart",
      awb: "AWB12345"
    },
    {
      id: "1238",
      customer: "Alice Johnson",
      item: "Gold Ring",
      price: 10000,
      address: "202, Pine Rd, Hyderabad",
      distance: 2.0,
      status: "Ready to Shipped",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/rings.png",
      assignee: "Local: Suresh Yadav",
      awb: ""
    },
    {
      id: "1239",
      customer: "Bob Brown",
      item: "Diamond Pendant",
      price: 20000,
      address: "303, Maple Ln, Kolkata",
      distance: 6.0,
      status: "Shipped",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/pendants.png",
      assignee: "Third-Party: Bluedart",
      awb: "AWB67890"
    },
    {
      id: "1240",
      customer: "Charlie Davis",
      item: "Sapphire Necklace",
      price: 15000,
      address: "404, Birch Blvd, Pune",
      distance: 3.5,
      status: "Out for Delivery",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/necklace.png",
      assignee: "Third-Party: Ekart",
      awb: "AWB11223"
    },
    {
      id: "1241",
      customer: "David Evans",
      item: "Emerald Bracelet",
      price: 8000,
      address: "505, Cedar Way, Ahmedabad",
      distance: 2.8,
      status: "Delivered",
      image: "https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/02/top-categories/01/bracelets.png",
      assignee: "Local: Amit Kumar",
      awb: ""
    }
  ]);

  const [deliveryBoys, setDeliveryBoys] = useState([
    { id: Date.now() + 1, name: "Amit Kumar", available: true },
    { id: Date.now() + 2, name: "Suresh Yadav", available: false },
  ]);

  const [notifications, setNotifications] = useState([]);

  const currentBoy = "Amit Kumar";

  const statuses = [
    "Ready to Dispatch",
    "Assigned",
    "Dispatched",
    "Ready to Shipped",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ];

  const addNotification = (message) => {
    setNotifications([...notifications, { message, timestamp: new Date().toLocaleTimeString() }]);
  };

  const dismissNotification = (index) => {
    const newNotifications = [...notifications];
    newNotifications.splice(index, 1);
    setNotifications(newNotifications);
  };

  const updateOrder = (updatedOrder) => {
    setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  const addBoy = (name, available) => {
    if (!name) return;
    setDeliveryBoys([...deliveryBoys, { id: Date.now(), name, available }]);
  };

  const updateBoy = (updatedBoy) => {
    setDeliveryBoys(deliveryBoys.map(b => b.id === updatedBoy.id ? updatedBoy : b));
  };

  const deleteBoy = (boyId) => {
    setDeliveryBoys(deliveryBoys.filter(b => b.id !== boyId));
  };

  return (
    <DeliveryContext.Provider value={{
      orders,
      setOrders,
      deliveryBoys,
      setDeliveryBoys,
      notifications,
      addNotification,
      dismissNotification,
      currentBoy,
      statuses,
      updateOrder,
      addBoy,
      updateBoy,
      deleteBoy
    }}>
      {children}
    </DeliveryContext.Provider>
  );
};