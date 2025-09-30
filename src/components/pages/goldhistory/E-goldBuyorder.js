import { X } from "lucide-react";
import { useQuery } from "react-query";
import { apiConnectorGet, usequeryBoolean } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../Shared/CustomTable";
import Header from "../../Header1";
import NavigationBar from "../../navigationbar";
import Footer from "../../Footer1";

const EgoldBuyHistoryModal = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useQuery(
        ["egold_buy_orders"],
        () =>
            apiConnectorGet(
                `${endpoint.get_order}?product_type=EGOLD&order_type=BUY`
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

    const tablerow = orders.map((order, index) => [
        index + 1,
        order.order_unique,

        order.total_weight,
        `₹ ${order.grand_total}`,
        order.status,
        moment.utc(order.order_date).format("DD-MM-YYYY "),
        < button
            onClick={() => navigate(`/invoice/${order.order_unique}`)}
            className="text-blue-600 hover:underline text-sm"
        >
            View Invoice
        </button >,
    ]);

    return (

        <>
            <Header />
            <NavigationBar />
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold">E-Gold Buy History</h2>
            </div>

            <div className="p-4 mb-20">
                {isLoading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : orders.length === 0 ? (
                    <p className="text-center text-gray-500">No Buy History Found.</p>
                ) : (
                    <CustomTable tablehead={tablehead} tablerow={tablerow} />
                )}
            </div>
            <Footer />
        </>

    );
};

export default EgoldBuyHistoryModal;
