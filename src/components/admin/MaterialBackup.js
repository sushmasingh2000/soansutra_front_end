import { useFormik } from "formik";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import CustomToPagination from "../../Shared/Pagination";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint, rupees } from "../../utils/APIRoutes";
import moment from "moment";
import CustomTable from "./Shared/CustomTable";

const MasterMaterialBackup = () => {
  const [page, setPage] = useState(1)
  const client = useQueryClient();
  const initialValues = {
    search: '',
    page: "",
    pageSize: 10,
    start_date: '',
    end_date: '',
  };

  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,

  })
  const { data } = useQuery(
    ['material_backup', fk.values.search, fk.values.start_date, fk.values.end_date, page],
    () =>
      apiConnectorGet(endpoint?.get_master_material_backup, {
        search: fk.values.search,
        start_date: fk.values.start_date,
        end_date: fk.values.end_date,
        page: page,
        pageSize: "10",
      }),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError: (err) => console.error("Error fetching level data:", err),
    }
  );

  const allData = data?.data?.result || [];

  const tablehead = [
    <span>S.No</span>,
    <span>Old Name</span>,
    <span>New Name</span>,
    <span>Old Price</span>,
    <span>New Price</span>,
    <span>Old Price Per Unit</span>,
    <span>New Price Per Unit</span>,
    <span>Old Unit</span>,
    <span>New Unit</span>,
    <span>Old Value</span>,
    <span>New Value</span>,
    <span>Old Date</span>,
    <span>New Date</span>,
  ]

  const tablerow = allData?.data?.map((material, index) => [
    <span className="px-4 py-2">{index + 1}</span>,
    <span className={`px-4 py-2 ${material.ma_material_name_old !== material.ma_material_name_new && "bg-yellow-500"}`}>
      {material.ma_material_name_old || "--"}
    </span>,
    <span className={`px-4 py-2 ${material.ma_material_name_old !== material.ma_material_name_new && "bg-yellow-500"}`}>
      {material.ma_material_name_new || "--"}
    </span>,

    <span className={`px-4 py-2 ${material.ma_price_old !== material.ma_price_new && "bg-yellow-500"}`}>
      {Number(material.ma_price_old).toFixed(2)}
    </span>,
    <span className={`px-4 py-2 ${material.ma_price_old !== material.ma_price_new && "bg-yellow-500"}`}>
      {Number(material.ma_price_new).toFixed(2)}
    </span>,

    <span className={`px-4 py-2 ${material.ma_price_per_unit_old !== material.ma_price_per_unit_new && "bg-yellow-500"}`}>
      {Number(material.ma_price_per_unit_old).toFixed(2)}
    </span>,
    <span className={`px-4 py-2 ${material.ma_price_per_unit_old !== material.ma_price_per_unit_new && "bg-yellow-500"}`}>
      {Number(material.ma_price_per_unit_new).toFixed(2)}
    </span>,

    <span className={`px-4 py-2 ${material.ma_unit_old !== material.ma_unit_new && "bg-yellow-500"}`}>

      {material.ma_unit_old || "--"}</span>,
    <span className={`px-4 py-2 ${material.ma_unit_old !== material.ma_unit_new && "bg-yellow-500"}`}>

      {material.ma_unit_new || "--"}</span>,

    <span className={`px-4 py-2 ${material.ma_value_old !== material.ma_value_new && "bg-yellow-500"}`}>

      {Number(material.ma_value_old).toFixed(2)}
    </span>,
    <span className={`px-4 py-2 ${material.ma_value_old !== material.ma_value_new && "bg-yellow-500"}`}>

      {Number(material.ma_value_new).toFixed(2)}
    </span>,

    <span className="px-4 py-2">
      {material.created_at_old ? moment(material.created_at_old).format("DD-MM-YYYY") : "--"}
    </span>,
    <span className="px-4 py-2">
      {material.created_at_new ? moment(material.created_at_new).format("DD-MM-YYYY") : "--"}
    </span>,
  ])
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Backup Materials</h1>

      </div>
      <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-3 text-white mb-6">


        <div className="flex flex-col sm:flex-wrap md:flex-row items-center gap-3 sm:gap-4 w-full text-sm sm:text-base">
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={fk.values.start_date}
            onChange={fk.handleChange}
            className="bg-white bg-opacity-50 border border-gray-600 rounded-md py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <input
            type="date"
            name="end_date"
            id="end_date"
            value={fk.values.end_date}
            onChange={fk.handleChange}
            className="bg-white bg-opacity-50 border border-gray-600 rounded-md py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <input
            type="text"
            name="search"
            id="search"
            value={fk.values.search}
            onChange={fk.handleChange}
            placeholder="User ID"
            className="bg-white bg-opacity-50 border border-gray-600 rounded-full py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <button
            onClick={() => {
              setPage(1);
              client.invalidateQueries(["get_topup_admin"]);
            }}
            type="submit"
            className="bg-blue-500 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-dark-color transition-colors w-full sm:w-auto text-sm"
          >
            Search
          </button>
          <button
            onClick={() => {
              fk.handleReset();
              setPage(1);
            }}
            className="bg-gray-color text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-black hover:text-white transition-colors w-full sm:w-auto text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
      // isLoading={loading}
      />

      <CustomToPagination data={allData} setPage={setPage} page={page} />

    </div >
  );
};

export default MasterMaterialBackup;
