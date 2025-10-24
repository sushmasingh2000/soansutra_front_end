import React, { useEffect, useState } from "react";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import { useQuery } from "react-query";
import CustomTable from "./Shared/CustomTable";
import CustomToPagination from "../../Shared/Pagination";

const SubscriptionPlan = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const { data, isLoading } = useQuery(
    ["get_subscription" , debouncedSearchTerm, startDate, endDate, page ],
    () => apiConnectorGet(endpoint.get_subscription_details , {
        search: debouncedSearchTerm,
                start_date: startDate,
                end_date: endDate,
                page: page,
                count: 10,
    })
  );

  const subscriptionList = data?.data?.result || [];


  useEffect(() => {
    const handler = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
}, [searchTerm]);

  const tablehead = [
    <span>S.No</span>,
    <span>Name</span>,
    <span>Customer ID</span>,
    <span>Plan </span>,
    <span>Start Date</span>,
    <span>Commitment Amount</span>,
    <span>Monthly Amount</span>,
    <span>Status</span>,
  ];

  // ✅ Table rows
  const tablerow = subscriptionList?.data?.map((item, idx) => [
    <span>{idx + 1}</span>,
    <span>{item?.name || "-"}</span>,
    <span>{item?.cust_unique_id || "-"}</span>,
    <span>{item?.dz_descripton || "-"}</span>,
    <span>{item?.start_date ? new Date(item.start_date).toLocaleDateString() : "-"}</span>,
    <span>₹{Number(item?.commitment_amount || 0).toLocaleString()}</span>,
    <span>₹{Number(item?.monthly_amount || 0).toLocaleString()}</span>,
    <span
      className={`${
        item?.status === "Active"
          ? "text-green-600 font-semibold"
          : "text-red-500"
      }`}
    >
      {item?.status || "-"}
    </span>,
  ]);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Subscription Plan Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
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

      <CustomTable tablehead={tablehead} tablerow={tablerow} isLoading={isLoading} />
      <CustomToPagination data={subscriptionList} page={page} setPage={setPage}/>
    </div>
  );
};

export default SubscriptionPlan;
