import React, { useState } from "react";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import moment from "moment";
import CustomToPagination from "../../Shared/Pagination";

const Distributor = () => {
  const [pagination, setPagination] = useState({ page: 1, count: 10 });
  const [search, setSearch] = useState("");

  // Fetch distributor data
  const { data, isLoading, error } = useQuery(
    ["get_distributor_details", pagination.page, search],
    () =>
      apiConnectorGet(
        `${endpoint.get_distributor_details}?page=${pagination.page}&count=${pagination.count}&search=${search}`
      ),
    { keepPreviousData: true }
  );

  // Data from API
  const distributors = data?.data?.result || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading distributors</div>;
  }

  return (
    <div className="p-6 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Distributor Details</h1>
        <input
          type="text"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPagination({ ...pagination, page: 1 }); // reset page on search
          }}
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="overflow-auto rounded border">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b">Unique ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Current Level</th>
              <th className="px-4 py-2 border-b">Direct Members</th>
              <th className="px-4 py-2 border-b">Team Members</th>
              <th className="px-4 py-2 border-b">Team Business</th>
              <th className="px-4 py-2 border-b">Distributor Reg Date</th>
              <th className="px-4 py-2 border-b">Level Details</th>
            </tr>
          </thead>

          <tbody>
            {distributors.data?.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No distributors found.
                </td>
              </tr>
            ) : (
              distributors?.data?.map((d) => (
                <tr key={d.mlm_id}>
                  <td className="px-4 py-2 border-b">{d.mlm_unique_id}</td>
                  <td className="px-4 py-2 border-b">{d.name}</td>
                  <td className="px-4 py-2 border-b">{d.mlm_curr_level}</td>
                  <td className="px-4 py-2 border-b">{d.mlm_direct_mem}</td>
                  <td className="px-4 py-2 border-b">{d.mlm_team_mem}</td>
                  <td className="px-4 py-2 border-b">{d.mlm_team_buss}</td>
                  <td className="px-4 py-2 border-b">
                    {d.mlm_dist_reg_date
                      ? moment(d.mlm_dist_reg_date).format("YYYY-MM-DD")
                      : "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {d.level_details
                      ? `Level ${d.level_details.l_level_id} / Commission: ${
                          d.level_details.l_commission
                        } / Team Business Goal: ${d.level_details.l_team_buss}`
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <div className="mt-4">
        <CustomToPagination data={distributors} page={pagination} setPage={setPagination}/>
      </div>
    </div>
  );
};

export default Distributor;
