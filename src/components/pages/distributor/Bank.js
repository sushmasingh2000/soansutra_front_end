import { Dialog } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CustomTable from "../../../Shared/CustomTable";
import CustomToPagination from "../../../Shared/Pagination";
import { apiConnectorGet, usequeryBoolean } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import CreateBank from "./CreateBank";

const Bank = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    ["bank_detail", { searchTerm, startDate, endDate, page }],
    () =>
      apiConnectorGet(endpoint?.bank_get_all, {
        search: searchTerm,
        start_date: startDate,
        end_date: endDate,
        page: page,
        count: 10,
      }),
    usequeryBoolean
  );

  const bankdatas = data?.data?.result || [];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, startDate, endDate]);

  const tablehead = [
    <div className="text-center w-full">S.No</div>,
    <div className="text-center w-full">Account Holder</div>,
    <div className="text-center w-full">Account Number</div>,
    <div className="text-center w-full">IFSC Code</div>,
    <div className="text-center w-full">Bank Name</div>,
    <div className="text-center w-full">Branch Name</div>,
    <div className="text-center w-full">Date</div>,
  ];
  
  const tablerow = bankdatas?.data?.map((item, index) => [
    <div className="text-center w-full">{(page - 1) * 10 + index + 1}</div>,
    <div className="text-center w-full">{item?.account_holder_name || "--"}</div>,
    <div className="text-center w-full">{item?.account_number || "--"}</div>,
    <div className="text-center w-full">{item?.ifsc_code || "--"}</div>,
    <div className="text-center w-full">{item?.bank_name || "--"}</div>,
    <div className="text-center w-full">{item?.branch_name || "--"}</div>,
    <div className="text-center w-full">
      {item?.created_at ? moment(item.created_at).format("DD-MM-YYYY") : "--"}
    </div>,
  ]);

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-lg w-full mx-auto text-sm">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Bank Detail</h2>
        <p
          className="text-xl font-semibold bg-yellow-400 text-white p-2 mb-4 cursor-pointer rounded hover:bg-yellow-500 transition"
          onClick={() => setOpenCreateModal(true)}
        >
          + Add Bank
        </p>
      </div>

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

      <div className="w-full overflow-x-auto">
        <CustomTable
          tablehead={tablehead}
          tablerow={tablerow?.length ? tablerow : [["No records found"]]}
          isLoading={isLoading}
        />
      </div>

      <CustomToPagination data={bankdatas} setPage={setPage} page={page} />

      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)} fullWidth maxWidth="sm">
        <CreateBank onClose={() => setOpenCreateModal(false)} />
      </Dialog>
    </div>
  );
};

export default Bank;
