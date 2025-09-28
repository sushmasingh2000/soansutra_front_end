import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import CustomToPagination from "../../Shared/Pagination";
import { useQuery } from "react-query";
import moment from "moment";
import { Dialog } from "@mui/material";
import { Edit } from "lucide-react";

const BankDetais = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const count = 10;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [formData, setFormData] = useState({
    bank_id: "",
    account_holder_name: "",
    account_number: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
  });

  const { data, isLoading, refetch } = useQuery(
    ["bank_deatil_admin", { searchTerm, startDate, endDate }],
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
  const bankList = data?.data?.result || [];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bank List</h1>
      </div>
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

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left">Account Holder</th>
              <th className="px-4 py-3 text-left">Account Number</th>
              <th className="px-4 py-3 text-left">IFSC Code</th>
              <th className="px-4 py-3 text-left">Bank Name</th>
              <th className="px-4 py-3 text-left">Branch</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : bankList?.data?.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  No Bank records found.
                </td>
              </tr>
            ) : (
              bankList?.data?.map((item, index) => (
                <tr
                  key={item.bank_id || index}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-2">
                    {(page - 1) * count + index + 1}
                  </td>
                  <td className="px-4 py-2">
                    {item.account_holder_name || "--"}
                  </td>
                  <td className="px-4 py-2">{item.account_number || "--"}</td>
                  <td className="px-4 py-2">{item.ifsc_code || "--"}</td>
                  <td className="px-4 py-2">{item.bank_name || "--"}</td>
                  <td className="px-4 py-2">{item.branch_name || "--"}</td>
                  <td className="px-4 py-2">
                    {item.created_at
                      ? moment(item.created_at).format("DD-MM-YYYY")
                      : "--"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedBank(item);
                        setFormData({
                          bank_id: item.bank_id,
                          account_holder_name: item.account_holder_name,
                          account_number: item.account_number,
                          ifsc_code: item.ifsc_code,
                          bank_name: item.bank_name,
                          branch_name: item.branch_name,
                        });
                        setEditModalOpen(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      <Edit/>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <CustomToPagination page={page} data={bankList} setPage={setPage} />
      </div>
      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <div className="p-6 space-y-4 bg-white">
          <h2 className="text-xl font-semibold text-yellow-700">
            Update Bank Details
          </h2>

          {[
            { name: "account_holder_name", label: "Account Holder Name" },
            { name: "account_number", label: "Account Number" },
            { name: "ifsc_code", label: "IFSC Code" },
            { name: "bank_name", label: "Bank Name" },
            { name: "branch_name", label: "Branch Name" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-yellow-500 focus:outline-none"
              />
            </div>
          ))}

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => setEditModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                try {
                  const res = await apiConnectorPost(
                    endpoint.update_customer_bank,
                    formData
                  ); 
                  if (res?.data?.success) {
                    toast.success("Bank details updated successfully");
                    setEditModalOpen(false);
                    refetch();
                  } else {
                    toast.error(res?.data?.message || "Failed to update");
                  }
                } catch (error) {
                  console.error(error);
                  toast.error("Something went wrong");
                }
              }}
              className="px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800"
            >
              Update
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BankDetais;
