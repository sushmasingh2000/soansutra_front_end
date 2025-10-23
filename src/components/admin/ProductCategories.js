import React, { useState } from "react";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useQuery, useQueryClient } from "react-query";
import CustomTable from "./Shared/CustomTable";

const ProductCategories = () => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const client = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: null,
  });

  const { data: categ, isLoading } = useQuery(
    ["get_categ_admin"],
    () => apiConnectorGet(endpoint.get_product_categroy),
    usequeryBoolean
  );
  const categories = categ?.data?.result || [];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", file: null });
    setSelectedCategory(null);
  };

  const isFormValid = () => {
    return formData.name && formData.description;
  };

  const openCreateModal = () => {
    setIsEditMode(false);
    resetForm();
    setCategoryModalOpen(true);
  };

  const openEditModal = (category) => {
    setIsEditMode(true);
    setSelectedCategory(category);
    setFormData({
      name: category.name || "",
      description: category.description || "",
      file: null,
    });
    setCategoryModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      if (formData.file) form.append("file", formData.file);

      if (isEditMode) {
        form.append("product_category_id", selectedCategory?.product_category_id);
        const res = await apiConnectorPost(endpoint.upddate_product, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast(res?.data?.message);
         if (res?.data?.message) {
        setCategoryModalOpen(false);
        resetForm();
        client.refetchQueries("get_categ_admin");
      }
      } else {
        const res = await apiConnectorPost(endpoint.category_product, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast(res?.data?.message);
         if (res?.data?.message) {
        setCategoryModalOpen(false);
        resetForm();
        client.refetchQueries("get_categ_admin");
      }
      }
     
    } catch (err) {
      toast.error("Error saving category.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (category) => {
    try {
      setLoading(true);
      const payload = { product_category_id: category.product_category_id };
      const res = await apiConnectorPost(endpoint.delete_product_category, payload);
      toast.success(res?.data?.message || "Category deleted");
      client.refetchQueries("get_categ_admin");
    } catch (err) {
      toast.error("Error deleting category.");
    } finally {
      setLoading(false);
    }
  };

  const tablehead = ["S.No.", "Category Name", "Description", "Image", "Actions"];

  const tablerow = categories?.map((category, index) => [
    <span>{index + 1}</span>,
    <span>{category.name}</span>,
    <span className="whitespace-pre-wrap break-words max-w-xs">{category.description}</span>,
    <img
      src={category.cat_image}
      alt=""
      className="w-16 h-16 object-cover rounded"
    />,
    <div className="flex space-x-2">
      <button
        onClick={() => openEditModal(category)}
        className="text-green-600 hover:text-green-800"
        title="Edit"
      >
        <Edit fontSize="small" />
      </button>
      <button
        onClick={() => deleteCategory(category)}
        className="text-red-600 hover:text-red-800"
        title="Delete"
      >
        <DeleteForever fontSize="small" />
      </button>
    </div>,
  ]);

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Add Category</span>
          </button>
        </div>

        <CustomTable tablehead={tablehead} tablerow={tablerow} isLoading={isLoading} />

        {/* Modal */}
        {categoryModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                {isEditMode ? "Edit Category" : "Add Category"}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Category Name *"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description *"
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <input
                  type="file"
                  name="file"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setCategoryModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid() || loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? isEditMode
                      ? "Updating..."
                      : "Saving..."
                    : isEditMode
                      ? "Update"
                      : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCategories;
