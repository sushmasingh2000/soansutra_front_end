// import React from 'react';

// const AssurityComponent = () => {
//   return (
//     <div className="max-w-6xl mx-auto py-2 px-2 mb-10">
//       {/* Mobile View - Separate Cards */}
//       <div className="md:hidden space-y-4 ">
//         {/* Features Card */}
//         <div className="bg-white p-5 rounded-lg shadow-sm border">
//           <h2 className="text-xl font-semibold text-gray-800 mb-5">Sonasutra Assurity</h2>
          
//           {/* Features Grid - Mobile (2x2) */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                 <i className="fas fa-undo text-blue-600 text-sm"></i>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-800">15 Day Money Back</div>
//                 <div className="text-xs text-gray-500">On Online Orders</div>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
//                 <i className="fas fa-shield-alt text-red-600 text-sm"></i>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-800">1 Year Warranty</div>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                 <i className="fas fa-certificate text-green-600 text-sm"></i>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-800">100% Certified</div>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
//                 <i className="fas fa-infinity text-yellow-600 text-sm"></i>
//               </div>
//               <div>
//                 <div className="text-sm font-medium text-gray-800">Lifetime Exchange</div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Contact Section Card - Mobile */}
//         <div className="bg-grey-50 p-5 mt-10 rounded-lg shadow-sm border">
//           <h3 className="text-lg font-medium text-gray-800 mb-4">Contact us for further assistances</h3>
//           <div className="flex justify-between space-x-4">
//             <button className="flex flex-col items-center space-y-2 flex-1">
//               <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
//                 <i className="fas fa-phone text-gray-600"></i>
//               </div>
//               <span className="text-xs text-gray-600">Call</span>
//             </button>
            
//             <button className="flex flex-col items-center space-y-2 flex-1">
//               <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
//                 <i className="fas fa-comments text-gray-600"></i>
//               </div>
//               <span className="text-xs text-gray-600">Chat</span>
//             </button>
            
//             <button className="flex flex-col items-center space-y-2 flex-1">
//               <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
//                 <i className="fab fa-whatsapp text-green-500"></i>
//               </div>
//               <span className="text-xs text-gray-600">Whatsapp</span>
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Desktop View - Compact Single Row Layout */}
//       <div className="max-w-6xl hidden md:flex md:items-center md:justify-between bg-red-600 py-2 px-6 rounded-lg">
//         <div className="flex items-center space-x-6 ">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//               <i className="fas fa-undo text-blue-600 text-sm"></i>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-gray-800">15 Day Exchange</div>
//               <div className="text-xs text-gray-500">On Online Orders</div>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
//               <i className="fas fa-shield-alt text-red-600 text-sm"></i>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-gray-800">1 Year Warranty</div>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//               <i className="fas fa-certificate text-green-600 text-sm"></i>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-gray-800">100% Certified</div>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
//               <i className="fas fa-infinity text-yellow-600 text-sm"></i>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-gray-800">Lifetime Exchange</div>
//             </div>
//           </div>
//         </div>
        
//         {/* Payment Icons - Desktop */}
//         <div className="flex items-center space-x-2 ml-8">
//           <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
//             <span className="text-white text-xs font-bold">VISA</span>
//           </div>
//           <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
//             <span className="text-white text-xs font-bold">MC</span>
//           </div>
//           <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
//             <span className="text-white text-xs font-bold">PP</span>
//           </div>
//           <div className="w-10 h-6 bg-blue-700 rounded flex items-center justify-center">
//             <span className="text-white text-xs font-bold">AMEX</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Font Awesome CDN - Add this to your HTML head or import FontAwesome properly */}
//       <link
//         rel="stylesheet"
//         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
//       />
//     </div>
//   );
// };

// export default AssurityComponent;

import React from 'react';

const AssurityComponent = () => {
  return (
    <div className="w-full min-h-screen flex flex-col py-2 px-2 md:px-0">
      {/* Mobile View - Separate Cards */}
      <div className="md:hidden space-y-4">
        {/* Features Card */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">Sonasutra Assurity</h2>
          
          {/* Features Grid - Mobile (2x2) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-undo text-blue-600 text-sm"></i>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">15 Day Money Back</div>
                <div className="text-xs text-gray-500">On Online Orders</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <i className="fas fa-shield-alt text-red-600 text-sm"></i>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">1 Year Warranty</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-certificate text-green-600 text-sm"></i>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">100% Certified</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <i className="fas fa-infinity text-yellow-600 text-sm"></i>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">Lifetime Exchange</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Section Card - Mobile */}
        <div className="bg-gray-50 p-5 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Contact us for further assistances</h3>
          <div className="flex justify-between space-x-4">
            <button className="flex flex-col items-center space-y-2 flex-1">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <i className="fas fa-phone text-gray-600"></i>
              </div>
              <span className="text-xs text-gray-600">Call</span>
            </button>
            
            <button className="flex flex-col items-center space-y-2 flex-1">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <i className="fas fa-comments text-gray-600"></i>
              </div>
              <span className="text-xs text-gray-600">Chat</span>
            </button>
            
            <button className="flex flex-col items-center space-y-2 flex-1">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <i className="fab fa-whatsapp text-green-500"></i>
              </div>
              <span className="text-xs text-gray-600">Whatsapp</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Desktop View - Compact Single Row Layout */}
      <div className="hidden md:flex md:items-center md:justify-between bg-[#f6f3f9] py-6 px-6 rounded-none w-full fixed bottom-0 left-0">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="fas fa-undo text-blue-600 text-sm"></i>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">15 Day Exchange</div>
              <div className="text-xs text-gray-500">On Online Orders</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <i className="fas fa-shield-alt text-red-600 text-sm"></i>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">1 Year Warranty</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-certificate text-green-600 text-sm"></i>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">100% Certified</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <i className="fas fa-infinity text-yellow-600 text-sm"></i>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Lifetime Exchange</div>
            </div>
          </div>
        </div>
        
        {/* Payment Icons - Desktop */}
        <div className="flex items-center space-x-2 ml-8">
          <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">VISA</span>
          </div>
          <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">MC</span>
          </div>
          <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">PP</span>
          </div>
          <div className="w-10 h-6 bg-blue-700 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">AMEX</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssurityComponent;