import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../../../Shared/Loader";
import CustomToPagination from "../../../Shared/Pagination";
import CustomTable from "../../../Shared/CustomTable";
import moment from "moment";
import toast from "react-hot-toast";
import { Lock } from "@mui/icons-material";

const PayoutReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const client = useQueryClient();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data, isLoading } = useQuery(
    ["payout_report", { debouncedSearchTerm, startDate, endDate, page }],
    () =>
      apiConnectorGet(endpoint?.get_rank_achivers_details, {
        search: debouncedSearchTerm,
        start_date: startDate,
        end_date: endDate,
        page: page,
        count: 10,
      }),
    {
      keepPreviousData: true,
    }
  );

  const payoutreport = data?.data?.result || [];

  const RankRequestFn = async (id) => {
    try {
      const response = await apiConnectorPost(endpoint?.rank_relaese_request, {
        t_id: id,
      });
      toast(response?.data?.message);
      if (response?.data?.success) {
        client.refetchQueries("payout_report");
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const tablehead = [
    <div className="text-center w-full">S.No</div>,
    <div className="text-center w-full">Unique ID</div>,
    <div className="text-center w-full">Name</div>,
    <div className="text-center w-full">Level Type</div>,
    <div className="text-center w-full">Rank Created At</div>,
    <div className="text-center w-full">Request Date</div>,
    <div className="text-center w-full">Release Date</div>,
    <div className="text-center w-full">Status</div>,
    <div className="text-center w-full">Action</div>,
  ];

  const tablerow = payoutreport?.data?.length
    ? payoutreport.data.map((item, index) => [
        <div className="text-center w-full">{(page - 1) * 10 + index + 1}</div>,
        <div className="text-center w-full">{item?.mlm_unique_id}</div>,
        <div className="text-center w-full">{item?.name}</div>,
        <div className="text-center w-full">Level {item?.rank_type}</div>,
        <div className="text-center w-full">
          {moment(item?.rank_created_at).format("YYYY-MM-DD")}
        </div>,
        <div className="text-center w-full">
          {item?.rank_release_req_date ? moment(item?.rank_release_req_date).format("YYYY-MM-DD") : "-"}
        </div>,
        <div className="text-center w-full">
          {item?.rank_achieve_date ? moment(item?.rank_achieve_date).format("YYYY-MM-DD") : "-"}
        </div>,
        <div
          className={`text-center w-full ${
            item?.rank_is_released === "NO" ? "text-yellow-500" : "text-green-500"
          }`}
        >
          {item?.rank_is_released === "NO" ? "Pending" : "Success"}
        </div>,
        <div className="text-center w-full">
          {item?.rank_release_req === 0 ? (
            <span
              className="bg-yellow-500 cursor-pointer rounded px-2 py-1 text-white inline-block"
              onClick={() => RankRequestFn(item?.rank_id)}
            >
              Claim
            </span>
          ) : (
            <Lock className="mx-auto" />
          )}
        </div>,
      ])
    : [["No records found"]];

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-lg w-full mx-auto text-sm">
      <h2 className="text-xl font-semibold mb-4">Payout Report</h2>
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

      <div className=" overflow-x-scroll w-auto">
              <div className="lg:w-full w-[70%] md:w-full ">
        <CustomTable 
        tablehead={tablehead} 
        tablerow={tablerow}
         isLoading={isLoading} />
      </div>
</div>
      <CustomToPagination 
      data={payoutreport}
       setPage={setPage} 
       page={page} />
    </div>
  );
};

export default PayoutReport;
