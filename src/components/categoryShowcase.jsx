// import React from 'react';
// import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
// import { endpoint } from '../utils/APIRoutes';
// import { useQuery } from 'react-query';
// import { useNavigate } from 'react-router-dom';

// const JewelryCategories = () => {
//   const navigate = useNavigate();

//   const { data } = useQuery(
//     ["frequent_product"],
//     () => apiConnectorGet(endpoint.get_most_frequent),
//     usequeryBoolean
//   );

//   const products = data?.data?.result || [];

//   const handleClick = (product) => {
//     navigate("/productdetails", { state: { product } });
//   };

//   const handleImageError = (e) => {
//     const parent = e.target.parentElement;
//     parent.innerHTML = `
//       <div class="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
//         <div class="text-center text-gray-600">
//           <div class="text-2xl mb-2">💎</div>
//           <div class="text-xs">Jewelry</div>
//         </div>
//       </div>
//     `;
//   };
//   const giftItem = products.find(cat => cat.isGift);
//   return (
//     <div className="w-full p-2 sm:p-4 lg:p-6">
//       {/* Main container with full width and custom background */}
//       <div
//         className="w-full p-4 sm:p-6 lg:p-8 rounded-2xl"
//         style={{ backgroundColor: 'rgb(246, 243, 249)' }}
//       >

//         {/* Mobile Layout: Gift at top, then 3x2 grid */}
//         <div className="block sm:hidden">
//           {/* Gift Item - Mobile */}
//           <div className="flex justify-center mb-6">
//             <div className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
//               <div className="bg-white rounded-lg overflow-hidden shadow-md">
//                 {/* Image Container */}
//                 <div className="relative w-32 h-32 overflow-hidden bg-white">
//                   <img
//                     src="https://assets.cltstatic.com/images/responsive/hp/hp-asset1.png"
//                     alt="gift"
//                     className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
//                     onError={handleImageError}
//                     loading="lazy"
//                   />
//                 </div>

//                 {/* Title */}
//                 <div className="p-2 text-center">
//                   <h3 className="text-xs font-semibold text-purple-600">
//                    Wrapped with Love
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Jewelry Items Grid - Mobile: 3 columns */}
//           <div className="grid grid-cols-3 gap-3">
//             {products.map((product) => {
//                let imageUrl = 'https://via.placeholder.com/300x300?text=Jewelry';
//               try {
//                 const images = JSON.parse(product.product_images);
//                 if (Array.isArray(images) && images[0]?.p_image_url) {
//                   imageUrl = images[0].p_image_url;
//                 }
//               } catch (err) {
//                 console.warn('Image parsing failed', err);
//               }
//               return (
//                 <div id='viewcollection_scroll'
//                   key={product.product_id}
//                   className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
//                   onClick={() => handleClick(product)}>
//                   <div className="bg-white rounded-lg overflow-hidden shadow-md">
//                     {/* Image Container */}
//                     <div className="relative w-full h-24 overflow-hidden bg-white">
//                       <img
//                         src={imageUrl}
//                         alt={product.name}
//                         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                         onError={handleImageError}
//                         loading="lazy"
//                       />
//                     </div>

//                     {/* Title */}
//                     <div className="p-1 text-center">
//                       <h3 className="text-xs font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300 leading-tight">
//                         {product.name}
//                       </h3>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>

//         {/* Desktop/Tablet Layout: Original grid layout */}
//         <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-6">
//           {products.map((product) => {
//              let imageUrl = 'https://via.placeholder.com/300x300?text=Jewelry';
//             try {
//               const images = JSON.parse(product.product_images);
//               if (Array.isArray(images) && images[0]?.p_image_url) {
//                 imageUrl = images[0].p_image_url;
//               }
//             } catch (err) {
//               console.warn('Image parsing failed', err);
//             }
//             return (
//               <div
//                 id='viewcollection_scroll'
//                 key={product.product_id}
//                 className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
//                 onClick={() => handleClick(product)}   >
//                 <div className="bg-white rounded-lg overflow-hidden shadow-md">
//                   {/* Image Container */}
//                   <div className="relative w-full h-40 sm:h-48 lg:h-52 xl:h-56 overflow-hidden bg-white">
//                     <img
//                       src={imageUrl}
//                       alt={product.name}
//                       className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
//                       onError={handleImageError}
//                       loading="lazy"
//                     />
//                     {/* Overlay for better text visibility */}
//                     <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
//                   </div>

