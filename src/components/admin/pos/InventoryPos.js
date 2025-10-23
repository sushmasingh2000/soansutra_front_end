import React, { useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import CustomToPagination from "../../../Shared/Pagination";
import { useQuery, useQueryClient } from "react-query";
import { useFormik } from "formik";
import CustomTable from "../Shared/CustomTable";
import moment from "moment/moment";
import { Autocomplete, TextField } from "@mui/material";
import Swal from "sweetalert2";

const InventoyPos = () => {
    const [page, setPage] = useState(1);
    const client = useQueryClient();
    const initialValues = {
        search: '',
        page: "",
        pageSize: 10,
        coupon_start_date: '',
        coupon_end_date: '',
    };

    const fk = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,

    })
    const { data, isLoading } = useQuery(
        ['get_pos', fk.values.search, fk.values.coupon_start_date, fk.values.coupon_end_date, page],
        () =>
            apiConnectorGet(endpoint?.get_pos_inventry, {
                search: fk.values.search,
                start_date: fk.values.coupon_start_date,
                end_date: fk.values.coupon_end_date,
                page: page,
                pageSize: "10",
            }),
        {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onError: (err) => console.error("Error fetching level data:", err),
        }
    );
    const coupons = data?.data?.result || [];

    const [loading, setLoading] = useState(false);
    const [selectedSKU, setSelectedSKU] = useState(null);
    const [quantity, setQuantity] = useState("");

    const { data: sky, refetch } = useQuery(
        ["sku_dropdown_by_admin"],
        () => apiConnectorGet(endpoint.sku_dropdown_by_admin),
        { keepPreviousData: true }
    );

    const skuList = sky?.data?.result || [];

    const skuOptions = skuList.map((item) => ({
        label: item.sku,
        product_id: item.product_id,
        variant_id: item.variant_id,
    }));

    const formik = useFormik({
        initialValues: {
            quantity: "",
            sku: "",
        },
        onSubmit: async (values) => {
            if (!selectedSKU || !quantity) {
                Swal.fire({
                    title: "Missing Fields",
                    text: "Please select a SKU and enter quantity.",
                    icon: "warning",
                });
                return;
            }
            setLoading(true);
            try {
                const payload = {
                    product_id: selectedSKU.product_id,
                    varient_id: selectedSKU.variant_id,
                    barcode: "34567867",
                    quantity: quantity,
                    reserved_quantity: 0,
                    minimum_quantity: 0,
                    batch_number: "45678987",
                    expiry_date: null,
                };

                const response = await apiConnectorPost(endpoint.upload_Stock_by_admin, payload);

                Swal.fire({
                    title: response?.data?.success ? "Success" : "Error",
                    text: response?.data?.message,
                    icon: response?.data?.success ? "success" : "error",
                });

                if (response?.data?.success) {
                    client.refetchQueries("get_pos")
                    formik.resetForm();
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
        },
    });

    const handleSubmitClick = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to proceed with this transaction?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, proceed",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                formik.submitForm();
            }
        });
    };

    const tablehead = [
        <span>S.No</span>,
        <span>SKU</span>,
        <span>Quantity</span>,
        <span>Created At</span>,
        <span>Updated At</span>,
    ]


    const tablerow = coupons?.data?.map((item, index) => [
        <span>{(page - 1) * 10 + index + 1}</span>,
        <span>{item?.sku}</span>,
        <span>{item?.swi_qnty}</span>,
        <span>{moment(item?.swi_created_at).format("DD-MM-YYYY HH:mm:ss")}</span>,
        <span>{moment(item?.swi_updated_at).format("DD-MM-YYYY HH:mm:ss")}</span>,
    ])
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Add Stock </h1>
            </div>
            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-3 text-white mb-6">
                <div className="flex flex-col sm:flex-wrap md:flex-row items-center gap-3 sm:gap-4 w-full text-sm sm:text-base">
                    <div className="w-full sm:w-1/3">
                        <label className="block mb-1 font-medium text-black">SKU</label>
                        <Autocomplete
                            disablePortal
                            options={skuOptions}
                            value={selectedSKU}
                            onChange={(event, newValue) => setSelectedSKU(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Select SKU" fullWidth />
                            )}
                        />
                    </div>
                    <div className="w-full sm:w-1/4">
                        <label className="block mb-1 font-medium text-black">Quantity</label>
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
                            className={`w-full bg-blue-600 text-white py-4 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                                }`}
                        >
                            {loading ? "Processing..." : "Submit"}
                        </button>
                    </div>
                </div>
            </div>


            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-3 text-white mb-6">
                <div className="flex flex-col sm:flex-wrap md:flex-row items-center gap-3 sm:gap-4 w-full text-sm sm:text-base">
                    <input
                        type="date"
                        name="coupon_start_date"
                        id="coupon_start_date"
                        value={fk.values.coupon_start_date}
                        onChange={fk.handleChange}
                        className="bg-white bg-opacity-50 border border-gray-600 rounded-md py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
                    />
                    <input
                        type="date"
                        name="coupon_end_date"
                        id="coupon_end_date"
                        value={fk.values.coupon_end_date}
                        onChange={fk.handleChange}
                        className="bg-white bg-opacity-50 border border-gray-600 rounded-md py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={fk.values.search}
                        onChange={fk.handleChange}
                        placeholder="SKU"
                        className="bg-white bg-opacity-50 border border-gray-600 rounded-full py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
                    />
                    <button
                        onClick={() => {
                            setPage(1);
                            client.invalidateQueries(["get_pos"]);
                        }}
                        type="submit"
                        className="bg-blue-500 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-dark-color transition-colors w-full sm:w-auto text-sm"
                    >
                        Search
                    </button>
                    <button
                        onClick={() => {
                            fk.handleReset();
                            setPage(1);
                        }}
                        className="bg-gray-color text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-black hover:text-white transition-colors w-full sm:w-auto text-sm"
                    >
                        Clear
                    </button>
                </div>
            </div>
            <CustomTable
                tablehead={tablehead}
                tablerow={tablerow}
                isLoading={isLoading}
            />
            <CustomToPagination data={coupons} setPage={setPage} page={page} />

        </div>
    );
};



export default InventoyPos;
