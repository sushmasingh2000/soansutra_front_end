import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import CustomToPagination from "../../../Shared/Pagination";
import { useQuery, useQueryClient } from "react-query";
import CustomTable from "../Shared/CustomTable";
import moment from "moment";
import { Autocomplete, TextField } from "@mui/material";
import Swal from "sweetalert2";

const OfflineSell = () => {
  const [page, setPage] = useState(1);
  const client = useQueryClient();
  const [searchValue, setSearchValue] = useState(""); // input field value
  const [customerId, setCustomerId] = useState(""); // actual ID used for fetching

  const [loading, setLoading] = useState(false);
  const [selectedSKU, setSelectedSKU] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [cartPriceSummary, setCartPriceSummary] = useState({
    base_amount: 0,
    total_discount: 0,
    total_tax: 0,
    coupon_discount: 0,
    grand_total: 0,
  });

  // Fetch cart by customer ID
  const { data, isLoading } = useQuery(
    ["get_admin_cart", customerId],
    () =>
      apiConnectorGet(
        `${endpoint.get_cart_admin}?customer_unique=${customerId}`
      ),
    {
      enabled: !!customerId, // Only run if customerId is set
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError: (err) => console.error("Error fetching cart:", err),
    }
  );

  const coupons = data?.data?.result || [];
  useEffect(() => {
    const fetchCartTotalPrice = async () => {
      if (!coupons || coupons.length === 0) return;

      const itemsPayload = coupons.map((item) => ({
        varient_id: item?.variant_id || item?.varient_id,
        quantity: item?.quantity || 0,
      }));

      const payload = {
        items: itemsPayload,
        isCoupon: false,
      };

      try {
        const response = await apiConnectorPost(
          endpoint.get_cart_item_price_admin,
          payload
        );
        const summary = response?.data?.result;
        if (summary) {
          setCartPriceSummary(summary);
        }
      } catch (error) {
        console.error("Failed to fetch total price from cart:", error);
      }
    };

    fetchCartTotalPrice();
  }, [coupons]);

  // Fetch SKU list
  const { data: sky } = useQuery(
    ["sku_for_sell_by_admin"],
    () => apiConnectorGet(endpoint.sku_for_sell_by_admin),
    {
      keepPreviousData: true,
    }
  );

  const skuList = sky?.data?.result || [];

  const skuOptions = skuList.map((item) => ({
    label: item.sku,
    product_id: item.swi_pro_id,
    variant_id: item.swi_var_id,
  }));

  // Handle sell action
  const handleSubmitClick = () => {
    if (!customerId) {
      Swal.fire(
        "Missing Info",
        "Please search for a customer first.",
        "warning"
      );
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed with this transaction?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleSubmit();
      }
    });
  };

  const handleSubmit = async () => {
    if (!selectedSKU || !quantity || quantity <= 0) {
      Swal.fire({
        title: "Missing Fields",
        text: "Please select a SKU and enter a valid quantity.",
        icon: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        customer_unique: customerId,
        varient_id: selectedSKU.variant_id,
        product_id: selectedSKU.product_id,
        quantity: Number(quantity),
      };

      const response = await apiConnectorPost(endpoint.offline_order, payload);
      Swal.fire({
        title: response?.data?.success ? "Success" : "Error",
        text: response?.data?.message,
        icon: response?.data?.success ? "success" : "error",
      });

      if (response?.data?.success) {
        client.invalidateQueries(["get_admin_cart", customerId]);
        setQuantity("");
        setSelectedSKU(null);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.message || "Something went wrong.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const tablehead = [
    "S.No",
    "SKU",
    "Quantity",
    " Price",
    "Total Price",
    "Created At",
    "Updated At",
  ];

  const tablerow = coupons?.map((item, index) => {
    const qty = Number(item?.quantity || 0);
    const price = Number(item?.final_varient_price || 0);
    const total = qty * price;

    return [
      (page - 1) * 10 + index + 1,
      item?.varient_details?.varient_sku,
      qty,
      price,
      total.toFixed(2),
      moment(item?.swi_created_at).format("DD-MM-YYYY HH:mm:ss"),
      moment(item?.swi_updated_at).format("DD-MM-YYYY HH:mm:ss"),
    ];
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Offline Sell </h1>
      <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-3 text-white mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-1/4">
            <label className="block mb-1 font-medium text-black">
              Customer
            </label>
            <input
              type="text"
              placeholder="Enter Customer Unique ID"
              value={searchValue}
              onChange={(e) => {
                const val = e.target.value.trim();
                setSearchValue(val);
                setCustomerId(val);
              }}
              className="border px-4 py-4 rounded lg:w-72 bg-white bg-opacity-45 text-black"
            />
          </div>
          <div className="w-full sm:w-1/3">
            <label className="block mb-1 font-medium text-black">SKU</label>
            <Autocomplete
              disablePortal
              options={skuOptions}
              value={selectedSKU}
              onChange={(event, newValue) => setSelectedSKU(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select SKU for Sale" fullWidth />
              )}
            />
          </div>
          <div className="w-full sm:w-1/4">
            <label className="block mb-1 font-medium text-black">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="bg-white bg-opacity-45 border border-gray-400 rounded-md py-4 px-3 text-black w-full"
              placeholder="Enter Quantity"
            />
          </div>
          <div className="w-full sm:w-1/4 pt-5">
            <button
              onClick={handleSubmitClick}
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-4 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={isLoading}
      />
      {/* Total Price Summary */}
      {/* Total Price Summary */}
      <div className="flex justify-end mt-6">
        <div className="bg-white bg-opacity-45 rounded shadow px-6 py-4 text-right w-full sm:w-1/2 md:w-1/3">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Cart Summary</h2>
          <div className="text-gray-700">
            <div className="flex justify-between py-1">
              <span>Subtotal (Base Amount)</span>
              <span>₹{cartPriceSummary.base_amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Discount</span>
              <span>- ₹{cartPriceSummary.total_discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Tax</span>
              <span>+ ₹{cartPriceSummary.total_tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Coupon Discount</span>
              <span>
                - ₹{cartPriceSummary.coupon_discount.toLocaleString()}
              </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Payable</span>
              <span>₹{cartPriceSummary.grand_total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* <CustomToPagination data={data?.data} setPage={setPage} page={page} /> */}
    </div>
  );
};

export default OfflineSell;
