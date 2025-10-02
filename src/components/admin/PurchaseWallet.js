import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import CustomToPagination from "../../Shared/Pagination";
import Loader from "../../Shared/Loader";
import moment from "moment";

const WalletLedge = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [walletType, setWalletType] = useState("1"); // 1 = Gold, 2 = Purchase
    const [transType, setTransType] = useState("ALL"); // ALL, 1 = CR, 2 = DR

    const count = 10;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const {
        data,
        isLoading,
    } = useQuery(
        ["wallet_ledger", { debouncedSearchTerm, startDate, endDate, page, walletType, transType }],
        () =>
            apiConnectorGet(endpoint?.get_leddger_report, {
                wallet_type: walletType,
                trans_typ: transType,
                search: debouncedSearchTerm,
                start_date: startDate,
                end_date: endDate,
                page: page,
                count: count,
            }),
        {
            keepPreviousData: true,
        }
    );

    const records = data?.data?.result?.data || [];
    const totalPages = data?.data?.result?.totalPage || 1;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Wallet Ledger</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or ID"
                    className="border px-3 py-2 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="border px-3 py-2 rounded"
                    value={walletType}
                    onChange={(e) => setWalletType(e.target.value)}
                >
                    <option value="1">Gold Wallet</option>
                    <option value="2">Purchase Wallet</option>
                    <option value="3">Income Wallet</option>
                </select>

                <select
                    className="border px-3 py-2 rounded"
                    value={transType}
                    onChange={(e) => setTransType(e.target.value)}
                >
                    <option value="ALL">All</option>
                    <option value="1">Credit (CR)</option>
                    <option value="2">Debit (DR)</option>
                </select>
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
            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left">S.No</th>
                            <th className="px-4 py-2 text-left">Transaction ID</th>
                            <th className="px-4 py-2 text-left">Wallet Type</th>
                            <th className="px-4 py-2 text-left">Trans Type</th>
                            <th className="px-4 py-2 text-left">Request Amount</th>
                            <th className="px-4 py-2 text-left">Opening Balance</th>
                            <th className="px-4 py-2 text-left">Closing Balance</th>
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Customer ID</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={13} className="py-4 text-center text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : records.length === 0 ? (
                            <tr>
                                <td colSpan={13} className="py-4 text-center text-gray-500">
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            records.map((item, idx) => (
                                <tr key={item.wh_id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{(page - 1) * count + idx + 1}</td>
                                    <td className="px-4 py-2">{item.wh_trans_id}</td>
                                    <td className="px-4 py-2">{item.wh_wallet_type}</td>
                                    <td className="px-4 py-2">{item.wh_trans_type}</td>
                                    <td className="px-4 py-2">₹ {Number(item.wh_req_bal).toFixed(4)}</td>
                                    <td className="px-4 py-2">₹ {Number(item.wh_open_bal).toFixed(4)}</td>
                                    <td className="px-4 py-2">₹ {Number(item.wh_closing_bal).toFixed(4)}</td>
                                    <td className="px-4 py-2">{item.wh_descripton}</td>
                                    <td className="px-4 py-2">
                                        {item.wh_created_at
                                            ? moment(item.wh_created_at).format("DD-MM-YYYY")
                                            : "--"}
                                    </td>
                                    <td className="px-4 py-2">{item.cust_unique_id}</td>
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{item.cl_email}</td>
                                    <td className="px-4 py-2">{item.cl_phone}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>


            {/* Pagination */}
            <div className="mt-4">
                <CustomToPagination
                    data={records}
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            </div>
        </div>
    );
};

export default WalletLedge;
