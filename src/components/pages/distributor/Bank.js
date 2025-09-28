import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { apiConnectorGet, usequeryBoolean } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import { useQuery } from "react-query";
import Loader from "../../../Shared/Loader";
import CustomToPagination from "../../../Shared/Pagination";
import moment from "moment";
import CreateBank from "./CreateBank";

const Bank = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);


  const { data, isLoading, refetch } = useQuery(
    ["bank_deatil", { searchTerm, startDate, endDate }],
    () =>
      apiConnectorGet(endpoint?.bank_get_all, {
        search: searchTerm,
        start_date: startDate,
        end_date: endDate,
        page: page,
        count: 10,
      }),
      usequeryBoolean,
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

      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Bank Detail</h2>
        <p
          className="text-xl font-semibold bg-yellow-400 text-white p-2 mb-4 cursor-pointer rounded hover:bg-yellow-500 transition"
          onClick={() => setOpenCreateModal(true)}
        >
          + Add Bank
        </p>
      </div>
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
        <th className="border px-4 py-2">Account Holder</th>
        <th className="border px-4 py-2">Account Number</th>
        <th className="border px-4 py-2">IFSC Code</th>
        <th className="border px-4 py-2">Bank Name</th>
        <th className="border px-4 py-2">Branch Name</th>
        <th className="border px-4 py-2">Date</th>
      </tr>
    </thead>
    <tbody>
      {distributors?.data?.length === 0 ? (
        <tr>
          <td colSpan="7" className="text-center py-4">
            No records found.
          </td>
        </tr>
      ) : (
        distributors?.data?.map((bank, index) => (
          <tr key={index} className="hover:bg-yellow-50">
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{bank?.account_holder_name || "--"}</td>
            <td className="border px-4 py-2">{bank?.account_number || "--"}</td>
            <td className="border px-4 py-2">{bank?.ifsc_code || "--"}</td>
            <td className="border px-4 py-2">{bank?.bank_name || "--"}</td>
            <td className="border px-4 py-2">{bank?.branch_name || "--"}</td>
            <td className="border px-4 py-2">
              {bank?.created_at ? moment(bank.created_at).format("DD-MM-YYYY") : "--"}
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

      <CustomToPagination data={distributors} setPage={setPage} page={page} />
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)} fullWidth maxWidth="sm">
    <CreateBank onClose={() => setOpenCreateModal(false)} />
</Dialog>

    </div>
  );
};

export default Bank;
