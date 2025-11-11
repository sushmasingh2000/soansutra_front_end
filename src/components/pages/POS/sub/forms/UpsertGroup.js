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
import { Checkbox } from "@mui/material";
import { pink } from "@mui/material/colors";
export default function UpsertGroup({ selectedItems }) {
  const client = useQueryClient();
  // 🔹 Formik logic handled outside JSX
  const formik = useFormik({
    initialValues: {
      groupName: selectedItems?.pg_name || "",
      pg_is_gold: selectedItems?.pg_is_gold || 0,
      pg_is_silver: selectedItems?.pg_is_silver || 0,
      pg_is_diamond: selectedItems?.pg_is_diamond || 0,
      pg_is_platinum: selectedItems?.pg_is_platinum || 0,
      description: selectedItems?.pg_description || "",
    },
    onSubmit: async (values) => {
      createProductGroup();
    },
  });

  const createProductGroup = async () => {
    try {
      const reqbody = {
        pg_id: selectedItems?.pg_id,
        group_name: formik.values.groupName,
        pg_is_gold: formik.values.pg_is_gold,
        pg_is_silver: formik.values.pg_is_silver,
        pg_is_diamond: formik.values.pg_is_diamond,
        pg_is_platinum: formik.values.pg_is_platinum,
        description: formik.values.description,
      };
      const res = await apiConnectorPost(
        selectedItems?.pg_id
          ? endpoint?.update_product_group
          : endpoint?.add_product_group,
        reqbody
      );
      toast(res.data.message, { id: 1 });

      if (res.data.success) {
        client.refetchQueries("get_product_group_items");
        formik.handleReset();
      }
    } catch (e) {
      toast(e?.message, { id: 1 });
    }
  };
  return (
    <div className="max-w-md mx-auto bg-[#fbf6f1] border border-pink-300/40 p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text mb-5">
        {selectedItems?.pg_id ? "Update" : "Add"} Group
      </h2>

      {/* Product Group */}
      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Metal
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
      </div> */}

      {/* Item Name */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Group Name
        </label>
        <input
          type="text"
          name="groupName"
          value={formik.values.groupName}
          onChange={formik.handleChange}
          placeholder="Enter item name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white"
        />
      </div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Group Description
      </label>
      <input
        type="text"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        placeholder="Enter item name"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white"
      />
      <div className="!text-black space-x-3 flex mt-3">
        <label className="flex items-center space-x-1">
          <Checkbox
            checked={formik.values.pg_is_gold === 1}
            onChange={(e) =>
              formik.setFieldValue("pg_is_gold", e.target.checked ? 1 : 0)
            }
            sx={{
              color: pink[500],
              "&.Mui-checked": { color: pink[500] },
            }}
          />
          <span>Gold</span>
        </label>

        <label className="flex items-center space-x-1">
          <Checkbox
            checked={formik.values.pg_is_silver === 1}
            onChange={(e) =>
              formik.setFieldValue("pg_is_silver", e.target.checked ? 1 : 0)
            }
            color="secondary"
          />
          <span>Silver</span>
        </label>

        <label className="flex items-center space-x-1">
          <Checkbox
            checked={formik.values.pg_is_diamond === 1}
            onChange={(e) =>
              formik.setFieldValue("pg_is_diamond", e.target.checked ? 1 : 0)
            }
            color="success"
          />
          <span>Diamond</span>
        </label>

        <label className="flex items-center space-x-1">
          <Checkbox
            checked={formik.values.pg_is_platinum === 1}
            onChange={(e) =>
              formik.setFieldValue("pg_is_platinum", e.target.checked ? 1 : 0)
            }
            color="default"
          />
          <span>Platinum</span>
        </label>
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
