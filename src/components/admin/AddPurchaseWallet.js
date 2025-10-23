import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import Swal from "sweetalert2";

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

        const response = await apiConnectorPost(
          endpoint.creata_by_wallet,
          payload
        );

        Swal.fire({
          title: response?.data?.success ? "Success" : "Error",
          text: response?.data?.message,
          icon: response?.data?.success ? "success" : "error", // ✅ lowercase
        });

        if (response?.data?.success) {
          formik.resetForm();
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error?.message,
          icon: "error", // ✅ lowercase
        });
      } finally {
        setLoading(false);
      }
    },
  });
  const handleSubmitClick = () => {
    console.log("hdsaf");
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed with this transaction?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        formik.submitForm();
      }
    });
  };
  return (
    <div className="max-w-2xl mx-auto bg-white opacity-75 p-6 rounded shadow mt-5">
      <h2 className="text-xl text-center font-semibold mb-8">Purchase Transaction</h2>

      <div className="gap-5 grid grid-cols-2 space-x-4">
        <div>
          <label className="block mb-1 font-medium">User ID</label>
          <input
            type="text"
            name="userId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userId}
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.userId && formik.errors.userId
                ? "border-red-500"
                : ""
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
              formik.touched.amount && formik.errors.amount
                ? "border-red-500"
                : ""
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
              formik.touched.orderType && formik.errors.orderType
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="1">Credit (CR)</option>
            <option value="2">Debit (DR)</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            rows={4}
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
          onClick={handleSubmitClick}
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AddPurchaseWallet;
