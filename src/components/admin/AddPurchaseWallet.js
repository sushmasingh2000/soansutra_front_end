import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";

const AddPurchaseWallet = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      userId: "",
      amount: "",
      orderType: "1",
      description: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = {
          cust_id: values.userId,
          req_amount: Number(values.amount),
           type: Number(values.orderType), // converting string to number (1 or 2)
          discripton: values.description,
        };

        const response = await apiConnectorPost(endpoint.creata_by_wallet, payload);
        toast(response?.data?.message)
        if (response?.success) {
          toast.success("Transaction successful!");
          formik.resetForm();
        } 
      } catch (error) {
        toast.error("API call failed: " + error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Purchase Transaction</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">User ID</label>
          <input
            type="text"
            name="userId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userId}
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.userId && formik.errors.userId ? "border-red-500" : ""
            }`}
            placeholder="Enter User ID"
          />
        
        </div>

        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.amount && formik.errors.amount ? "border-red-500" : ""
            }`}
            placeholder="Enter Amount"
            min="0.01"
            step="0.01"
          />
         
        </div>

        <div>
          <label className="block mb-1 font-medium">Order Type</label>
          <select
            name="orderType"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.orderType}
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.orderType && formik.errors.orderType ? "border-red-500" : ""
            }`}
          >
            <option value="1">Credit (CR)</option>
            <option value="2">Debit (DR)</option>
          </select>
         
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input
            type="text"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter Description"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddPurchaseWallet;
