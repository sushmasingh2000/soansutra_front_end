import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import {
  apiConnectorGet,
  apiConnectorPost,
} from "../../../../../utils/ApiConnector";
import { endpoint } from "../../../../../utils/APIRoutes";
import { areYouSureFn } from "../../../../../utils/utilsFun";

export default function ProductForm({ selectedItems }) {
  const client = useQueryClient();
  // 🔹 Formik logic handled outside JSX
  const formik = useFormik({
    initialValues: {
      productGroup: selectedItems?.pg_id || "",
      itemName: selectedItems?.im_name || "",
    },
    onSubmit: async (values) => {
      createProductGroup();
    },
  });

  const { data, isLoading } = useQuery(
    ["get_product_group"],
    () => apiConnectorGet(endpoint?.get_product_group),
    {
      keepPreviousData: true,
    }
  );

  const createProductGroup = async () => {
    try {
      const reqbody = {
        g_id: formik.values.productGroup,
        item_name: formik.values.itemName,
        item_id: selectedItems?.im_id,
      };
      const res = await apiConnectorPost(
        selectedItems?.pg_id
          ? endpoint?.update_product_items
          : endpoint?.add_product_items,
        reqbody
      );
      toast(res.data.message, { id: 1 });

      if (res.data.success) {
        client.refetchQueries("get_product_items");
        client.refetchQueries("get_product_items_dropdown");
        formik.handleReset();
      }
    } catch (e) {
      toast(e?.message, { id: 1 });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#fbf6f1] border border-pink-300/40 p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text mb-5">
        {selectedItems?.pg_id ? "Update" : "Add"} Product
      </h2>

      {/* Product Group */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Product Group
        </label>
        <select
          name="productGroup"
          value={formik.values.productGroup}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white text-gray-700"
        >
          <option value="" disabled>
            Select Product Group
          </option>
          {data?.data?.result?.map((group) => (
            <option key={group?.pg_id} value={group?.pg_id}>
              {group?.pg_name}
            </option>
          ))}
        </select>
      </div>

      {/* Item Name */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Item Name
        </label>
        <input
          type="text"
          name="itemName"
          value={formik.values.itemName}
          onChange={formik.handleChange}
          placeholder="Enter item name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => areYouSureFn(Swal, formik.handleSubmit)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-sm px-5 py-2 rounded-md shadow-sm"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
