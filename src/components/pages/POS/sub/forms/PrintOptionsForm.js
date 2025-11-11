import React, { useState } from "react";
import AlertDialog from "../AlertDialog";
import EstimatePrintPreview from "./EstimatePreview";

export default function PrintOptionsForm({formik}) {
  const [oepnDialog, setOpenDialog] = useState(false);

  const [form, setForm] = useState({
    lastBalance: false,
    whatsappText: false,
    receiptDetails: true,
    email: false,
    uc: false,
    wa: false,
    ld: false,
    url: false,
    imageBlur: false,
    dueDate: "",
    format: "FORMAT3",
    addedDetail: "None",
    whatsapp: "",
    emailField: "",
    savePdf: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="w-[320px] bg-[#fbf6f1] border border-gray-400 rounded-md shadow-md p-3 text-[12px] text-black">
      <h2 className="text-[14px] font-semibold text-purple-700 mb-2 underline">
        Print Options
      </h2>

      {/* Row 1 - Last Balance / WhatsApp Text */}
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            name="lastBalance"
            checked={form.lastBalance}
            onChange={handleChange}
          />
          Last Balance
        </label>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            name="whatsappText"
            checked={form.whatsappText}
            onChange={handleChange}
          />
          Whatsapp Text
        </label>
      </div>

      {/* Row 2 - Rcpt Details / Email options */}
      <div className="mb-1">
        <label className="flex items-center gap-1 font-medium text-purple-700">
          <input
            type="checkbox"
            name="receiptDetails"
            checked={form.receiptDetails}
            onChange={handleChange}
          />
          Rcpt Details
        </label>
        <div className="grid grid-cols-4 gap-1 mt-1 pl-5">
          {["email", "uc", "wa", "ld", "url"].map((field) => (
            <label key={field} className="flex items-center gap-1">
              <input
                type="checkbox"
                name={field}
                checked={form[field]}
                onChange={handleChange}
              />
              {field.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      {/* Row 3 - Image Blur + small inputs */}
      <div className="flex items-center gap-2 mb-2">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            name="imageBlur"
            checked={form.imageBlur}
            onChange={handleChange}
          />
          Image Blur
        </label>
        <input
          type="text"
          className="border border-gray-400 rounded px-1 py-[1px] text-center w-8 text-[10px]"
        />
        <input
          type="text"
          className="border border-gray-400 rounded px-1 py-[1px] text-center w-8 text-[10px]"
        />
      </div>

      {/* Row 4 - Due Date */}
      <div className="flex items-center gap-2 mb-2">
        <label className="w-[60px] font-medium">Due Date</label>
        <input
          type="text"
          name="dueDate"
          placeholder="DD/MM/YYYY"
          value={form.dueDate}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-[2px] text-center text-[11px] flex-1"
        />
      </div>

      {/* Row 5 - Format */}
      <div className="flex items-center gap-2 mb-2">
        <label className="w-[60px] font-medium">Format</label>
        <select
          name="format"
          value={form.format}
          onChange={handleChange}
          className="border border-gray-400 rounded px-1 py-[2px] text-[11px] flex-1"
        >
          <option value="FORMAT1">FORMAT1</option>
          <option value="FORMAT2">FORMAT2</option>
          <option value="FORMAT3">FORMAT3</option>
          <option value="FORMAT4">FORMAT4</option>
        </select>
      </div>

      {/* Row 6 - Add Studed Detail */}
      <div className="flex items-center gap-2 mb-2">
        <label className="w-[110px] font-medium text-[11px]">
          Add Studed detail
        </label>
        <select
          name="addedDetail"
          value={form.addedDetail}
          onChange={handleChange}
          className="border border-gray-400 rounded px-1 py-[2px] text-[11px] flex-1"
        >
          <option value="None">0.None</option>
          <option value="Partial">1.Partial</option>
          <option value="Full">2.Full</option>
        </select>
      </div>

      {/* Row 7 - Whatsapp + Save PDF */}
      <div className="flex items-center gap-2 mb-2">
        <label className="w-[60px] font-medium">Whatsapp</label>
        <input
          type="text"
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-[2px] text-[11px] flex-1"
        />
        <label className="flex items-center gap-1 text-[11px]">
          <input
            type="checkbox"
            name="savePdf"
            checked={form.savePdf}
            onChange={handleChange}
          />
          Save PDF
        </label>
      </div>

      {/* Row 8 - Email */}
      <div className="flex items-center gap-2 mb-3">
        <label className="w-[60px] font-medium">Email</label>
        <input
          type="text"
          name="emailField"
          value={form.emailField}
          onChange={handleChange}
          className="border border-gray-400 rounded px-2 py-[2px] text-[11px] flex-1"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between text-[11px] mt-2">
        <button className="px-2 py-[3px] border border-gray-500 rounded bg-white hover:bg-gray-100 w-[72px]">
          1. Printer
        </button>
        <button
          onClick={() => setOpenDialog(true)}
          className="px-2 py-[3px] border border-gray-500 rounded bg-white hover:bg-gray-100 w-[72px]"
        >
          2. Preview
        </button>
        <button className="px-2 py-[3px] border border-gray-500 rounded bg-white hover:bg-gray-100 w-[72px]">
          3. Send Url
        </button>
        <button className="px-2 py-[3px] border border-gray-500 rounded bg-white hover:bg-gray-100 w-[72px]">
          D. Sign
        </button>
      </div>
      <AlertDialog
        openDialog={oepnDialog}
        setOpenDialog={setOpenDialog}
        header={oepnDialog}
        content={<EstimatePrintPreview formik={formik}/>}
        // className={"!w-[50vw]"}
      />
    </div>
  );
}
