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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading, refetch } = useQuery(
    ["bank_detail", { debouncedSearch, startDate, endDate, page }],
    () =>
      apiConnectorGet(endpoint?.bank_get_all, {
        search: debouncedSearch,
        start_date: startDate,
        end_date: endDate,
        page,
        count: 10,
      }),
    usequeryBoolean
  );

  const bankdatas = data?.data?.result?.data?.[0] || [];

  useEffect(() => {
    refetch();
  }, [debouncedSearch, startDate, endDate, page]);


  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-lg w-full mx-auto text-sm">
      <div className="my-5 flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">Bank Detail</h2>
        <button
          className="text-sm font-semibold bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          onClick={() => setOpenCreateModal(true)}
        >
          + Add Bank
        </button>
      </div>



      <div className="w-full overflow-x-auto">
        <div className="border rounded-lg p-4 shadow-sm bg-gray-50 text-sm">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Account Holder:</strong> {bankdatas?.account_holder_name || "--"}</div>
            <div><strong>Account Number:</strong> {bankdatas?.account_number || "--"}</div>
            <div><strong>IFSC Code:</strong> {bankdatas?.ifsc_code || "--"}</div>
            <div><strong>Bank Name:</strong> {bankdatas?.bank_name || "--"}</div>
            <div><strong>Branch Name:</strong> {bankdatas?.branch_name || "--"}</div>
            <div><strong>VPA:</strong> {bankdatas?.bene_vpa || "--"}</div>
            <div><strong>Phone:</strong> +{bankdatas?.country_code || ""} {bankdatas?.bene_phone || "--"}</div>
            <div><strong>Email:</strong> {bankdatas?.bene_email || "--"}</div>
            <div><strong>Address:</strong> {bankdatas?.bene_address || "--"}</div>
            <div><strong>City:</strong> {bankdatas?.bene_city || "--"}</div>
            <div><strong>State:</strong> {bankdatas?.bene_state || "--"}</div>
            <div><strong>Postal Code:</strong> {bankdatas?.bene_postal_code || "--"}</div>
            <div><strong>Date:</strong> {bankdatas?.created_at ? moment(bankdatas.created_at).format("DD-MM-YYYY") : "--"}</div>
          </div>
        </div>
      </div>


      <Dialog
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        fullWidth
        maxWidth="md"
      >
        <CreateBank onClose={() => setOpenCreateModal(false)} />
      </Dialog>
    </div>
  );
};

export default Bank;
