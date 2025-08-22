
// import React, { useState } from 'react';
// import { User, Package, CreditCard, RefreshCcw, Calendar, Home, Gift, Ticket, Users, Award, Gem, Star, Lock, Trash2, ChevronRight, Menu, X } from 'lucide-react';
// import Footer from '../Footer1';
// import Header from '../Header1';
// import OrdersContent from '../orderscomponent';

// const ProfileDashboard = () => {
//   const [activeTab, setActiveTab] = useState('PROFILE');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Sidebar navigation items
//   const navigationItems = [
//     {
//       category: 'ORDERS',
//       items: [
//         { id: 'ORDERS_RETURNS', label: 'ORDERS AND RETURNS', icon: Package },
//         { id: 'PAYMENT', label: 'PAYMENT', icon: CreditCard },
//         { id: 'MANAGE_REFUNDS', label: 'MANAGE REFUNDS', icon: RefreshCcw }
//       ]
//     },
//     {
//       category: 'APPOINTMENTS',
//       items: [
//         { id: 'TRY_AT_HOME', label: 'TRY AT HOME', icon: Home }
//       ]
//     },
//     {
//       category: 'OFFERS',
//       items: [
//         { id: 'COUPONS', label: 'COUPONS', icon: Ticket }
//       ]
//     },
//     {
//       category: 'ACCOUNTS',
//       items: [
//         { id: 'PROFILE', label: 'PROFILE', icon: User }
//       ]
//     },
//     {
//       category: 'CREDITS',
//       items: [
//         { id: 'XCLUSIVE', label: 'XCLUSIVE', icon: Award },
//         { id: 'CARATLANE_EGOLD', label: 'CARATLANE eGold', icon: Gem },
//         { id: 'CARATLANE_TREASURE_CHEST', label: 'CARATLANE TREASURE CHEST', icon: Star }
//       ]
//     }
//   ];

//   // Profile data
//   const profileData = {
//     name: 'abhishek',
//     email: 'firefireprouser456@yahoo.com',
//     mobile: '7905140270',
//     pincode: '201308',
//     birthday: '-',
//     anniversary: '-',
//     occupation: '-',
//     spouseBirthday: '-'
//   };

//   // Handle navigation click for mobile
//   const handleNavClick = (tabId) => {
//     setActiveTab(tabId);
//     setIsMobileMenuOpen(false); // Close menu on mobile after selection
//   };

//   // Content components for each tab
//   const ProfileContent = () => (
//     <div className="p-3 md:p-6">
//       {/* Header Banner */}
//       <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4 flex items-center">
//         <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center mr-3">
//           <Gift className="w-5 h-5 text-purple-600" />
//         </div>
//         <div className="flex-1">
//           <h3 className="font-semibold text-gray-900 mb-1 text-sm">Complete your profile & get rewards!</h3>
//           <p className="text-xs text-gray-600">
//             Don't miss out on EXTRA discounts! Update your profile details now and get instant xClusive Points, and an Extra 5%* off during your Birthday and Anniversary months!
//           </p>
//           <p className="text-xs text-gray-500 mt-1">*TCA.</p>
//         </div>
//       </div>

//       {/* Profile Header */}
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <h2 className="text-base font-medium text-gray-900">Your Profile</h2>
//           <span className="text-purple-600 text-sm">60% Complete</span>
//         </div>
//         <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-xs">
//           Edit Profile
//         </button>
//       </div>

//       {/* Profile Details */}
//       <div className="bg-white rounded-lg border border-gray-200">
//         <div className="divide-y divide-gray-200">
//           {[
//             { label: 'NAME', value: profileData.name },
//             { label: 'EMAIL', value: profileData.email },
//             { label: 'MOBILE NO.', value: profileData.mobile },
//             { label: 'PINCODE', value: profileData.pincode },
//             { label: 'BIRTHDAY', value: profileData.birthday },
//             { label: 'ANNIVERSARY', value: profileData.anniversary },
//             { label: 'OCCUPATION', value: profileData.occupation },
//             { label: 'SPOUSE BIRTHDAY', value: profileData.spouseBirthday }
//           ].map((item, index) => (
//             <div key={index} className="px-3 py-3 flex justify-between items-center">
//               <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
//                 {item.label}
//               </span>
//               <span className="text-xs text-gray-900">
//                 {item.value}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end space-x-3 mt-4">
//         <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-xs">
//           Change Password
//         </button>
//         <button className="text-red-600 hover:text-red-700 px-4 py-2 font-medium transition-colors flex items-center text-xs">
//           <Trash2 className="w-3 h-3 mr-1" />
//           Delete My Account
//         </button>
//       </div>
//     </div>
//   );



