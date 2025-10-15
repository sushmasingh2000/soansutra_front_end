import React, { useState } from "react";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import CustomToPagination from "../../Shared/Pagination";
import { useQuery } from "react-query";
import CustomTable from "./Shared/CustomTable";

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

  const tablehead = [
    <span>S.No</span>,
    <span>Email</span>,
    <span>Gender</span>,
    <span>Date</span>,
  ]

  const tablerow = InsiderEmails.map((item, index) => [
    <span>{(page - 1) * count + index + 1}</span>,
    <span>{item.el_email}</span>,
    <span>{item.el_gender}</span>,
    <span>{new Date(item.el_date).toLocaleString()}</span>,
  ])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Insider Emails</h1>
      </div>

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
      // isLoading={loading}
      />
      <CustomToPagination
        page={page}
        data={totalPages}
        setPage={InsiderEmails}
      />

    </div>
  );
};

export default InsiderEmail;
