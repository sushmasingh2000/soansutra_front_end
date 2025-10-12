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

  const getValue = (val) =>
    val === null || val === undefined || val === "" ? "--" : val;

  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "--");

  if (isLoading) return <div className="p-6">Loading order details...</div>;
  if (isError || !order)
    return (
      <div className="p-6 text-red-500">Failed to load order details.</div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="bg-white shadow rounded-lg p-4 space-y-4 text-sm md:text-base">
        <div>
          <strong>Order Unique ID:</strong> {getValue(order?.order_unique)}
        </div>
        {/* <div><strong>Order ID:</strong> {getValue(order?.order_id)}</div> */}
        <div>
          <strong>Status:</strong> {getValue(order?.status)}
        </div>
        <div>
          <strong>Shopping Mode:</strong> {getValue(order?.shopping_mode)}
        </div>
        
        <div>
          <strong>Order Date:</strong> {formatDate(order?.order_date)}
        </div>
        <div>
          <strong>Payment Method:</strong>{" "}
          {getValue(order?.pm_name)?.replace("_", " ")}
        </div>
        {/* <div><strong>Customer ID:</strong> {getValue(order?.customer_id)}</div> */}
        {/* <div><strong>Store ID:</strong> {getValue(order?.store_id)}</div> */}
        <div>
          <strong>Total Amount:</strong> ₹{getValue(order?.total_amount)}
        </div>
        <div>
          <strong>Total Discount:</strong> ₹{getValue(order?.total_discount)}
        </div>
        <div>
          <strong>Total Tax:</strong> ₹{getValue(order?.total_tax)}
        </div>
        <div>
          <strong>Grand Total:</strong> ₹{getValue(order?.grand_total)}
        </div>
        <div>
          <strong>Notes:</strong> {getValue(order?.notes)}
        </div>

        {/* Shipping Details */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
          <div>
            <strong>Address:</strong>{" "}
            {getValue(order?.shipping_details?.address)}
          </div>
          <div>
            <strong>City:</strong> {getValue(order?.shipping_details?.city)}
          </div>
          <div>
            <strong>State:</strong> {getValue(order?.shipping_details?.state)}
          </div>
          <div>
            <strong>Postal Code:</strong>{" "}
            {getValue(order?.shipping_details?.postal_code)}
          </div>
          <div>
            <strong>Country:</strong>{" "}
            {getValue(order?.shipping_details?.country)}
          </div>
          <div>
            <strong>Delivery Date:</strong>{" "}
            {formatDate(order?.shipping_details?.delivery_date)}
          </div>
          <div>
            <strong>Shipped Date:</strong>{" "}
            {formatDate(order?.shipping_details?.shipped_date)}
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Ordered Items</h2>
          {order?.order_items?.length > 0 ? (
            order?.order_items?.map((item, idx) => (
              <div key={idx} className="border p-3 rounded mb-2 bg-gray-50">
                <div className="flex items-center gap-4">
                  <img
                    src={item.p_image_url}
                    alt={item.sku}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <p>
                      <strong>SKU:</strong> {getValue(item?.sku)}
                    </p>
                    <p>
                      <strong>Product ID:</strong> {getValue(item?.p_id)}
                    </p>
                    <p>
                      <strong>Variant ID:</strong> {getValue(item?.variant_id)}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {getValue(item?.quantity)}
                    </p>
                    <p>
                      <strong>Unit Price:</strong> ₹{getValue(item?.unit_price)}
                    </p>
                    <p>
                      <strong>Total Price:</strong> ₹
                      {getValue(item?.total_price)}
                    </p>
                    <p>
                      <strong>Discount:</strong> ₹{getValue(item?.discount)}
                    </p>
                    <p>
                      <strong>Tax Amount:</strong> ₹{getValue(item?.tax_amount)}
                    </p>
                    <p>
                      <strong>Grand Total:</strong> ₹
                      {getValue(item?.grand_total)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>

        {/* Status Dates */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Status History</h2>
          {order?.status_dates?.length > 0 ? (
            <Stepper
              orientation="vertical"
              nonLinear
              activeStep={order.status_dates.length - 1}
            >
              {order.status_dates.map((status, idx) => {
                const statusText = getValue(status?.od_status);
                const statusDate = formatDate(status?.od_date);
                const orderId = getValue(status?.od_order_id);

                // Optional: status to color mapping
                const statusColorMap = {
                  Confirmed: "primary",
                  Processing: "info",
                  Shipped: "warning",
                  Delivered: "success",
                  Cancelled: "error",
                  Completed: "success",
                };

                const stepColor = statusColorMap[statusText] || "inherit";

                return (
                  <Step
                    key={idx}
                    completed={idx < order.status_dates.length}
                    expanded={true} 
                  >
                    <StepLabel
                      StepIconProps={{
                        color: stepColor,
                      }}
                    >
                      <span className="font-medium">{statusText}</span>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" className="text-gray-700">
                        <strong>Date:</strong> {statusDate}
                      </Typography>
                      {/* <Typography variant="body2" className="text-gray-700">
                        <strong>Order ID:</strong> {orderId}
                      </Typography> */}
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
          ) : (
            <p>No status history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
