import React, { useState } from "react";
import { apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";

const ShopInfoForm = () => {
  const [shopData, setShopData] = useState({
    shopName: "",
    owner: "",
    contact: "",
    address: "",
    state: "",
    district: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const body = {
      si_shop_name: shopData.shopName,
      si_owner: shopData.owner,
      si_contact: shopData.contact,
      si_address: shopData.address,
      si_state: shopData.state,
      si_district: shopData.district,
    };
    try {
      const res = await apiConnectorPost(endpoint?.get_shop_info, body);
      if (res?.data?.success) {
        setShopData({
          shopName: "",
          owner: "",
          contact: "",
          address: "",
          state: "",
          district: "",
        });
      }
      alert(res?.data?.message);
    } catch (e) {
      alert(e?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 border border-gray-200 mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        🏪 Shop Information
      </h2>

      <div className="space-y-4">
        {/* Shop Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shop Name*
          </label>
          <input
            type="text"
            name="shopName"
            value={shopData.shopName}
            onChange={handleChange}
            placeholder="Enter shop name"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          />
        </div>

        {/* Owner */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Owner Name*
          </label>
          <input
            type="text"
            name="owner"
            value={shopData.owner}
            onChange={handleChange}
            placeholder="Enter owner name"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact No.*
          </label>
          <input
            type="tel"
            name="contact"
            value={shopData.contact}
            onChange={handleChange}
            placeholder="Enter contact number"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address*
          </label>
          <textarea
            name="address"
            value={shopData.address}
            onChange={handleChange}
            placeholder="Enter shop address"
            required
            rows={2}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State*
          </label>
          <input
            type="text"
            name="state"
            value={shopData.state}
            onChange={handleChange}
            placeholder="Enter state name"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          />
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            District*
          </label>
          <input
            type="text"
            name="district"
            value={shopData.district}
            onChange={handleChange}
            placeholder="Enter district name"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          />
        </div>

        {/* Submit */}
        <button
          className="w-full py-3 bg-gradient-to-r from-[#502a0d] to-[#422006] text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
          onClick={handleSubmit}
        >
          Save Shop Info
        </button>
      </div>
    </div>
  );
};

export default ShopInfoForm;
