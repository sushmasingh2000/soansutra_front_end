import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import CustomToPagination from "../../Shared/Pagination";
import Loader from "../../Shared/Loader";
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
  const count = 10;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data, isLoading, error,refetch } = useQuery(
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

  async function handlePayout(transId, status_type) {
    try {
      const payload = {
        trans_id: transId,
        payout_stauts: status_type,
      };
      const response = await apiConnectorPost(
        endpoint.payout_released,
        payload
      );
      Swal.fire({
        title: response?.data?.success ? "Success" : "Error",
        text: response?.data?.message,
        icon: response?.data?.success ? "success" : "error", // ✅ lowercase
      });
      if(response?.data?.success)
        refetch()
    } catch (e) {
      Swal.fire({
        title: "Error",
        text: e?.message,
        icon: "error", // ✅ lowercase
      });
    }
  }
  const handleSubmitClick = (transId, status_type) => {
    console.log("hdsaf");
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed with this transaction?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handlePayout(transId, status_type);
      }
    });
  };
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
              <th className="px-4 py-2 text-left">Action</th>
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
                        : "text-yellow-500"
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
                  <td className="px-4 py-2">{item.cust_unique_id}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.cl_email}</td>
                  <td className="px-4 py-2">{item.cl_phone}</td>
                  <td className="px-4 py-2">{item.address}</td>
                  <td className="px-4 py-2">
                    {item.pay_status === "Success" ? (
                      <>
                        <Lock />
                      </>
                    ) : (
                      <>
                        <CheckCircleOutlineIcon
                          onClick={() =>
                            handleSubmitClick(item.pay_trans_id, 2)
                          }
                        />
                        <Cancel
                          onClick={() =>
                            handleSubmitClick(item.pay_trans_id, 5)
                          }
                        />
                      </>
                    )}
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
