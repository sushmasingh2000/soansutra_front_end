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
import CustomTable from "./Shared/CustomTable";

const Rankachiver = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const { data, isLoading, error } = useQuery(
    ["get_rank_achievers_details", page, search],
    () =>
      apiConnectorGet(
        `${endpoint.get_rank_achivers_details}?page=${page}&count=10&search=${search}`
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

  const tablehead = [
    <span>S.No</span>,
    <span>Unique ID</span>,
    <span>Name</span>,
    <span>Current Level</span>,
    <span>Rank Type</span>,
    <span>Rank Created At</span>,
    <span>Rank Achieved Date</span>,
    <span>Direct Members</span>,
    <span>Team Members</span>,
    <span>Team Business</span>,
    <span>Distributor Reg</span>,
    <span>Level Info</span>,
    <span>Status/Action</span>,
  ]

  const tablerow = rankAchievers?.data?.map((d, index) => [
    <span>{index + 1}</span>,
    <span>{d.mlm_unique_id}</span>,
    <span>{d.name}</span>,
    <span>{d.mlm_curr_level}</span>,
    <span>{d.rank_type}</span>,
    <span>
      {moment(d.rank_created_at).format("YYYY-MM-DD")}
    </span>,
    <span>
      {d.rank_achieve_date
        ? moment(d.rank_achieve_date).format("YYYY-MM-DD")
        : "-"}
    </span>,
    <span>{d.mlm_direct_mem}</span>,
    <span>{d.mlm_team_mem}</span>,
    <span>{d.mlm_team_buss}</span>,
    <span>
      {d.mlm_dist_reg_date
        ? moment(d.mlm_dist_reg_date).format("YYYY-MM-DD")
        : "-"}
    </span>,
    <span>
      {d.level_details
        ? `L${d.level_details.l_level_id}, Team ₹${d.level_details.l_team_buss}, Comm ${d.level_details.l_commission * 100}%`
        : "-"}
    </span>,
    <span>
      {(d?.rank_release_req === 1 && d?.rank_is_released === "NO") ?
        <span><button className="bg-blue-500 text-white p-2 rounded"
          onClick={() => ReleseFn(d?.rank_id)}>Release</button>
        </span> :
        <span className={` ${d.rank_release_req === 0 ? "text-yellow-500" : ""} px-4 py-2 w-full h-full flex justify-center items-center  !text-center`}>
          {d?.rank_release_req === 0 ? "Pending" : <Lock className="!text-center" />}
        </span>}
    </span>
  ])

  return (
    <div className="p-6 ">
      <Loader isLoading={loading} />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Rank Achievers</h1>
        <input
          type="text"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="border px-3 py-2 rounded"
        />
      </div>
      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
      // isLoading={loading}
      />
      {/* Pagination */}
      <CustomToPagination
        data={rankAchievers}
        page={page}
        setPage={setPage} />

    </div >
  );
};

export default Rankachiver;
