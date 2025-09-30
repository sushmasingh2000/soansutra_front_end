import React, { useEffect, useState } from "react";
import { apiConnectorGet } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import { useQuery } from "react-query";
import Loader from "../../../Shared/Loader";
import CustomToPagination from "../../../Shared/Pagination";
import CustomTable from "../../../Shared/CustomTable";
import moment from "moment";

const TeamDistributor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["team_distributors", { searchTerm, startDate, endDate, page }],
    () =>
      apiConnectorGet(endpoint?.get_team_details, {
        search: searchTerm,
        start_date: startDate,
        end_date: endDate,
        level_id: 0,
        is_distributer: 1,
        page: page,
        count: 10,
      }),
    { keepPreviousData: true }
  );

  const teamdistributors = data?.data?.result || [];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, startDate, endDate, page]);

  const tablehead = [
    <div className="text-center w-full">S.No</div>,
    <div className="text-center w-full">Username</div>,
    <div className="text-center w-full">Full Name</div>,
    <div className="text-center w-full">Date</div>,
    <div className="text-center w-full">Reg. Date</div>,
  ];

  const tablerow =
    teamdistributors?.data?.length > 0
      ? teamdistributors.data.map((item, index) => [
          <div className="text-center w-full">{(page - 1) * 10 + index + 1}</div>,
          <div className="text-center w-full">{item?.mlm_unique_id || "--"}</div>,
          <div className="text-center w-full">{item?.name || "--"}</div>,
          <div className="text-center w-full">
            {item?.mlm_created_at
              ? moment(item?.mlm_created_at).format("DD-MM-YYYY")
              : "---"}
          </div>,
          <div className="text-center w-full">
            {item?.mlm_dist_reg_date
              ? moment(item?.mlm_dist_reg_date).format("DD-MM-YYYY")
              : "---"}
          </div>,
        ])
      : [["No records found"]];

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-lg w-full mx-auto text-sm">
      <h2 className="text-xl font-semibold mb-4">Team Distributor </h2>
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

      <div className="overflow-x-auto w-full">
        <CustomTable tablehead={tablehead} tablerow={tablerow} isLoading={isLoading} />
      </div>

      <CustomToPagination data={teamdistributors} setPage={setPage} page={page} />
    </div>
  );
};

export default TeamDistributor;
