import React, { useState } from "react";

export default function RateBookingForm() {
  const [form, setForm] = useState({
    stamp: "",
    weight: "0.000",
    rate: "0.00",
    amount: "0",
    delDate: "",
    type: "S",
    narration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="max-w-sm mx-auto !text-black bg-[#fbf6f1] border border-gray-400 p-4 rounded-md shadow-sm text-sm">
      <h2 className="text-lg font-semibold mb-3 text-purple-700 underline">
        Rate Booking
      </h2>

      {/* Stamp */}
      <div className="flex items-center gap-3 mb-2">
        <label className="w-20 text-purple-700 font-medium">Stamp</label>
        <input
          name="stamp"
          type="text"
          value={form.stamp}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 flex-1"
        />
      </div>

      {/* Weight */}
      <div className="flex items-center gap-3 mb-2">
        <label className="w-20 text-purple-700 font-medium">Weight</label>
        <input
          name="weight"
          type="text"
          value={form.weight}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 text-right w-32"
        />
      </div>

      {/* Rate */}
      <div className="flex items-center gap-3 mb-2">
        <label className="w-20 text-purple-700 font-medium">Rate</label>
        <input
          name="rate"
          type="text"
          value={form.rate}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 text-right w-32"
        />
      </div>

      {/* Amount */}
      <div className="flex items-center gap-3 mb-2">
        <label className="w-20 text-purple-700 font-medium">Amount</label>
        <input
          name="amount"
          type="text"
          value={form.amount}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 text-right w-32"
        />
      </div>

      {/* Delivery Date & Type */}
      <div className="flex items-center gap-3 mb-2">
        <label className="w-20 text-purple-700 font-medium">Del Date</label>
        <input
          name="delDate"
          type="text"
          placeholder="DD/MM/YYYY"
          value={form.delDate}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 w-28"
        />
        <label className="text-purple-700 font-medium">Type</label>
        <input
          name="type"
          type="text"
          value={form.type}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 w-10 text-center"
        />
      </div>

      {/* Narration */}
      <div className="flex items-center gap-3 mb-3">
        <label className="w-20 text-purple-700 font-medium">Narration</label>
        <input
          name="narration"
          type="text"
          value={form.narration}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 flex-1"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button className="px-4 py-1 border border-gray-500 rounded bg-white hover:bg-gray-100">
          Save
        </button>
        <button className="px-4 py-1 border border-gray-500 rounded bg-white hover:bg-gray-100">
          Cancel
        </button>
      </div>
    </div>
  );
}
