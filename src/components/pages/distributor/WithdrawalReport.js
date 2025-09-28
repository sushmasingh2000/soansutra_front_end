import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { apiConnectorGet, apiConnectorPost } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import CustomToPagination from "../../../Shared/Pagination";
import moment from "moment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Cancel } from "@mui/icons-material";
import Swal from "sweetalert2";
import { Lock } from "lucide-react";

const WithdrawalReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // NEW: status filter state
  const count = 10;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
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

  const records = data?.data?.result?.data || [];

  // Status buttons array
  const statuses = [
    { label: "All", value: "ALL" },
    { label: "Pending", value: "Pending" },
    { label: "Success", value: "Success" },
    { label: "Failed", value: "Failed" },
    { label: "Processing", value: "Processing" },
    { label: "Reject", value: "Reject" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Withdrawal Report</h1>

      {/* Status filter buttons */}
      <div className="flex gap-2 mb-4">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => {
              setStatusFilter(status.value);
              setPage(1); // Reset page on filter change
            }}
            className={`px-4 py-2 rounded font-semibold ${
              statusFilter === status.value
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Existing search and date filters */}
      <div className="flex gap-2 mb-4">
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
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">S.No</th>
              <th className="px-4 py-2 text-left">TransID</th>
              <th className="px-4 py-2 text-left">Req Amount</th>
              <th className="px-4 py-2 text-left">Charges</th>
              <th className="px-4 py-2 text-left">Net Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Req Date</th>
              <th className="px-4 py-2 text-left">Success Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={14} className="py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan={14} className="py-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              records.map((item, idx) => (
                <tr
                  key={item.cus_pay_id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{(page - 1) * count + idx + 1}</td>
                  <td className="px-4 py-2">{item.pay_trans_id}</td>
                  <td className="px-4 py-2">
                    ₹ {Number(item.pay_req_amount)?.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    ₹ {Number(item.pay_charges)?.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    ₹ {Number(item.pay_net_amount)?.toFixed(2)}
                  </td>

                  <td
                    className={`${
                      item?.pay_status === "Success"
                        ? "text-green-400"
                        : item?.pay_status === "Failed"
                        ? "text-red-500"
                        : item?.pay_status === "Reject"
                        ? "text-red-400"
                        : item?.pay_status === "Processing"
                        ? "text-yellow-500"
                        : item?.pay_status === "Pending"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    } px-4 py-2`}
                  >
                    {item.pay_status}
                  </td>
                  <td className="px-4 py-2">
                    {item.pay_req_date
                      ? moment(item.pay_req_date)?.format("DD-MM-YYYY")
                      : "--"}
                  </td>
                  <td className="px-4 py-2">
                    {item.pay_success_date
                      ? moment(item.pay_success_date)?.format("DD-MM-YYYY")
                      : "--"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <CustomToPagination data={records} setPage={setPage} page={page} />
      </div>
    </div>
  );
};

export default WithdrawalReport;
