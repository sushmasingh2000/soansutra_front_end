import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { apiConnectorGet } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import { useQuery } from "react-query";
import Loader from "../../../Shared/Loader";
import CustomToPagination from "../../../Shared/Pagination";
import moment from "moment";

const DirectCustomer = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const {
        data,
        isLoading,
        refetch,
    } = useQuery(
        ["direct_customer", { searchTerm, startDate, endDate }],
        () =>
            apiConnectorGet(endpoint?.get_team_details, {

                search: searchTerm,
                start_date: startDate,
                end_date: endDate,
                level_id: 1,
                is_distributer: 0,
                page: page,
                count: 10

            }),

    );

    const distributors = data?.data?.result || [];

    const handleSearch = () => {
        refetch(); // Manually fetch with current filters
    };

    return (
        <div className="bg-white text-black p-4 rounded-lg shadow-lg w-full mx-auto text-sm">
            <Loader isLoading={isLoading} />

            <h2 className="text-xl font-semibold mb-4">Direct Customer</h2>

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
                <button
                    onClick={handleSearch}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                    Search
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                    <thead className="bg-yellow-100 text-left">
                        <tr>
                            <th className="border px-4 py-2">S.No</th>
                            <th className="border px-4 py-2">Username</th>
                            <th className="border px-4 py-2">Full Name</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Reg. Date</th>
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
                                    <td className="border px-4 py-2">{distributor?.mlm_unique_id || "--"}</td>
                                    <td className="border px-4 py-2">{distributor?.name || "--"}</td>
                                    <td className="border px-4 py-2">
                                        {distributor?.mlm_created_at ? moment(distributor?.mlm_created_at).format("DD-MM-YYYY")
                                            : "--"}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {distributor?.mlm_dist_reg_date ? moment(distributor?.mlm_dist_reg_date).format("DD-MM-YYYY")
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

export default DirectCustomer;
