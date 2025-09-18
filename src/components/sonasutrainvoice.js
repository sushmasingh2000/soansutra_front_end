import React from "react";
import { useQuery } from "react-query";
import logo from "../assets/desklogo.png";
import { apiConnectorGet, usequeryBoolean } from "../utils/ApiConnector";
import { endpoint } from "../utils/APIRoutes";
import { useParams } from "react-router-dom";
const SonasutraInvoice = () => {

  const { orderId } = useParams();
  const { data } = useQuery(
    ["invoice_get"],
    () => apiConnectorGet(`${endpoint.get_invoice}?order_id=${orderId}`),
    usequeryBoolean
  );

  const invoice_detail = data?.data?.result || [];
  
  console.log(invoice_detail?.[0]?.store_details);

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
                  Sonasutra TRADING PRIVATE LIMITED - Subsidiary of Titan
                  Company Limited
                </div>
                <div>
                  Shop No 11, Ground Floor, Tower A, Vinayak Plaza, Maldahiya
                  Crossing, Varanasi- 221001, Varanasi - 221001
                </div>
                <div>, Uttar Pradesh , India</div>
                <div>
                  <strong>Store Contact Details:</strong> 7307515355 7307515355
                  & cfvnsvpz@Sonasutra.com <strong>Store Timings:</strong> 11 am
                  to 9:00 pm
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
                  <strong>GST No :</strong> 09AADCC1791Q1Z2
                </div>
                <div>
                  <strong>PAN :</strong> AADCC1791Q
                </div>
              </div>
              <div className="flex-1 text-right text-[10px]">
                <div>
                  <strong>Order No :</strong> EZVNSVPZ8115O-JR{" "}
                  <strong>Dated :</strong> 01/01/2025
                </div>
                <div>
                  <strong>Doc No :</strong> SA223-0125-00003{" "}
                  <strong>Dated :</strong> 01/01/2025
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
                  Chanda Soni Customer
                </div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    Number :
                  </span>{" "}
                  +91 7398307284
                </div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    Address :
                  </span>{" "}
                  Jaunpur Jaunpur India
                </div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    PIN :
                  </span>{" "}
                  222137
                  <span className="font-bold inline-block min-w-[60px]">
                    State :
                  </span>{" "}
                  Uttar Pradesh
                  <span className="font-bold inline-block min-w-[60px]">
                    State Code :
                  </span>{" "}
                  09
                </div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    GSTIN :
                  </span>{" "}
                  <span className="font-bold inline-block min-w-[60px]">
                    PAN :
                  </span>
                </div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    Profile ID :
                  </span>{" "}
                  C2120635
                </div>
              </div>
              <div className="flex-1 pr-[15px] text-[10px]">
                <div className="font-bold text-[12px] mb-[5px]">Ship to</div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    Name :
                  </span>{" "}
                  Chanda Soni Customer
                </div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    Number :
                  </span>{" "}
                  +91 7307515355
                </div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    Address :
                  </span>{" "}
                  Shop No 11 Ground Floor Tower A Vinayak Plaza Maldahiya
                  Crossing Varanasi-221001 Varanasi India
                </div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    PIN :
                  </span>{" "}
                  221001
                </div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    State :
                  </span>{" "}
                  Uttar Pradesh
                </div>
                <div className="mb-[2px]">
                  <span className="font-bold inline-block min-w-[60px]">
                    Place of Supply :
                  </span>{" "}
                  09
                </div>
              </div>
            </div>

            {/* Products Section */}
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
                      Certificate No - JAYKBA67
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
                      Diamond
                      <br />
                      WT (CT/g)
                    </th>
                    <th className="bg-[#e5e5e5] border border-black p-[8px_5px] text-center font-bold text-[8px]">
                      Gemstone
                      <br />
                      WT (CT/g)
                    </th>
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
                  <tr>
                    <td className="border border-black p-[8px_5px] text-center text-[9px]">
                      01
                    </td>
                    <td className="border border-black p-[8px_5px] text-center text-[9px] bg-[#e5e5e5] font-bold">
                      JER04737-YDK000-NA <strong>FE97RUBNSXE</strong>
                    </td>
                    <td className="border border-black p-[8px_5px] text-left text-[9px] relative">
                      Starlight Kids' Diamond Earrings
                    </td>
                    <td className="border border-black p-[8px_5px] text-center text-[9px]">
                      18 KT
                    </td>
                    <td className="border border-black p-[8px_5px] text-center text-[9px]">
                      71131930
                    </td>
                    <td className="border border-black p-[8px_5px] text-center text-[9px]">
                      1 N
                    </td>
                    <td className="border border-black p-[8px_5px] text-center text-[9px]">
                      0.677
                    </td>
                    <td className="border border-black p-[8px_5px] text-center text-[9px]">
                      0.137/0.027
                    </td>
                    <td className="border border-black p-[8px_5px] text-center text-[9px]">
                      0.000/0.000
                    </td>
                    <td className="border border-black p-[8px_5px] text-center text-[9px]">
                      0.650
                    </td>
                    <td className="border border-black p-[8px_5px] text-center text-[9px]">
                      4140.00
                    </td>
                    <td className="border border-black p-[8px_5px] text-center text-[9px]">
                      26898.27
                    </td>
                  </tr>
                  <tr className="bg-[#e5e5e5] font-bold">
                    <td
                      className="border border-black p-[8px_5px] text-center"
                      colSpan="5"
                    >
                      <strong>TOTAL</strong>
                    </td>
                    <td className="border border-black p-[8px_5px] text-center">
                      1 N
                    </td>
                    <td className="border border-black p-[8px_5px] text-center">
                      0.677
                    </td>
                    <td className="border border-black p-[8px_5px] text-center">
                      0.137/0.027
                    </td>
                    <td className="border border-black p-[8px_5px] text-center">
                      0.000/0.000
                    </td>
                    <td className="border border-black p-[8px_5px] text-center">
                      0.650
                    </td>
                    <td className="border border-black p-[8px_5px] text-center">
                      4140.00
                    </td>
                    <td className="border border-black p-[8px_5px] text-center">
                      26898.27
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

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
                          REC/CFVNSVPZ/2024-25/JAN/3
                        </td>
                        <td className="border border-black p-[4px] text-center">
                          2025-01-01
                        </td>
                        <td className="border border-black p-[4px] text-center">
                          UPI
                        </td>
                        <td className="border border-black p-[4px] text-center">
                          24935.00
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
                          24935.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
                          Strike-Through Discount
                        </th>
                        <th className="bg-[#e5e5e5] border border-black p-[4px] text-center font-bold">
                          Coupon Discount / xCLusive Points
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-[4px] text-center">
                          Product 1
                        </td>
                        <td className="border border-black p-[4px] text-center">
                          2689.83
                        </td>
                        <td className="border border-black p-[4px] text-center">
                          0.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-[8px] mt-[5px]">
                    (Note : The figures for Coupon Discount & xCLusive Points
                    are Net of Taxes)
                  </div>
                </div>
              </div>
              <div className="w-[300px]">
                <table className="w-full border-collapse text-[10px] mt-[10px]">
                  <tbody>
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        Pre-Discount Value ₹
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        26898.27
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        Strike-Through Discount* ₹
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        - 2689.83
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        Coupon Discount/xCLusive Points* ₹
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        - 0.00
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        <strong>Taxable Value ₹</strong>
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        <strong>24208.44</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        CGST ₹ (1.50%)
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        363.13
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        SGST ₹ (1.50%)
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        363.13
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        IGST ₹ (0.00%)
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        0.00
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        <strong>Total Invoice Price ₹</strong>
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        <strong>24935.00</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        Cash Discount ₹
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        0.00
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#f5f5f5] p-[3px_8px] border border-black text-left">
                        TCS ₹
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        0.00
                      </td>
                    </tr>
                    <tr className="bg-[#e5e5e5] font-bold">
                      <td className="p-[3px_8px] border border-black text-left">
                        <strong>Total Payable Amount ₹ (Rounded off)</strong>
                      </td>
                      <td className="p-[3px_8px] border border-black text-right min-w-[80px]">
                        <strong>24935</strong>
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
                Twenty-Four Thousand Nine Hundred Thirty-Five Rupees Only
                (Rounded off)
              </div>
            </div>

            {/* Rates Section */}
            <div className="m-[10px_15px] text-[10px]">
              <div>
                <strong>Standard Gold Rate for 01-Jan-25 :</strong>{" "}
                24KT/22KT/18KT/14KT : ₹ 7901/ 7243/ 5926/ 4622
              </div>
              <div>
                <strong>Platinum Rate for 01-Jan-25 :</strong> ₹ 3490
              </div>
            </div>
          </div>
          <div className="absolute bottom-[10px] left-0 right-0 text-center text-[10px] m-0">
            <strong>Page 1 of 2</strong>
          </div>
        </div>

        {/* Page 2 */}
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
                    of any dispute, courts in Chennai only shall have
                    jurisdiction.
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
                    https://www.Sonasutra.com/terms-and-conditions. Company
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
                conditions. www.Sonasutra.com/terms-and-conditions
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
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[8px]">
                    QR CODE
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
                  <strong>Sonasutra Regd & Corporate Office:</strong> 727 Anna
                  Salai (Pathari Road) Thousand Lights, Chennai, Tamil Nadu,
                  India, 600006
                </div>
                <div className="mb-[5px]">
                  <strong>CIN :</strong> U52393TN2007PTC064830.{" "}
                  <strong>Website:</strong> www.Sonasutra.com.{" "}
                  <strong>Toll-free Number:</strong> 1800 102 0103
                </div>
                <div className="mb-[5px]">
                  Thank you for shopping at Sonasutra. The next time you to buy
                  a product, don't forget to visit www.Sonasutra.com for the
                  latest designs.
                </div>
                <div className="mb-[5px]">
                  You can also call us on 1800 102 0103 and 044-4293-5000 from 9
                  A.M to 12 A.M IST (Mon - Sat) , 9 A.M to 9 P.M (Sun).
                </div>
                <div className="mb-[5px]">
                  For detailed terms pertaining to our Returns & Exchanges
                  Policy, refer to Sonasutra.com/returns-exchanges
                </div>
                <div className="mb-[10px]">
                  You can also write to us at cs@Sonasutra.com E & OE
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[10px] left-0 right-0 text-center text-[10px] m-0">
            <strong>Page 2 of 2</strong>
          </div>
        </div>
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
