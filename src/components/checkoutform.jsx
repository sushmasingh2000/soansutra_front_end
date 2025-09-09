
// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faStore, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// const CheckoutForm = () => {
//   const [deliveryType, setDeliveryType] = useState('home');
//   const [showSelectModal, setShowSelectModal] = useState(false);
//   const [showAddEditModal, setShowAddEditModal] = useState(false);
//   const [showDateModal, setShowDateModal] = useState(false);
//   const [editingAddress, setEditingAddress] = useState(null);
//   const [selectedAddress, setSelectedAddress] = useState(0);
//   const [useDifferentBilling, setUseDifferentBilling] = useState(false);
//   const [estDelivery, setEstDelivery] = useState('17th Sep');
//   const [selectedDates, setSelectedDates] = useState({0: '17', 1: '10'});
//   const [billingAddress, setBillingAddress] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     landmark: '',
//     city: '',
//     pincode: '',
//     state: 'State',
//     country: 'India',
//     mobile: '',
//   });
//   const [addresses, setAddresses] = useState([
//     {
//       id: 0,
//       firstName: 'abhishek',
//       lastName: 'chaursia',
//       address: 'BETA 1 C-120, Gautam Buddh Nagar',
//       landmark: '',
//       city: 'Gautam Buddh Nagar',
//       pincode: '201308',
//       state: 'Uttar Pradesh',
//       country: 'India',
//       mobile: '7905140270',
//       type: 'Home',
//     },
//   ]);

//   const [newAddress, setNewAddress] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     landmark: '',
//     city: '',
//     pincode: '',
//     state: 'State',
//     country: 'India',
//     mobile: '',
//     type: 'Home',
//   });

//   const indianStates = [
//     'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
//     'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa',
//     'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand',
//     'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra',
//     'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
//     'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
//     'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
//   ];

//   const countries = [
//     'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
//     'Germany', 'France', 'Japan', 'China', 'Brazil'
//   ];

//   const mockProducts = [
//     {
//       name: 'Design 1 Future Gemstone Ring',
//       image: 'placeholder-image-url-1',
//       dates: ['17', '18', '19', '20', '23', '24', '25', '26', '27', '30']
//     },
//     {
//       name: 'Design 2 Oceanic Blue Gemstone Ring',
//       image: 'placeholder-image-url-2',
//       dates: ['10', '11', '12', '13', '16', '17', '18', '19', '20', '23']
//     }
//   ];

//   const handleDeliveryTypeChange = (type) => {
//     setDeliveryType(type);
//   };

//   const openSelectModal = () => {
//     setShowSelectModal(true);
//   };

//   const closeSelectModal = () => {
//     setShowSelectModal(false);
//   };

//   const openAddEditModal = (address = null) => {
//     if (address) {
//       setNewAddress(address);
//       setEditingAddress(address);
//     } else {
//       setNewAddress({
//         firstName: '',
//         lastName: '',
//         address: '',
//         landmark: '',
//         city: '',
//         pincode: '',
//         state: 'State',
//         country: 'India',
//         mobile: '',
//         type: 'Home',
//       });
//       setEditingAddress(null);
//     }
//     setShowAddEditModal(true);
//     setShowSelectModal(false);
//   };

//   const closeAddEditModal = () => {
//     setShowAddEditModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBillingInputChange = (e) => {
//     const { name, value } = e.target;
//     setBillingAddress((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddressTypeChange = (type) => {
//     setNewAddress((prev) => ({ ...prev, type }));
//   };

//   const saveAddress = () => {
//     if (editingAddress) {
//       const updatedAddresses = addresses.map((addr) =>
//         addr.id === editingAddress.id ? { ...newAddress, id: addr.id } : addr
//       );
//       setAddresses(updatedAddresses);
//     } else {
//       const newId = addresses.length;
//       setAddresses([...addresses, { ...newAddress, id: newId }]);
//       setSelectedAddress(newId);
//     }
//     closeAddEditModal();
//   };

//   const deleteAddress = (id) => {
//     const updatedAddresses = addresses.filter((addr) => addr.id !== id);
//     setAddresses(updatedAddresses);
//     if (selectedAddress === id && updatedAddresses.length > 0) {
//       setSelectedAddress(updatedAddresses[0].id);
//     } else if (updatedAddresses.length === 0) {
//       setSelectedAddress(-1);
//     }
//   };

//   const selectAddress = (id) => {
//     setSelectedAddress(id);
//   };

//   const toggleBillingAddress = () => {
//     setUseDifferentBilling(!useDifferentBilling);
//   };

//   const openDateModal = () => {
//     setShowDateModal(true);
//   };

//   const closeDateModal = () => {
//     setShowDateModal(false);
//   };

//   const handleDateSelect = (index, date) => {
//     setSelectedDates((prev) => ({ ...prev, [index]: date }));
//   };

//   const confirmDate = () => {
//     const maxDate = Math.max(...Object.values(selectedDates));
//     setEstDelivery(`${maxDate}th Sep`);
//     closeDateModal();
//   };

//   const handleSaveContinue = () => {
//     console.log('Save & Continue clicked');
//     onSaveContinue(); // Call the callback to update parent state
//   };

//   const hasAddress = addresses.length > 0 && selectedAddress >= 0;
//   const currentAddress = hasAddress ? addresses.find(addr => addr.id === selectedAddress) : {};

//   const addressButtonText = hasAddress ? 'CHANGE OR ADD ADDRESS' : 'ADD ADDRESS';

//   const handleAddressButtonClick = () => {
//     if (hasAddress) {
//       openSelectModal();
//     } else {
//       openAddEditModal();
//     }
//   };

//   return (
//     <div className="w-full flex justify-center items-start min-h-screen bg-white p-4 overflow-y-auto no-scrollbar">
//       <div className="w-full max-w-xl bg-white  p-6">
//         <div className="flex justify-center space-x-2 mb-4">
//           <button
//             className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
//               deliveryType === 'home' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
//             }`}
//             onClick={() => handleDeliveryTypeChange('home')}
//           >
//             <FontAwesomeIcon icon={faHome} className="mr-1" />
//             HOME DELIVERY
//           </button>
//           <button
//             className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
//               deliveryType === 'store' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
//             }`}
//             onClick={() => handleDeliveryTypeChange('store')}
//           >
//             <FontAwesomeIcon icon={faStore} className="mr-1" />
//             STORE PICK-UP
//           </button>
//         </div>

//         {deliveryType === 'home' && (
//           <div>
//             <div className="bg-purple-50 p-4 rounded-lg mb-6">
//               <h3 className="font-semibold mb-2">Shipping Address</h3>
//               {hasAddress ? (
//                 <>
//                   <p className="text-sm text-gray-600">
//                     Est. Delivery {estDelivery}{' '}
//                     <span className="text-purple-600 cursor-pointer" onClick={openDateModal}>
//                       CHANGE DATE
//                     </span>
//                   </p>
//                   <p className="font-medium">
//                     {currentAddress.firstName} {currentAddress.lastName} ({currentAddress.type})
//                   </p>
//                   <p className="text-sm">
//                     {currentAddress.address}, {currentAddress.city}, {currentAddress.state},{' '}
//                     {currentAddress.pincode}, {currentAddress.country}
//                   </p>
//                   <p className="text-sm">Mobile: +91 {currentAddress.mobile}</p>
//                 </>
//               ) : null}
//               <button
//                 className="w-full bg-gray-200 py-2 rounded-lg mt-2 text-gray-800"
//                 onClick={handleAddressButtonClick}
//               >
//                 {addressButtonText}
//               </button>
//             </div>

//             <div className="bg-purple-50 p-4 rounded-lg mb-6">
//               <h3 className="font-semibold mb-2">Billing Address</h3>
//               <label className="flex items-center mb-2">
//                 <input type="radio" checked={!useDifferentBilling} onChange={toggleBillingAddress} className="mr-2 accent-purple-600" />
//                 Same as shipping address
//               </label>
//               <label className="flex items-center mb-2">
//                 <input type="radio" checked={useDifferentBilling} onChange={toggleBillingAddress} className="mr-2 accent-purple-600" />
//                 Use a different billing address
//               </label>
//               <p className="text-xs text-gray-500 mt-2">We will not send an invoice to the shipping address</p>
//               {useDifferentBilling && (
//                 <div className="mt-4 space-y-2">
//                   <div className="flex space-x-2">
//                     <input
//                       name="firstName"
//                       value={billingAddress.firstName}
//                       onChange={handleBillingInputChange}
//                       className="w-1/2 p-2 border rounded-lg"
//                       placeholder="First Name"
//                     />
//                     <input
//                       name="lastName"
//                       value={billingAddress.lastName}
//                       onChange={handleBillingInputChange}
//                       className="w-1/2 p-2 border rounded-lg"
//                       placeholder="Last Name"
//                     />
//                   </div>
//                   <input
//                     name="address"
//                     value={billingAddress.address}
//                     onChange={handleBillingInputChange}
//                     className="w-full p-2 border rounded-lg"
//                     placeholder="Address (Flat No./House No./Street, Area)"
//                   />
//                   <input
//                     name="landmark"
//                     value={billingAddress.landmark}
//                     onChange={handleBillingInputChange}
//                     className="w-full p-2 border rounded-lg"
//                     placeholder="Landmark (Optional)"
//                   />
//                   <div className="flex space-x-2">
//                     <input
//                       name="city"
//                       value={billingAddress.city}
//                       onChange={handleBillingInputChange}
//                       className="w-1/2 p-2 border rounded-lg"
//                       placeholder="City"
//                     />
//                     <input
//                       name="pincode"
//                       value={billingAddress.pincode}
//                       onChange={handleBillingInputChange}
//                       className="w-1/2 p-2 border rounded-lg"
//                       placeholder="Pincode"
//                     />
//                   </div>
//                   <div className="flex space-x-2">
//                     <select
//                       name="state"
//                       value={billingAddress.state}
//                       onChange={handleBillingInputChange}
//                       className="w-1/2 p-2 border rounded-lg"
//                     >
//                       <option>State</option>
//                       {indianStates.map((state) => (
//                         <option key={state} value={state}>{state}</option>
//                       ))}
//                     </select>
//                     <select
//                       name="country"
//                       value={billingAddress.country}
//                       onChange={handleBillingInputChange}
//                       className="w-1/2 p-2 border rounded-lg"
//                     >
//                       {countries.map((country) => (
//                         <option key={country} value={country}>{country}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="flex">
//                     <span className="p-2 border-r border-gray-300 bg-gray-50 text-gray-500">+91</span>
//                     <input
//                       name="mobile"
//                       value={billingAddress.mobile}
//                       onChange={handleBillingInputChange}
//                       className="w-full p-2 border rounded-lg"
//                       placeholder="Mobile Number"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {deliveryType === 'store' && (
//           <div>
//             <div className="bg-purple-50 p-4 rounded-lg mb-6">
//               <h3 className="font-semibold mb-2">Find the nearest store for pick up</h3>
//               <input
//                 className="w-full p-2 border rounded-lg mb-2"
//                 placeholder="201308"
//               />
//               <p className="text-sm text-gray-600">
//                 Pickup Available by 17th Sep{' '}
//                 <span className="text-purple-600 cursor-pointer">GET DIRECTIONS</span>
//               </p>
//               <p className="font-medium">Gaur City Mall</p>
//               <p className="text-sm">GF/05, Gaur City Mall, Sector 4</p>
//               <p className="text-sm">Mobile: 7290018877</p>
//               <button className="w-full bg-gray-200 py-2 rounded-lg mt-2 text-gray-800">
//                 CHANGE PICKUP POINT
//               </button>
//             </div>

//             <div className="bg-purple-50 p-4 rounded-lg mb-6">
//               <h3 className="font-semibold mb-2">Billing Address</h3>
//               <div className="mt-4 space-y-2">
//                 <div className="flex space-x-2">
//                   <input className="w-1/2 p-2 border rounded-lg" placeholder="First Name" />
//                   <input className="w-1/2 p-2 border rounded-lg" placeholder="Last Name" />
//                 </div>
//                 <input
//                   className="w-full p-2 border rounded-lg"
//                   placeholder="Address (Flat No./House No./Street, Area)"
//                 />
//                 <input
//                   className="w-full p-2 border rounded-lg"
//                   placeholder="Landmark (Optional)"
//                 />
//                 <div className="flex space-x-2">
//                   <input className="w-1/2 p-2 border rounded-lg" placeholder="City" />
//                   <input className="w-1/2 p-2 border rounded-lg" placeholder="Pincode" />
//                 </div>
//                 <div className="flex space-x-2">
//                   <select className="w-1/2 p-2 border rounded-lg">
//                     <option>State</option>
//                     {indianStates.map((state) => (
//                       <option key={state} value={state}>{state}</option>
//                     ))}
//                   </select>
//                   <select className="w-1/2 p-2 border rounded-lg">
//                     {countries.map((country) => (
//                       <option key={country} value={country}>{country}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="flex">
//                   <span className="p-2 border-r border-gray-300 bg-gray-50 text-gray-500">+91</span>
//                   <input
//                     className="w-full p-2 border rounded-lg"
//                     placeholder="Mobile Number"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <button
//           className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg font-semibold"
//           onClick={handleSaveContinue}
//         >
//           SAVE & CONTINUE
//         </button>
//       </div>

//       {/* Select Address Modal */}
//       {showSelectModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-start justify-end z-50">
//           <div
//             className="bg-white w-full md:w-1/3 h-auto max-h-[80vh] md:max-h-full rounded-t-lg md:rounded-lg shadow-lg overflow-y-auto
//             transition-transform duration-300 ease-in-out transform translate-y-0 md:translate-y-0 md:right-0 md:top-0 md:bottom-0 md:h-screen"
//           >
//             <div className="flex justify-between items-center p-4 border-b">
//               <h2 className="font-semibold">Select Address</h2>
//               <button onClick={closeSelectModal} className="text-gray-600">
//                 ×
//               </button>
//             </div>
//             <div className="p-4">
//               <button
//                 className="w-full bg-gray-200 py-2 rounded-lg mb-4 text-gray-800"
//                 onClick={() => openAddEditModal()}
//               >
//                 ADD NEW ADDRESS
//               </button>
//               {addresses.length > 0 && <h3 className="font-semibold mb-2">Currently Selected</h3>}
//               {addresses.map((addr) => (
//                 <div key={addr.id} className="mb-4 border rounded-lg p-3">
//                   <label className="flex items-center mb-2">
//                     <input
//                       type="radio"
//                       checked={selectedAddress === addr.id}
//                       onChange={() => selectAddress(addr.id)}
//                       className="mr-2 accent-purple-600"
//                     />
//                     {addr.firstName} {addr.lastName} ({addr.type})
//                   </label>
//                   <p className="text-sm">
//                     {addr.address}, {addr.city}, {addr.state}, {addr.pincode}, {addr.country}
//                   </p>
//                   <p className="text-sm">Mobile: +91 {addr.mobile}</p>
//                   <div className="flex justify-end space-x-2 mt-2">
//                     <button
//                       className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg"
//                       onClick={() => deleteAddress(addr.id)}
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                     <button
//                       className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg"
//                       onClick={() => openAddEditModal(addr)}
//                     >
//                       <FontAwesomeIcon icon={faEdit} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="p-4 border-t">
//               <button
//                 className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg"
//                 onClick={closeSelectModal}
//               >
//                 CONFIRM
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add/Edit Address Modal */}
//       {showAddEditModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-start justify-end z-50">
//           <div
//             className="bg-white w-full md:w-1/3 h-auto max-h-[80vh] md:max-h-full rounded-t-lg md:rounded-lg shadow-lg overflow-y-auto
//             transition-transform duration-300 ease-in-out transform translate-y-0 md:translate-y-0 md:right-0 md:top-0 md:bottom-0 md:h-screen"
//           >
//             <div className="flex justify-between items-center p-4 border-b">
//               <h2 className="font-semibold">{editingAddress ? 'Edit Address' : 'Add Address'}</h2>
//               <button onClick={closeAddEditModal} className="text-gray-600">
//                 ×
//               </button>
//             </div>
//             <div className="p-4 space-y-4">
//               <h3 className="font-semibold">Contact Details</h3>
//               <div className="flex space-x-2">
//                 <input
//                   name="firstName"
//                   value={newAddress.firstName}
//                   onChange={handleInputChange}
//                   className="w-1/2 p-2 border rounded-lg"
//                   placeholder="First Name"
//                 />
//                 <input
//                   name="lastName"
//                   value={newAddress.lastName}
//                   onChange={handleInputChange}
//                   className="w-1/2 p-2 border rounded-lg"
//                   placeholder="Last Name"
//                 />
//               </div>
//               <div className="flex">
//                 <span className="p-2 border-r border-gray-300 bg-gray-50 text-gray-500">+91</span>
//                 <input
//                   name="mobile"
//                   value={newAddress.mobile}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-lg"
//                   placeholder="Mobile Number"
//                 />
//               </div>

//               <h3 className="font-semibold">Shipping Address</h3>
//               <input
//                 name="address"
//                 value={newAddress.address}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-lg"
//                 placeholder="Address (Flat No./House No./Street, Area)"
//               />
//               <input
//                 name="landmark"
//                 value={newAddress.landmark}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-lg"
//                 placeholder="Landmark (Optional)"
//               />
//               <div className="flex space-x-2">
//                 <input
//                   name="city"
//                   value={newAddress.city}
//                   onChange={handleInputChange}
//                   className="w-1/2 p-2 border rounded-lg"
//                   placeholder="City"
//                 />
//                 <input
//                   name="pincode"
//                   value={newAddress.pincode}
//                   onChange={handleInputChange}
//                   className="w-1/2 p-2 border rounded-lg"
//                   placeholder="Pincode"
//                 />
//               </div>
//               <div className="flex space-x-2">
//                 <select
//                   name="state"
//                   value={newAddress.state}
//                   onChange={handleInputChange}
//                   className="w-1/2 p-2 border rounded-lg"
//                 >
//                   <option>State</option>
//                   {indianStates.map((state) => (
//                     <option key={state} value={state}>{state}</option>
//                   ))}
//                 </select>
//                 <select
//                   name="country"
//                   value={newAddress.country}
//                   onChange={handleInputChange}
//                   className="w-1/2 p-2 border rounded-lg"
//                 >
//                   {countries.map((country) => (
//                     <option key={country} value={country}>{country}</option>
//                   ))}
//                 </select>
//               </div>

//               <h3 className="font-semibold">Address Type</h3>
//               <div className="flex space-x-2">
//                 <button
//                   className={`px-4 py-2 rounded-lg ${
//                     newAddress.type === 'Home' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
//                   }`}
//                   onClick={() => handleAddressTypeChange('Home')}
//                 >
//                   Home (7am-10pm)
//                 </button>
//                 <button
//                   className={`px-4 py-2 rounded-lg ${
//                     newAddress.type === 'Office' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
//                   }`}
//                   onClick={() => handleAddressTypeChange('Office')}
//                 >
//                   Office (10am-7pm)
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500">
//                 Preferences will help us plan your delivery. However, shipments can sometimes arrive early or later than
//                 planned.
//               </p>
//             </div>
//             <div className="p-4 border-t">
//               <button
//                 className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg"
//                 onClick={saveAddress}
//               >
//                 SAVE ADDRESS
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Change Date Modal */}
//       {showDateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-start justify-end z-50">
//           <div
//             className="bg-white w-full md:w-1/3 h-auto max-h-[80vh] md:max-h-full rounded-t-lg md:rounded-lg shadow-lg overflow-y-auto
//             transition-transform duration-300 ease-in-out transform translate-y-0 md:translate-y-0 md:right-0 md:top-0 md:bottom-0 md:h-screen no-scrollbar"
//           >
//             <div className="flex justify-between items-center p-4 border-b">
//               <h2 className="font-semibold">Change Delivery Date</h2>
//               <button onClick={closeDateModal} className="text-gray-600">
//                 ×
//               </button>
//             </div>
//             <div className="p-4 space-y-4">
//               {mockProducts.map((product, index) => (
//                 <div key={index} className="bg-white rounded-lg p-3">
//                   <div className="flex items-center mb-2">
//                     <img src={product.image} alt={product.name} className="w-16 h-16 mr-3 rounded" />
//                     <p className="font-medium">{product.name}</p>
//                   </div>
//                   <p className="text-sm mb-2">Select preferred delivery date</p>
//                   <div className="overflow-x-auto no-scrollbar">
//                     <div className="flex space-x-2">
//                       {product.dates.map((date, idx) => (
//                         <button
//                           key={idx}
//                           className={`px-4 py-2 rounded-lg min-w-[50px] ${
//                             selectedDates[index] === date ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
//                           }`}
//                           onClick={() => handleDateSelect(index, date)}
//                         >
//                           {date}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="p-4 border-t">
//               <button
//                 className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg"
//                 onClick={confirmDate}
//               >
//                 CONFIRM
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckoutForm;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStore, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const CheckoutForm = ({ onSaveContinue, className }) => {
  const [deliveryType, setDeliveryType] = useState('home');
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const [estDelivery, setEstDelivery] = useState('17th Sep');
  const [selectedDates, setSelectedDates] = useState({ 0: '17', 1: '10' });
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    state: 'State',
    country: 'India',
    mobile: '',
  });
  const [addresses, setAddresses] = useState([
    {
      id: 0,
      firstName: 'abhishek',
      lastName: 'chaursia',
      address: 'BETA 1 C-120, Gautam Buddh Nagar',
      landmark: '',
      city: 'Gautam Buddh Nagar',
      pincode: '201308',
      state: 'Uttar Pradesh',
      country: 'India',
      mobile: '7905140270',
      type: 'Home',
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    state: 'State',
    country: 'India',
    mobile: '',
    type: 'Home',
  });

  const indianStates = [
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand',
    'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
    'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const countries = [
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
    'Germany', 'France', 'Japan', 'China', 'Brazil'
  ];

  const mockProducts = [
    {
      name: 'Design 1 Future Gemstone Ring',
      image: 'placeholder-image-url-1',
      dates: ['17', '18', '19', '20', '23', '24', '25', '26', '27', '30']
    },
    {
      name: 'Design 2 Oceanic Blue Gemstone Ring',
      image: 'placeholder-image-url-2',
      dates: ['10', '11', '12', '13', '16', '17', '18', '19', '20', '23']
    }
  ];

  const handleDeliveryTypeChange = (type) => {
    setDeliveryType(type);
  };

  const openSelectModal = () => {
    setShowSelectModal(true);
  };

  const closeSelectModal = () => {
    setShowSelectModal(false);
  };

  const openAddEditModal = (address = null) => {
    if (address) {
      setNewAddress(address);
      setEditingAddress(address);
    } else {
      setNewAddress({
        firstName: '',
        lastName: '',
        address: '',
        landmark: '',
        city: '',
        pincode: '',
        state: 'State',
        country: 'India',
        mobile: '',
        type: 'Home',
      });
      setEditingAddress(null);
    }
    setShowAddEditModal(true);
    setShowSelectModal(false);
  };

  const closeAddEditModal = () => {
    setShowAddEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingInputChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressTypeChange = (type) => {
    setNewAddress((prev) => ({ ...prev, type }));
  };

  const saveAddress = () => {
    if (editingAddress) {
      const updatedAddresses = addresses.map((addr) =>
        addr.id === editingAddress.id ? { ...newAddress, id: addr.id } : addr
      );
      setAddresses(updatedAddresses);
    } else {
      const newId = addresses.length;
      setAddresses([...addresses, { ...newAddress, id: newId }]);
      setSelectedAddress(newId);
    }
    closeAddEditModal();
  };

  const deleteAddress = (id) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== id);
    setAddresses(updatedAddresses);
    if (selectedAddress === id && updatedAddresses.length > 0) {
      setSelectedAddress(updatedAddresses[0].id);
    } else if (updatedAddresses.length === 0) {
      setSelectedAddress(-1);
    }
  };

  const selectAddress = (id) => {
    setSelectedAddress(id);
  };

  const toggleBillingAddress = () => {
    setUseDifferentBilling(!useDifferentBilling);
  };

  const openDateModal = () => {
    setShowDateModal(true);
  };

  const closeDateModal = () => {
    setShowDateModal(false);
  };

  const handleDateSelect = (index, date) => {
    setSelectedDates((prev) => ({ ...prev, [index]: date }));
  };

  const confirmDate = () => {
    const maxDate = Math.max(...Object.values(selectedDates));
    setEstDelivery(`${maxDate}th Sep`);
    closeDateModal();
  };

  const handleSaveContinue = () => {
    // Basic validation
    if (deliveryType === 'home' && (!currentAddress.firstName || !currentAddress.address || !currentAddress.mobile)) {
      alert('Please fill in all required shipping address fields.');
      return;
    }
    if (deliveryType === 'store' && !document.querySelector('input[placeholder="201308"]').value) {
      alert('Please enter a valid pincode for store pickup.');
      return;
    }
    if (useDifferentBilling && (!billingAddress.firstName || !billingAddress.address || !billingAddress.mobile)) {
      alert('Please fill in all required billing address fields.');
      return;
    }
    console.log('Save & Continue clicked');
    if (onSaveContinue) {
      onSaveContinue(); // Call the callback to update parent state
    }
  };

  const hasAddress = addresses.length > 0 && selectedAddress >= 0;
  const currentAddress = hasAddress ? addresses.find(addr => addr.id === selectedAddress) : {};

  const addressButtonText = hasAddress ? 'CHANGE OR ADD ADDRESS' : 'ADD ADDRESS';

  const handleAddressButtonClick = () => {
    if (hasAddress) {
      openSelectModal();
    } else {
      openAddEditModal();
    }
  };

  return (
    <div className={`w-full flex justify-center items-start min-h-screen bg-white p-4 overflow-y-auto no-scrollbar ${className}`}>
      <div className="w-full max-w-xl bg-white p-6">
        <div className="flex justify-center space-x-2 mb-4">
          <button
            className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
              deliveryType === 'home' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleDeliveryTypeChange('home')}
          >
            <FontAwesomeIcon icon={faHome} className="mr-1" />
            HOME DELIVERY
          </button>
          <button
            className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
              deliveryType === 'store' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleDeliveryTypeChange('store')}
          >
            <FontAwesomeIcon icon={faStore} className="mr-1" />
            STORE PICK-UP
          </button>
        </div>

        {deliveryType === 'home' && (
          <div>
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              {hasAddress ? (
                <>
                  <p className="text-sm text-gray-600">
                    Est. Delivery {estDelivery}{' '}
                    <span className="text-purple-600 cursor-pointer" onClick={openDateModal}>
                      CHANGE DATE
                    </span>
                  </p>
                  <p className="font-medium">
                    {currentAddress.firstName} {currentAddress.lastName} ({currentAddress.type})
                  </p>
                  <p className="text-sm">
                    {currentAddress.address}, {currentAddress.city}, {currentAddress.state},{' '}
                    {currentAddress.pincode}, {currentAddress.country}
                  </p>
                  <p className="text-sm">Mobile: +91 {currentAddress.mobile}</p>
                </>
              ) : null}
              <button
                className="w-full bg-gray-200 py-2 rounded-lg mt-2 text-gray-800"
                onClick={handleAddressButtonClick}
              >
                {addressButtonText}
              </button>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Billing Address</h3>
              <label className="flex items-center mb-2">
                <input type="radio" checked={!useDifferentBilling} onChange={toggleBillingAddress} className="mr-2 accent-purple-600" />
                Same as shipping address
              </label>
              <label className="flex items-center mb-2">
                <input type="radio" checked={useDifferentBilling} onChange={toggleBillingAddress} className="mr-2 accent-purple-600" />
                Use a different billing address
              </label>
              <p className="text-xs text-gray-500 mt-2">We will not send an invoice to the shipping address</p>
              {useDifferentBilling && (
                <div className="mt-4 space-y-2">
                  <div className="flex space-x-2">
                    <input
                      name="firstName"
                      value={billingAddress.firstName}
                      onChange={handleBillingInputChange}
                      className="w-1/2 p-2 border rounded-lg"
                      placeholder="First Name"
                    />
                    <input
                      name="lastName"
                      value={billingAddress.lastName}
                      onChange={handleBillingInputChange}
                      className="w-1/2 p-2 border rounded-lg"
                      placeholder="Last Name"
                    />
                  </div>
                  <input
                    name="address"
                    value={billingAddress.address}
                    onChange={handleBillingInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Address (Flat No./House No./Street, Area)"
                  />
                  <input
                    name="landmark"
                    value={billingAddress.landmark}
                    onChange={handleBillingInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Landmark (Optional)"
                  />
                  <div className="flex space-x-2">
                    <input
                      name="city"
                      value={billingAddress.city}
                      onChange={handleBillingInputChange}
                      className="w-1/2 p-2 border rounded-lg"
                      placeholder="City"
                    />
                    <input
                      name="pincode"
                      value={billingAddress.pincode}
                      onChange={handleBillingInputChange}
                      className="w-1/2 p-2 border rounded-lg"
                      placeholder="Pincode"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <select
                      name="state"
                      value={billingAddress.state}
                      onChange={handleBillingInputChange}
                      className="w-1/2 p-2 border rounded-lg"
                    >
                      <option>State</option>
                      {indianStates.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <select
                      name="country"
                      value={billingAddress.country}
                      onChange={handleBillingInputChange}
                      className="w-1/2 p-2 border rounded-lg"
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex">
                    <span className="p-2 border-r border-gray-300 bg-gray-50 text-gray-500">+91</span>
                    <input
                      name="mobile"
                      value={billingAddress.mobile}
                      onChange={handleBillingInputChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Mobile Number"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {deliveryType === 'store' && (
          <div>
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Find the nearest store for pick up</h3>
              <input
                className="w-full p-2 border rounded-lg mb-2"
                placeholder="201308"
              />
              <p className="text-sm text-gray-600">
                Pickup Available by 17th Sep{' '}
                <span className="text-purple-600 cursor-pointer">GET DIRECTIONS</span>
              </p>
              <p className="font-medium">Gaur City Mall</p>
              <p className="text-sm">GF/05, Gaur City Mall, Sector 4</p>
              <p className="text-sm">Mobile: 7290018877</p>
              <button className="w-full bg-gray-200 py-2 rounded-lg mt-2 text-gray-800">
                CHANGE PICKUP POINT
              </button>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Billing Address</h3>
              <div className="mt-4 space-y-2">
                <div className="flex space-x-2">
                  <input className="w-1/2 p-2 border rounded-lg" placeholder="First Name" />
                  <input className="w-1/2 p-2 border rounded-lg" placeholder="Last Name" />
                </div>
                <input
                  className="w-full p-2 border rounded-lg"
                  placeholder="Address (Flat No./House No./Street, Area)"
                />
                <input
                  className="w-full p-2 border rounded-lg"
                  placeholder="Landmark (Optional)"
                />
                <div className="flex space-x-2">
                  <input className="w-1/2 p-2 border rounded-lg" placeholder="City" />
                  <input className="w-1/2 p-2 border rounded-lg" placeholder="Pincode" />
                </div>
                <div className="flex space-x-2">
                  <select className="w-1/2 p-2 border rounded-lg">
                    <option>State</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <select className="w-1/2 p-2 border rounded-lg">
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div className="flex">
                  <span className="p-2 border-r border-gray-300 bg-gray-50 text-gray-500">+91</span>
                  <input
                    className="w-full p-2 border rounded-lg"
                    placeholder="Mobile Number"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg font-semibold"
          onClick={handleSaveContinue}
        >
          SAVE & CONTINUE
        </button>
      </div>

      {/* Select Address Modal */}
      {showSelectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-start justify-end z-50">
          <div
            className="bg-white w-full md:w-1/3 h-auto max-h-[80vh] md:max-h-full rounded-t-lg md:rounded-lg shadow-lg overflow-y-auto
            transition-transform duration-300 ease-in-out transform translate-y-0 md:translate-y-0 md:right-0 md:top-0 md:bottom-0 md:h-screen"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold">Select Address</h2>
              <button onClick={closeSelectModal} className="text-gray-600">
                ×
              </button>
            </div>
            <div className="p-4">
              <button
                className="w-full bg-gray-200 py-2 rounded-lg mb-4 text-gray-800"
                onClick={() => openAddEditModal()}
              >
                ADD NEW ADDRESS
              </button>
              {addresses.length > 0 && <h3 className="font-semibold mb-2">Currently Selected</h3>}
              {addresses.map((addr) => (
                <div key={addr.id} className="mb-4 border rounded-lg p-3">
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      checked={selectedAddress === addr.id}
                      onChange={() => selectAddress(addr.id)}
                      className="mr-2 accent-purple-600"
                    />
                    {addr.firstName} {addr.lastName} ({addr.type})
                  </label>
                  <p className="text-sm">
                    {addr.address}, {addr.city}, {addr.state}, {addr.pincode}, {addr.country}
                  </p>
                  <p className="text-sm">Mobile: +91 {addr.mobile}</p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg"
                      onClick={() => deleteAddress(addr.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg"
                      onClick={() => openAddEditModal(addr)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg"
                onClick={closeSelectModal}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Address Modal */}
      {showAddEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-start justify-end z-50">
          <div
            className="bg-white w-full md:w-1/3 h-auto max-h-[80vh] md:max-h-full rounded-t-lg md:rounded-lg shadow-lg overflow-y-auto
            transition-transform duration-300 ease-in-out transform translate-y-0 md:translate-y-0 md:right-0 md:top-0 md:bottom-0 md:h-screen"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold">{editingAddress ? 'Edit Address' : 'Add Address'}</h2>
              <button onClick={closeAddEditModal} className="text-gray-600">
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              <h3 className="font-semibold">Contact Details</h3>
              <div className="flex space-x-2">
                <input
                  name="firstName"
                  value={newAddress.firstName}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-lg"
                  placeholder="First Name"
                />
                <input
                  name="lastName"
                  value={newAddress.lastName}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-lg"
                  placeholder="Last Name"
                />
              </div>
              <div className="flex">
                <span className="p-2 border-r border-gray-300 bg-gray-50 text-gray-500">+91</span>
                <input
                  name="mobile"
                  value={newAddress.mobile}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Mobile Number"
                />
              </div>

              <h3 className="font-semibold">Shipping Address</h3>
              <input
                name="address"
                value={newAddress.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Address (Flat No./House No./Street, Area)"
              />
              <input
                name="landmark"
                value={newAddress.landmark}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Landmark (Optional)"
              />
              <div className="flex space-x-2">
                <input
                  name="city"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-lg"
                  placeholder="City"
                />
                <input
                  name="pincode"
                  value={newAddress.pincode}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-lg"
                  placeholder="Pincode"
                />
              </div>
              <div className="flex space-x-2">
                <select
                  name="state"
                  value={newAddress.state}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-lg"
                >
                  <option>State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <select
                  name="country"
                  value={newAddress.country}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded-lg"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <h3 className="font-semibold">Address Type</h3>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    newAddress.type === 'Home' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handleAddressTypeChange('Home')}
                >
                  Home (7am-10pm)
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    newAddress.type === 'Office' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handleAddressTypeChange('Office')}
                >
                  Office (10am-7pm)
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Preferences will help us plan your delivery. However, shipments can sometimes arrive early or later than
                planned.
              </p>
            </div>
            <div className="p-4 border-t">
              <button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg"
                onClick={saveAddress}
              >
                SAVE ADDRESS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Date Modal */}
      {showDateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-start justify-end z-50">
          <div
            className="bg-white w-full md:w-1/3 h-auto max-h-[80vh] md:max-h-full rounded-t-lg md:rounded-lg shadow-lg overflow-y-auto
            transition-transform duration-300 ease-in-out transform translate-y-0 md:translate-y-0 md:right-0 md:top-0 md:bottom-0 md:h-screen no-scrollbar"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold">Change Delivery Date</h2>
              <button onClick={closeDateModal} className="text-gray-600">
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              {mockProducts.map((product, index) => (
                <div key={index} className="bg-white rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <img src={product.image} alt={product.name} className="w-16 h-16 mr-3 rounded" />
                    <p className="font-medium">{product.name}</p>
                  </div>
                  <p className="text-sm mb-2">Select preferred delivery date</p>
                  <div className="overflow-x-auto no-scrollbar">
                    <div className="flex space-x-2">
                      {product.dates.map((date, idx) => (
                        <button
                          key={idx}
                          className={`px-4 py-2 rounded-lg min-w-[50px] ${
                            selectedDates[index] === date ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
                          }`}
                          onClick={() => handleDateSelect(index, date)}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg"
                onClick={confirmDate}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;