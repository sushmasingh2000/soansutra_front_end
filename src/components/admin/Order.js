import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import CustomToPagination from "../../Shared/Pagination";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productType, setProductType] = useState("PRODUCT");
  const [egoldType, setEgoldType] = useState("Buy");

  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [selectedBoyId, setSelectedBoyId] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(
        `${endpoint.get_order}?page=${page}&count=10&product_type=${productType}&order_type=${egoldType}`
      );
      setOrders(res?.data?.result || {});
    } catch (err) {
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveryBoyDropdown = async () => {
    try {
      const res = await apiConnectorGet(endpoint.get_delivery_dropdown);
      setDeliveryBoys(res?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch delivery boys.");
    }
  };

  const openAssignModal = (order) => {
    setSelectedOrder(order);
    setSelectedBoyId("");
    setAssignModalOpen(true);
    fetchDeliveryBoyDropdown();
  };

  const handleAssign = async () => {
    if (!selectedBoyId) {
      toast.error("Please select a delivery boy.");
      return;
    }
    try {
      const payload = {
        order_id: selectedOrder.order_unique,
        dlv_id: selectedBoyId,
      };
      const res = await apiConnectorPost(endpoint.order_assign_to_dlvb, payload);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setAssignModalOpen(false);
        fetchOrders();
      } else {
        toast.error(res?.data?.message || "Failed to assign order.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
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
        fetchOrders();
      } else {
        toast.error(res?.data?.message || "Status update failed");
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, productType, egoldType]);

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
  const [viewDeliveryModalOpen, setViewDeliveryModalOpen] = useState(false);
  const [deliveryBoyDetails, setDeliveryBoyDetails] = useState(null);

  const fetchDeliveryBoyDetails = async (dlvId) => {
    try {
      const res = await apiConnectorGet(`${endpoint.get_all_dlv_profile_by}?dlv_unique_id=${dlvId}`);
      if (res?.data?.success) {
        setDeliveryBoyDetails(res.data.result);
        setViewDeliveryModalOpen(true);
      } else {
        toast.error(res?.data?.message || "Failed to fetch delivery boy details.");
      }
    } catch (err) {
      toast.error("Something went wrong while fetching details.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Orders</h1>
      </div>

      <div className="mb-4 flex flex-col justify-end items-end gap-2">
        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option>Select Order Type</option>
          <option value="PRODUCT">Product</option>
          <option value="EGOLD">eGold</option>
        </select>
      </div>

      {productType === "EGOLD" && (
        <div className="mb-4 flex flex-col justify-end items-end gap-2">
          <select
            value={egoldType}
            onChange={(e) => setEgoldType(e.target.value)}
            className="w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option>Select E-Gold Type</option>
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
          </select>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left">Order ID</th>
              {productType === "EGOLD" ? (
                <th className="px-4 py-3 text-left">Receiving Type</th>
              ) : (
                <th className="px-4 py-3 text-left">Products</th>
              )}
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">DeliveryID</th>
              <th className="px-4 py-3 text-left">Assigned</th>
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
                    onClick={() => navigate(`/order-details/${order.order_unique}`)}
                  >
                    {order.order_unique}
                  </td>

                  {productType === "EGOLD" ? (
                    <td className="px-4 py-2">{order.receiving_type}</td>
                  ) : (
                    <td className="px-4 py-2 space-y-2">
                      {order?.order_items?.map((item, i) => (
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
                  )}

                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === "Pending"
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
                    <span
                      className="text-blue-600 underline cursor-pointer"
                      onClick={() => fetchDeliveryBoyDetails(order?.dlv_id)}
                    >
                      {order?.dlv_id || "--"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {(order.is_assigned_status === "Pending" || order.is_assigned_status === "Reject") ?
                      <div className="flex flex-col items-center">
                      <button
                        onClick={() => openAssignModal(order)}
                        className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                      >
                        Assign
                      </button> 
                     <p>{ order?.is_assigned_status}</p></div>
                      :
                      order?.is_assigned_status
                      }
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
                            className={`px-3 py-1 text-white rounded ${bgColor} ${hoverColor} ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                              }`}
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
        <CustomToPagination setPage={setPage} page={page} data={orders} />
      </div>

      {/* Assign Modal */}
      {assignModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Assign Delivery Boy</h2>

            <div>
              <label className="block text-sm font-medium mb-1">Product(s):</label>
              <div className="bg-gray-100 p-2 rounded text-sm">
                {selectedOrder.order_items?.map((item) => item.sku).join(", ")}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Select Delivery Boy:</label>
              <select
                value={selectedBoyId}
                onChange={(e) => setSelectedBoyId(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">-- Select --</option>
                {deliveryBoys.map((boy) => (
                  <option key={boy.dl_reg_id} value={boy.dl_reg_id}>
                    {boy.dl_dlv_name} ({boy.store_name})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setAssignModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
      {viewDeliveryModalOpen && deliveryBoyDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-600">Delivery Boy Details</h2>

            <div className="text-sm text-gray-700 space-y-3">
              <p><strong>Unique ID:</strong> {deliveryBoyDetails?.dl_dlv_unique}</p>
              <p><strong>Name:</strong> {deliveryBoyDetails?.dl_dlv_name}</p>
              <p><strong>Email:</strong> {deliveryBoyDetails?.dl_email}</p>
              <p><strong>Mobile:</strong> {deliveryBoyDetails?.dl_mob}</p>
              <p><strong>Date of Birth:</strong> {deliveryBoyDetails?.dl_dob}</p>
              <p><strong>Address:</strong> {deliveryBoyDetails?.dl_address}</p>
              <p><strong>Pin Code:</strong> {deliveryBoyDetails?.dl_pin_code}</p>
              <p><strong>Latitude:</strong> {deliveryBoyDetails?.dl_lat}</p>
              <p><strong>Longitude:</strong> {deliveryBoyDetails?.dl_lng}</p>
              <p><strong>Is Available:</strong> {deliveryBoyDetails?.dl_is_available === 1 ? "Yes" : " No"}</p>
              <p><strong>Login Status:</strong> {deliveryBoyDetails?.dl_lgn_status === 1 ? " Logged In" : " Logged Out"}</p>
              <p><strong>Registered On:</strong> {new Date(deliveryBoyDetails?.dl_created_at).toLocaleString("en-IN")}</p>
            </div>

            <hr className="my-4" />

            <h3 className="text-lg font-semibold text-gray-800">Store Details</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Store Name:</strong> {deliveryBoyDetails?.store_details?.name}</p>
              <p><strong>Phone:</strong> {deliveryBoyDetails?.store_details?.phone}</p>
              <p><strong>Email:</strong> {deliveryBoyDetails?.store_details?.email}</p>
              <p><strong>Address:</strong> {deliveryBoyDetails?.store_details?.address}</p>
              <p><strong>City:</strong> {deliveryBoyDetails?.store_details?.city}</p>
              <p><strong>State:</strong> {deliveryBoyDetails?.store_details?.state}</p>
              <p><strong>Country:</strong> {deliveryBoyDetails?.store_details?.country}</p>
              <p><strong>Pin Code:</strong> {deliveryBoyDetails?.store_details?.pin_code}</p>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  setViewDeliveryModalOpen(false);
                  setDeliveryBoyDetails(null);
                }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Order;
