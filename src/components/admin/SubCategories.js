import { DeleteForever, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import { useQuery, useQueryClient } from "react-query";
import CustomTable from "./Shared/CustomTable";
import { Skeleton } from "@mui/material";

const SubCategory = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subcategoryModalOpen, setSubcategoryModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const client = useQueryClient();

  const resetForm = () => {
    setFormData({
      sub_cat_name: "",
      sub_cat_des: "",
      sub_cat_image: "",
      file: null,
    });
  };


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: null,
  });

  const { data: cat_data } = useQuery(
    ["get_categories"],
    () => apiConnectorGet(endpoint.get_product_categroy),
    usequeryBoolean
  );
  const categories = cat_data?.data?.result || [];

  const { data: sub_cat_data, isLoading: subcatloading } = useQuery(
    ["get_sub_categories", selectedCategoryId],
    () => apiConnectorGet(`${endpoint.get_product_subcategory}?product_category_id=${selectedCategoryId}`),
    {
      ...usequeryBoolean,
      enabled: !!selectedCategoryId,
    }
  );
  const subcategories = sub_cat_data?.data?.result || [];

  const createSubcategory = async () => {
    if (!selectedCategoryId) {
      toast.error("Please select a category.");
      return;
    }
    try {
      setLoading(true);
      const form = new FormData();
      form.append("product_category_id", selectedCategoryId);
      form.append("name", formData.name);
      form.append("description", formData.description);
      if (formData.file) form.append("file", formData.file);

      const res = await apiConnectorPost(endpoint.sub_category_product, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast(res?.data?.message);
      if (res?.data?.success) {
        setSubcategoryModalOpen(false);
        resetForm();
        client.refetchQueries("get_sub_categories");
      }

    } catch (err) {
      toast.error("Error creating subcategory.");
    } finally {
      setLoading(false);
    }
  };

  // Update subcategory
  const updateSubcategory = async () => {
    if (!selectedCategoryId) {
      toast.error("Please select a category.");
      return;
    }
    try {
      setLoading(true);
      const form = new FormData();
      form.append(
        "product_subcategory_id",
        selectedSubcategory?.product_subcategory_id
      );
      form.append("product_category_id", selectedCategoryId);
      form.append("name", formData.sub_cat_name);
      form.append("description", formData.sub_cat_des);
      if (formData.file) form.append("file", formData.file);
      const res = await apiConnectorPost(
        endpoint.update_product_subcategory,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast(res?.data?.message);
      if (res?.data?.success) {
        setIsEditMode(false);
        setSubcategoryModalOpen(false)
        resetForm();
        client.refetchQueries("get_sub_categories");
      }
    } catch (err) {
      toast.error("Error updating subcategory.");
    } finally {
      setLoading(false);
    }
  };

  // Delete subcategory
  const deleteSubcategory = async (subcategory) => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(`${endpoint.delete_product_subcategory}
        ?product_subcategory_id=${subcategory.product_subcategory_id},`);
      toast(res?.data?.message);
      if (res?.data?.success) {
        client.refetchQueries("get_sub_categories");
      }
    } catch (err) {
      toast.error("Error deleting subcategory.");
    } finally {
      setLoading(false);
    }
  };
  const openCreateModal = () => {
    setIsEditMode(false);
    setSelectedSubcategory(null);
    resetForm();
    setSubcategoryModalOpen(true);
  };

  const openEditModal = (subcategory) => {
    setIsEditMode(true);
    setSelectedSubcategory(subcategory);
    setSelectedCategoryId(subcategory.product_category_id);
    setFormData({
      sub_cat_name: subcategory.sub_cat_name || "",
      sub_cat_des: subcategory.sub_cat_des || "",
      sub_cat_image: subcategory.sub_cat_image || "",
      file: null,
    });
    setSubcategoryModalOpen(true);
  };

  const tablehead = [
    <span> S.No.</span>,
    <span> Name</span>,
    <span> Description</span>,
    <span> Image</span>,
    <span> Actions</span>,
  ];

  const tablerow = subcategories.map((subcategory, index) => [
    <span className="text-gray-900 font-medium">{index + 1}</span>,
    <span className="text-gray-900 font-medium">{subcategory.sub_cat_name}</span>,
    <span>{subcategory.sub_cat_des}</span>,
    <img
      src={subcategory.sub_cat_image || "--"}
      alt={subcategory.sub_cat_name}
      className="w-20 h-20 object-cover rounded"
    />,
    <div className="flex space-x-2">
      <button
        onClick={() => openEditModal(subcategory)}
        className="text-green-600 hover:text-green-800"
        title="Edit"
      >
        <Edit />
      </button>
      <button
        onClick={() => deleteSubcategory(subcategory)}
        className="text-red-600 hover:text-red-800"
        title="Delete"
      >
        <DeleteForever />
      </button>
    </div>
  ]);


  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="lg:text-3xl font-bold text-gray-800">
            SubCategories
          </h1>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Add SubCategory</span>
          </button>

        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1 ">
            Select Category:
          </label>
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white bg-opacity-40"
          >
            <option value="">-- Select a Category --</option>
            {categories.map((cat) => (
              <option
                key={cat.product_category_id}
                value={cat.product_category_id}
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>


        {subcatloading ? (
          <div className="space-y-4 w-full">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-full  rounded-lg shadow-sm border p-4"
              >
                <Skeleton variant="text" width="100%" height={25} />
                <Skeleton variant="text" width="100%" height={20} className="mt-2" />
                <Skeleton variant="rectangular" width="100%" height={150} className="mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <CustomTable
            tablehead={tablehead}
            tablerow={tablerow}
            isLoading={subcatloading}
          />
        )}


        {subcategoryModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                {isEditMode ? "Edit SubCategory" : "Add SubCategory"}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option
                      key={cat.product_category_id}
                      value={cat.product_category_id}
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name={isEditMode ? "sub_cat_name" : "name"}
                  value={isEditMode ? formData.sub_cat_name : formData.name}
                  onChange={handleInputChange}
                  placeholder="SubCategory Name *"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <textarea
                  name={isEditMode ? "sub_cat_des" : "description"}
                  value={isEditMode ? formData.sub_cat_des : formData.description}
                  onChange={handleInputChange}
                  placeholder="Description *"
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Image Preview (Edit Only) */}
                {isEditMode && formData.sub_cat_image && (
                  <img
                    src={formData.sub_cat_image}
                    alt="Subcategory"
                    className="w-24 h-24 object-cover rounded"
                  />
                )}

                <input
                  type="file"
                  name="file"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setSubcategoryModalOpen(false);
                    setSelectedSubcategory(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={isEditMode ? updateSubcategory : createSubcategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (isEditMode ? "Updating..." : "Saving...") : isEditMode ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};
export default SubCategory;
