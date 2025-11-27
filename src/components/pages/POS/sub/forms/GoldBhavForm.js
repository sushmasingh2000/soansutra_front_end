import React, { useState } from 'react';

export default function GoldBhavForm() {
  const [form, setForm] = useState({
    type: 'Sale',
    weight: '0.000',
    tunch: '100.00',
    rate: '12640.00',
    tunch2: '0.00',
    value: '0.00',
    narration: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="max-w-3xl mx-auto !text-black bg-[#fbf6f1] border border-gray-400 p-4 rounded-md shadow-sm text-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-purple-700">GOLD BHAV</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="type"
              value="Sale"
              checked={form.type === 'Sale'}
              onChange={handleChange}
            />
            1. Sale
          </label>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="type"
              value="Purchase"
              checked={form.type === 'Purchase'}
              onChange={handleChange}
            />
            2. Purchase
          </label>
        </div>
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-5 gap-2 mb-1">
        <label className="text-purple-700 font-medium text-center">Weight</label>
        <label className="text-purple-700 font-medium text-center">Tunch</label>
        <label className="text-purple-700 font-medium text-center">Rate</label>
        <label className="text-purple-700 font-medium text-center">Tunch</label>
        <label className="text-purple-700 font-medium text-center">Value</label>
      </div>

      {/* Input Row */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        <input
          name="weight"
          type="text"
          value={form.weight}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 text-right"
        />
        <input
          name="tunch"
          type="text"
          value={form.tunch}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 text-right"
        />
        <input
          name="rate"
          type="text"
          value={form.rate}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 text-right"
        />
        <input
          name="tunch2"
          type="text"
          value={form.tunch2}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 text-right"
        />
        <input
          name="value"
          type="text"
          value={form.value}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 text-right"
        />
      </div>

      {/* Narration */}
      <div className="flex flex-col mb-3">
        <label className="text-purple-700 font-medium">Narration</label>
        <input
          name="narration"
          type="text"
          value={form.narration}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 w-full"
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