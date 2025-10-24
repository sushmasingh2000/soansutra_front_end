// import React from 'react';

// const CertificateUI = () => {
//   // Hardcoded data from the provided certificate image
//   const certificate = {
//     productName: "Starlight Kids' Diamond Earrings",
//     sku: "JE0473-YGP600",
//     barcodeNumber: "FE97RBNSXE",
//     height: "4.8",
//     width: "4.8",
//     grossWeight: "0.677",
//     metalPurity: "18K Yellow Gold",
//     netMetalWeight: "0.650",
//     certificateNumber: "JYKBA67",
//     diamondQuality: "GH-SI",
//     totalDiamondWeight: "0.137",
//     diamondShape: "Round",
//     totalDiamondCount: 8,
//     imageUrl: "https://via.placeholder.com/200x200/FFD700/000000?text=Earrings+Image", // Placeholder for product image; replace with actual URL
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans antialiased">
//       {/* Outer Container with Purple Border */}
//       <div className="max-w-4xl mx-auto p-6 border-4 border-purple-600 rounded-lg shadow-lg relative">
//         {/* Header with Logo and Title */}
//         <div className="text-center mb-8">
//           {/* Logo Placeholder - In real app, use actual CaratLane logo */}
//           <div className="mx-auto w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mb-4">
//             <span className="text-white font-bold text-2xl">CL</span>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-700 mb-2">E - CERTIFICATE</h1>
//           <p className="text-sm text-purple-600 italic">A Tanishq Partnership</p>
//         </div>

//         {/* Product Details Section */}
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row gap-8">
//             {/* Product Image */}
//             <div className="md:w-1/3">
//               <img
//                 src={certificate.imageUrl}
//                 alt="Product Image"
//                 className="w-full h-48 object-cover rounded-lg border border-gray-300"
//               />
//             </div>

//             {/* Details Table */}
//             <div className="md:w-2/3 space-y-2">
//               <h2 className="text-xl font-semibold text-purple-600 mb-4">PRODUCT DETAILS</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="font-medium">Product Name:</p>
//                   <p className="text-gray-700">{certificate.productName}</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">SKU Code Number:</p>
//                   <p className="text-gray-700">{certificate.sku}</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Barcode Number:</p>
//                   <p className="text-gray-700">{certificate.barcodeNumber}</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Height:</p>
//                   <p className="text-gray-700">{certificate.height} mm</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Width:</p>
//                   <p className="text-gray-700">{certificate.width} mm</p>
//                 </div>
//                 <div>
//                   <p className="font-medium">Gross Weight:</p>
//                   <p className="text-gray-700">{certificate.grossWeight} g</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Certificate Number */}
//           <div className="text-right mt-4">
//             <p className="text-sm font-medium text-purple-600">CERTIFICATE NUMBER: {certificate.certificateNumber}</p>
//           </div>
//         </div>

//         {/* Gold / Metal Section */}
//         <div className="mb-8 p-4 bg-gray-50 rounded-lg">
//           <h3 className="text-lg font-semibold text-purple-600 mb-2">GOLD / PURITY</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//             <div>
//               <p className="font-medium">Metal / Purity:</p>
//               <p className="text-gray-700">{certificate.metalPurity}</p>
//             </div>
//             <div>
//               <p className="font-medium">Net Metal Weight:</p>
//               <p className="text-gray-700">{certificate.netMetalWeight} g</p>
//             </div>
//           </div>
//         </div>

//         {/* Diamonds Section */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-purple-600 mb-4">
//             DIAMONDS | TOTAL COUNT: {certificate.totalDiamondCount}
//           </h3>
//           <table className="w-full border-collapse border border-gray-300 text-sm">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-300 p-2 text-left">QUALITY</th>
//                 <th className="border border-gray-300 p-2 text-left">WEIGHT</th>
//                 <th className="border border-gray-300 p-2 text-left">SHAPE</th>
//                 <th className="border border-gray-300 p-2 text-left">COUNT</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border border-gray-300 p-2">{certificate.diamondQuality}</td>
//                 <td className="border border-gray-300 p-2">{certificate.totalDiamondWeight} ct</td>
//                 <td className="border border-gray-300 p-2">{certificate.diamondShape}</td>
//                 <td className="border border-gray-300 p-2">{certificate.totalDiamondCount}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Footer Notes */}
//         <div className="text-xs text-gray-600 space-y-1 mb-4">
//           <p>* Tolerance +/- 0.05 grams.</p>
//           <p>* All solitaires / diamonds graded as 0.137 ct.</p>
//           <p>produced as mounting permits.</p>
//         </div>

//         {/* Bottom Links and Customer Care */}
//         <div className="flex flex-col md:flex-row justify-between items-center text-xs text-purple-600 border-t border-purple-300 pt-4">
//           <a href="https://www.caratlane.com/certificate" className="underline hover:no-underline">
//             www.caratlane.com/certificate
//           </a>
//           <p className="mt-2 md:mt-0">Customer Care: +91-44-42980000</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CertificateUI;  // Yeh line ensure karo – default export
import React from 'react';