//   const PaymentContent = () => (
//     <div className="p-3 md:p-6">
//       <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Methods</h2>
//       <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
//         <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//         <p className="text-gray-500 text-sm">No payment methods added</p>
//       </div>
//     </div>
//   );

//   const CouponsContent = () => (
//     <div className="p-3 md:p-6">
//       <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Coupons</h2>
//       <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
//         <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//         <p className="text-gray-500 text-sm">No coupons available</p>
//       </div>
//     </div>
//   );

//   // Function to render content based on active tab
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'PROFILE':
//         return <ProfileContent />;
//       case 'ORDERS_RETURNS':
//         return <OrdersContent/>;
//       case 'PAYMENT':
//         return <PaymentContent />;
//       case 'COUPONS':
//         return <CouponsContent />;
//       default:
//         return (
//           <div className="p-3 md:p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">
//               {navigationItems
//                 .flatMap(category => category.items)
//                 .find(item => item.id === activeTab)?.label || 'Content'}
//             </h2>
//             <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
//               <p className="text-gray-500 text-sm">Content for {activeTab} will be displayed here</p>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header1 Component */}
//       <Header/>
      
//       <div className="max-w-full mx-auto flex ">
//         {/* Sidebar - Always visible on desktop, toggleable on mobile */}
//         <div className={`
//           ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
//           md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 
//           w-80 bg-white border-r border-gray-200 min-w-screen 
//           transition-transform duration-300 ease-in-out
//         `}>
//           {/* Mobile Close Button */}
//           <div className="md:hidden flex justify-end p-3 border-b border-gray-200">
//             <button
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* User Info */}
//           <div className="p-3 border-b border-gray-200">
//             <h3 className="font-semibold text-gray-900 text-base">abhishek</h3>
//             <p className="text-xs text-gray-500">firefireprouser456@yahoo.com</p>
//             <button className="text-purple-600 hover:text-purple-700 text-xs mt-1 transition-colors">
//               Edit Profile
//             </button>
//           </div>

//           {/* Navigation */}
//           <div className="py-2">
//             {navigationItems.map((category) => (
//               <div key={category.category} className="mb-3">
//                 <h4 className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   {category.category}
//                 </h4>
//                 <nav className="space-y-0">
//                   {category.items.map((item) => {
//                     const Icon = item.icon;
//                     return (
//                       <button
//                         key={item.id}
//                         onClick={() => handleNavClick(item.id)}
//                         className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
//                           activeTab === item.id
//                             ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
//                             : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
//                         }`}
//                       >
//                         <div className="flex items-center">
//                           <Icon className="w-3 h-3 mr-2" />
//                           {item.label}
//                         </div>
//                         <ChevronRight className="w-3 h-3 text-gray-400" />
//                       </button>
//                     );
//                   })}
//                 </nav>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Backdrop for mobile */}
//         {isMobileMenuOpen && (
//           <div 
//             className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
//             onClick={() => setIsMobileMenuOpen(false)}
//           />
//         )}

//         {/* Main Content */}
//         <div className="flex-1 md:ml-0">
//           {/* Mobile Menu Button */}
//           <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
//             <button
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
//             >
//               <Menu className="w-5 h-5 mr-2" />
//               <span className="text-sm font-medium">Menu</span>
//             </button>
//             <h1 className="text-lg font-semibold text-gray-900">
//               {navigationItems
//                 .flatMap(category => category.items)
//                 .find(item => item.id === activeTab)?.label || 'Profile'}
//             </h1>
//           </div>
          
//           {renderContent()}
//         </div>
//       </div>

//       {/* Footer1 Component */}
//       <Footer/>
//     </div>
//   );
// };

// export default ProfileDashboard;
// import React, { useState } from 'react';
// import { 
//   User, Package, CreditCard, RefreshCcw, Calendar, Home, Gift, Ticket, 
//   Users, Award, Gem, Star, Lock, Trash2, ChevronRight, Menu, X, 
//   MapPin, Phone, Mail, Clock, CheckCircle, XCircle, AlertCircle,
//   Eye, Download, Plus, Minus
// } from 'lucide-react';

// const ProfileDashboard = () => {
//   const [activeTab, setActiveTab] = useState('PROFILE');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Sidebar navigation items
//   const navigationItems = [
//     {
//       category: 'ORDERS',
//       items: [
//         { id: 'ORDERS_RETURNS', label: 'ORDERS AND RETURNS', icon: Package },
//         { id: 'PAYMENT', label: 'PAYMENT', icon: CreditCard },
//         { id: 'MANAGE_REFUNDS', label: 'MANAGE REFUNDS', icon: RefreshCcw }
//       ]
//     },
//     {
//       category: 'APPOINTMENTS',
//       items: [
//         { id: 'TRY_AT_HOME', label: 'TRY AT HOME', icon: Home }
//       ]
//     },
//     {
//       category: 'OFFERS',
//       items: [
//         { id: 'COUPONS', label: 'COUPONS', icon: Ticket }
//       ]
//     },
//     {
//       category: 'ACCOUNTS',
//       items: [
//         { id: 'PROFILE', label: 'PROFILE', icon: User }
//       ]
//     },
//     {
//       category: 'CREDITS',
//       items: [
//         { id: 'XCLUSIVE', label: 'XCLUSIVE', icon: Award },
//         { id: 'CARATLANE_EGOLD', label: 'CARATLANE eGold', icon: Gem },
//         { id: 'CARATLANE_TREASURE_CHEST', label: 'CARATLANE TREASURE CHEST', icon: Star }
//       ]
//     }
//   ];

//   // Profile data
//   const profileData = {
//     name: 'abhishek',
//     email: 'firefireprouser456@yahoo.com',
//     mobile: '7905140270',
//     pincode: '201308',
//     birthday: '-',
//     anniversary: '-',
//     occupation: '-',
//     spouseBirthday: '-'
//   };

//   // Handle navigation click for mobile
//   const handleNavClick = (tabId) => {
//     setActiveTab(tabId);
//     setIsMobileMenuOpen(false);
//   };

//   // Profile Component
//   const ProfileContent = () => (
//     <div className="p-3 md:p-6">
//       <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4 flex items-center">
//         <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center mr-3">
//           <Gift className="w-5 h-5 text-purple-600" />
//         </div>
//         <div className="flex-1">
//           <h3 className="font-semibold text-gray-900 mb-1 text-sm">Complete your profile & get rewards!</h3>
//           <p className="text-xs text-gray-600">
//             Don't miss out on EXTRA discounts! Update your profile details now and get instant xClusive Points, and an Extra 5%* off during your Birthday and Anniversary months!
//           </p>
//           <p className="text-xs text-gray-500 mt-1">*TCA.</p>
//         </div>
//       </div>

//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <h2 className="text-base font-medium text-gray-900">Your Profile</h2>
//           <span className="text-purple-600 text-sm">60% Complete</span>
//         </div>
//         <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-xs">
//           Edit Profile
//         </button>
//       </div>

//       <div className="bg-white rounded-lg border border-gray-200">
//         <div className="divide-y divide-gray-200">
//           {[
//             { label: 'NAME', value: profileData.name },
//             { label: 'EMAIL', value: profileData.email },
//             { label: 'MOBILE NO.', value: profileData.mobile },
//             { label: 'PINCODE', value: profileData.pincode },
//             { label: 'BIRTHDAY', value: profileData.birthday },
//             { label: 'ANNIVERSARY', value: profileData.anniversary },
//             { label: 'OCCUPATION', value: profileData.occupation },
//             { label: 'SPOUSE BIRTHDAY', value: profileData.spouseBirthday }
//           ].map((item, index) => (
//             <div key={index} className="px-3 py-3 flex justify-between items-center">
//               <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
//                 {item.label}
//               </span>
//               <span className="text-xs text-gray-900">
//                 {item.value}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-end space-x-3 mt-4">
//         <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-xs">
//           Change Password
//         </button>
//         <button className="text-red-600 hover:text-red-700 px-4 py-2 font-medium transition-colors flex items-center text-xs">
//           <Trash2 className="w-3 h-3 mr-1" />
//           Delete My Account
//         </button>
//       </div>
//     </div>
//   );

