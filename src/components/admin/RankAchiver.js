import React, { useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import { useQuery } from "react-query";
import moment from "moment";
import CustomToPagination from "../../Shared/Pagination";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loader from "../../Shared/Loader";
import { Lock } from "lucide-react";

const Rankachiver = () => {
  const [pagination, setPagination] = useState({ page: 1, count: 10 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const { data, isLoading, error } = useQuery(
    ["get_rank_achievers_details", pagination.page, search],
    () =>
      apiConnectorGet(
        `${endpoint.get_rank_achivers_details}?page=${pagination.page}&count=${pagination.count}&search=${search}`
      ),
    { keepPreviousData: true }
  );

  const rankAchievers = data?.data?.result || [];

  const ReleseFn = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will release the rank. Do you want to continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, release it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      setLoading(true);
      try {
        const res = await apiConnectorPost(endpoint?.release_income, {
          t_id: id
        });
        toast.success(res?.data?.message);
      } catch (e) {
        console.error("Something went wrong", e);
        toast.error("Failed to release");
      }
      setLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading rank achievers</div>;

  return (
    <div className="p-6 mx-auto">
      <Loader isLoading={loading} />
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
              <th className="px-4 py-2 border-b">Release</th>
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
              rankAchievers?.data?.map((d, index) => (
                <tr key={d.rank_id}>
                  <td className="px-4 py-2 border-b">{index + 1}</td>
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
                  {d?.rank_is_released !== "YES" ? 
                    <td className="px-4 py-2 border-b"><button className="bg-blue-500 text-white p-2 rounded"
                      onClick={() => ReleseFn(d?.rank_id)}>Release</button>
                    </td> :
                    <td className="px-4 py-2 border-b">
                    <Lock/>
                    </td> 
                  }

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <CustomToPagination
          data={rankAchievers}
          page={pagination}
          setPage={setPagination}
        />
      </div>
    </div>
  );
};

export default Rankachiver;
