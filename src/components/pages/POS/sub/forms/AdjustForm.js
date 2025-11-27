import React, { useState } from 'react';

export default function AdjustForm() {
  const [form, setForm] = useState({
    finalAmount: '0.00',
    discount: '0.00',
    discountText: '',
    cashReceived: '0.00',
    netBalance: '0.00',
    changeTo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto bg-[#fbf6f1] border border-gray-400 p-4 !text-black rounded-md shadow-sm text-sm">
      <h2 className="text-lg font-semibold mb-3 text-purple-700">ADJUST</h2>

      {/* Final Amount Row */}
      <div className="flex items-center gap-2 mb-3">
        <label className="w-28 text-purple-700 font-medium">Final Amount</label>
        <input
          name="finalAmount"
          type="text"
          value={form.finalAmount}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 w-28 text-right"
        />
        <span className="text-purple-700 font-medium text-xs">F3 - Change To Closing Amt</span>
      </div>

      {/* Discount Row */}
      <div className="flex items-center gap-2 mb-3">
        <label className="w-28 text-purple-700 font-medium">Discount</label>
        <input
          name="discount"
          type="text"
          value={form.discount}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 w-28 text-right"
        />
        <input
          name="discountText"
          type="text"
          placeholder="Discount"
          value={form.discountText}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 flex-1"
        />
      </div>

      {/* Cash Received */}
      <div className="flex items-center gap-2 mb-3">
        <label className="w-28 text-purple-700 font-medium">Cash Recd</label>
        <input
          name="cashReceived"
          type="text"
          value={form.cashReceived}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 w-28 text-right"
        />
      </div>

      {/* Net Balance */}
      <div className="flex items-center gap-2 mb-3">
        <label className="w-28 text-purple-700 font-medium">Net. Bal.</label>
        <input
          name="netBalance"
          type="text"
          value={form.netBalance}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 w-28 text-right"
        />
      </div>

      {/* Change To A/c */}
      <div className="flex items-center gap-2 mb-3">
        <label className="w-28 text-purple-700 font-medium">Change To A/c</label>
        <input
          name="changeTo"
          type="text"
          value={form.changeTo}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 flex-1"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button className="px-4 py-1 border border-gray-500 rounded bg-white hover:bg-gray-100">Save</button>
        <button className="px-4 py-1 border border-gray-500 rounded bg-white hover:bg-gray-100">Cancel</button>
      </div>
    </div>
  );
}
