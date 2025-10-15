import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import toast from "react-hot-toast";
import { Delete, Edit } from "lucide-react";
import CustomToPagination from "../../../Shared/Pagination";
import { useQuery, useQueryClient } from "react-query";
import { useFormik } from "formik";
import { Switch } from "@mui/material";
import CustomTable from "../Shared/CustomTable";

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
    const { data } = useQuery(
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
    <span>{new Date(item?.swi_created_at).toLocaleString()}</span>,
    <span>{new Date(item?.swi_updated_at).toLocaleString()}</span>,
    ])
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Inventory Stock</h1>
               
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
            // isLoading={loading}
            />
            <CustomToPagination data={coupons} setPage={setPage} page={page} />
            
        </div>
    );
};



export default InventoyPos;
