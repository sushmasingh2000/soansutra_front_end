import { useQuery } from "react-query";
import { apiConnectorGet } from "../../../../utils/ApiConnector";
import { endpoint } from "../../../../utils/APIRoutes";
import { colorfullScroll } from "../../../../utils/CustomCss";

export default function POSProductTable({ formik, defaultRow }) {
  const { data, isLoading } = useQuery(
    ["get_product_items_dropdown"],
    () => apiConnectorGet(endpoint?.get_product_item_dropdown),
    {
      keepPreviousData: true,
    }
  );

  const items = data?.data?.result || [];

  const headers = [
    "S/No.",
    "Type",
    "Item Name",
    "Stamp",
    "Remarks",
    "Unit",
    "Pc",
    "Pkt. Wt.",
    "Pkt. Less",
    "Gr. Wt.",
    "Less",
    "Net Wt.",
    "Tunch",
    "Wstg",
    "Rate",
    "Lbr.",
    "On",
    "Other",
    "Dis",
    "Fine",
    "Total",
    "Action",
  ];

  const dropdownOptions = {
    type: ["S"],
    item: ["Ring", "Chain", "Bracelet", "Pendant"],
    stamp: ["14KT", "16KT", "18KT", "20KT", "22KT", "23KT", "24KT"],
    unit: ["cr", "cent", "gm", "kg", "pc", "ratti"],
    on: ["per", "wt", "rs", "pc"],
  };

  // 🧮 Auto calculation handler
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const field = name.split(".")[2]; // ✅ Correct target
    const updatedRows = [...formik.values.rows];
    const row = { ...updatedRows[index], [field]: value };

    const num = (v) => parseFloat(v) || 0;

    const pw = num(row.pktWt);
    const qnt = num(row.pc);
    const pl = num(row.pktLess);
    const less = num(row.less);
    const rate = num(row.rate);
    const tunch = num(row.tunch);
    const wastage = num(row.wastage);
    const lbr = num(row.lbr);
    const other = num(row.other);
    const dis = num(row.dis);
    const on = row.on;
    const gw = pw - pl;
    const nw = gw - less;
    const fine = nw * (tunch / 100 + wastage / 100);
    let totalWithoutLbr = nw * rate + other - dis;
    let total;

    // 🔥 Apply labour based on `on` type
    switch (on) {
      case "pc":
        total = totalWithoutLbr + lbr * qnt;
        break;

      case "per":
        total = totalWithoutLbr + (totalWithoutLbr * lbr) / 100;
        break;

      case "wt":
        total = totalWithoutLbr + lbr * nw;
        break;

      case "rs":
        total = totalWithoutLbr + lbr;
        break;

      default:
        total = totalWithoutLbr + lbr;
    }

    row.grWt = gw ? gw.toFixed(3) : "";
    row.netWt = nw ? nw.toFixed(3) : "";
    row.fine = fine ? fine.toFixed(3) : "";
    row.total = total ? total.toFixed(2) : "";

    updatedRows[index] = row;
    formik.setFieldValue("rows", updatedRows);
  };

  const handleAddRow = () => {
    formik.setFieldValue("rows", [...formik.values.rows, { ...defaultRow }]);
  };

  const handleRemoveRow = (index) => {
    const newRows = formik.values.rows.filter((_, i) => i !== index);
    formik.setFieldValue("rows", newRows);
  };

  const inputClass = `
    w-[90px] text-[10px] px-2 py-[.5px] text-center bg-transparent 
    border-none outline-none focus:outline-none focus:ring-0
    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [type=number]:appearance-none
  `;
  const selectClass = `
    w-[95px] text-[10px] px-2 py-[.5px] text-center bg-transparent 
    border-none outline-none focus:outline-none focus:border-transparent focus:ring-0 appearance-none
  `;
  // const inputClass = `
  //   w-[90px] text-[10px] px-2 py-[.5px]
  //   border border-gray-300 text-center bg-transparent
  //   focus:outline-none focus:border-transparent focus:ring-0
  //   appearance-none
  //   [&::-webkit-outer-spin-button]:appearance-none
  //   [&::-webkit-inner-spin-button]:appearance-none
  //   [type=number]:appearance-none
  // `;

  // const selectClass = `
  //   w-[95px] text-[10px] px-2 py-[.5px]
  //   border border-gray-300 text-center bg-transparent
  //   focus:outline-none focus:border-transparent focus:ring-0
  //   appearance-none
  // `;

  return (
    <div className="overflow-x-auto !max-h-[80%] !overflow-auto">
      <div
        className="w-full border border-gray-300 rounded-md overflow-x-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#ec4899 #8b5cf6",
        }}
      >
        <style>{`
          /* colorful scrollbar */
          ${colorfullScroll}
          /* keep cell borders clean */
          table, th, td {
            border: 1px solid #d1d5db; /* gray-300 */
            border-collapse: collapse;
          }
        `}</style>

        <table className="min-w-[1600px] text-[10px]">
          <thead className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="p-[1px] text-center border-gray-300 whitespace-nowrap text-[10px]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {formik.values.rows.map((row, index) => (
              <tr key={index} className="hover:bg-pink-50 transition">
                <td className="text-center">{index + 1}</td>

                {/* Type */}
                <td>
                  <select
                    name={`rows.${index}.type`}
                    value={row.type}
                    onChange={(e) => handleChange(e, index)}
                    className={selectClass}
                  >
                    {dropdownOptions.type.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </td>

                {/* Item */}
                <td>
                  <select
                    name={`rows.${index}.item`}
                    value={row.item}
                    onChange={(e) => handleChange(e, index)}
                    className={selectClass}
                  >
                    <option value="">Select Items</option>

                    {items?.map((opt) => (
                      <option key={opt?.im_id} value={opt?.im_name}>
                        {opt?.im_name}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Stamp */}
                <td>
                  <select
                    name={`rows.${index}.stamp`}
                    value={row.stamp}
                    onChange={(e) => handleChange(e, index)}
                    className={selectClass}
                  >
                    <option value="">Select Stamp</option>

                    {dropdownOptions.stamp.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </td>

                {/* Remarks */}
                <td>
                  <input
                    type="text"
                    name={`rows.${index}.remarks`}
                    value={row.remarks}
                    onChange={(e) => handleChange(e, index)}
                    className={inputClass}
                  />
                </td>

                {/* Unit */}
                <td>
                  <select
                    name={`rows.${index}.unit`}
                    value={row.unit}
                    onChange={(e) => handleChange(e, index)}
                    className={selectClass}
                  >
                    <option value="">Select Unit</option>
                    {dropdownOptions.unit.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </td>

                {/* Numeric Fields */}
                {[
                  "pc",
                  "pktWt",
                  "pktLess",
                  "grWt",
                  "less",
                  "netWt",
                  "tunch",
                  "wastage",
                  "rate",
                  "lbr",
                  "on",
                  "other",
                  "dis",
                  "fine",
                  "total",
                ].map((field) =>
                  field === "on" ? (
                    <td key={field}>
                      <select
                        name={`rows.${index}.${field}`}
                        value={row[field]}
                        onChange={(e) => handleChange(e, index)}
                        className={selectClass}
                      >
                        {dropdownOptions.on.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </td>
                  ) : (
                    <td key={field}>
                      <input
                        type="number"
                        name={`rows.${index}.${field}`}
                        value={row[field]}
                        onChange={(e) => handleChange(e, index)}
                        className={inputClass}
                        readOnly={["grWt", "netWt", "fine", "total"].includes(
                          field
                        )}
                      />
                    </td>
                  )
                )}

                {/* Action */}
                <td className="text-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-3 gap-2">
        <button
          type="button"
          onClick={handleAddRow}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-3 py-1 rounded-md shadow hover:opacity-90"
        >
          + Add New
        </button>
        {/* <button
          onClick={formik.handleSubmit}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs px-4 py-1 rounded-md shadow"
        >
          💾 Save All
        </button> */}
      </div>
    </div>
  );
}
