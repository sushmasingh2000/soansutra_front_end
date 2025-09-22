import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import CustomToPagination from "../../Shared/Pagination";
import { useNavigate } from "react-router-dom";

const EgoldOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(
        `${endpoint.get_order_egold}?page=${page}&count=10`
      );
      if (res?.data?.result?.data) {
        setOrders(res.data.result);
      } else {
        setOrders({ data: [], totalPage: 1, currPage: 1 });
      }
    } catch (err) {
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, [page]);

  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Orders</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.length > 0 ? (
              orders?.data?.map((order, index) => (
                <tr key={order.order_id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{(page - 1) * 10 + index + 1}</td>
                  <td
                    className="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                    onClick={() =>
                      navigate(`/order-details/${order.order_unique}`)
                    }
                  >
                    {order.order_unique}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">₹{order.grand_total}</td>
                  <td className="px-4 py-2">
                    {new Date(order.order_date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {order?.order_type}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <CustomToPagination data={orders} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default EgoldOrder;
