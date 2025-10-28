import React from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { endpoint } from '../utils/APIRoutes';
import { useQuery } from 'react-query';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';

const CertificateUI = () => {
  const [searchParams] = useSearchParams();
  const certificateNo = searchParams.get("certificate_no"); 

  // testted
  // http://localhost:3001/download-e-certificate?certificate_no=CER-17606-00214

  const { data, isLoading, isError } = useQuery(
    ["e_certificate", certificateNo],
    () => apiConnectorGet(`${endpoint.e_certificate}?certificate_id=${certificateNo}`),
    usequeryBoolean
  );

  const certificateData = data?.data?.result?.[0];
  const item = certificateData?.items_details?.[0];
  const rawData = item?.raw_data ? JSON.parse(item.raw_data) : null;
  const product = rawData?.product_details;

  if (isLoading) {
    return <div className="text-center py-10 text-yellow-600 font-semibold">Loading Certificate...</div>;
  }

  if (isError || !certificateData) {
    return <div className="text-center py-10 text-red-600 font-semibold">Certificate not found.</div>;
  }

  const certificate = {
    productName: product?.product_name || "N/A",
    sku: rawData?.varient_sku || "N/A",
    barcodeNumber: rawData?.barcode || "N/A",
    height: rawData?.attributes?.find(a => a.attribute_name === "Height")?.value || "N/A",
    width: rawData?.attributes?.find(a => a.attribute_name === "Thickness")?.value || "N/A",
    grossWeight: rawData?.material_details?.[0]?.weight || "N/A",
    metalPurity: `${rawData?.pur_stamp_name || "N/A"} ${rawData?.master_mat_name || ""}`,
    metalName: ` ${rawData?.master_mat_name || ""}`,
    metaunit: ` ${rawData?.ma_unit || ""}`,
    netMetalWeight: rawData?.material_details?.[0]?.weight || "N/A",
    certificateNumber: certificateData?.certificate_id || "N/A",
    // diamondQuality: "GH-SI",
    // totalDiamondWeight: "0.137",
    // diamondShape: "Round",
    // totalDiamondCount: 8,
    imageUrl: product?.product_image?.p_image_url || "/no-image.png",
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased px-2 sm:px-0 py-4">
      <div className="max-w-4xl mx-auto flex justify-center mb-4">
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition-colors text-sm"
        >
          Download E-Certificate
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 border-4 border-yellow-600 rounded-lg shadow-lg bg-white">
        {/* Header */}
        <div className="mb-2 relative min-h-[5rem] flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-start">
            <img src="/logo512.png" alt="Logo" className="w-10 h-10 sm:w-14 sm:h-14 rounded-full" />
            <p className="text-[8px] sm:text-sm text-yellow-600 italic mt-1">
              A Sonasutra <br />Partnership
            </p>
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-700 absolute left-1/2 -translate-x-1/2">
            E - CERTIFICATE
          </h1>
        </div>
        <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 rounded-full mb-6"></div>

        {/* Product Details */}
        <div className="mb-8">
          <div className="flex flex-row items-start gap-6">
            <div className="flex-1 space-y-2">
              <h2 className="text-lg font-semibold text-yellow-600 mb-4">PRODUCT DETAILS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><p className="font-medium">Product Name:</p><p className="text-gray-700">{certificate.productName}</p></div>
                <div><p className="font-medium">SKU Code Number:</p><p className="text-gray-700">{certificate.sku}</p></div>
                <div><p className="font-medium">Barcode Number:</p><p className="text-gray-700">{certificate.barcodeNumber}</p></div>
                <div><p className="font-medium">Height:</p><p className="text-gray-700">{certificate.height} mm</p></div>
                <div><p className="font-medium">Width:</p><p className="text-gray-700">{certificate.width} mm</p></div>
                <div><p className="font-medium">Gross Weight:</p><p className="text-gray-700">{certificate.grossWeight} g</p></div>
              </div>
            </div>
            <div className="flex-shrink-0 w-32 h-40">
              <img src={certificate.imageUrl} alt="Product" className="w-full h-full object-cover rounded-lg border border-yellow-300" />
            </div>
          </div>
          <div className="text-right mt-4">
            <p className="text-sm font-medium text-yellow-600">
              CERTIFICATE NUMBER: {certificate.certificateNumber}
            </p>
          </div>
        </div>

        {/* Gold / Purity */}
        <div className="mb-8 p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-base font-semibold text-yellow-600 mb-2">{certificate?.metalName} / PURITY</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><p className="font-medium">Metal / Purity:</p><p className="text-gray-700">{certificate.metalPurity}</p></div>
            <div><p className="font-medium">Net Metal Weight:</p><p className="text-gray-700">{certificate.netMetalWeight} g</p></div>
          </div>
        </div>

        {/* Diamonds */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-yellow-600 mb-4">
{certificate?.metalName} 
            {/* TOTAL COUNT: {certificate.totalDiamondCount} */}
          </h3>
          <table className="w-full border-collapse border border-yellow-300 text-sm">
            <thead>
              <tr className="bg-yellow-100">
                <th className="border border-yellow-300 p-2 text-left">QUALITY</th>
              <th className="border border-yellow-300 p-2 text-left">WEIGHT ({certificate?.metaunit}) </th> 
                 {/* <th className="border border-yellow-300 p-2 text-left">SHAPE</th>
                <th className="border border-yellow-300 p-2 text-left">COUNT</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-yellow-300 p-2">{certificate.metalPurity}</td>
                <td className="border border-yellow-300 p-2">{certificate.netMetalWeight}</td>
                {/* <td className="border border-yellow-300 p-2">{certificate.diamondShape}</td> */}
                {/* <td className="border border-yellow-300 p-2">{certificate.totalDiamondCount}</td> */}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-600 space-y-1 mb-4">
          <p>* Tolerance +/- 0.05 grams.</p>
          {certificate?.metalName === "Diamond" && (
           <p>* All solitaires / diamonds graded as 0.137 ct.</p>
          )} 
          <p>Produced as mounting permits.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-yellow-600 border-t border-yellow-300 pt-4 text-sm">
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
