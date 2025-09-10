import React, { useState } from "react";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import CustomToPagination from "../../Shared/Pagination";
import { useQuery } from "react-query";

const InsiderEmail = () => {
  const [page, setPage] = useState(1);
  const count = 10;

  // Fetch function using correct query params and field mapping
  const fetchInsiderEmails = async () => {
    const url = `${endpoint.get_external_leads}?page=${page}&count=${count}`;
    const res = await apiConnectorGet(url);
    return res?.data?.result;
  };

  const {
    data,
    isLoading,
    isError,
  } = useQuery(["insiderEmails", page], fetchInsiderEmails, {
    keepPreviousData: true,
    onError: () => toast.error("Failed to fetch Insider Emails"),
  });

  const InsiderEmails = data?.data || [];
  const totalPages = data?.totalPage || 1;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Insider Emails</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Gender</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : InsiderEmails.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No Insider Emails found.
                </td>
              </tr>
            ) : (
              InsiderEmails.map((item, index) => (
                <tr key={item.el_id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{(page - 1) * count + index + 1}</td>
                  <td className="px-4 py-2">{item.el_email}</td>
                  <td className="px-4 py-2">{item.el_gender}</td>
                  <td className="px-4 py-2">{new Date(item.el_date).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
        {totalPages > 1 && (
        <div className="mt-6">
          <CustomToPagination
            currentPage={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default InsiderEmail;
