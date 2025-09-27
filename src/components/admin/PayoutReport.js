import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import CustomToPagination from "../../Shared/Pagination";
import Loader from "../../Shared/Loader";
import moment from "moment";

const WithdrawalReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const count = 10;

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
    error,
  } = useQuery(
    ["withdrawal_report", { debouncedSearchTerm, startDate, endDate, page }],
    () =>
      apiConnectorGet(endpoint?.get_user_payout, {
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

  // The API returns: result.data → array of records
  const records = data?.data?.result?.data || [];
  const totalPages = data?.data?.result?.totalPage || 1;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Withdrawal Report</h1>

      {/* Optional: filters */}
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
              <th className="px-4 py-2 text-left">Customer ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Address</th>
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
                <tr key={item.cus_pay_id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{(page - 1) * count + idx + 1}</td>
                  <td className="px-4 py-2">{item.pay_trans_id}</td>
                  <td className="px-4 py-2">₹ {Number(item.pay_req_amount)?.toFixed(2)}</td>
                  <td className="px-4 py-2">₹ {Number(item.pay_charges)?.toFixed(2)}</td>
                  <td className="px-4 py-2">₹ {Number(item.pay_net_amount)?.toFixed(2)}</td>
                
                  <td className={`${item?.pay_status === "Success" ? "text-green-400" : "text-yellow-500"} px-4 py-2`}>{item.pay_status}</td>
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
                  <td className="px-4 py-2">{item.cust_unique_id}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.cl_email}</td>
                  <td className="px-4 py-2">{item.cl_phone}</td>
                  <td className="px-4 py-2">{item.address}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <CustomToPagination
          data={records}
          setPage={setPage}
          page={page}
        />
      </div>
    </div>
  );
};

export default WithdrawalReport;