//                   {/* Title */}
//                   <div className="p-2 sm:p-3 text-center">
//                     <h3 className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${product.isGift
//                       ? 'text-purple-600'
//                       : 'text-gray-800 group-hover:text-purple-600'
//                       }`}>
//                       {product.name}
//                     </h3>
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JewelryCategories;
// import React from 'react';
// import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
// import { endpoint } from '../utils/APIRoutes';
// import { useQuery } from 'react-query';
// import { useNavigate } from 'react-router-dom';

// const JewelryCategories = () => {
//   const navigate = useNavigate();

//   const { data } = useQuery(
//     ["frequent_product"],
//     () => apiConnectorGet(endpoint.get_most_frequent),
//     usequeryBoolean
//   );

//   const products = data?.data?.result || [];

//   const handleClick = (product) => {
//     navigate("/productdetails", { state: { product } });
//   };

//   const handleImageError = (e) => {
//     const parent = e.target.parentElement;
//     parent.innerHTML = `
//       <div class="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
//         <div class="text-center text-gray-600">
//           <div class="text-2xl mb-2">💎</div>
//           <div class="text-xs">Jewelry</div>
//         </div>
//       </div>
//     `;
//   };

//   const giftItem = products.find(cat => cat.isGift);

//   return (
//     <div className="w-full p-2 sm:p-4 lg:p-6">
//       {/* Main container with full width and custom background */}
//       <div
//         className="w-full p-4 sm:p-6 lg:p-8 rounded-2xl"
//         style={{ backgroundColor: 'rgb(246, 243, 249)' }}
//       >

//         {/* Mobile Layout: Gift at top, then 3x2 grid */}
//         <div className="block sm:hidden">
//           {/* Gift Item - Mobile */}
//           <div className="flex justify-center mb-6">
//             <div className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
//               <div className="bg-white rounded-lg overflow-hidden shadow-md">
//                 {/* Image Container */}
//                 <div className="relative w-32 h-32 overflow-hidden bg-white">
//                   <img
//                     src="https://assets.cltstatic.com/images/responsive/hp/hp-asset1.png"
//                     alt="gift"
//                     className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
//                     onError={handleImageError}
//                     loading="lazy"
//                   />
//                 </div>

//                 {/* Title */}
//                 <div className="p-2 text-center">
//                   <h3 className="text-xs font-semibold text-purple-600">
//                    Wrapped with Love
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Jewelry Items Grid - Mobile: 3 columns */}
//           <div className="grid grid-cols-3 gap-3">
//             {products.map((product) => {
//                let imageUrl = 'https://via.placeholder.com/300x300?text=Jewelry';
//               try {
//                 const images = JSON.parse(product.product_images);
//                 if (Array.isArray(images) && images[0]?.p_image_url) {
//                   imageUrl = images[0].p_image_url;
//                 }
//               } catch (err) {
//                 console.warn('Image parsing failed', err);
//               }
//               return (
//                 <div id='viewcollection_scroll'
//                   key={product.product_id}
//                   className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
//                   onClick={() => handleClick(product)}>
//                   <div className="bg-white rounded-lg overflow-hidden shadow-md">
//                     {/* Image Container */}
//                     <div className="relative w-full h-24 overflow-hidden bg-white">
//                       <img
//                         src={imageUrl}
//                         alt={product.name}
//                         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                         onError={handleImageError}
//                         loading="lazy"
//                       />
//                     </div>

//                     {/* Title */}
//                     <div className="p-1 text-center">
//                       <h3 className="text-xs font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300 leading-tight">
//                         {product.name}
//                       </h3>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>

