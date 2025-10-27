
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

  const handleDownload = () => {
    // Placeholder for download logic - e.g., generate PDF via html2canvas + jsPDF or server-side
    alert('Download E-Certificate functionality would be implemented here (e.g., via jsPDF).');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased px-2 sm:px-0 py-4"> {/* Added px-2 sm:px-0 for mobile side margins without conflict */}
      {/* Download Button - Centered at top, outside container */}
      <div className="max-w-4xl mx-auto flex justify-center mb-4">
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition-colors text-sm"
        >
          Download E-Certificate
        </button>
      </div>

      {/* Outer Container with Yellow Border - PDF-like styling */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 border-4 border-yellow-600 rounded-lg shadow-lg relative bg-white"> {/* Removed conflicting mx-2 sm:mx-0; centering via mx-auto intact */}
        {/* Header with Logo and Title - Using relative/absolute for perfect centering */}
        <div className="mb-2 sm:mb-2 relative min-h-[5rem] sm:min-h-[6rem] md:min-h-[7rem] lg:min-h-[8rem] flex items-center justify-center"> {/* Added min-height responsive to container height for logo accommodation; changed to items-center justify-center for better vertical centering */}
          {/* Logo - Left aligned, even smaller on mobile */}
          <div className="flex-shrink-0 flex flex-col items-start absolute left-0 top-1/2 -translate-y-1/2"> {/* Changed top-0 to top-1/2 -translate-y-1/2 to vertically center logo block with title */}
            <img
              src="/logo512.png"
              alt="Sonasutra Logo"
              className="w-8 h-8 sm:w-16 sm:h-16 md:w-14 md:h-14 lg:w-15lg:h-15 rounded-full" 
            />
            <p className="text-[8px] sm:text-sm text-yellow-600 italic mt-1">A Sonasutra <br/>Partnership</p> {/* Smaller text on mobile */}
          </div>
          {/* E - CERTIFICATE - Perfectly centered with absolute positioning */}
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 whitespace-nowrap z-10">
            E - CERTIFICATE
          </h1>
        </div>
        {/* Thick Yellow Gradient Bottom Line - Full width */}
        <div className="-mx-4 sm:-mx-6 h-1 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 rounded-full mt-0"></div> {/* Removed mt to hug the header bottom; container's mb handles spacing */}

        {/* Product Details Section - Row layout even on small screens */}
        <div className="mb-8">
          <div className="flex flex-row items-start gap-4 sm:gap-6 md:gap-8"> {/* flex-row always; gap responsive */}
            {/* Details Table - Flexible width */}
            <div className="flex-1 space-y-2 min-w-0"> {/* flex-1 to take available space, min-w-0 to allow shrink */}
              <h2 className="text-base sm:text-lg font-semibold text-yellow-600 mb-3 sm:mb-4">PRODUCT DETAILS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm overflow-hidden"> {/* overflow-hidden to prevent text overflow on tight mobile */}
                <div>
                  <p className="font-medium">Product Name:</p>
                  <p className="text-gray-700 truncate">{certificate.productName}</p> {/* truncate long names on mobile */}
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

            {/* Product Image - Fixed right-side position even on small screens */}
            <div className="flex-shrink-0 w-24 sm:w-32 md:w-40 h-32 sm:h-40 md:h-48"> {/* Fixed sizes: smaller on mobile, grows on larger; flex-shrink-0 to stay right */}
              <img
                src={certificate.imageUrl}
                alt="Product Image"
                className="w-full h-full object-cover rounded-lg border border-yellow-300"
              />
            </div>
          </div>

          {/* Certificate Number */}
          <div className="text-right mt-3 sm:mt-4">
            <p className="text-xs sm:text-sm font-medium text-yellow-600">CERTIFICATE NUMBER: {certificate.certificateNumber}</p>
          </div>
        </div>

        {/* Gold / Metal Section */}
        <div className="mb-8 p-3 sm:p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-sm sm:text-base font-semibold text-yellow-600 mb-2">GOLD / PURITY</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
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
          <h3 className="text-sm sm:text-base font-semibold text-yellow-600 mb-3 sm:mb-4">
            DIAMONDS | TOTAL COUNT: {certificate.totalDiamondCount}
          </h3>
          <table className="w-full border-collapse border border-yellow-300 text-xs sm:text-sm">
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
        <div className="text-xs sm:text-sm text-gray-600 space-y-1 mb-4">
          <p>* Tolerance +/- 0.05 grams.</p>
          <p>* All solitaires / diamonds graded as 0.137 ct.</p>
          <p>produced as mounting permits.</p>
        </div>

        {/* Bottom Links and Customer Care */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-yellow-600 border-t border-yellow-300 pt-3 sm:pt-4">
          <a href="https://www.sonasutra.com/certificate" className="underline hover:no-underline">
            www.sonasutra.com/certificate
          </a>
          <p className="mt-2 md:mt-0">Customer Care: +91-44-42980000</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateUI;