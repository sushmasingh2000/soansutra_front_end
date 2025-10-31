export default function POSProductTable() {
  const headers = [
    "S/No.", "Product", "Bar Code", "Selected Qty",
    "MRP", "Sale Price", "Discount", "Unit Cost", "Net Amount", "Action"
  ];

  return (
    <table className="w-full border-collapse text-sm text-gray-700">
      <thead className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <tr>
          {headers.map((h) => (
            <th key={h} className="p-2 text-left">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={10} className="text-center py-8 text-gray-400">
            No items added yet
          </td>
        </tr>
      </tbody>
    </table>
  );
}
