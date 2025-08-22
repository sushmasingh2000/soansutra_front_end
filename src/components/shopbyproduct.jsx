// import React from 'react';

// const ShopByProducts = () => {
//   const products = [
//     {
//       id: 1,
//       title: "All rings",
//       image: "https://banner.caratlane.com/live-images/afcdf40d53844acf8f491199dbdf0e2c.jpg"
//     },
//     {
//       id: 2,
//       title: "All Earrings", 
//       image: "https://banner.caratlane.com/live-images/4fb2f470254348d8ae4774b03e564e8d.jpg"
//     },
//     {
//       id: 3,
//       title: "All bangles",
//       image: "https://banner.caratlane.com/live-images/26eb39bbd7074947abfbc8ef10a21842.jpg"
//     },
//     {
//       id: 4,
//       title: "All pendants",
//       image: "https://banner.caratlane.com/live-images/8738297ea748444297d79130d2077e23.jpg"
//     },
//     {
//       id: 5,
//       title: "All necklaces",
//       image: "https://banner.caratlane.com/live-images/26eb39bbd7074947abfbc8ef10a21842.jpg"
//     }
//   ];

//   return (
//     <div className="w-full bg-pink-50 py-8 px-4 mb-10">
//       <div className="max-w-7xl mx-auto">
//         {/* Title */}
//         <h2 className="text-1xl md:text-3xl font-semibold text-gray-800 text-center mb-8">
//           Shop by Products
//         </h2>
        
//         {/* Mobile Layout - First row: 3 items, Second row: 2 items centered */}
//         <div className="block lg:hidden">
//           {/* First row - 3 items */}
//           <div className="grid grid-cols-3 gap-3 mb-4">
//             {products.slice(0, 3).map((product) => (
//               <div key={product.id} className="flex flex-col items-center">
//                 <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
//                   <img 
//                     src={product.image} 
//                     alt={product.title}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                     loading="eager"
//                   />
//                 </div>
//                 <p className="text-xs sm:text-sm text-gray-700 font-medium mt-2 text-center leading-tight">
//                   {product.title}
//                 </p>
//               </div>
//             ))}
//           </div>
          
//           {/* Second row - 2 items centered */}
//           <div className="flex justify-center gap-8">
//             {products.slice(3, 5).map((product) => (
//               <div key={product.id} className="flex flex-col items-center w-1/3">
//                 <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
//                   <img 
//                     src={product.image} 
//                     alt={product.title}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                     loading="eager"
//                   />
//                 </div>
//                 <p className="text-xs sm:text-sm text-gray-700 font-medium mt-2 text-center leading-tight">
//                   {product.title}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         {/* Desktop Layout - All 5 items in a horizontal row */}
//         <div className="hidden lg:flex justify-center items-start gap-6 xl:gap-8">
//           {products.map((product) => (
//             <div key={product.id} className="flex flex-col items-center">
//               <div className="w-44 h-44 xl:w-48 xl:h-48 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
//                 <img 
//                   src={product.image} 
//                   alt={product.title}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                   loading="eager"
//                   crossOrigin="anonymous"
//                 />
//               </div>
//               <p className="text-base xl:text-lg text-gray-700 font-medium mt-4 text-center">
//                 {product.title}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopByProducts;
import React from 'react';

const ShopByProducts = () => {
  const products = [
    {
      id: 1,
      title: "All rings",
      image: "https://banner.caratlane.com/live-images/afcdf40d53844acf8f491199dbdf0e2c.jpg"
    },
    {
      id: 2,
      title: "All Earrings", 
      image: "https://banner.caratlane.com/live-images/4fb2f470254348d8ae4774b03e564e8d.jpg"
    },
    {
      id: 3,
      title: "All bangles",
      image: "https://banner.caratlane.com/live-images/26eb39bbd7074947abfbc8ef10a21842.jpg"
    },
    {
      id: 4,
      title: "All pendants",
      image: "https://banner.caratlane.com/live-images/8738297ea748444297d79130d2077e23.jpg"
    },
    {
      id: 5,
      title: "All necklaces",
      image: "https://banner.caratlane.com/live-images/26eb39bbd7074947abfbc8ef10a21842.jpg"
    }
  ];

  return (
    <div className="w-full bg-pink-50 py-4 px-8 mb-10">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-1xl md:text-2xl font-semibold text-gray-800 text-center mb-8">
          Shop by Products
        </h2>
        
        {/* Mobile Layout - First row: 3 items, Second row: 2 items centered */}
        <div className="block lg:hidden">
          {/* First row - 3 items */}
          <div className="grid grid-cols-3 gap-1 mb-4">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="flex flex-col items-center">
                <div className="w-[80%] aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="eager"
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium mt-2 text-center leading-tight">
                  {product.title}
                </p>
              </div>
            ))}
          </div>
          
          {/* Second row - 2 items centered */}
          <div className="flex justify-center gap-[1px]">
            {products.slice(3, 5).map((product) => (
              <div key={product.id} className="flex flex-col items-center w-1/3">
                <div className="w-[70%] aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="eager"
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium mt-2 text-center leading-tight">
                  {product.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop Layout - All 5 items in a horizontal row */}
        <div className="hidden lg:flex justify-center items-start gap-6 xl:gap-8">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <div className="w-44 h-44 xl:w-48 xl:h-48 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="eager"
                />
              </div>
              <p className="text-base xl:text-lg text-gray-700 font-medium mt-4 text-center">
                {product.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByProducts;