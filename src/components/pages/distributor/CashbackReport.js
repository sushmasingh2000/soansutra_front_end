import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { apiConnectorGet } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import { useQuery } from "react-query";
import Loader from "../../../Shared/Loader";
import CustomToPagination from "../../../Shared/Pagination";
import moment from "moment";
import CustomTable from "../../../Shared/CustomTable";

const CashbackReport = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const { data, isLoading, refetch } = useQuery(
        ["cashback_report", { searchTerm, startDate, endDate, page }],
        () =>
            apiConnectorGet(endpoint?.get_cashback_report, {
                search: searchTerm,
                start_date: startDate,
                end_date: endDate,
                page: page,
                count: 10,
                income_type: 4,
                wallet_type: 3,
            }),
        {
            keepPreviousData: true,
        }
    );

    const cashback = data?.data?.result || [];

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            refetch();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, startDate, endDate]);

    const tablehead = [
        <div className="text-center w-full">S.No</div>,
        <div className="text-center w-full">TransID</div>,
        <div className="text-center w-full">Amount</div>,
        <div className="text-center w-full">Date</div>,
    ];

    const tablerow = cashback?.data?.map((item, index) => [
        <div className="text-center w-full">{(page - 1) * 10 + index + 1}</div>,
        <div className="text-center w-full">{item?.ldg_trans_id || "--"}</div>,
        <div className="text-center w-full">₹ {Number(item?.ldg_amount || 0).toFixed(2)}</div>,
        <div className="text-center w-full">
            {item?.ldg_trans_date
                ? moment(item?.ldg_trans_date).format("DD-MM-YYYY")
                : "--"}
        </div>,
    ]);

    return (
        <div className="bg-white text-black p-4 rounded-lg shadow-lg w-full mx-auto text-sm">
            <Loader isLoading={isLoading} />

            <h2 className="text-xl font-semibold mb-4">Cashback Report</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by username"
                    className="border px-3 py-2 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    type="date"
                    className="border px-3 py-2 rounded"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    className="border px-3 py-2 rounded"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <CustomTable
                    tablehead={tablehead}
                    tablerow={tablerow?.length ? tablerow : [["No records found"]]}
                    isLoading={isLoading}
                />
            </div>


            <CustomToPagination
                data={cashback}
                setPage={setPage}
                page={page}
            />
        </div>
    );
};

export default CashbackReport;
