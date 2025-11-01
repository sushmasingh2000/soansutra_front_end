import POSActions from "./sub/Actions";
import POSFooter from "./sub/Footer";
import POSHeader from "./sub/Header";
import POSPaymentButtons from "./sub/PaymentButtons";
import POSProductSearch from "./sub/ProductSearch";
import POSProductTable from "./sub/ProductTable";

export default function POSMain() {
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header – full width top bar */}
      <POSHeader />

      {/* Body – search + table + actions */}
      <div className="flex flex-1">
        <div className="flex-1 flex flex-col p-2">
          <POSProductSearch />
          <POSProductTable />
          <POSFooter />
          <POSPaymentButtons />
        </div>

        {/* Right side actions */}
        <div className="w-72 bg-gradient-to-br from-pink-500 to-purple-500 text-white">
          <POSActions />
        </div>
      </div>
    </div>
  );
}
