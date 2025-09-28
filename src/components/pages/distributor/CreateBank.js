import React, { useState } from "react";
import { endpoint } from "../../../utils/APIRoutes";
import { apiConnectorPost } from "../../../utils/ApiConnector";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CreateBank = ({ onClose }) => {
  const [formData, setFormData] = useState({
    account_holder_name: "",
    account_number: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const {
      account_holder_name,
      account_number,
      ifsc_code,
      bank_name,
      branch_name,
    } = formData;

    if (
      !account_holder_name ||
      !account_number ||
      !ifsc_code ||
      !bank_name ||
      !branch_name
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await apiConnectorPost(endpoint?.bank_create, formData);

      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response?.data?.message,
          confirmButtonColor: "#dbb855",
        });

        // Reset form
        setFormData({
          account_holder_name: "",
          account_number: "",
          ifsc_code: "",
          bank_name: "",
          branch_name: "",
        });

        // Close modal
        if (onClose) onClose();
      }
    } catch (error) {
      console.error("Error creating bank", error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className=" flex items-center   justify-center px-4">
      <div className="shadow-md rounded-lg w-full max-w-xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-8 text-[#dbb855]">
          Add Bank Details
        </h2>

        <form className="grid grid-cols-2 gap-6">
          {[
            { name: "account_holder_name", label: "Account Holder Name" },
            { name: "account_number", label: "Account Number" },
            { name: "ifsc_code", label: "IFSC Code" },
            { name: "bank_name", label: "Bank Name" },
            { name: "branch_name", label: "Branch Name" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label
                htmlFor={field.name}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                id={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.label}`}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
              />
            </div>
          ))}
        </form>
        <div className="flex justify-end gap-5">
          <button
            type="button"
            onClick={onClose}
            className="bg-yellow-300 text-white py-2 px-4 mt-4 rounded hover:bg-red-700 transition-all w-fit"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="bg-yellow-950 text-white py-2 w-fit p-2 mt-4 items-end rounded hover:bg-yellow-900 disabled:opacity-50 transition-all"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBank;