//         {/* Desktop/Tablet Layout: Horizontal scrollable layout */}
//         <div className="hidden sm:block">
//           {/* Gift Item - Desktop */}
//           <div className="flex justify-center mb-6">
//             <div className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
//               <div className="bg-white rounded-lg overflow-hidden shadow-md">
//                 {/* Image Container */}
//                 <div className="relative w-40 h-40 overflow-hidden bg-white">
//                   <img
//                     src="https://assets.cltstatic.com/images/responsive/hp/hp-asset1.png"
//                     alt="gift"
//                     className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
//                     onError={handleImageError}
//                     loading="lazy"
//                   />
//                 </div>
//               </div>
//               {/* Title outside card - below */}
//               <div className="p-2 text-center">
//                 <h3 className="text-sm font-semibold text-purple-600">
//                   Wrapped with Love
//                 </h3>
//               </div>
//             </div>
//           </div>

//           {/* Jewelry Items - Horizontal Scrollable Container */}
//           <div className="overflow-x-auto scrollbar-hide">
//             <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
//               {products.map((product) => {
//                 let imageUrl = 'https://via.placeholder.com/300x300?text=Jewelry';
//                 try {
//                   const images = JSON.parse(product.product_images);
//                   if (Array.isArray(images) && images[0]?.p_image_url) {
//                     imageUrl = images[0].p_image_url;
//                   }
//                 } catch (err) {
//                   console.warn('Image parsing failed', err);
//                 }
//                 return (
//                   <div
//                     id='viewcollection_scroll'
//                     key={product.product_id}
//                     className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg flex-shrink-0"
//                     onClick={() => handleClick(product)}
//                     style={{ width: '200px' }} // Fixed width for consistent layout
//                   >
//                     <div className="bg-white rounded-lg overflow-hidden shadow-md">
//                       {/* Image Container - Full card image */}
//                       <div className="relative w-full h-48 overflow-hidden bg-white">
//                         <img
//                           src={imageUrl}
//                           alt={product.name}
//                           className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
//                           onError={handleImageError}
//                           loading="lazy"
//                         />
//                         {/* Overlay for better interaction */}
//                         <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
//                       </div>
//                     </div>
                    
//                     {/* Title outside card - below */}
//                     <div className="p-2 text-center">
//                       <h3 className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
//                         {product.name}
//                       </h3>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS for hiding scrollbar */}
//       <style jsx>{`
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default JewelryCategories;
// import React from 'react';
// import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
// import { endpoint } from '../utils/APIRoutes';
// import { useQuery } from 'react-query';
// import { useNavigate } from 'react-router-dom';

// const JewelryCategories = () => {
//   const navigate = useNavigate();

//   const { data } = useQuery(
//     ["frequent_product"],
//     () => apiConnectorGet(endpoint.get_most_frequent),
//     usequeryBoolean
//   );

//   const products = data?.data?.result || [];

//   const handleClick = (product) => {
//     navigate("/productdetails", { state: { product } });
//   };

//   const handleImageError = (e) => {
//     const parent = e.target.parentElement;
//     parent.innerHTML = `
//       <div class="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
//         <div class="text-center text-gray-600">
//           <div class="text-2xl mb-2">💎</div>
//           <div class="text-xs">Jewelry</div>
//         </div>
//       </div>
//     `;
//   };

//   const giftItem = products.find(cat => cat.isGift);

//   return (
//     <div className="w-full p-2 sm:p-4 lg:p-6">
//       {/* Main container with full width and custom background */}
//       <div
//         className="w-full p-4 sm:p-6 lg:p-8 rounded-2xl"
//         style={{ backgroundColor: 'rgb(246, 243, 249)' }}
//       >

//         {/* Mobile Layout: Gift at top, then 3x2 grid */}
//         <div className="block sm:hidden">
//           {/* Gift Item - Mobile */}
//           <div className="flex justify-center mb-6">
//             <div className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
//               <div className="bg-white rounded-lg overflow-hidden shadow-md">
//                 {/* Image Container */}
//                 <div className="relative w-32 h-32 overflow-hidden bg-white">
//                   <img
//                     src="https://assets.cltstatic.com/images/responsive/hp/hp-asset1.png"
//                     alt="gift"
//                     className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
//                     onError={handleImageError}
//                     loading="lazy"
//                   />
//                 </div>

