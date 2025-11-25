import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ReceiptForm({ formik, setOpenDialog }) {
  const [form, setForm] = useState({
    paymentType: "Cash",
    name: "CASH",
    amount: "0.00",
    rate: "0.00",
    tunch: "0.00",
    fine: "0.000",
    metal: "Gold",
    narration: "",
    batch: "",
    type: "",
    expDate: "",
    apCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save Receipt data directly in formik (outside rows[])
  const handleSave = () => {
    if (form?.amount == 0)
      return toast("Amount Should be grater than 0 Rs.", { id: 1 });
    const prev = formik.values.receipt || [];

    const updatedReceipts = [...prev, form];

    formik.setFieldValue("receipt", updatedReceipts);

    setOpenDialog(false);
  };

  const handleCancel = () => {
    setForm({
      paymentType: "Cash",
      name: "CASH",
      amount: "0.00",
      rate: "0.00",
      tunch: "0.00",
      fine: "0.000",
      metal: "Gold",
      narration: "",
      batch: "",
      type: "",
      expDate: "",
      apCode: "",
    });
    setOpenDialog(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#fbf6f1] border border-gray-400 p-4 rounded-md shadow-sm text-sm text-black">
      <h2 className="text-lg font-semibold mb-3 text-purple-700">RECEIPT</h2>

      {/* Row 1 */}
      <div className="flex flex-wrap gap-2 mb-3 items-center">
        <select
          name="paymentType"
          value={form.paymentType}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 w-28"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Cheque">Cheque</option>
          <option value="Other">Other</option>
          <option value="UPI">UPI</option>
          <option value="OG">OG</option>
          <option value="Online">Online</option>
          <option value="OS">OS</option>
        </select>

        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 w-48"
        />

        <input
          name="amount"
          type="text"
          value={form.amount}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 w-24 text-right"
        />
      </div>

      {/* Row 2 */}
      <div className="flex flex-col mb-3">
        <label className="text-purple-700 font-medium">Narration</label>
        <textarea
          name="narration"
          value={form.narration}
          onChange={handleChange}
          rows="2"
          className="border border-gray-400 rounded px-2 py-1 resize-none"
        />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <label className="text-purple-700 font-medium">Rate</label>
          <input
            name="rate"
            type="text"
            value={form.rate}
            onChange={handleChange}
            className="border border-gray-400 rounded px-2 py-1 w-full text-right"
          />
        </div>

        <div>
          <label className="text-purple-700 font-medium">Batch</label>
          <input
            name="batch"
            type="text"
            value={form.batch}
            onChange={handleChange}
            className="border border-gray-400 rounded px-2 py-1 w-full"
          />
        </div>

        <div>
          <label className="text-purple-700 font-medium">Type</label>
          <input
            name="type"
            type="text"
            value={form.type}
            onChange={handleChange}
            className="border border-gray-400 rounded px-2 py-1 w-full"
          />
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <label className="text-purple-700 font-medium">Tunch</label>
          <div className="flex items-center gap-2">
            <input
              name="tunch"
              type="text"
              value={form.tunch}
              onChange={handleChange}
              className="border border-gray-400 rounded px-2 py-1 w-24 text-right"
            />
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="metal"
                value="Gold"
                checked={form.metal === "Gold"}
                onChange={handleChange}
              />
              Gold
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="metal"
                value="Silver"
                checked={form.metal === "Silver"}
                onChange={handleChange}
              />
              Sil
            </label>
          </div>
        </div>

        <div>
          <label className="text-purple-700 font-medium">Exp Date</label>
          <input
            name="expDate"
            type="text"
            placeholder="DD/MM/YYYY"
            value={form.expDate}
            onChange={handleChange}
            className="border border-gray-400 rounded px-2 py-1 w-full"
          />
        </div>

        <div>
          <label className="text-purple-700 font-medium">Ap. Code</label>
          <input
            name="apCode"
            type="text"
            value={form.apCode}
            onChange={handleChange}
            className="border border-gray-400 rounded px-2 py-1 w-full"
          />
        </div>
      </div>

      {/* Row 5 */}
      <div className="mb-3">
        <label className="text-purple-700 font-medium">Fine</label>
        <input
          name="fine"
          type="text"
          value={form.fine}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 w-24 text-right"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-1 border border-gray-500 rounded bg-white hover:bg-gray-100"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-1 border border-gray-500 rounded bg-white hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
