{/* MATERIAL DETAILS */}
{selectedVariant?.material_details?.length > 0 && (
  <div className="bg-yellow-50 rounded-lg p-3 mb-3 border border-yellow-100">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-5 h-5 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 font-bold text-sm">
        M
      </div>
      <span className="font-medium text-gray-800 text-sm">MATERIAL DETAILS</span>
    </div>
    <div className="grid grid-cols-2 gap-3 text-xs">
      {selectedVariant.material_details.map((material, index) => (
        <div key={index} className="border rounded p-2">
          <p className="text-gray-600 mb-1 font-medium">{material.material_name} ({material.pur_stamp_name})</p>
          <p className="text-gray-800">Weight: {material.weight} {material.v_un_name || "g"}</p>
          <p className="text-gray-800">Purity: {material.pur_purity_percent}%</p>
          <p className="text-gray-800">Price per Unit: ₹{material.final_mat_price_per_unit}</p>
        </div>
      ))}
    </div>
  </div>
)}

{/* ATTRIBUTES */}
{selectedVariant?.attributes?.length > 0 && (
  <div className="bg-green-50 rounded-lg p-3 mb-3 border border-green-100">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-sm">
        A
      </div>
      <span className="font-medium text-gray-800 text-sm">ADDITIONAL ATTRIBUTES</span>
    </div>
    <div className="grid grid-cols-2 gap-3 text-xs">
      {selectedVariant.attributes.map((attr, index) => (
        <div key={index} className="border rounded p-2">
          <p className="text-gray-600 mb-1 font-medium">{attr.attribute_name}</p>
          <p className="text-gray-800">
            {attr.value} {attr.un_name || ""}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