//   // Orders and Returns Component
//   const OrdersReturnsContent = () => {
//     const orders = [
//       {
//         id: 'ORD123456',
//         date: '2024-01-15',
//         status: 'Delivered',
//         amount: '₹25,999',
//         items: 2,
//         statusColor: 'text-green-600'
//       },
//       {
//         id: 'ORD123457',
//         date: '2024-01-20',
//         status: 'In Transit',
//         amount: '₹15,499',
//         items: 1,
//         statusColor: 'text-blue-600'
//       },
//       {
//         id: 'ORD123458',
//         date: '2024-01-25',
//         status: 'Processing',
//         amount: '₹35,799',
//         items: 3,
//         statusColor: 'text-yellow-600'
//       }
//     ];

//     return (
//       <div className="p-3 md:p-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Orders & Returns</h2>
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-4">
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <h3 className="font-medium text-gray-900">Order #{order.id}</h3>
//                   <p className="text-sm text-gray-500">Placed on {order.date}</p>
//                 </div>
//                 <span className={`text-sm font-medium ${order.statusColor}`}>
//                   {order.status}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <div className="text-sm text-gray-600">
//                   {order.items} item(s) • {order.amount}
//                 </div>
//                 <div className="space-x-2">
//                   <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
//                     View Details
//                   </button>
//                   <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
//                     Track Order
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Payment Component
//   const PaymentContent = () => {
//     const paymentMethods = [
//       {
//         type: 'Credit Card',
//         number: '**** **** **** 1234',
//         expiry: '12/25',
//         isDefault: true
//       },
//       {
//         type: 'Debit Card',
//         number: '**** **** **** 5678',
//         expiry: '08/26',
//         isDefault: false
//       }
//     ];

//     return (
//       <div className="p-3 md:p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
//           <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
//             Add New Card
//           </button>
//         </div>
//         <div className="space-y-3">
//           {paymentMethods.map((method, index) => (
//             <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center">
//                   <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
//                   <div>
//                     <h3 className="font-medium text-gray-900">{method.type}</h3>
//                     <p className="text-sm text-gray-500">{method.number}</p>
//                     <p className="text-sm text-gray-500">Expires {method.expiry}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   {method.isDefault && (
//                     <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
//                       Default
//                     </span>
//                   )}
//                   <button className="text-gray-400 hover:text-gray-600">
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Manage Refunds Component
//   const ManageRefundsContent = () => {
//     const refunds = [
//       {
//         id: 'REF001',
//         orderNumber: 'ORD123456',
//         amount: '₹5,999',
//         status: 'Processed',
//         date: '2024-01-18',
//         estimatedDate: '2024-01-20'
//       },
//       {
//         id: 'REF002',
//         orderNumber: 'ORD123455',
//         amount: '₹12,499',
//         status: 'Pending',
//         date: '2024-01-22',
//         estimatedDate: '2024-01-25'
//       }
//     ];

//     return (
//       <div className="p-3 md:p-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Manage Refunds</h2>
//         <div className="space-y-4">
//           {refunds.map((refund) => (
//             <div key={refund.id} className="bg-white rounded-lg border border-gray-200 p-4">
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <h3 className="font-medium text-gray-900">Refund #{refund.id}</h3>
//                   <p className="text-sm text-gray-500">Order: {refund.orderNumber}</p>
//                   <p className="text-sm text-gray-500">Initiated on {refund.date}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium text-gray-900">{refund.amount}</p>
//                   <span className={`text-sm ${refund.status === 'Processed' ? 'text-green-600' : 'text-yellow-600'}`}>
//                     {refund.status}
//                   </span>
//                 </div>
//               </div>
//               <div className="text-sm text-gray-600">
//                 Estimated completion: {refund.estimatedDate}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Try at Home Component
//   const TryAtHomeContent = () => {
//     const appointments = [
//       {
//         id: 'APT001',
//         date: '2024-02-15',
//         time: '3:00 PM - 4:00 PM',
//         status: 'Confirmed',
//         items: 3,
//         address: 'Home Address'
//       },
//       {
//         id: 'APT002',
//         date: '2024-02-20',
//         time: '11:00 AM - 12:00 PM',
//         status: 'Pending',
//         items: 2,
//         address: 'Office Address'
//       }
//     ];

//     return (
//       <div className="p-3 md:p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-900">Try at Home</h2>
//           <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
//             Book Appointment
//           </button>
//         </div>
//         <div className="space-y-4">
//           {appointments.map((appointment) => (
//             <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-4">
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <h3 className="font-medium text-gray-900">Appointment #{appointment.id}</h3>
//                   <div className="flex items-center mt-1 text-sm text-gray-500">
//                     <Calendar className="w-4 h-4 mr-1" />
//                     {appointment.date} • {appointment.time}
//                   </div>
//                   <div className="flex items-center mt-1 text-sm text-gray-500">
//                     <MapPin className="w-4 h-4 mr-1" />
//                     {appointment.address}
//                   </div>
//                 </div>
//                 <span className={`text-sm font-medium ${appointment.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
//                   {appointment.status}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">{appointment.items} items selected</span>
//                 <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Coupons Component
//   const CouponsContent = () => {
//     const coupons = [
//       {
//         code: 'SAVE20',
//         title: '20% OFF on Diamond Jewelry',
//         description: 'Valid on purchases above ₹50,000',
//         expiry: '2024-03-31',
//         isActive: true
//       },
//       {
//         code: 'FIRST15',
//         title: '15% OFF First Purchase',
//         description: 'For new customers only',
//         expiry: '2024-02-28',
//         isActive: true
//       },
//       {
//         code: 'BIRTHDAY10',
//         title: '10% Birthday Special',
//         description: 'Valid during birthday month',
//         expiry: '2024-12-31',
//         isActive: false
//       }
//     ];

//     return (
//       <div className="p-3 md:p-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Coupons</h2>
//         <div className="space-y-4">
//           {coupons.map((coupon, index) => (
//             <div key={index} className={`bg-white rounded-lg border-2 p-4 ${coupon.isActive ? 'border-purple-200' : 'border-gray-200 opacity-60'}`}>
//               <div className="flex justify-between items-start mb-2">
//                 <div className="flex items-center">
//                   <Ticket className="w-5 h-5 text-purple-600 mr-2" />
//                   <span className="font-mono font-bold text-lg text-purple-600">{coupon.code}</span>
//                 </div>
//                 {coupon.isActive && (
//                   <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium">
//                     Apply
//                   </button>
//                 )}
//               </div>
//               <h3 className="font-medium text-gray-900 mb-1">{coupon.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">{coupon.description}</p>
//               <p className="text-xs text-gray-500">Expires on {coupon.expiry}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Xclusive Component
//   const XclusiveContent = () => {
//     const xclusiveData = {
//       points: 2450,
//       tier: 'Gold',
//       nextTier: 'Platinum',
//       pointsToNext: 550,
//       benefits: [
//         'Early access to sales',
//         'Free shipping on all orders',
//         'Priority customer support',
//         'Exclusive member discounts'
//       ]
//     };

//     return (
//       <div className="p-3 md:p-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Xclusive Rewards</h2>
        
//         {/* Points Summary */}
//         <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-4 text-white mb-4">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-semibold">Your Points</h3>
//             <Award className="w-6 h-6" />
//           </div>
//           <div className="text-2xl font-bold mb-1">{xclusiveData.points.toLocaleString()}</div>
//           <div className="text-sm opacity-90">Current Tier: {xclusiveData.tier}</div>
//         </div>

//         {/* Progress to Next Tier */}
//         <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm font-medium text-gray-700">Progress to {xclusiveData.nextTier}</span>
//             <span className="text-sm text-gray-500">{xclusiveData.pointsToNext} points needed</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div className="bg-purple-600 h-2 rounded-full" style={{width: '82%'}}></div>
//           </div>
//         </div>

//         {/* Benefits */}
//         <div className="bg-white rounded-lg border border-gray-200 p-4">
//           <h4 className="font-medium text-gray-900 mb-3">Your Benefits</h4>
//           <div className="space-y-2">
//             {xclusiveData.benefits.map((benefit, index) => (
//               <div key={index} className="flex items-center">
//                 <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
//                 <span className="text-sm text-gray-700">{benefit}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // CaratLane eGold Component
//   const EGoldContent = () => {
//     const eGoldData = {
//       balance: 2.5,
//       value: 15750,
//       transactions: [
//         { type: 'Purchase', amount: 1.0, value: 6300, date: '2024-01-15' },
//         { type: 'Purchase', amount: 1.5, value: 9450, date: '2024-01-20' },
//         { type: 'Redemption', amount: -0.5, value: -3150, date: '2024-01-25' }
//       ]
//     };

//     return (
//       <div className="p-3 md:p-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">CaratLane eGold</h2>
        
//         {/* Balance Card */}
//         <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 text-white mb-4">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-semibold">eGold Balance</h3>
//             <Gem className="w-6 h-6" />
//           </div>
//           <div className="text-2xl font-bold mb-1">{eGoldData.balance}g</div>
//           <div className="text-sm opacity-90">Worth ₹{eGoldData.value.toLocaleString()}</div>
//         </div>

//         {/* Action Buttons */}
//         <div className="grid grid-cols-2 gap-3 mb-4">
//           <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium">
//             Buy eGold
//           </button>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
//             Redeem eGold
//           </button>
//         </div>

//         {/* Transaction History */}
//         <div className="bg-white rounded-lg border border-gray-200 p-4">
//           <h4 className="font-medium text-gray-900 mb-3">Recent Transactions</h4>
//           <div className="space-y-3">
//             {eGoldData.transactions.map((transaction, index) => (
//               <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
//                 <div>
//                   <span className="text-sm font-medium text-gray-900">{transaction.type}</span>
//                   <div className="text-xs text-gray-500">{transaction.date}</div>
//                 </div>
//                 <div className="text-right">
//                   <div className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                     {transaction.amount > 0 ? '+' : ''}{transaction.amount}g
//                   </div>
//                   <div className="text-xs text-gray-500">₹{Math.abs(transaction.value).toLocaleString()}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Treasure Chest Component
//   const TreasureChestContent = () => {
//     const treasureData = {
//       totalValue: 45000,
//       items: [
//         { name: 'Diamond Ring', value: 25000, addedDate: '2024-01-10' },
//         { name: 'Gold Necklace', value: 15000, addedDate: '2024-01-15' },
//         { name: 'Silver Bracelet', value: 5000, addedDate: '2024-01-20' }
//       ],
//       recommendations: [
//         { name: 'Matching Earrings', price: 8500 },
//         { name: 'Pendant Set', price: 12000 }
//       ]
//     };

//     return (
//       <div className="p-3 md:p-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">Treasure Chest</h2>
        
//         {/* Total Value */}
//         <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg p-4 text-white mb-4">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-semibold">Total Collection Value</h3>
//             <Star className="w-6 h-6" />
//           </div>
//           <div className="text-2xl font-bold">₹{treasureData.totalValue.toLocaleString()}</div>
//           <div className="text-sm opacity-90">{treasureData.items.length} items in collection</div>
//         </div>

//         {/* Your Items */}
//         <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
//           <h4 className="font-medium text-gray-900 mb-3">Your Treasures</h4>
//           <div className="space-y-3">
//             {treasureData.items.map((item, index) => (
//               <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
//                 <div>
//                   <span className="text-sm font-medium text-gray-900">{item.name}</span>
//                   <div className="text-xs text-gray-500">Added on {item.addedDate}</div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-sm font-medium text-gray-900">₹{item.value.toLocaleString()}</div>
//                   <button className="text-xs text-purple-600 hover:text-purple-700">View</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recommendations */}
//         <div className="bg-white rounded-lg border border-gray-200 p-4">
//           <h4 className="font-medium text-gray-900 mb-3">Recommended for You</h4>
//           <div className="space-y-3">
//             {treasureData.recommendations.map((item, index) => (
//               <div key={index} className="flex justify-between items-center py-2">
//                 <span className="text-sm text-gray-900">{item.name}</span>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm font-medium text-gray-900">₹{item.price.toLocaleString()}</span>
//                   <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs">
//                     Add
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Function to render content based on active tab
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'PROFILE':
//         return <ProfileContent />;
//       case 'ORDERS_RETURNS':
//         return <OrdersReturnsContent />;
//       case 'PAYMENT':
//         return <PaymentContent />;
//       case 'MANAGE_REFUNDS':
//         return <ManageRefundsContent />;
//       case 'TRY_AT_HOME':
//         return <TryAtHomeContent />;
//       case 'COUPONS':
//         return <CouponsContent />;
//       case 'XCLUSIVE':
//         return <XclusiveContent />;
//       case 'CARATLANE_EGOLD':
//         return <EGoldContent />;
//       case 'CARATLANE_TREASURE_CHEST':
//         return <TreasureChestContent />;
//       default:
//         return (
//           <div className="p-3 md:p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">
//               {navigationItems
//                 .flatMap(category => category.items)
//                 .find(item => item.id === activeTab)?.label || 'Content'}
//             </h2>
//             <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
//               <p className="text-gray-500 text-sm">Content for {activeTab} will be displayed here</p>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-full mx-auto flex">
//         {/* Sidebar - Always visible on desktop, toggleable on mobile */}
//         <div className={`
//           ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
//           md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 
//           w-80 bg-white border-r border-gray-200 min-w-screen 
//           transition-transform duration-300 ease-in-out
//         `}>
//           {/* Mobile Close Button */}
//           <div className="md:hidden flex justify-end p-3 border-b border-gray-200">
//             <button
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* User Info */}
//           <div className="p-3 border-b border-gray-200">
//             <h3 className="font-semibold text-gray-900 text-base">abhishek</h3>
//             <p className="text-xs text-gray-500">firefireprouser456@yahoo.com</p>
//             <button className="text-purple-600 hover:text-purple-700 text-xs mt-1 transition-colors">
//               Edit Profile
//             </button>
//           </div>

//           {/* Navigation */}
//           <div className="py-2">
//             {navigationItems.map((category) => (
//               <div key={category.category} className="mb-3">
//                 <h4 className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   {category.category}
//                 </h4>
//                 <nav className="space-y-0">
//                   {category.items.map((item) => {
//                     const Icon = item.icon;
//                     return (
//                       <button
//                         key={item.id}
//                         onClick={() => handleNavClick(item.id)}
//                         className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
//                           activeTab === item.id
//                             ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
//                             : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
//                         }`}
//                       >
//                         <div className="flex items-center">
//                           <Icon className="w-3 h-3 mr-2" />
//                           {item.label}
//                         </div>
//                         <ChevronRight className="w-3 h-3 text-gray-400" />
//                       </button>
//                     );
//                   })}
//                 </nav>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Backdrop for mobile */}
//         {isMobileMenuOpen && (
//           <div 
//             className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
//             onClick={() => setIsMobileMenuOpen(false)}
//           />
//         )}

//         {/* Main Content */}
//         <div className="flex-1 md:ml-0">
//           {/* Mobile Menu Button */}
//           <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
//             <button
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
//             >
//               <Menu className="w-5 h-5 mr-2" />
//               <span className="text-sm font-medium">Menu</span>
//             </button>
//             <h1 className="text-lg font-semibold text-gray-900">
//               {navigationItems
//                 .flatMap(category => category.items)
//                 .find(item => item.id === activeTab)?.label || 'Profile'}
//             </h1>
//           </div>
          
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;

import React, { useState } from 'react';
import { 
  User, Package, CreditCard, RefreshCcw, Calendar, Home, Gift, Ticket, 
  Users, Award, Gem, Star, Lock, Trash2, ChevronRight, Menu, X, 
  MapPin, Phone, Mail, Clock, CheckCircle, XCircle, AlertCircle,
  Eye, Download, Plus, Minus
} from 'lucide-react';

