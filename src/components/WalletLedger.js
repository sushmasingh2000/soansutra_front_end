import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import moment from "moment";
import { apiConnectorGet } from "../utils/ApiConnector";
import { endpoint } from "../utils/APIRoutes";
import CustomToPagination from "../Shared/Pagination";
import Loader from "../Shared/Loader";  

const WalletLedgeUSER = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [walletType, setWalletType] = useState("1"); 
    const [transType, setTransType] = useState("ALL"); 
    const count = 10;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const { data, isLoading } = useQuery(
        [
            "wallet_ledger_user",
            { debouncedSearchTerm, startDate, endDate, page, walletType, transType },
        ],
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
        <div className="bg-white text-black p-4 rounded-lg shadow-lg w-full mx-auto text-sm">
            <Loader isLoading={isLoading} />

            <h2 className="text-xl font-semibold mb-4">Wallet Ledger</h2>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
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
            <div className="overflow-x-auto overflow-y-auto max-h-[500px] border rounded">
                <table className="min-w-full border text-sm">
                    <thead className="bg-yellow-100 text-left">
                        <tr>
                            <th className="border px-4 py-2">S.No</th>
                            <th className="border px-4 py-2">Transaction ID</th>
                            <th className="border px-4 py-2">Wallet Type</th>
                            <th className="border px-4 py-2">Trans Type</th>
                            <th className="border px-4 py-2">Request Amount</th>
                            <th className="border px-4 py-2">Opening Balance</th>
                            <th className="border px-4 py-2">Closing Balance</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Date</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && records.length === 0 && (
                            <tr>
                                <td colSpan="13" className="text-center py-4">
                                    No records found.
                                </td>
                            </tr>
                        )}

                        {isLoading && (
                            <tr>
                                <td colSpan="13" className="text-center py-4 text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        )}

                        {!isLoading &&
                            records.map((item, idx) => (
                                <tr key={item.wh_id} className="hover:bg-yellow-50 border">
                                    <td className="border px-4 py-2">{(page - 1) * count + idx + 1}</td>
                                    <td className="border px-4 py-2">{item.wh_trans_id}</td>
                                    <td className="border px-4 py-2">{item.wh_wallet_type}</td>
                                    <td className="border px-4 py-2">{item.wh_trans_type}</td>
                                    <td className="border px-4 py-2">₹ {Number(item.wh_req_bal).toFixed(2)}</td>
                                    <td className="border px-4 py-2">₹ {Number(item.wh_open_bal).toFixed(2)}</td>
                                    <td className="border px-4 py-2">₹ {Number(item.wh_closing_bal).toFixed(2)}</td>
                                    <td className="border px-4 py-2">{item.wh_descripton}</td>
                                    <td className="border px-4 py-2">
                                        {item.wh_created_at ? moment(item.wh_created_at).format("DD-MM-YYYY") : "--"}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4">
                <CustomToPagination data={records} page={page} totalPages={totalPages} setPage={setPage} />
            </div>
        </div>
    );
};

export default WalletLedgeUSER;
