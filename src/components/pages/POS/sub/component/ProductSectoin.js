import { Chip } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import CustomToPagination from "../../../../../Shared/Pagination";
import { apiConnectorGet } from "../../../../../utils/ApiConnector";
import { endpoint } from "../../../../../utils/APIRoutes";
import CustomTable from "../customComp/CustomTable";
import UpsertProduct from "../forms/UpsertProduct";
import { Delete, Edit, Search } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { areYouSureFn } from "../../../../../utils/utilsFun";

const ProductSectoin = () => {
  const [selectedField, setSelectedField] = useState("List");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState({});
  const client = useQueryClient();

  // const [endDate, setEndDate] = useState("");

  const { data, isLoading } = useQuery(
    ["get_product_items", searchTerm],
    () => apiConnectorGet(endpoint?.get_product_items, { search: searchTerm }),
    {
      keepPreviousData: true,
    }
  );
  const deleteProductGroup = async (id) => {
    try {
      const reqbody = {
        item_id: id,
      };
      const res = await apiConnectorGet(
        endpoint?.delete_product_items,
        reqbody
      );
      toast(res.data.message, { id: 1 });

      if (res.data.success) {
        client.refetchQueries("get_product_items");
        client.refetchQueries("get_product_items_dropdown");
      }
    } catch (e) {
      toast(e?.message, { id: 1 });
    }
  };

  const tablehead = [
    "S.No.",
    "Product Group",
    "Item Name",
    "Created At",
    "Updated At",
    "Action",
  ];
  const tablerow =
    data?.data?.result?.data?.length > 0
      ? data?.data?.result?.data?.map((item, index) => [
          <div className="text-center w-full">
            {(page - 1) * 10 + index + 1}
          </div>,
          <div className="text-center w-full">{item?.pg_name || "--"}</div>,
          <div className="text-center w-full">{item?.im_name || "--"}</div>,
          <div className="text-center w-full">
            {item?.im_created_at
              ? moment(item?.im_created_at).format("DD-MM-YYYY")
              : "--"}
          </div>,
          <div className="text-center w-full">
            {item?.im_updated_at
              ? moment(item?.im_updated_at).format("DD-MM-YYYY")
              : "--"}
          </div>,
          <div className="text-center w-full !flex !gap-2">
            <Edit
              className="!text-xs"
              onClick={() => {
                setSelectedItems(item);
                setSelectedField("Add");
              }}
            />
            <Delete
              className="!text-xs"
              onClick={() =>
                areYouSureFn(Swal, deleteProductGroup, item?.im_id)
              }
            />
          </div>,
        ])
      : [["No records found"]];

  return (
    <>
      <div className=" !w-full !flex gap-2 justify-center">
        <Chip
          label="Add"
          variant="outlined"
          className={`${
            selectedField === "Add"
              ? "bg-gradient-to-r from-pink-500 to-purple-600 !text-white"
              : "!bg-white !text-black"
          }`}
          onClick={() => {
            setSelectedField("Add");
            setSelectedItems({});
          }}
        />
        <Chip
          label="List"
          variant="outlined"
          className={`${
            selectedField === "List"
              ? "bg-gradient-to-r from-pink-500 to-purple-600 !text-white"
              : "!bg-white !text-black"
          }`}
          onClick={() => setSelectedField("List")}
        />
      </div>
      {selectedField === "List" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by Product Name"
              className="border border-gray-300 text-sm px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <CustomTable
            isLoading={isLoading}
            tablehead={tablehead}
            tablerow={tablerow}
          />
          <CustomToPagination data={data} setPage={setPage} page={page} />
        </>
      )}
      {selectedField === "Add" && (
        <UpsertProduct selectedItems={selectedItems} />
      )}
    </>
  );
};

export default ProductSectoin;