// Import your separate components here
import ProfileContent from '../profilecontent';
import OrdersContent from '../orderscomponent';
import PaymentContent from '../paymentcontent';
import ManageRefundsContent from '../managerefundcontent';
import TryAtHomeContent from '../tryathomecontent';
import CouponsContent from '../coupnscontent';
import XclusiveContent from '../xclusivecontent';
import EGoldContent from '../egoldcontent';
import TreasureChestContent from '../treasurechestcontent';
import Header1 from '../Header1';
import Footer from '../Footer1';

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState('PROFILE');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sidebar navigation items
  const navigationItems = [
    {
      category: 'ORDERS',
      items: [
        { id: 'ORDERS_RETURNS', label: 'ORDERS AND RETURNS', icon: Package },
        { id: 'PAYMENT', label: 'PAYMENT', icon: CreditCard },
        { id: 'MANAGE_REFUNDS', label: 'MANAGE REFUNDS', icon: RefreshCcw }
      ]
    },
    {
      category: 'APPOINTMENTS',
      items: [
        { id: 'TRY_AT_HOME', label: 'TRY AT HOME', icon: Home }
      ]
    },
    {
      category: 'OFFERS',
      items: [
        { id: 'COUPONS', label: 'COUPONS', icon: Ticket }
      ]
    },
    {
      category: 'ACCOUNTS',
      items: [
        { id: 'PROFILE', label: 'PROFILE', icon: User }
      ]
    },
    {
      category: 'CREDITS',
      items: [
        { id: 'XCLUSIVE', label: 'XCLUSIVE', icon: Award },
        { id: 'CARATLANE_EGOLD', label: 'CARATLANE eGold', icon: Gem },
        { id: 'CARATLANE_TREASURE_CHEST', label: 'CARATLANE TREASURE CHEST', icon: Star }
      ]
    }
  ];

  // Profile data
  const profileData = {
    name: 'abhishek',
    email: 'firefireprouser456@yahoo.com',
    mobile: '7905140270',
    pincode: '201308',
    birthday: '-',
    anniversary: '-',
    occupation: '-',
    spouseBirthday: '-'
  };

  // Handle navigation click for mobile
  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'PROFILE':
        return <ProfileContent />;
      case 'ORDERS_RETURNS':
        return <OrdersContent/>;
      case 'PAYMENT':
        return <PaymentContent />;
      case 'MANAGE_REFUNDS':
        return <ManageRefundsContent />;
      case 'TRY_AT_HOME':
        return <TryAtHomeContent />;
      case 'COUPONS':
        return <CouponsContent />;
      case 'XCLUSIVE':
        return <XclusiveContent />;
      case 'CARATLANE_EGOLD':
        return <EGoldContent />;
      case 'CARATLANE_TREASURE_CHEST':
        return <TreasureChestContent />;
      default:
        return (
          <div className="p-3 md:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {navigationItems
                .flatMap(category => category.items)
                .find(item => item.id === activeTab)?.label || 'Content'}
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-gray-500 text-sm">Content for {activeTab} will be displayed here</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header1 />
      
      <div className="max-w-full mx-auto flex">
        {/* Sidebar - Always visible on desktop, toggleable on mobile */}
        <div className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 
          w-80 bg-white border-r border-gray-200 min-w-screen 
          transition-transform duration-300 ease-in-out
        `}>
          {/* Mobile Close Button */}
          <div className="md:hidden flex justify-end p-3 border-b border-gray-200">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-base">{profileData.name}</h3>
            <p className="text-xs text-gray-500">{profileData.email}</p>
            <button className="text-purple-600 hover:text-purple-700 text-xs mt-1 transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Navigation */}
          <div className="py-2">
            {navigationItems.map((category) => (
              <div key={category.category} className="mb-3">
                <h4 className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {category.category}
                </h4>
                <nav className="space-y-0">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                          activeTab === item.id
                            ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <div className="flex items-center">
                          <Icon className="w-3 h-3 mr-2" />
                          {item.label}
                        </div>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Backdrop for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 md:ml-0">
          {/* Mobile Menu Button */}
          <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Menu className="w-5 h-5 mr-2" />
              <span className="text-[16px] font-medium">Menu</span>
            </button>
            <h1 className="text-xs font-semibold text-gray-900">
              {navigationItems
                .flatMap(category => category.items)
                .find(item => item.id === activeTab)?.label || 'Profile'}
            </h1>
          </div>
          
          {renderContent()}
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default ProfileDashboard;