import React, { useEffect, useState } from "react";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import { useQuery } from "react-query";
import CustomToPagination from "../../Shared/Pagination";
import moment from "moment";
import CustomTable from "../admin/Shared/CustomTable";

const ShopInfoDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["shop_info", { searchTerm, startDate, endDate, page }],
    () =>
      apiConnectorGet(endpoint?.get_shop_details, {
        search: searchTerm,
        start_date: startDate,
        end_date: endDate,
        page: page,
        count: 10,
      })
  );

  const directdistributors = data?.data?.result || [];
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      refetch();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, startDate, endDate]);

  const tablehead = [
    <div className="text-center w-full">S.No</div>,
    <div className="text-center w-full">Distributor Name</div>,
    <div className="text-center w-full">Distributor ID</div>,
    <div className="text-center w-full">Shop</div>,
    <div className="text-center w-full">Owner</div>,
    <div className="text-center w-full">Contact</div>,
    <div className="text-center w-full">Address</div>,
    <div className="text-center w-full">Dist.</div>,
    <div className="text-center w-full">State</div>,
    <div className="text-center w-full">Date</div>,
  ];

  const tablerow = directdistributors?.data?.map((item, index) => [
    <div className="text-center w-full">{(page - 1) * 10 + index + 1}</div>,
    <span>{item?.name || "--"}</span>,
    <span>{item?.cust_unique_id || "--"}</span>,
    <div className="text-center w-full">{item?.si_shop_name || "--"}</div>,
    <div className="text-center w-full">{item?.si_owner || "--"}</div>,
    <div className="text-center w-full">{item?.si_contact || "--"}</div>,
    <div className="text-center w-full">{item?.si_address || "--"}</div>,
    <div className="text-center w-full">{item?.si_district || "--"}</div>,
    <div className="text-center w-full">{item?.si_state || "--"}</div>,
    <div className="text-center w-full">
      {item?.si_created_at
        ? moment(item?.si_created_at).format("DD-MM-YYYY")
        : "--"}
    </div>,
  ]);

  return (
    <div className=" p-6">
      <h2 className="text-xl font-semibold mb-4">Shop Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Shop Name"
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
            tablerow={tablerow?.length ? tablerow : [["No records found"]]}
            isLoading={isLoading}
          />
        </div>
      </div>
      <CustomToPagination
        data={directdistributors}
        setPage={setPage}
        page={page}
      />
    </div>
  );
};

export default ShopInfoDetails;