const CertificateUI = () => {
  // Hardcoded data from the provided certificate image
  const certificate = {
    productName: "Starlight Kids' Diamond Earrings",
    sku: "JE0473-YGP600",
    barcodeNumber: "FE97RBNSXE",
    height: "4.8",
    width: "4.8",
    grossWeight: "0.677",
    metalPurity: "18K Yellow Gold",
    netMetalWeight: "0.650",
    certificateNumber: "JYKBA67",
    diamondQuality: "GH-SI",
    totalDiamondWeight: "0.137",
    diamondShape: "Round",
    totalDiamondCount: 8,
    imageUrl: "https://cdn.caratlane.com/media/catalog/product/J/E/JE04737-YGS300_1_lar.jpg", // Real product image from CaratLane
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans antialiased">
      {/* Outer Container with Yellow Border */}
      <div className="max-w-4xl mx-auto p-6 border-4 border-yellow-600 rounded-lg shadow-lg relative bg-white">
        {/* Header with Logo and Title */}
        <div className="text-center mb-8">
          {/* Logo Placeholder - In real app, use actual CaratLane logo */}
          <div className="mx-auto w-24 h-24 bg-yellow-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-yellow-100 font-bold text-2xl">CL</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-700 mb-2">E - CERTIFICATE</h1>
          <p className="text-sm text-yellow-600 italic">A Tanishq Partnership</p>
        </div>

        {/* Product Details Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="md:w-1/3">
              <img
                src={certificate.imageUrl}
                alt="Product Image"
                className="w-full h-48 object-cover rounded-lg border border-yellow-300"
              />
            </div>

            {/* Details Table */}
            <div className="md:w-2/3 space-y-2">
              <h2 className="text-xl font-semibold text-yellow-600 mb-4">PRODUCT DETAILS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Product Name:</p>
                  <p className="text-gray-700">{certificate.productName}</p>
                </div>
                <div>
                  <p className="font-medium">SKU Code Number:</p>
                  <p className="text-gray-700">{certificate.sku}</p>
                </div>
                <div>
                  <p className="font-medium">Barcode Number:</p>
                  <p className="text-gray-700">{certificate.barcodeNumber}</p>
                </div>
                <div>
                  <p className="font-medium">Height:</p>
                  <p className="text-gray-700">{certificate.height} mm</p>
                </div>
                <div>
                  <p className="font-medium">Width:</p>
                  <p className="text-gray-700">{certificate.width} mm</p>
                </div>
                <div>
                  <p className="font-medium">Gross Weight:</p>
                  <p className="text-gray-700">{certificate.grossWeight} g</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Number */}
          <div className="text-right mt-4">
            <p className="text-sm font-medium text-yellow-600">CERTIFICATE NUMBER: {certificate.certificateNumber}</p>
          </div>
        </div>

        {/* Gold / Metal Section */}
        <div className="mb-8 p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-600 mb-2">GOLD / PURITY</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Metal / Purity:</p>
              <p className="text-gray-700">{certificate.metalPurity}</p>
            </div>
            <div>
              <p className="font-medium">Net Metal Weight:</p>
              <p className="text-gray-700">{certificate.netMetalWeight} g</p>
            </div>
          </div>
        </div>

        {/* Diamonds Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-yellow-600 mb-4">
            DIAMONDS | TOTAL COUNT: {certificate.totalDiamondCount}
          </h3>
          <table className="w-full border-collapse border border-yellow-300 text-sm">
            <thead>
              <tr className="bg-yellow-100">
                <th className="border border-yellow-300 p-2 text-left">QUALITY</th>
                <th className="border border-yellow-300 p-2 text-left">WEIGHT</th>
                <th className="border border-yellow-300 p-2 text-left">SHAPE</th>
                <th className="border border-yellow-300 p-2 text-left">COUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-yellow-300 p-2">{certificate.diamondQuality}</td>
                <td className="border border-yellow-300 p-2">{certificate.totalDiamondWeight} ct</td>
                <td className="border border-yellow-300 p-2">{certificate.diamondShape}</td>
                <td className="border border-yellow-300 p-2">{certificate.totalDiamondCount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Notes */}
        <div className="text-xs text-gray-600 space-y-1 mb-4">
          <p>* Tolerance +/- 0.05 grams.</p>
          <p>* All solitaires / diamonds graded as 0.137 ct.</p>
          <p>produced as mounting permits.</p>
        </div>

        {/* Bottom Links and Customer Care */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-yellow-600 border-t border-yellow-300 pt-4">
          <a href="https://www.caratlane.com/certificate" className="underline hover:no-underline">
            www.caratlane.com/certificate
          </a>
          <p className="mt-2 md:mt-0">Customer Care: +91-44-42980000</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateUI;