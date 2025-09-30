import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { apiConnectorGet } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import CustomToPagination from "../../../Shared/Pagination";
import CustomTable from "../../../Shared/CustomTable";
import moment from "moment";

const WithdrawalReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // Status filter state
  const count = 10;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading, error, refetch } = useQuery(
    ["withdrawal_report", { debouncedSearchTerm, startDate, endDate, page, statusFilter }],
    () =>
      apiConnectorGet(endpoint?.get_user_payout, {
        search: debouncedSearchTerm,
        start_date: startDate,
        end_date: endDate,
        page: page,
        count: count,
        status: statusFilter,
      }),
    {
      keepPreviousData: true,
    }
  );

  const withdrawal_report = data?.data?.result || [];

 
  const statuses = [
    { label: "All", value: "ALL" },
    { label: "Pending", value: "Pending" },
    { label: "Success", value: "Success" },
    { label: "Failed", value: "Failed" },
    { label: "Processing", value: "Processing" },
    { label: "Reject", value: "Reject" },
  ];

  const tablehead = [
    <div className="text-left px-4 py-2 w-full">S.No</div>,
    <div className="text-left px-4 py-2 w-full">TransID</div>,
    <div className="text-left px-4 py-2 w-full">Req Amount</div>,
    <div className="text-left px-4 py-2 w-full">Charges</div>,
    <div className="text-left px-4 py-2 w-full">Net Amount</div>,
    <div className="text-left px-4 py-2 w-full">Status</div>,
    <div className="text-left px-4 py-2 w-full">Req Date</div>,
    <div className="text-left px-4 py-2 w-full">Success Date</div>,
  ];

  
  const tablerow =
    withdrawal_report?.data?.length > 0
      ? withdrawal_report?.data?.map((item, idx) => [
          <div className="px-4 py-2">{(page - 1) * count + idx + 1}</div>,
          <div className="px-4 py-2">{item.pay_trans_id}</div>,
          <div className="px-4 py-2">₹ {Number(item.pay_req_amount)?.toFixed(2)}</div>,
          <div className="px-4 py-2">₹ {Number(item.pay_charges)?.toFixed(2)}</div>,
          <div className="px-4 py-2">₹ {Number(item.pay_net_amount)?.toFixed(2)}</div>,
          <div
            className={`px-4 py-2 ${
              item?.pay_status === "Success"
                ? "text-green-600"
                : item?.pay_status === "Failed"
                ? "text-red-600"
                : item?.pay_status === "Reject"
                ? "text-red-500"
                : item?.pay_status === "Processing"
                ? "text-yellow-500"
                : item?.pay_status === "Pending"
                ? "text-yellow-600"
                : "text-gray-600"
            }`}
          >
            {item.pay_status}
          </div>,
          <div className="px-4 py-2">
            {item.pay_req_date ? moment(item.pay_req_date).format("DD-MM-YYYY") : "--"}
          </div>,
          <div className="px-4 py-2">
            {item.pay_success_date ? moment(item.pay_success_date).format("DD-MM-YYYY") : "--"}
          </div>,
        ])
      : [["No withdrawal_report found"]];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Withdrawal Report</h1>

      <div className="flex flex-wrap gap-2 mb-4 ">
        {statuses?.map((status) => (
          <button
            key={status.value}
            onClick={() => {
              setStatusFilter(status.value);
              setPage(1); 
            }}
            className={`px-4 py-2 rounded font-semibold ${
              statusFilter === status.value
                ? "bg-blue-600 text-white"
                : "bg-yellow-200 text-yellow-700 hover:bg-yellow-300"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by name or ID"
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

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <CustomTable tablehead={tablehead} tablerow={tablerow} isLoading={isLoading} />
      </div>

      <div className="mt-4">
        <CustomToPagination data={withdrawal_report} setPage={setPage} page={page} />
      </div>
    </div>
  );
};

export default WithdrawalReport;
