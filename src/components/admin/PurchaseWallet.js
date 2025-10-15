import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import CustomToPagination from "../../Shared/Pagination";
import Loader from "../../Shared/Loader";
import moment from "moment";
import CustomTable from "./Shared/CustomTable";

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

    const records = data?.data?.result || [];


    const tablehead = [
        <span>S.No</span>,
        <span>Transaction ID</span>,
        <span>Wallet Type</span>,
        <span>Trans Type</span>,
        <span>Request Amount</span>,
        <span>Opening Balance</span>,
        <span>Closing Balance</span>,
        <span>Description</span>,
        <span>Date</span>,
        <span>Customer ID</span>,
        <span>Name</span>,
        <span>Email</span>,
        <span>Phone</span>,
    ];

    // Prepare table rows
    const tablerow = records?.data?.map((item, idx) => [
        <span>{(page - 1) * count + idx + 1}</span>,
        <span>{item.wh_trans_id}</span>,
        <span>{item.wh_wallet_type}</span>,
        <span>{item.wh_trans_type}</span>,
        <span>₹ {Number(item.wh_req_bal).toFixed(4)}</span>,
        <span>₹ {Number(item.wh_open_bal).toFixed(4)}</span>,
        <span>₹ {Number(item.wh_closing_bal).toFixed(4)}</span>,
        <span>{item.wh_descripton}</span>,
        <span>
            {item.wh_created_at
                ? moment(item.wh_created_at).format("DD-MM-YYYY")
                : "--"}
        </span>,
        <span>{item.cust_unique_id}</span>,
        <span>{item.name}</span>,
        <span>{item.cl_email}</span>,
        <span>{item.cl_phone}</span>,
    ]);


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Wallet Ledger</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or ID"
                    className="border px-3 py-2  bg-white bg-opacity-45"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="border px-3 py-2 rounded bg-white bg-opacity-45"
                    value={walletType}
                    onChange={(e) => setWalletType(e.target.value)}
                >
                    <option value="1">Gold Wallet</option>
                    <option value="2">Purchase Wallet</option>
                    <option value="3">Income Wallet</option>
                </select>

                <select
                    className="border px-3 py-2 rounded bg-white bg-opacity-45"
                    value={transType}
                    onChange={(e) => setTransType(e.target.value)}
                >
                    <option value="ALL">All</option>
                    <option value="1">Credit (CR)</option>
                    <option value="2">Debit (DR)</option>
                </select>
                <input
                    type="date"
                    className="border px-3 py-2 rounded bg-white bg-opacity-45"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <input
                    type="date"
                    className="border px-3 py-2 rounded bg-white bg-opacity-45"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />


            </div>
            <CustomTable
                tablehead={tablehead}
                tablerow={tablerow}
            //   isLoading={loading}
            />
            {/* Pagination */}
            <div className="mt-4">
                <CustomToPagination
                    data={records}
                    page={page}
                    setPage={setPage}
                />
            </div>
        </div>
    );
};

export default WalletLedge;
