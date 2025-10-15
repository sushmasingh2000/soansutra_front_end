import React, { useEffect, useState } from "react";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import CustomToPagination from "../../Shared/Pagination";
import CustomTable from "./Shared/CustomTable";

const CustomOrder = () => {
  const [customOrders, setCustomOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchCustom = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(
        `${endpoint.get_custom_order}?page=${page}&count=10`
      );
      setCustomOrders(res?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch custom orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustom();
  }, [page]);

  // Prepare table header
  const tablehead = [
    "S.No",
    "Order ID",
    "Product",
    "Custom Request",
    "Order Status",
    "Image",
    "Customer"
  ];

  // Prepare table rows
  const tablerow = customOrders?.data?.map((order, index) => [
    index + 1,
    order.sn_order_id,
    order.product_details?.name,
    order.sn_request
      ? JSON.stringify(JSON.parse(order.sn_request))
      : "N/A",
    order.sn_order_status,
    <img
      src={order.product_details?.product_image?.p_image_url}
      alt="Product"
      className="w-16 h-auto rounded"
    />,
    order.customer_details?.name || "Unknown"
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Custom Orders</h1>
      </div>

        <CustomTable
          tablehead={tablehead}
          tablerow={tablerow}
          isLoading={loading}
        />

      <CustomToPagination
        setPage={setPage}
        page={page}
        data={customOrders}
      />
    </div>
  );
};

export default CustomOrder;
