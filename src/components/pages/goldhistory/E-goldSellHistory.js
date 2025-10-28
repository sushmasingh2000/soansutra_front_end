import { useQuery } from "react-query";
import { apiConnectorGet, usequeryBoolean } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import CustomTable from "../../../Shared/CustomTable";
import Header from "../../Header1";
import NavigationBar from "../../navigationbar";
import Footer from "../../Footer1";
import EgoldHeader from "../../egoldheader";

const EgoldSellHistoryModal = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    ["egold_sell_orders"],
    () =>
      apiConnectorGet(
        `${endpoint.get_order}?product_type=EGOLD&order_type=SELL`
      ),
    usequeryBoolean
  );

  const orders = data?.data?.result?.data || [];

  const tablehead = [
    "S.No",
    "Order ID",
    "Weight (gm)",
    "Amount (₹)",
    "Status",
    "Date",
    "Action"
  ];

  const tablerow = orders.map((order, index) => {
    const showInvoice = order?.status !== "Pending" && order?.status !== "Failed";

    return [
      index + 1,
      order.order_unique,
      order.total_weight,
      `₹ ${order.grand_total}`,
      order.status,
      moment.utc(order.order_date).format("DD-MM-YYYY"),
      showInvoice ? (
        <button
          onClick={() => navigate(`/invoice/${order.order_unique}`)}
          className="text-blue-600 hover:underline text-sm"
        >
          View Invoice
        </button>
      ) : (
        <span className="text-gray-400 text-sm">N/A</span>
      )
    ];
  });

  return (
    <>
      <Header />
      {/* <NavigationBar /> */}
      <EgoldHeader />
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">E-Gold Sell History</h2>
      </div>

      <div className="p-4 mb-20">
        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No Sell History Found.</p>
        ) : (
          <CustomTable tablehead={tablehead} tablerow={tablerow} />
        )}
      </div>
      <div className="flex justify-center mt-4 mb-20">
        <Link
          to={"/view-e-gold-history"}
          className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        >
          Go Back
        </Link>
      </div>

      <Footer />
    </>
  );
};

export default EgoldSellHistoryModal;
