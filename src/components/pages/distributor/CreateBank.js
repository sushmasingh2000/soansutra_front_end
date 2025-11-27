import React, { useState } from "react";
import { endpoint } from "../../../utils/APIRoutes";
import { apiConnectorPost } from "../../../utils/ApiConnector";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useQueryClient } from "react-query";
import { countryCodes } from "../../../Shared/rawdata";

const CreateBank = ({ onClose }) => {
  const [formData, setFormData] = useState({
    account_holder_name: "",
    account_number: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
    bene_vpa: "",
    bene_phone: "",
    country_code: "91",
    bene_email: "",
    bene_address: "",
    bene_city: "",
    bene_state: "",
    bene_postal_code: "",
  });

  const [loading, setLoading] = useState(false);
  const client = useQueryClient();
  const [selectedCountryCode, setSelectedCountryCode] = useState("91");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "account_holder_name",
      "account_number",
      "ifsc_code",
      "bank_name",
      "branch_name",
      "bene_vpa",
      "bene_phone",
      "country_code",
      "bene_email",
      "bene_address",
      "bene_city",
      "bene_state",
      "bene_postal_code",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error("Please fill all fields");
        return;
      }
    }

    setLoading(true);
    try {
      const response = await apiConnectorPost(endpoint?.bank_create, formData);
      toast(response?.data?.message);

      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response?.data?.message,
          confirmButtonColor: "#dbb855",
        });

        setFormData({
          account_holder_name: "",
          account_number: "",
          ifsc_code: "",
          bank_name: "",
          branch_name: "",
          bene_vpa: "",
          bene_phone: "",
          country_code: "",
          bene_email: "",
          bene_address: "",
          bene_city: "",
          bene_state: "",
          bene_postal_code: "",
        });

        client.refetchQueries("bank_detail");
        if (onClose) onClose();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="shadow-md rounded-lg w-full max-w-5xl p-6 md:p-8 bg-white">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8 text-[#dbb855]">
          Add Bank Details
        </h2>

        {/* RESPONSIVE GRID — mobile=1 col, md=2 cols */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Generic Input */}
          {[
            { label: "Account Holder Name", name: "account_holder_name" },
            { label: "Account Number", name: "account_number" },
            { label: "IFSC Code", name: "ifsc_code" },
            { label: "Bank Name", name: "bank_name" },
            { label: "Branch Name", name: "branch_name" },
            { label: "VPA", name: "bene_vpa" },
            { label: "Email", name: "bene_email" },
            { label: "Beneficiary Address", name: "bene_address" },
            { label: "City", name: "bene_city" },
            { label: "State", name: "bene_state" },
            { label: "Postal Code", name: "bene_postal_code" },
          ].map((field) => (
            <div className="flex flex-col" key={field.name}>
              <label className="mb-1 text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.label}`}
                className="px-4 py-2 border rounded-md focus:ring-[#dbb855] focus:outline-none"
              />
            </div>
          ))}

          {/* Country Code + Phone */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Mobile No.
            </label>

            <div className="flex">
              <select
                value={selectedCountryCode}
                onChange={(e) => {
                  setSelectedCountryCode(e.target.value);
                  setFormData({ ...formData, country_code: e.target.value });
                }}
                className="w-28 px-4 py-2 border rounded-l-md bg-white focus:ring-[#dbb855] focus:outline-none"
              >
                {countryCodes.map(({ country, code }) => (
                  <option key={country} value={code}>
                    +{code} ({country})
                  </option>
                ))}
              </select>

              <input
                name="bene_phone"
                placeholder="Enter Mobile No."
                value={formData.bene_phone}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-l-0 rounded-r-md focus:ring-[#dbb855] focus:outline-none"
              />
            </div>
          </div>
        </form>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-red-700 text-white py-2 px-6 rounded hover:bg-red-500 transition"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="bg-yellow-900 text-white py-2 px-6 rounded hover:bg-yellow-800 disabled:opacity-50 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBank;