//                 {/* Title */}
//                 <div className="p-2 text-center">
//                   <h3 className="text-xs font-semibold text-purple-600">
//                    Wrapped with Love
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Jewelry Items Grid - Mobile: 3 columns */}
//           <div className="grid grid-cols-3 gap-3">
//             {products.map((product) => {
//                let imageUrl = 'https://via.placeholder.com/300x300?text=Jewelry';
//               try {
//                 const images = JSON.parse(product.product_images);
//                 if (Array.isArray(images) && images[0]?.p_image_url) {
//                   imageUrl = images[0].p_image_url;
//                 }
//               } catch (err) {
//                 console.warn('Image parsing failed', err);
//               }
//               return (
//                 <div id='viewcollection_scroll'
//                   key={product.product_id}
//                   className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
//                   onClick={() => handleClick(product)}>
//                   <div className="bg-white rounded-2xl overflow-hidden shadow-md">
//                     {/* Image Container */}
//                     <div className="relative w-full h-24 overflow-hidden bg-white">
//                       <img
//                         src={imageUrl}
//                         alt={product.name}
//                         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                         onError={handleImageError}
//                         loading="lazy"
//                       />
//                     </div>
//                   </div>
//                   {/* Title outside card - below */}
//                   <div className="p-1 text-center">
//                     <h3 className="text-xs font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300 leading-tight">
//                       {product.name}
//                     </h3>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>

//         {/* Desktop/Tablet Layout: Horizontal scrollable layout */}
//         <div className="hidden sm:block">
//           {/* Jewelry Items - Horizontal Scrollable Container */}
//           <div className="overflow-x-auto scrollbar-hide mt-10">
           
//             <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
//                <div className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
//               <div className=" overflow-hidden shadow-md mr-10">
//                 {/* Image Container */}
//                 <div className="relative w-40 h-40 overflow-hidden  mt-10">
//                   <img
//                     src="https://assets.cltstatic.com/images/responsive/hp/hp-asset1.png"
//                     alt="gift"
//                     className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 "
//                     onError={handleImageError}
//                     loading="lazy"
//                   />
//                 </div>
//               </div>
//               {/* Title outside card - below */}
//               <div className="p-2 text-center">
//                 <h3 className="text-lg font-semibold text-purple-600">
//                   Wrapped with Love
//                 </h3>
//               </div>
//             </div>
//               {products.map((product) => {
//                 let imageUrl = 'https://via.placeholder.com/300x300?text=Jewelry';
//                 try {
//                   const images = JSON.parse(product.product_images);
//                   if (Array.isArray(images) && images[0]?.p_image_url) {
//                     imageUrl = images[0].p_image_url;
//                   }
//                 } catch (err) {
//                   console.warn('Image parsing failed', err);
//                 }
//                 return (
//                   <div
//                     id='viewcollection_scroll'
//                     key={product.product_id}
//                     className="group cursor-pointer transition-all duration-300  flex-shrink-0"
//                     onClick={() => handleClick(product)}
//                     style={{ width: '200px' }} // Fixed width for consistent layout
//                   >
//                     <div className="bg-white rounded-lg overflow-hidden shadow-md">
//                       {/* Image Container - Full card image */}
//                       <div className="relative w-full h-48 overflow-hidden ">
//                         <img
//                           src={imageUrl}
//                           alt={product.name}
//                           className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
//                           onError={handleImageError}
//                           loading="lazy"
//                         />
//                         {/* Overlay for better interaction */}
//                         <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
//                       </div>
//                     </div>
                    
