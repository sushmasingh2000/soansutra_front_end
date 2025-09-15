import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import CustomToPagination from "../../Shared/Pagination";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(
        `${endpoint.get_order}?page=${page}&count=${10}`
      );
      setOrders(res?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    const confirmChange = window.confirm(
      `Are you sure you want to mark this order as ${status}?`
    );
    if (!confirmChange) return;
    try {
      const payload = {
        order_id: orderId,
        status: status,
      };
      const res = await apiConnectorPost(endpoint?.get_order_status, payload);
      if (res?.data?.success) {
        toast(res?.data?.message);
        fetchOrders(); // Refresh after update
      } else {
        toast.error(res?.data?.message || "Status update failed");
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const statusButtons = [
    {
      status: "Confirmed",
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
    },
    {
      status: "Shipped",
      bgColor: "bg-purple-600",
      hoverColor: "hover:bg-purple-700",
    },
    {
      status: "In Transit",
      bgColor: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
    },
    {
      status: "Delivered",
      bgColor: "bg-green-600",
      hoverColor: "hover:bg-green-700",
    },
    {
      status: "Cancelled",
      bgColor: "bg-red-600",
      hoverColor: "hover:bg-red-700",
    },
    {
      status: "Failed",
      bgColor: "bg-gray-600",
      hoverColor: "hover:bg-gray-700",
    },
  ];
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
              <th className="px-4 py-3 text-left">Products</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.length > 0 ? (
              orders?.data?.map((order, index) => (
                <tr key={order.order_id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td
                    className="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                    onClick={() =>
                      navigate(`/order-details/${order.order_unique}`)
                    }
                  >
                    {order.order_unique}
                  </td>
                  <td className="px-4 py-2 space-y-2">
                    {order.order_items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <img
                          src={item.p_image_url}
                          alt="Product"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold">{item.sku}</p>
                        </div>
                      </div>
                    ))}
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
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      {statusButtons.map(({ status, bgColor, hoverColor }) => {
                        const currentIndex = statusButtons.findIndex(
                          (btn) => btn.status === order.status
                        );
                        const buttonIndex = statusButtons.findIndex(
                          (btn) => btn.status === status
                        );

                        const isDisabled = buttonIndex <= currentIndex;

                        return (
                          <button
                            key={status}
                            onClick={() =>
                              !isDisabled &&
                              handleStatusChange(order.order_unique, status)
                            }
                            disabled={isDisabled}
                            className={`
            px-3 py-1 text-white rounded
            ${bgColor} ${hoverColor}
            ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
                          >
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
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

export default Order;
