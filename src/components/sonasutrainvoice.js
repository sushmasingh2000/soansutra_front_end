import React from "react";
import { useQuery } from "react-query";
import logo from "../assets/desklogo.png";
import { apiConnectorGet, usequeryBoolean } from "../utils/ApiConnector";
import { endpoint } from "../utils/APIRoutes";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
const SonasutraInvoice = () => {
  const { orderId } = useParams();
  const { data } = useQuery(
    ["invoice_get", orderId],
    () => apiConnectorGet(`${endpoint.get_invoice}?order_id=${orderId}`),
    usequeryBoolean
  );

  const invoice_detail = data?.data?.result?.[0] || [];
  const store = invoice_detail?.store_details || [];
  const bill = invoice_detail?.billing_details || [];
  const ship = invoice_detail?.shipping_details || [];
  const order = invoice_detail?.order_items || [];
  const payment = invoice_detail?.payment_details || [];

  const totals = order?.reduce(
    (acc, item) => {
      acc.qnty += Number(item?.qnty || 0);
      acc.grossWeight += Number(item?.varient_weight || 0);
      acc.mat0 += Number(item?.material_details?.[0]?.weight || 0);
      acc.mat1 += Number(item?.material_details?.[1]?.weight || 0);
      acc.mat2 += Number(item?.material_details?.[2]?.weight || 0);
      acc.making += Number(item?.making_price || 0);
      acc.price += Number(item?.total_price || 0);
      return acc;
    },
    {
      qnty: 0,
      grossWeight: 0,
      mat0: 0,
      mat1: 0,
      mat2: 0,
      making: 0,
      price: 0,
    }
  );

  const netWeight = totals.mat0 + totals.mat1 + totals.mat2;

  function numberToWords(num) {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const numToWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100)
        return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
      if (n < 1000)
        return (
          a[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 !== 0 ? " " + numToWords(n % 100) : "")
        );
      if (n < 100000)
        return (
          numToWords(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 !== 0 ? " " + numToWords(n % 1000) : "")
        );
      if (n < 10000000)
        return (
          numToWords(Math.floor(n / 100000)) +
          " Lakh" +
          (n % 100000 !== 0 ? " " + numToWords(n % 100000) : "")
        );
      return (
        numToWords(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 !== 0 ? " " + numToWords(n % 10000000) : "")
      );
    };

    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100);

    let words = numToWords(integerPart) + " Rupees";
    if (decimalPart > 0) {
      words += " and " + numToWords(decimalPart) + " Paise";
    }
    return words + " Only";
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="font-sans text-[11px] leading-[1.2] bg-white text-black p-[15px] flex flex-col items-center min-h-screen">
      <div className="mb-5">
        <button
          onClick={handlePrint}
          className="bg-[#b38d03] hover:bg-[#a17d02] text-white px-4 py-2 rounded text-sm print:hidden"
        >
          Download Invoice (PDF)
        </button>
      </div>

      <div className="w-[210mm] max-w-[210mm] mx-auto">
        {/* Page 1 */}
        <div className="w-[210mm] h-[297mm] border-2 border-black bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] p-[10px] mb-[20px] relative print:mb-0 print:shadow-none print:[page-break-after:always]">
          <div className="max-w-full border-none bg-white">
            {/* Header Section */}
            <div className="flex items-start p-[10px_15px] border-b border-black">
              <div className="flex items-center w-[200px] mr-5">
                {/* Logo */}
                <div className="mr-2">
                  <img src={logo} alt="logo" className="w-8 h-6" />
                </div>

                {/* Text */}
                <div>
                  <div className="text-[#b38d03] font-bold text-base mb-[3px]">
                    Sonasutra
                  </div>
                  <div className="text-[8px] text-[#666] italic">
                    A Sonasutra Partnership
                  </div>
                </div>
              </div>

              <div className="flex-1 text-[10px] leading-[1.3]">
                <div className="font-bold mb-[2px]">
                  {store?.name}
                  {/* Sonasutra TRADING PRIVATE LIMITED - Subsidiary of Titan
                  Company Limited */}
                </div>
                <div>
                  {store?.address}
                  {store?.city}
                  {store?.pin_code}
                  {/* Shop No 11, Ground Floor, Tower A, Vinayak Plaza, Maldahiya
                  Crossing, Varanasi- 221001, Varanasi - 221001 */}
                </div>
                <div>
                  {" "}
                  {store?.state} {store?.country}
                </div>
                <div>
                  <strong>Store Contact Details:</strong> {store?.phone}&{" "}
                  {store?.email}
                </div>
              </div>
              <div className="text-right w-[200px]">
                <h1 className="text-lg font-bold mb-[2px]">Tax Invoice</h1>
                <div className="text-[9px] italic">
                  (Original copy for recipient)
                </div>
                <div className="w-[80px] h-[80px] border border-black mt-[5px] bg-[#f0f0f0] flex items-center justify-center text-[8px]">
                  QR CODE
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="flex p-[10px_15px] border-b border-black">
              <div className="flex-1 text-[10px]">
                <div>
                  <strong>GST No :</strong> {store?.gstin_no}
                </div>
                <div>
                  <strong>PAN :</strong> {store?.pan_no}
                </div>
                <div>
                  <strong>Certificate ID:</strong>{" "}
                  {invoice_detail?.certificate_id}
                </div>
              </div>
              <div className="flex-1 text-right text-[10px]">
                <div>
                  <strong>Order No :</strong> {invoice_detail?.certificate_no}{" "}
                  <strong>Dated :</strong>{" "}
                  {moment(bill?.order_date)?.format("DD-MM-YYYY")}
                </div>
                <div>
                  <strong>Doc No :</strong> {invoice_detail?.doc_id}{" "}
                  <strong> Dated :</strong>{" "}
                  {moment(invoice_detail?.today_date)?.format("DD-MM-YYYY")}
                </div>
              </div>
            </div>

            {/* Billing Section */}
            <div className="flex p-[10px_15px]">
              <div className="flex-1 pr-[15px] text-[10px]">
                <div className="font-bold text-[12px] mb-[5px]">Bill to</div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    Name :
                  </span>{" "}
                  {bill?.name || "--"}
                </div>
                {/* <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    Number :
                  </span>{" "}
                  +91 7398307284
                </div> */}
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    Address :
                  </span>{" "}
                  {bill?.address}
                </div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    PIN :
                  </span>{" "}
                  {bill?.postal_code}
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <span className="font-bold inline-block min-w-[60px]">
                    State :
                  </span>{" "}
                  {bill?.state}
                  {/* <span className="font-bold inline-block min-w-[60px]">
                    State Code :
                  </span>{" "}
                  09 */}
                </div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    GSTIN : {store?.gstin_no}
                  </span>{" "}
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <span className="font-bold inline-block min-w-[60px]">
                    PAN : {store?.pan_no}
                  </span>
                </div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    Profile ID :
                  </span>{" "}
                  {invoice_detail?.profile_id}
                </div>
              </div>
              {invoice_detail?.product_type === "PRODUCT" && (
                <div className="flex-1 pr-[15px] text-[10px]">
                  <div className="font-bold text-[12px] mb-[5px]">Ship to</div>
                  <div className="mb-[2px]">
                    <span className="font-bold inline-block min-w-[60px]">
                      Name :
                    </span>{" "}
                    {ship?.name}
                  </div>
                  {/* <div className="mb-[2px]">
                    <span className="font-bold inline-block min-w-[60px]">
                      Number :
                    </span>{" "}
                    +91 7307515355
                  </div> */}
                  <div className="mb-[2px]">
                    <span className="font-bold inline-block min-w-[60px]">
                      Address :
                    </span>{" "}
                    {ship?.address}
                  </div>
                  <div className="mb-[2px]">
                    <span className="font-bold inline-block min-w-[60px]">
                      PIN :
                    </span>{" "}
                    {ship?.postal_code}
                  </div>
                  <div className="mb-[2px]">
                    <span className="font-bold inline-block min-w-[60px]">
                      State :
                    </span>{" "}
                    {ship?.state}
                  </div>
                  {/* <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    Place of Supply :
                  </span>{" "}
                  09
                </div> */}
                </div>
              )}
            </div>

            {/* Products Section */}
            {invoice_detail?.product_type === "PRODUCT" ? (
              <div className="p-[0_15px]">
                <table className="w-full border-collapse text-[9px] mb-[10px]">
                  <thead>
                    <tr>
                      <th
                        className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]"
                        rowSpan="2"
                      >
                        Sr No.
                      </th>
                      <th
                        className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]"
                        rowSpan="2"
                      >
                        Product Code
                      </th>
                      <th
                        className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]"
                        rowSpan="2"
                      >
                        Description of Goods
                      </th>
                      <th
                        className="bg-[#666] text-white border border-black p-[8px_5px] text-center font-bold text-[8px]"
                        colSpan="9"
                      >
                        Certificate No - {invoice_detail?.certificate_no}
                      </th>
                    </tr>
                    <tr>
                      <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]">
                        Purity
                        <br />
                        (Karat)
                      </th>
                      <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]">
                        HSN
                        <br />
                        Codes
                      </th>
                      <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]">
                        Net
                        <br />
                        Qty
                      </th>
                      <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]">
                        Gross
                        <br />
                        WT (g)
                      </th>
                      <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]">
                        {order?.[0]?.material_details?.[0]?.master_mat_name}
                        <br />
                        WT (CT/g)
                      </th>
                      {order?.[1]?.material_details?.[1]?.master_mat_name && (
                        <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]">
                          {order?.[1]?.material_details?.[1]?.master_mat_name}
                          <br />
                          WT (CT/g)
                        </th>
                      )}
                      {order?.[2]?.material_details?.[2]?.master_mat_name && (
                        <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]">
                          {order?.[2]?.material_details?.[2]?.master_mat_name}
                          <br />
                          WT (CT/g)
                        </th>
                      )}
                      {/* <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]">
                      Gemstone
                      <br />
                      WT (CT/g)
                    </th> */}
                      <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]">
                        Net WT
                        <br />
                        (g)
                      </th>
                      <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]">
                        Making
                        <br />
                        Charges (₹)
                      </th>
                      <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]">
                        Price
                        <br />
                        (₹)
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {order?.map((item, index) => {
                      return (
                        <>
                          <tr>
                            <td className="border border-black p-[8px_5px] text-center text-[9px]">
                              {index + 1}
                            </td>
                            <td className="border border-black p-[8px_5px] text-center text-[9px] bg-[#e5e5e5] font-bold">
                              {item?.varient_sku}
                            </td>
                            <td className="border border-black p-[8px_5px] text-left text-[9px] relative">
                              {item?.product_name}
                            </td>
                            <td className="border border-black p-[8px_5px] text-center text-[9px]">
                              {item?.material_details?.[0]?.pur_stamp_name}
                            </td>
                            <td className="border border-black p-[8px_5px] text-center text-[9px]">
                              {item?.batch_no}
                            </td>
                            <td className="border border-black p-[8px_5px] text-center text-[9px]">
                              {item?.qnty}
                            </td>
                            <td className="border border-black p-[8px_5px] text-center text-[9px]">
                              {item?.varient_weight}
                            </td>
                            <td className="border border-black p-[8px_5px] text-center text-[9px]">
                              {item?.material_details?.[0]?.weight}
                            </td>
                            {item?.material_details?.[1]?.weight && (
                              <td className="border border-black p-[8px_5px] text-center text-[9px]">
                                {item?.material_details?.[1]?.weight}
                              </td>
                            )}
                            {item?.material_details?.[2]?.weight && (
                              <td className="border border-black p-[8px_5px] text-center text-[9px]">
                                {item?.material_details?.[2]?.weight}
                              </td>
                            )}

                            {/* <td className="border border-black p-[8px_5px] text-center text-[9px]">
                          0.000/0.000
                        </td> */}
                            <td className="border border-black p-[8px_5px] text-center text-[9px]">
                              {[0, 1, 2].reduce(
                                (sum, i) =>
                                  sum +
                                  (item?.material_details?.[i]?.weight || 0),
                                0
                              )}
                            </td>

                            <td className="border border-black p-[8px_5px] text-center text-[9px]">
                              {item?.making_price}
                            </td>
                            <td className="border border-black p-[8px_5px] text-center text-[9px]">
                              {item?.total_price}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    <tr className="bg-[#e5e5e5] font-bold">
                      <td
                        className="border border-black p-[8px_5px] text-center"
                        colSpan="5"
                      >
                        <strong>TOTAL</strong>
                      </td>
                      <td className="border border-black p-[8px_5px] text-center">
                        {totals.qnty}
                      </td>
                      <td className="border border-black p-[8px_5px] text-center">
                        {totals.grossWeight.toFixed(3)}
                      </td>
                      <td className="border border-black p-[8px_5px] text-center">
                        {totals.mat0.toFixed(3)}
                      </td>
                      {totals.mat1 > 0 && (
                        <td className="border border-black p-[8px_5px] text-center">
                          {totals.mat1.toFixed(3)}
                        </td>
                      )}
                      {totals.mat2 > 0 && (
                        <td className="border border-black p-[8px_5px] text-center">
                          {totals.mat2.toFixed(3)}
                        </td>
                      )}
                      {/* <td className="border border-black p-[8px_5px] text-center">
                      0.000/0.000
                    </td> */}
                      <td className="border border-black p-[8px_5px] text-center">
                        {netWeight.toFixed(3)}
                      </td>
                      <td className="border border-black p-[8px_5px] text-center">
                        ₹ {totals.making.toFixed(2)}
                      </td>
                      <td className="border border-black p-[8px_5px] text-center">
                        ₹ {totals.price.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-[0_15px]">
                <table className="w-full border-collapse text-[9px] mb-[10px]">
                  <thead>
                    <tr>
                      <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold">
                        Sr No.
                      </th>
                      <th className="bg-[#e5e5e5]  border border-black p-[8px_5px] text-center font-bold">
                        Order ID
                      </th>
                      <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold">
                        Product Type
                      </th>
                      <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold">
                        Weight
                      </th>
                      <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold">
                        Material Cost /gm
                      </th>
                      <th className="bg-[#e5e5e5]  border border-black p-[8px_5px] text-center font-bold">
                        Order Type
                      </th>

                      <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold">
                        Price (₹)
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="border border-black p-[8px_5px] text-center">
                        1
                      </td>
                      <td className="border border-black p-[8px_5px] text-center">
                        {invoice_detail?.certificate_no || "N/A"}
                      </td>
                      <td className="border border-black p-[8px_5px] text-center font-bold">
                        {invoice_detail?.product_type}
                      </td>
                      <td className="border border-black p-[8px_5px] text-center font-bold">
                        {invoice_detail?.total_weight}
                      </td>
                      <td className="border border-black p-[8px_5px] text-center font-bold">
                        {invoice_detail?.material_cost_per_unit}
                      </td>
                      <td className="border border-black p-[8px_5px] text-center">
                        {invoice_detail?.order_type || "N/A"}
                      </td>

                      <td className="border border-black p-[8px_5px] text-center">
                        ₹ {invoice_detail?.total_amount || "0.00"}
                      </td>
                    </tr>

                    {/* Optional: Total row (if needed) */}
                    {/* <tr className="bg-[#e5e5e5] font-bold">
                      <td
                        className="border border-black p-[8px_5px] text-center"
                        colSpan="4"
                      >
                        TOTAL
                      </td>
                      <td className="border border-black p-[8px_5px] text-center">
                        ₹ {invoice_detail?.grand_total || "0.00"}
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            )}

            {/* Lower Section */}
            <div className="flex p-[15px] gap-5">
              <div className="flex-1">
                <div>
                  <div className="font-bold text-[12px] mb-[5px]">
                    Payment Details
                  </div>
                  <table className="w-full border-collapse text-[9px] mb-[15px]">
                    <thead>
                      <tr>
                        <th className="bg-[#e5e5e5] border border-black p-[4px] text-center font-bold">
                          Sr
                          <br />
                          No.
                        </th>
                        <th className="bg-[#e5e5e5] border border-black p-[4px] text-center font-bold">
                          Doc No
                        </th>
                        <th className="bg-[#e5e5e5] border border-black p-[4px] text-center font-bold">
                          Doc
                          <br />
                          Date
                        </th>
                        <th className="bg-[#e5e5e5] border border-black p-[4px] text-center font-bold">
                          Payment Mode
                        </th>
                        <th className="bg-[#e5e5e5] border border-black p-[4px] text-center font-bold">
                          Amount
                          <br />₹
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-[4px] text-center">
                          01
                        </td>
                        <td className="border border-black p-[4px] text-center">
                          {payment?.trans_id}
                        </td>
                        <td className="border border-black p-[4px] text-center">
                          {moment(payment?.payment_date)?.format("DD-MM-YYYY")}
                        </td>
                        <td className="border border-black p-[4px] text-center">
                          {payment?.pm_name}
                        </td>
                        <td className="border border-black p-[4px] text-center">
                          {payment?.order_amount}
                        </td>
                      </tr>
                      <tr className="bg-[#e5e5e5] font-bold">
                        <td
                          className="border border-black p-[4px] text-center"
                          colSpan="4"
                        >
                          Total (Incl. of all taxes)
                        </td>
                        <td className="border border-black p-[4px] text-center">
                          {payment?.order_amount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {invoice_detail?.product_type === "PRODUCT" && (
                  <div>
                    <div className="font-bold text-[12px] mb-[5px]">
                      *Discount Details
                    </div>
                    <table className="w-full border-collapse text-[9px] mb-[15px]">
                      <thead>
                        <tr>
                          <th className="bg-[#e5e5e5] border border-black p-[4px] text-center font-bold">
                            Product
                          </th>

                          <th className="bg-[#e5e5e5] border border-black p-[4px] text-center font-bold">
                            Coupon Discount / xCLusive Points
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-black p-[4px] text-center">
                            {invoice_detail?.coupon_discount}
                          </td>

                          <td className="border border-black p-[4px] text-center">
                            {invoice_detail?.coupon_discount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-[8px] mt-[5px]">
                      (Note : The figures for Coupon Discount & xCLusive Points
                      are Net of Taxes)
                    </div>
                  </div>
                )}
              </div>
              <div className="w-[300px]">
                <table className="w-full border-collapse text-[10px] mt-[10px]">
                  <tbody>
                    {invoice_detail?.product_type === "PRODUCT" && (
                      <>
                        <tr>
                          <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                            Pre-Discount Value ₹
                          </td>
                          <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                            {invoice_detail?.total_discount}
                          </td>
                        </tr>

                        <tr>
                          <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                            Coupon Discount/xCLusive Points* ₹
                          </td>
                          <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                            {invoice_detail?.coupon_discount}
                          </td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        <strong>Taxable Value ₹</strong>
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        <strong>{invoice_detail?.total_tax}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        CGST ₹ (1.50%)
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        {(invoice_detail?.total_tax / 2)?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        SGST ₹ (1.50%)
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        {(invoice_detail?.total_tax / 2)?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        <strong>Total Invoice Price ₹</strong>
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        <strong>
                          {Number(invoice_detail?.grand_total)?.toFixed(2)}
                        </strong>
                      </td>
                    </tr>
                    {/* <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        Cash Discount ₹
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        0.00
                      </td>
                    </tr> */}
                    {/* <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        TCS ₹
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        0.00
                      </td>
                    </tr> */}
                    <tr className="bg-[#e5e5e5] font-bold">
                      <td className="p-[3px_8px] border border-black text-left">
                        <strong>Total Payable Amount ₹ (Rounded off)</strong>
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        <strong>
                          {Math.round(invoice_detail?.grand_total || 0)}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Invoice in Words */}
            <div className="font-bold m-[10px_15px] text-[10px]">
              <div>
                <strong>Invoice value in words :</strong>
              </div>
              <div>
                {numberToWords(Math.round(invoice_detail?.grand_total || 0))}{" "}
                (Rounded off)
              </div>
            </div>

            {/* Rates Section */}
            <div className="m-[10px_15px] text-[10px]">
              {order?.[0]?.material_details?.map((item) => {
                return (
                  <div>
                    <strong>Standard {item?.master_mat_name} Rate for :</strong>{" "}
                    {item?.pur_stamp_name}T: ₹ {item?.ma_price_per_unit}/
                    {item?.ma_unit}
                  </div>
                );
              })}

              {order?.[0]?.material_details?.map((item) => {
                return (
                  <div>
                    <strong>{item?.material_name} Rate for :</strong> ₹{" "}
                    {item?.ma_price_per_unit}/{item?.ma_unit}
                  </div>
                );
              })}
            </div>
          </div>
           {invoice_detail?.product_type === "PRODUCT" && (
          <div className="absolute bottom-[10px] left-0 right-0 text-center text-[10px] m-0">
            <strong>Page 1 of 2</strong>
          </div> )}
        </div>

        {/* Page 2 */}
        {invoice_detail?.product_type === "PRODUCT" && (
          <div className="w-[210mm] h-[297mm] border-2 border-black bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] p-[10px] relative print:mb-0 print:shadow-none">
            <div className="max-w-full border-none bg-white">
              {/* Terms and Conditions */}
              <div className="m-[15px] border border-black p-[10px]">
                <div className="font-bold text-[12px] mb-[8px]">
                  Terms & Conditions :
                </div>
                <div className="text-[9px] leading-[1.3]">
                  <ol className="pl-[15px]">
                    <li className="mb-[4px] text-justify">
                      We hereby certify that our registration certificate under
                      the Central Goods and Services Tax Act, 2017 is in force on
                      the date on which the supply of the goods/services specified
                      in this tax invoice is made by us and that the transaction
                      of the sale covered by this tax Invoice has been effected by
                      us and it shall be accounted for in the turnover of supplies
                      while filing of return and the due tax, if any payable on
                      the supply has been paid or shall be paid.
                    </li>
                    <li className="mb-[4px] text-justify">
                      Weight verified and received product in good condition
                    </li>
                    <li className="mb-[4px] text-justify">
                      Applicable Indian laws shall govern the transaction. In case
                      of any dispute, courts in
                      {/* e-gold */}
                      {/* product */}
                      {invoice_detail?.product_type === "PRODUCT" ? (
                        <p>
                          {store.city}, {store?.state}, {store.country}
                        </p>
                      ) : (
                        <p> Bhadohi, Uttar Pradesh, India</p>
                      )}
                      only shall have jurisdiction.
                    </li>
                    <li className="mb-[4px] text-justify">
                      We declare that the invoice shows the actual price of goods
                      described and that all the particulars are true and correct
                    </li>
                    <li className="mb-[4px] text-justify">
                      As per Government regulations, all our jewellery above 2gm
                      are hallmarked and certified. Hallmarking charges are ₹45/-+
                      GST per piece. The Consumer can get the purity of hallmarked
                      jewellery/artifacts verified from any of the BIS recognised
                      A&H centers. The list of centers along with address and
                      contact details is available on the website: www.bis.gov.in
                    </li>
                    <li className="mb-[4px] text-justify">
                      Read or understood and agreed to the attached terms and
                      conditions
                    </li>
                    <li className="mb-[4px] text-justify">
                      Company gives cognizance only to Computer generated tax
                      Invoice.
                    </li>
                    <li className="mb-[4px] text-justify">
                      Prices are rounded off to the nearest Indian rupee.
                    </li>
                    <li className="mb-[4px] text-justify">
                      No claim of weight difference will be entertained after
                      purchase of the gold/ornament
                    </li>
                    <li className="mb-[4px] text-justify">
                      Please ensure that this invoice accompanies the Jewellery
                      for future exchange of the jewellery purchased.
                    </li>
                    <li className="mb-[4px] text-justify">
                      In case the Customer(s) wishes to have more information
                      relating to the Invoice, the same would be provided on
                      request, separately.
                    </li>
                    <li className="mb-[4px] text-justify">
                      The diamonds herein invoiced have been purchased from
                      legitimate sources not involved in funding conflict and in
                      compliance with United Nations resolutions. The seller
                      hereby guarantees that these diamonds are conflict free,
                      based on personal knowledge and/or written guarantees
                      provided by the supplier of these diamonds.
                    </li>
                    <li className="mb-[4px] text-justify">
                      Tax is not payable on Reverse charge basis
                    </li>
                    <li className="mb-[4px] text-justify">
                      If the order is not picked up within 90 days, the order will
                      stand cancelled, and the advance amount will be refunded
                      back to the customer.
                    </li>
                    <li className="mb-[4px] text-justify">
                      Customers should pay 50% of the product value as advance
                      while placing orders for jewellery products and 70% in case
                      of solitaire products. In case the product is not collected
                      within 90 days from date of such intimation, then the order
                      shall stand automatically cancelled and paid value will be
                      refunded back to the customer.
                    </li>
                    <li className="mb-[4px] text-justify">
                      Refer company's website for other terms and conditions
                      https://www.sonasutra.com/terms-and-conditions. Company
                      reserves the right to modify these terms and conditions from
                      time to time. Payment & Refunds|15-Day Money Back|Advance
                      Receipt/Customer order|Made-To-Order|Old Gold Exchange
                      Programme (OGE)
                    </li>
                    <li className="mb-[4px] text-justify">
                      We've upgraded our policy! 15-Day Full Value Exchange
                      instead of a 15-day Money Back. With this, customers can
                      exchange their purchase for the full value without retaining
                      any balance.
                    </li>
                  </ol>
                </div>
                <div className="flex justify-between mt-[20px]">
                  <div className="w-[45%] text-[10px]">
                    <strong>Customer Name :</strong>
                  </div>
                  <div className="w-[45%] text-[10px]">
                    <strong>Customer Signature :</strong>
                  </div>
                </div>
              </div>

              {/* Footer Section */}
              <div>
                <div className="text-center m-[10px_15px] text-[9px] leading-[1.2]">
                  Read or understood and agreed to the attached terms and
                  conditions. www.sonasutra.com/terms-and-conditions
                </div>
                <div className="text-center font-bold m-[10px_15px] text-[10px]">
                  THIS IS A COMPUTER GENERATED INVOICE AND HENCE NO SIGNATURE IS
                  REQUIRED
                </div>
                <div className="text-center m-[20px_0] p-[20px] bg-[#f0f0f0] rounded-[10px]">
                  <div className="font-bold text-sm mb-[5px]">
                    Scan for Digital Certificate
                  </div>
                  <div className="text-[10px] mb-[15px]">
                    You can check your certificate number at the front of this
                    invoice
                  </div>
                  <div className="inline-block w-[80px] h-[80px] border-2 border-black bg-white mb-[15px] relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                      {/* QR CODE */}
                      <img
                        src={invoice_detail?.digital_certificate}
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <br />
                  <div className="w-[60px] h-[60px] rounded-full bg-[#666] m-auto relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[8px] text-center">
                      SEAL
                    </div>
                  </div>
                </div>
                <div className="text-center text-[9px] leading-[1.3] m-[15px]">
                  <div className="mb-[5px]">
                    <strong>Sonasutra Regd & Corporate Office:</strong> Shop No 10
                    Rajpura,BIDA MART, Bhadohi, Sant Ravidas Nagar, Bhadohi, Uttar
                    Pradesh, India, 221401
                  </div>
                  <div className="mb-[5px]">
                    <strong>CIN :</strong> U47733UP2025PTC225721.{" "}
                    <strong>Website:</strong> www.sonasutra.com.{" "}
                    <strong>Toll-free Number:</strong> 1800 102 0103
                  </div>
                  <div className="mb-[5px]">
                    Thank you for shopping at Sonasutra. The next time you to buy
                    a product, don't forget to visit www.sonasutra.com for the
                    latest designs.
                  </div>
                  <div className="mb-[5px]">
                    You can also call us on 7068454247 from 9 A.M to 12 A.M IST
                    (Mon - Sat) , 9 A.M to 9 P.M (Sun).
                  </div>
                  <div className="mb-[5px]">
                    For detailed terms pertaining to our Returns & Exchanges
                    Policy, refer to sonasutra.com/returns-exchanges
                  </div>
                  <div className="mb-[10px]">
                    You can also write to us at cs@sonasutra.com E & OE
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-[10px] left-0 right-0 text-center text-[10px] m-0">
              <strong>Page 2 of 2</strong>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @@media (max-width: 768px) {
          .header-section {
            flex-direction: column;
            text-align: center;
          }
          .logo-section {
            width: 100%;
            margin-bottom: 10px;
          }
          .tax-invoice {
            width: 100%;
            text-align: center;
          }
          .invoice-details,
          .billing-section,
          .lower-section {
            flex-direction: column;
          }
          .bill-to,
          .ship-to {
            margin-bottom: 15px;
          }
          .right-column {
            width: 100%;
            margin-top: 15px;
          }
          .products-table {
            font-size: 7px;
          }
          .products-table th,
          .products-table td {
            padding: 2px 1px;
          }
        }
        @@media (max-width: 480px) {
          body {
            padding: 5px;
          }
          .products-table {
            font-size: 6px;
          }
          .signature-section {
            flex-direction: column;
          }
          .signature-left,
          .signature-right {
            width: 100%;
            margin-bottom: 10px;
          }
        }
        @@media print {
          .page {
            margin: 0;
            box-shadow: none;
            page-break-after: always;
          }
          .page:last-child {
            page-break-after: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default SonasutraInvoice;