//                     {/* Title outside card - below */}
//                     <div className="p-2 text-center">
//                       <h3 className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
//                         {product.name}
//                       </h3>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS for hiding scrollbar */}
//       <style jsx>{`
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default JewelryCategories;
import React from 'react';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
import { endpoint } from '../utils/APIRoutes';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const JewelryCategories = () => {
  const navigate = useNavigate();

  const { data } = useQuery(
    ["frequent_product"],
    () => apiConnectorGet(endpoint.get_most_frequent),
    usequeryBoolean
  );

  const products = data?.data?.result || [];

  const handleClick = (product) => {
    navigate("/productdetails", { state: { product } });
  };

  const handleImageError = (e) => {
    const parent = e.target.parentElement;
    parent.innerHTML = `
      <div class="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
        <div class="text-center text-gray-600">
          <div class="text-2xl mb-2">💎</div>
          <div class="text-xs">Jewelry</div>
        </div>
      </div>
    `;
  };

  const giftItem = products.find(cat => cat.isGift);

  return (
    <div className="w-full p-2 sm:p-4 lg:p-6">
      {/* Main container with full width and custom background */}
      <div
        className="w-full p-4 sm:p-6 lg:p-8 rounded-2xl"
        style={{ backgroundColor: 'rgb(246, 243, 249)' }}
      >

        {/* Mobile Layout: Gift at top, then 3x2 grid */}
        <div className="block sm:hidden">
          {/* Gift Item - Mobile */}
          <div className="flex justify-center mb-6">
            <div className="cursor-pointer">
              {/* Image Container - No card styling */}
              <div className="relative w-32 h-32 overflow-hidden">
                <img
                  src="https://assets.cltstatic.com/images/responsive/hp/hp-asset1.png"
                  alt="gift"
                  className="w-full h-full object-contain"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <div className="p-2 text-center">
                <h3 className="text-xs font-semibold text-purple-600">
                 Wrapped with Love
                </h3>
              </div>
            </div>
          </div>

          {/* Jewelry Items Grid - Mobile: 3 columns */}
          <div className="grid grid-cols-3 gap-3">
            {products.map((product) => {
               let imageUrl = 'https://via.placeholder.com/300x300?text=Jewelry';
              try {
                const images = JSON.parse(product.product_images);
                if (Array.isArray(images) && images[0]?.p_image_url) {
                  imageUrl = images[0].p_image_url;
                }
              } catch (err) {
                console.warn('Image parsing failed', err);
              }
              return (
                <div id='viewcollection_scroll'
                  key={product.product_id}
                  className="cursor-pointer"
                  onClick={() => handleClick(product)}>
                  {/* Image Container - No card styling */}
                  <div className="relative w-full h-24 rounded-[25px] overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </div>
                  {/* Title outside - below */}
                  <div className="p-1 text-center">
                    <h3 className="text-xs font-medium text-gray-800 leading-tight">
                      {product.name}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Desktop/Tablet Layout: Horizontal scrollable layout */}
        <div className="hidden sm:block">
          {/* Jewelry Items - Horizontal Scrollable Container */}
          <div className="overflow-x-auto scrollbar-hide mt-10">
           
            <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
               <div className="cursor-pointer mr-10">
                {/* Image Container - No card styling */}
                <div className="relative w-40 h-40 overflow-hidden ">
                  <img
                    src="https://assets.cltstatic.com/images/responsive/hp/hp-asset1.png"
                    alt="gift"
                    className="w-full h-full object-contain"
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>
                {/* Title outside - below */}
                <div className="p-2 text-center">
                  <h3 className="text-lg font-semibold text-purple-600">
                    Wrapped with Love
                  </h3>
                </div>
              </div>
              {products.map((product) => {
                let imageUrl = 'https://via.placeholder.com/300x300?text=Jewelry';
                try {
                  const images = JSON.parse(product.product_images);
                  if (Array.isArray(images) && images[0]?.p_image_url) {
                    imageUrl = images[0].p_image_url;
                  }
                } catch (err) {
                  console.warn('Image parsing failed', err);
                }
                return (
                  <div
                    id='viewcollection_scroll'
                    key={product.product_id}
                    className="cursor-pointer flex-shrink-0"
                    onClick={() => handleClick(product)}
                    style={{ width: '200px' }} // Fixed width for consistent layout
                  >
                    {/* Image Container - No card styling */}
                    <div className="relative w-full h-48 rounded-[25px] overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Title outside - below */}
                    <div className="p-2 text-center">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default JewelryCategories;