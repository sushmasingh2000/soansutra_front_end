export default function POSProductSearch() {
  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100">
      <input
        type="text"
        placeholder="Scan Barcode / Enter Product Name"
        className="flex-1 border p-2 rounded focus:outline-none"
      />
      <input
        type="text"
        placeholder="Search and Select Customer"
        className="flex-1 border p-2 rounded"
      />
      <button className="bg-pink-500 text-white px-4 py-2 rounded">+</button>
      <input
        type="text"
        placeholder="Search and Select Order"
        className="flex-1 border p-2 rounded"
      />
    </div>
  );
}
