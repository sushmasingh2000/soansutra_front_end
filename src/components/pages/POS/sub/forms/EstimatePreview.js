import React from "react";
import { numberToWords } from "../../../../../utils/utilsFun";
import moment from "moment";

export default function EstimatePrintPreview({ formik }) {
  const handlePrint = () => {
    window.print();
  };

  const obj = formik?.values || {};
  const totalTotal =
    obj?.rows?.reduce((a, b) => a + Number(b?.total || 0), 0) || 0;

  const totalReceipt = Number(
    formik?.values?.receipt?.reduce(
      (a, b) => a + Number(b?.amount || 0),
      0 || 0
    ) || 0
  );
  const totalPayment = Number(
    formik?.values?.payment?.reduce(
      (a, b) => a + Number(b?.amount || 0),
      0 || 0
    ) || 0
  );

  const netBalance =
    totalTotal -
    totalReceipt +
    totalPayment +
    Number(formik?.values?.add_extra_amount || 0) -
    Number(formik?.values?.less_extra_amount || 0) +
    Number(formik.values.pb_closing_bal || 0);
  return (
    <div className="flex justify-center items-start bg-gray-50  relative">
      {/* 🖨️ Print Button (visible only on screen) */}
      <button
        onClick={handlePrint}
        className="absolute top-6 right-10 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-3 py-1 rounded-md shadow hover:opacity-90 print:hidden"
      >
        🖨️ Print
      </button>

      {/* Scrollable Container */}
      <div className="h-[80vh] w-full max-w-5xl overflow-y-auto border border-gray-300 rounded-md bg-white shadow-md">
        {/* Printable Area */}
        <div
          id="print-area"
          className="bg-white text-black text-[12px] w-[794px] min-h-[1123px] mx-auto p-6"
        >
          {/* HEADER */}
          <div className="text-center border-b border-gray-400 pb-2 mb-3">
            <h1 className="text-[16px] font-bold">SONASUTRA PRIVATE LIMITED</h1>
            <p className="text-[11px]">
              SHOP NO-10 BIDA MART RAJPURA BHADOHI-221401
            </p>
          </div>

          {/* CUSTOMER + BILL INFO */}
          <div className="flex justify-between mb-2">
            <div className="border border-gray-400 w-[60%] p-2">
              <p className="font-semibold text-[11px]">
                Customer Name & Address :
              </p>
              <p>{obj?.customer_details?.name}</p>
              <p>
                ID: {obj?.customer_details?.cust_unique_id},{" "}
                {obj?.customer_details?.address} {obj?.customer_details?.city}{" "}
                {obj?.customer_details?.country}{" "}
                {obj?.customer_details?.pincode}
              </p>
              <p>Ph #: {obj?.customer_details?.cl_phone}</p>
              <p>Email #: {obj?.customer_details?.cl_email}</p>
            </div>

            <div className="border border-gray-400 w-[35%] p-2">
              <div className="flex justify-between text-[12px]">
                <span className="font-semibold">Bill No.:</span>
                <span>{obj?.bill_no}</span>
              </div>
              <div className="flex justify-between text-[12px] mt-1">
                <span className="font-semibold">Date:</span>
                <span>{obj?.values?.curr_date || "07/11/2025"}</span>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <table className="w-full border border-gray-400 text-[11px] mb-2">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Particulars",
                  "Stamp",
                  "Gross Wt",
                  "Net Wt",
                  "Pcs",
                  "Rate",
                  "Making",
                  "Total",
                ].map((col, i) => (
                  <th
                    key={i}
                    className="border border-gray-400 p-[2px] text-center font-semibold"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {obj?.rows
                ?.filter((j) => Number(j?.total || 0) > 0)
                ?.map((row, i) => (
                  <tr key={i} className="text-center">
                    <td className="border border-gray-400 p-[2px] text-left">
                      {row.item}
                    </td>
                    <td className="border border-gray-400 p-[2px]">
                      {row.stamp}
                    </td>
                    <td className="border border-gray-400 p-[2px]">
                      {row.grWt}
                    </td>
                    <td className="border border-gray-400 p-[2px]">
                      {row.netWt}
                    </td>
                    <td className="border border-gray-400 p-[2px]">{row.pc}</td>
                    <td className="border border-gray-400 p-[2px]">
                      {row.rate}
                    </td>
                    {/* <td className="border border-gray-400 p-[2px]">
                    {row.value}
                  </td> */}
                    <td className="border border-gray-400 p-[2px]">
                      {row.lbr}/{row.on}
                    </td>
                    <td className="border border-gray-400 p-[2px]">
                      {row.total}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* TOTAL SECTION */}
          <div className="flex justify-end text-[11px] mb-3">
            <table className="border border-gray-400 w-[50%]">
              <tbody>
                <tr>
                  <td className="border border-gray-400 px-2 font-semibold">
                    Total Amount
                  </td>
                  <td className="border border-gray-400 px-2 text-right">
                    {totalTotal}
                  </td>
                </tr>
                {formik?.values?.receipt?.map((label, i) => (
                  <tr>
                    <td className="border border-gray-400 px-2">
                      RECEIPT <span>{label?.paymentType}</span>
                    </td>
                    <td className="border border-gray-400 px-2 text-right">
                      -{Number(label?.amount)?.toFixed(0) || 0}
                    </td>
                  </tr>
                ))}

                {formik?.values?.payment?.map((label, i) => (
                  <tr>
                    <td className="border border-gray-400 px-2">
                      PAYMENT <span>{label?.paymentType}</span>
                    </td>
                    <td className="border border-gray-400 px-2 text-right">
                      +{Number(label?.amount)?.toFixed(0) || 0}
                    </td>
                  </tr>
                ))}

                {formik?.values?.pb_billing_date && (
                  <tr>
                    <td className="border border-gray-400 px-2">
                      Due Bal [
                      {moment(formik?.values?.pb_billing_date)?.format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                      ]
                    </td>
                    <td className="border border-gray-400 px-2 text-right">
                      {formik?.values?.pb_closing_bal}
                    </td>
                  </tr>
                )}
                {formik.values.add_extra_amount && (
                  <tr>
                    <td className="border border-gray-400 px-2 font-semibold">
                      Extra Add
                    </td>
                    <td className="border border-gray-400 px-2 text-right font-semibold">
                      {formik.values.add_extra_amount}
                    </td>
                  </tr>
                )}
                {formik.values.less_extra_amount && (
                  <tr>
                    <td className="border border-gray-400 px-2 font-semibold">
                      Extra Less
                    </td>
                    <td className="border border-gray-400 px-2 text-right font-semibold">
                      {formik.values.less_extra_amount}
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="border border-gray-400 px-2 font-semibold">
                    Closing Balance
                  </td>
                  <td className="border border-gray-400 px-2 text-right font-semibold">
                    {netBalance ? netBalance : "NIL"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* AMOUNT IN WORDS */}
          <p className="text-[11px] italic mb-6">
            Rs. {numberToWords(totalTotal)}
          </p>

          {/* SIGNATURE */}
          <div className="flex justify-end mt-12">
            <div className="text-right">
              <p className="text-[11px] font-semibold">
                FOR SONASUTRA PRIVATE LIMITED
              </p>
              <div className="border-t border-gray-400 mt-6 pt-1 text-[11px]">
                Authorized Signatory
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hide print button in print mode */}
      <style>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          body {
            background: white;
          }
        }
      `}</style>
    </div>
  );
}
