import React, { useState } from "react";

export default function TransferForm() {
  const [form, setForm] = useState({
    type: "Dr",
    account: "",
    amountField: "0.00",
    gold: "0.000",
    silver: "0.000",
    amount: "0.00",
    narration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto !text-black bg-[#fbf6f1] border border-gray-400 p-4 rounded-md shadow-sm text-sm">
      <h2 className="text-lg font-semibold mb-3 text-purple-700">TRANSFER</h2>

      {/* DR/CR Row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="type"
              value="Dr"
              checked={form.type === "Dr"}
              onChange={handleChange}
            />
            Dr
          </label>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="type"
              value="Cr"
              checked={form.type === "Cr"}
              onChange={handleChange}
            />
            Cr
          </label>
        </div>
        <input
          name="account"
          type="text"
          value={form.account}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 flex-1"
        />
      </div>

      {/* Highlighted field */}
      <div className="flex mb-3">
        <input
          name="amountField"
          type="text"
          value={form.amountField}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 bg-blue-100 text-right w-full"
        />
      </div>

      {/* Gold */}
      <div className="flex items-center gap-3 mb-2">
        <label className="w-20 text-purple-700 font-medium">Gold</label>
        <input
          name="gold"
          type="text"
          value={form.gold}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-1 text-right w-32"
        />
      </div>

      {/* Silver */}
      <div className="flex items-center gap-3 mb-2">
        <label className="w-20 text-purple-700 font-medium">Silver</label>
        <input
          name="silver"
          type="text"
          value={form.silver}
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
