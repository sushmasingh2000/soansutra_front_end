import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../../../Shared/Loader";
import CustomToPagination from "../../../Shared/Pagination";
import moment from "moment";
import toast from "react-hot-toast";
import { Lock } from "@mui/icons-material";

const PayoutReport = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const client = useQueryClient();


    // 🔁 Debounce logic (wait 500ms after typing ends)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const {
        data,
        isLoading,
    } = useQuery(
        ["payout_report", { debouncedSearchTerm, startDate, endDate, page }],
        () =>
            apiConnectorGet(endpoint?.get_rank_achivers_details, {
                search: debouncedSearchTerm,
                start_date: startDate,
                end_date: endDate,
                page: page,
                count: 10,
            }),
        {
            keepPreviousData: true,
        }
    );

    const distributors = data?.data?.result || [];


    const RankRequestFn = async (id) => {
        try {
            const response = await apiConnectorPost(endpoint?.rank_relaese_request, {
                t_id: id
            })
            toast(response?.data?.message)
            if (response?.data?.success) {
                client.refetchQueries("payout_report")
            }
        }
        catch (e) {
            toast.error("Ssomething went wrong")
        }
    }
    // rank_relaese_request


    return (
        <div className="bg-white text-black p-4 rounded-lg shadow-lg w-full mx-auto text-sm">
            <Loader isLoading={isLoading} />

            <h2 className="text-xl font-semibold mb-4">Payout Report</h2>

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
                            <th className="px-4 py-2 border-b">S.No</th>
                            <th className="px-4 py-2 border-b">Unique ID</th>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b"> Level Type</th>
                            <th className="px-4 py-2 border-b">Rank Created At</th>
                            <th className="px-4 py-2 border-b"> Request Date</th>
                            <th className="px-4 py-2 border-b"> Release Date</th>
                            <th className="px-4 py-2 border-b"> Status</th>
                            <th className="px-4 py-2 border-b"> Action</th>

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
                            distributors?.data?.map((d, index) => (
                                <tr key={index} className="hover:bg-yellow-50">
                                    <td className="px-4 py-2 border-b">{index + 1}</td>
                                    <td className="px-4 py-2 border-b">{d.mlm_unique_id}</td>
                                    <td className="px-4 py-2 border-b">{d.name}</td>
                                    <td className="px-4 py-2 border-b">Level {d.rank_type}</td>
                                    <td className="px-4 py-2 border-b">
                                        {moment(d.rank_created_at).format("YYYY-MM-DD")}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {d.rank_release_req_date
                                            ? moment(d.rank_release_req_date).format("YYYY-MM-DD")
                                            : "-"}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {d.rank_achieve_date
                                            ? moment(d.rank_achieve_date).format("YYYY-MM-DD")
                                            : "-"}
                                    </td>
                                    <td className={` ${d.rank_is_released === "NO" ? "text-yellow-500" : "text-green-500"} px-4 py-2 border-b`}
                                    >
                                        {d.rank_is_released === "NO" ? "Pending" : "Succsess"}
                                    </td>
                                    {d?.rank_release_req === 0 ?
                                        <td className="px-4 py-2 border-b "
                                            onClick={() => RankRequestFn(d?.rank_id)}>
                                            <span className="bg-yellow-500 text-center rounded cursor-pointer p-2 text-white">Claim</span></td>
                                        : <td className="text-center"><Lock /></td>
                                    }
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

export default PayoutReport;
