import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CustomToPagination from "../../Shared/Pagination";
import { apiConnectorGet, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import CustomTable from "../admin/Shared/CustomTable";

const ShopInfoation = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const count = 10;

  // const [formData, setFormData] = useState({
  //   bank_id: "",
  //   account_holder_name: "",
  //   account_number: "",
  //   ifsc_code: "",
  //   bank_name: "",
  //   branch_name: "",
  //   bene_vpa: "",
  //   bene_phone: "",
  //   country_code: "91",
  //   bene_email: "",
  //   bene_address: "",
  //   bene_city: "",
  //   bene_state: "",
  //   bene_postal_code: "",
  // });

  const { data, isLoading, refetch } = useQuery(
    ["bank_detail_admin", { searchTerm, startDate, endDate, page }],
    () =>
      apiConnectorGet(endpoint?.bank_get_all, {
        search: searchTerm,
        start_date: startDate,
        end_date: endDate,
        page: page,
        count: count,
      }),
    usequeryBoolean
  );

  const bankList = data?.data?.result || [];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, startDate, endDate, page]);

  // const handleInputChange = (e) => {
  //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const handleUpdate = async () => {
  //   try {
  //     const res = await apiConnectorPost(
  //       endpoint.update_customer_bank,
  //       formData
  //     );
  //     if (res?.data?.success) {
  //       toast.success("Bank details updated successfully");
  //       setEditModalOpen(false);
  //       refetch();
  //     } else {
  //       toast.error(res?.data?.message || "Failed to update");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  const tablehead = [
    <div className="text-center w-full">S.No</div>,

    <div className="text-center w-full">Shop</div>,
    <div className="text-center w-full">Owner</div>,
    <div className="text-center w-full">Contact</div>,
    <div className="text-center w-full">Address</div>,
    <div className="text-center w-full">Dist.</div>,
    <div className="text-center w-full">State</div>,
    <div className="text-center w-full">Date</div>,
  ];

  const tablerow = bankList?.data?.map((item, index) => [
    <div className="text-center w-full">{(page - 1) * 10 + index + 1}</div>,

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bank List</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by username"
          className="border px-3 py-2 rounded bg-white bg-opacity-45"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="border px-3 py-2 rounded bg-white bg-opacity-45"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border px-3 py-2 rounded bg-white bg-opacity-45"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        // isLoading={loading}
      />
      <div className="mt-6">
        <CustomToPagination page={page} data={bankList} setPage={setPage} />
      </div>
    </div>
  );
};

export default ShopInfoation;
