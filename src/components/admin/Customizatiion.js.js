import React, { useEffect, useState } from "react";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";

const CustomOrder = () => {
  const [customOrders, setCustomOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustom = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(endpoint.get_custom_order);
      setCustomOrders(res?.data?.result?.data || []);
    } catch (err) {
      toast.error("Failed to fetch custom orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustom();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Custom Product Orders</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Custom Request</th>
              <th className="px-4 py-3 text-left">Order Status</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Customer</th>
            </tr>
          </thead>
          <tbody>
            {customOrders.length > 0 ? (
              customOrders.map((order, index) => (
                <tr key={order.sn_order_id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{order.sn_order_id}</td>
                  <td className="px-4 py-2">{order.product_details?.name}</td>
                  <td className="px-4 py-2">
                    {order.sn_request
                      ? JSON.stringify(JSON.parse(order.sn_request))
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">{order.sn_order_status}</td>
                  <td className="px-4 py-2">
                    <img
                      src={order.product_details?.product_image?.p_image_url}
                      alt="Product"
                      className="w-16 h-auto rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    {order.customer_details?.name || "Unknown"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  No custom orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomOrder;
