import React, { useState } from "react";
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

    // Fetch cart by customer ID
    const { data, isLoading } = useQuery(
        ["get_admin_cart", customerId],
        () =>
            apiConnectorGet(`${endpoint.get_cart_admin}?customer_unique=${customerId}`),
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

    // Handle search form submit
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue.trim()) {
            Swal.fire("Warning", "Please enter a valid Customer ID.", "warning");
            return;
        }
        setPage(1); // Reset pagination
        setCustomerId(searchValue.trim());
    };

    // Fetch SKU list
    const { data: sky } = useQuery(
        ["sku_for_sell_by_admin"],
        () => apiConnectorGet(endpoint.sku_for_sell_by_admin),
        { keepPreviousData: true }
    );

    const skuList = sky?.data?.result || [];

    const skuOptions = skuList.map((item) => ({
        label: item.sku,
        product_id: item.product_id,
        variant_id: item.variant_id,
    }));

    // Handle sell action
    const handleSubmitClick = () => {
        if (!customerId) {
            Swal.fire("Missing Info", "Please search for a customer first.", "warning");
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
                variant_id: selectedSKU.variant_id,
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

    const tablehead = ["S.No", "SKU", "Quantity", "Created At", "Updated At"];

    const tablerow = coupons?.map((item, index) => [
        (page - 1) * 10 + index + 1,
        item?.sku,
        item?.swi_qnty,
        moment(item?.swi_created_at).format("DD-MM-YYYY HH:mm:ss"),
        moment(item?.swi_updated_at).format("DD-MM-YYYY HH:mm:ss"),
    ]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">POS Inventory</h1>

            {/* Search Customer */}
            {/* <form onSubmit={handleSearch} className="mb-6 flex gap-3">
                <input
                    type="text"
                    placeholder="Enter Customer Unique ID"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="border px-4 py-2 rounded w-72"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </form> */}

            {/* Sell Section */}
            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-3 text-white mb-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-1/4">
                        <label className="block mb-1 font-medium text-black">Customer</label>
                        <input
                            type="text"
                            placeholder="Enter Customer Unique ID"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="border px-4 py-2 rounded w-72"
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
                        <label className="block mb-1 font-medium text-black">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="bg-white border border-gray-400 rounded-md py-2 px-3 text-black w-full"
                            placeholder="Enter Quantity"
                        />
                    </div>
                    <div className="w-full sm:w-1/4 pt-5">
                        <button
                            onClick={handleSubmitClick}
                            disabled={loading}
                            className={`w-full bg-blue-600 text-white py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
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

            {/* <CustomToPagination data={data?.data} setPage={setPage} page={page} /> */}
        </div>
    );
};

export default OfflineSell;
