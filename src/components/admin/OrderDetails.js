import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import { usequeryBoolean } from "../../utils/ApiConnector";
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

// Helpers
const getValue = (val) =>
  val === null || val === undefined || val === "" ? "—" : val;
const formatDate = (date) =>
  date ? new Date(date).toLocaleString() : "—";

// Reusable InfoRow
// 🧩 Reusable Components
const InfoBox = ({ label, value }) => (
  <div className="border rounded-md p-3 bg-gray-50 shadow-sm flex justify-between ">
    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
      {label}
    </div>
    <div className="text-sm font-medium text-gray-800 break-words">{value}</div>
  </div>
);

const InfoBoxGrid = ({ title, children }) => (
  <div className="bg-white bg-opacity-45 p-4 rounded-lg shadow-md h-fit">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
    <div className="grid grid-cols-1  gap-3">{children}</div>
  </div>
);


// Section wrapper
const Section = ({ title, children }) => (
  <div className="mt-8">
    <h2 className="text-xl text-gray-700 font-semibold mb-4 border-b border-gray-200 pb-1">
      {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const OrderDetails = () => {
  const { orderId } = useParams();

  const {
    data: order_details,
    isLoading,
    isError,
  } = useQuery(
    ["order_details", orderId],
    () =>
      apiConnectorGet(`${endpoint.get_order_detail_by}?order_id=${orderId}`),
    {
      ...usequeryBoolean,
      enabled: !!orderId,
    }
  );

  const order = order_details?.data?.result;

  if (isLoading)
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-500 animate-pulse">Loading order details…</div>
      </div>
    );

  if (isError || !order)
    return (
      <div className="p-6 text-red-500">Failed to load order details.</div>
    );

  return (
   <div className="p-6 max-w-screen-xl ">

  {/* Grid layout: 3 columns on large screens, stacked on small */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
    
    {/* 📋 Order Summary */}
    <InfoBoxGrid title="Order Summary">
      <InfoBox label="Order ID" value={getValue(order.order_unique)} />
      <InfoBox label="Status" value={getValue(order.status)} />
      <InfoBox label="Shopping Mode" value={getValue(order.shopping_mode)} />
      <InfoBox label="Order Date" value={formatDate(order.order_date)} />
      <InfoBox label="Payment Method" value={getValue(order.pm_name)} />
      <InfoBox label="Total Amount" value={`₹${getValue(order.total_amount)}`} />
      <InfoBox label="Discount" value={`₹${getValue(order.total_discount)}`} />
      <InfoBox label="Tax" value={`₹${getValue(order.total_tax)}`} />
      <InfoBox label="Grand Total" value={`₹${getValue(order.grand_total)}`} />
    </InfoBoxGrid>

    {/* 🚚 Shipping Details */}
    <InfoBoxGrid title="Shipping Details">
      <InfoBox label="Address" value={getValue(order.shipping_details?.address)} />
      <InfoBox label="City" value={getValue(order.shipping_details?.city)} />
      <InfoBox label="State" value={getValue(order.shipping_details?.state)} />
      <InfoBox label="Postal Code" value={getValue(order.shipping_details?.postal_code)} />
      <InfoBox label="Country" value={getValue(order.shipping_details?.country)} />
      <InfoBox label="Delivery Date" value={formatDate(order.shipping_details?.delivery_date)} />
      <InfoBox label="Shipped Date" value={formatDate(order.shipping_details?.shipped_date)} />
    </InfoBoxGrid>

    {/* 📦 Ordered Items Table */}
    
  </div>
  <div className="bg-white bg-opacity-45 p-4 rounded-lg shadow-md overflow-x-auto mt-5">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Ordered Items</h2>
      {order?.order_items?.length > 0 ? (
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-3 py-2">S.No.</th>
              <th className="px-3 py-2">Image</th>
              <th className="px-3 py-2">SKU</th>
              <th className="px-3 py-2">Qty</th>
              <th className="px-3 py-2">Unit Price</th>
              <th className="px-3 py-2">Discount</th>
              <th className="px-3 py-2">Tax</th>
              <th className="px-3 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.order_items.map((item, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{idx+1}</td>

                <td className="px-3 py-2">
                  <img
                    src={item.p_image_url}
                    alt={item.sku}
                    className="w-10 h-10 object-cover rounded border"
                  />
                </td>
                <td className="px-3 py-2">{getValue(item.sku)}</td>
                <td className="px-3 py-2">{getValue(item.quantity)}</td>
                <td className="px-3 py-2">₹{getValue(item.unit_price)}</td>
                <td className="px-3 py-2">₹{getValue(item.discount)}</td>
                <td className="px-3 py-2">₹{getValue(item.tax_amount)}</td>
                <td className="px-3 py-2">₹{getValue(item.grand_total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-sm">No items found.</p>
      )}
    </div>
</div>

  );
};

export default OrderDetails;
