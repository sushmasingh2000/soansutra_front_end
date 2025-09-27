import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { apiConnectorGet } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import { useQuery } from "react-query";
import Loader from "../../../Shared/Loader";
import CustomToPagination from "../../../Shared/Pagination";
import moment from "moment";

const CashbackReport = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const { data, isLoading, refetch } = useQuery(
        ["cashback_report", { searchTerm, startDate, endDate }],
        () =>
            apiConnectorGet(endpoint?.get_cashback_report, {
                search: searchTerm,
                start_date: startDate,
                end_date: endDate,
                page: page,
                count: 10,
                income_type: 4,
                wallet_type: 3
            }),
    );
    const distributors = data?.data?.result || [];

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            refetch();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    return (
        <div className="bg-white text-black p-4 rounded-lg shadow-lg w-full mx-auto text-sm">
            <Loader isLoading={isLoading} />

            <h2 className="text-xl font-semibold mb-4">Cashback Report</h2>
            {/* Filters */}
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

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                    <thead className="bg-yellow-100 text-left">
                        <tr>
                            <th className="border px-4 py-2">S.No</th>
                            <th className="border px-4 py-2">TransID</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {distributors?.data?.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            distributors?.data?.map((distributor, index) => (
                                <tr key={index} className="hover:bg-yellow-50">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{distributor?.ldg_trans_id || "--"}</td>
                                    <td className="border px-4 py-2">
                                        ₹ {Number(distributor?.ldg_amount || 0)?.toFixed(2)}</td>
                                    <td className="border px-4 py-2">
                                        {distributor?.ldg_trans_date ? moment(distributor?.ldg_trans_date).format("DD-MM-YYYY")
                                            : "--"}
                                    </td>


                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <CustomToPagination data={distributors} setPage={setPage} page={page} />
        </div>
    );
};

export default CashbackReport;
