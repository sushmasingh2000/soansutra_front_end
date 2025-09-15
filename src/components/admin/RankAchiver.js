import React, { useState } from "react";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import { useQuery } from "react-query";
import moment from "moment";
import CustomToPagination from "../../Shared/Pagination";

const Rankachiver = () => {
  const [pagination, setPagination] = useState({ page: 1, count: 10 });
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery(
    ["get_rank_achievers_details", pagination.page, search],
    () =>
      apiConnectorGet(
        `${endpoint.get_rank_achivers_details}?page=${pagination.page}&count=${pagination.count}&search=${search}`
      ),
    { keepPreviousData: true }
  );

  const rankAchievers = data?.data?.result || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading rank achievers</div>;

  return (
    <div className="p-6 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Rank Achievers</h1>
        <input
          type="text"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPagination({ ...pagination, page: 1 });
          }}
          className="border px-3 py-2 rounded"
        />
      </div>

      <div className="overflow-auto rounded border">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b">S.No</th>
              <th className="px-4 py-2 border-b">Unique ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Current Level</th>
              <th className="px-4 py-2 border-b">Rank Type</th>
              <th className="px-4 py-2 border-b">Rank Created At</th>
              <th className="px-4 py-2 border-b">Rank Achieved Date</th>
              <th className="px-4 py-2 border-b">Direct Members</th>
              <th className="px-4 py-2 border-b">Team Members</th>
              <th className="px-4 py-2 border-b">Team Business</th>
              <th className="px-4 py-2 border-b">Distributor Reg</th>
              <th className="px-4 py-2 border-b">Level Info</th>
            </tr>
          </thead>
          <tbody>
            {rankAchievers?.data?.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-4 text-gray-500">
                  No rank achievers found.
                </td>
              </tr>
            ) : (
              rankAchievers?.data?.map((d , index) => (
                <tr key={d.rank_id}>
                  <td className="px-4 py-2 border-b">{index+1}</td>
                  <td className="px-4 py-2 border-b">{d.mlm_unique_id}</td>
                  <td className="px-4 py-2 border-b">{d.name}</td>
                  <td className="px-4 py-2 border-b">{d.mlm_curr_level}</td>
                  <td className="px-4 py-2 border-b">{d.rank_type}</td>
                  <td className="px-4 py-2 border-b">
                    {moment(d.rank_created_at).format("YYYY-MM-DD")}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {d.rank_achieve_date
                      ? moment(d.rank_achieve_date).format("YYYY-MM-DD")
                      : "-"}
                  </td>
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
                      ? `L${d.level_details.l_level_id}, Team ₹${d.level_details.l_team_buss}, Comm ${d.level_details.l_commission * 100}%`
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <CustomToPagination
          data={ rankAchievers}
          page={pagination}
          setPage={setPagination}
        />
      </div>
    </div>
  );
};

export default Rankachiver;
