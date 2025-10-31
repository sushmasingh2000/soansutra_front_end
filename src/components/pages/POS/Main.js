import POSActions from "./sub/Actions";
import POSFooter from "./sub/Footer";
import POSHeader from "./sub/Header";
import POSPaymentButtons from "./sub/PaymentButtons";
import POSProductSearch from "./sub/ProductSearch";
import POSProductTable from "./sub/ProductTable";


export default function POSMain() {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header Section */}
      <POSHeader />

      {/* Search Bar Section */}
      <POSProductSearch />

      <div className="flex flex-1">
        {/* Product Table */}
        <div className="flex-1 overflow-auto p-2">
          <POSProductTable />
          <POSFooter />
          <POSPaymentButtons />
        </div>

        {/* Action Buttons (Right Side) */}
        <div className="w-72 border-l bg-gradient-to-br from-pink-500 to-purple-500 text-white">
          <POSActions />
        </div>
      </div>
    </div>
  );
}
