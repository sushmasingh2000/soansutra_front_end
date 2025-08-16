
import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import ProductImageManager from "./ProductImage";

const ProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    product_category_id: "",
    product_subcategory_id: "",
    file: null,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiConnectorGet(endpoint.get_product_all);
      setProducts(response?.data?.result?.data || []);
    } catch (err) {
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "product_category_id") {
      // When category changes, fetch subcategories & reset subcategory field
      setFormData((prev) => ({
        ...prev,
        product_category_id: value,
        product_subcategory_id: "", // reset subcategory
      }));
      fetchSubcategories(value);
    } else if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiConnectorGet(endpoint.get_product_categroy); // fix typo if any
      setCategories(response?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };
  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }
    try {
      setLoading(true);
      const response = await apiConnectorGet(
        `${endpoint.get_product_subcategory}?product_category_id=${categoryId}`
      );
      setSubcategories(response?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch subcategories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      product_category_id: "",
      product_subcategory_id: "",
      file: null,
    });
  };

  const isFormValid = () => {
    return formData.name && formData.price && formData.product_category_id;
  };

  const createProduct = async () => {
    try {
      setLoading(true);
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key, value);
      });

      const res = await apiConnectorPost(endpoint.create_product, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res?.data?.message || "Product created");
      setCreateModal(false);
      resetForm();
      fetchProducts();
    } catch (err) {
      toast.error("Error creating product.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id) => {
    try {
      const res = await apiConnectorGet(
        `${endpoint.get_product_by_id}?product_id=${id}`
      );
      return res?.data?.result;
    } catch (err) {
      toast.error("Failed to fetch product by ID.");
      return null;
    }
  };

  const updateProduct = async () => {
    try {
      setLoading(true);
      const payload = {
        product_id: selectedProduct?.product_id,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        product_category_id: formData.product_category_id,
        product_tags: "example_tag", // placeholder
      };

      const res = await apiConnectorPost(endpoint.update_product, payload);
      toast.success(res?.data?.message || "Product updated");
      setEditModal(false);
      setSelectedProduct(null);
      resetForm();
      fetchProducts();
    } catch (err) {
      toast.error("Error updating product.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (product) => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(
        `${endpoint.delete_product}?product_id=${product.product_id}`
      );
      toast.success(res?.data?.message || "Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Error deleting product.");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      product_category_id: product.product_category_id || "",
      product_subcategory_id: product.product_subcategory_id || "",
      file: null,
    });
    setEditModal(true);
  };

  const handleViewProduct = async (product) => {
    const data = await fetchProductById(product.product_id);
    if (data) {
      setViewData(data);
      setViewModal(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => setCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add New Product</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name & Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subcategory
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                // Parse product images JSON safely
                let images = [];
                try {
                  images = JSON.parse(product.product_images || "[]");
                } catch {
                  images = [];
                }

                // Extract first image url if exists
                const firstImageUrl =
                  images.length > 0 ? images[0].p_image_url : null;

                // Access category and subcategory names carefully
                const subcategoryName =
                  product.sub_category_details?.sub_cat_name || "N/A";

                // The category name has backticks in key: "`name`"
                // Use bracket notation to access it safely
                const categoryName =
                  product.sub_category_details?.category_details?.["`name`"] ||
                  "N/A";

                return (
                  <tr key={product.product_id}>
                    <td className="px-6 py-4 flex items-center space-x-3">
                      {firstImageUrl && (
                        <img
                          src={firstImageUrl}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded border"
                        />
                      )}
                      <span>{product.name}</span>
                    </td>
                    <td className="px-6 py-4">₹{product.price}</td>
                    <td className="px-6 py-4">{categoryName}</td>
                    <td className="px-6 py-4">{subcategoryName}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button onClick={() => handleViewProduct(product)}>
                          👁️
                        </button>
                        <button onClick={() => openEditModal(product)}>
                          ✏️
                        </button>
                        <button onClick={() => deleteProduct(product)}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {createModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <h3 className="text-lg font-semibold mb-2">Manage Images</h3>
            <ProductImageManager productId={selectedProduct?.product_id} />
            <div className="grid grid-cols-1 gap-4">
              <select
                name="product_category_id"
                value={formData.product_category_id}
                onChange={handleInputChange}
                className="..."
              >
                <option value="">Select Category *</option>
                {categories.map((cat) => (
                  <option
                    key={cat.product_category_id}
                    value={cat.product_category_id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                name="product_subcategory_id"
                value={formData.product_subcategory_id}
                onChange={handleInputChange}
                className="..."
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((subcat) => (
                  <option
                    key={subcat.product_subcategory_id}
                    value={subcat.product_subcategory_id}
                  >
                    {subcat.sub_cat_name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Product Name *"
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
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <input
                type="text"
                name="product_tags"
                value={formData.product_tags}
                onChange={handleInputChange}
                placeholder="Tags (comma separated)"
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
                  setCreateModal(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={createProduct}
                disabled={!isFormValid() || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <h3 className="text-lg font-semibold mb-2">Manage Images</h3>
            <ProductImageManager productId={selectedProduct?.product_id} />
            <div className="grid grid-cols-1 gap-4">
              <select
                name="product_category_id"
                value={formData.product_category_id}
                onChange={handleInputChange}
                className="..."
              >
                <option value="">Select Category *</option>
                {categories.map((cat) => (
                  <option
                    key={cat.product_category_id}
                    value={cat.product_category_id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                name="product_subcategory_id"
                value={formData.product_subcategory_id}
                onChange={handleInputChange}
                className="..."
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((subcat) => (
                  <option
                    key={subcat.product_subcategory_id}
                    value={subcat.product_subcategory_id}
                  >
                    {subcat.sub_cat_name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Product Name *"
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
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price *"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <input
                type="text"
                name="product_tags"
                value={formData.product_tags}
                onChange={handleInputChange}
                placeholder="Tags (comma separated)"
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
                  setEditModal(false);
                  setViewData(null);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={updateProduct}
                disabled={!isFormValid() || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModal && viewData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">View Product</h2>
            <div className="grid grid-cols-1 gap-4 text-sm text-gray-800">
              <div>
                <strong>Name:</strong> {viewData.name}
              </div>
              <div>
                <strong>Description:</strong> {viewData.description || "N/A"}
              </div>
              <div>
                <strong>Price:</strong> ₹{viewData.price}
              </div>
              <div>
                <strong>Tags:</strong> {viewData.product_tags || "N/A"}
              </div>

              <div>
                <strong>Category:</strong>{" "}
                {viewData.sub_category_details?.category_details?.["`name`"] ||
                  "N/A"}
              </div>
              <div>
                <strong>Subcategory:</strong>{" "}
                {viewData.sub_category_details?.sub_cat_name || "N/A"}
              </div>

              <div>
                <strong>Images:</strong>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {(() => {
                    let images = [];
                    try {
                      images = JSON.parse(viewData.product_images || "[]");
                    } catch (err) {
                      console.error("Invalid product_images JSON", err);
                    }

                    return images
                      .filter((img) => img?.p_image_url)
                      .map((img, idx) => (
                        <img
                          key={idx}
                          src={img.p_image_url}
                          alt={`Product image ${idx + 1}`}
                          className="w-24 h-24 object-cover rounded border"
                        />
                      ));
                  })()}
                </div>
              </div>

              <div>
                <strong>Inventory:</strong>
                <div className="mt-2 space-y-2 text-sm">
                  {(() => {
                    let inventory = [];
                    try {
                      inventory = JSON.parse(
                        viewData.inventory_details || "[]"
                      );
                    } catch (err) {
                      console.error("Invalid inventory_details JSON", err);
                    }

                    return inventory.length === 0 ? (
                      <div className="text-gray-500">No inventory data.</div>
                    ) : (
                      inventory.map((inv, idx) => (
                        <div
                          key={idx}
                          className="border p-2 rounded bg-gray-50"
                        >
                          <div>
                            <strong>Quantity:</strong> {inv.quantity ?? "N/A"}
                          </div>
                          <div>
                            <strong>Barcode:</strong> {inv.barcode ?? "N/A"}
                          </div>
                          <div>
                            <strong>Batch Number:</strong>{" "}
                            {inv.batch_number ?? "N/A"}
                          </div>
                          <div>
                            <strong>Expiry Date:</strong>{" "}
                            {inv.expiry_date ?? "N/A"}
                          </div>
                          <div>
                            <strong>Last Updated:</strong>{" "}
                            {inv.last_updated
                              ? new Date(inv.last_updated).toLocaleString()
                              : "N/A"}
                          </div>
                          <div>
                            <strong>Inventory Unique:</strong>{" "}
                            {inv.inventory_unique ?? "N/A"}
                          </div>
                          <div>
                            <strong>Minimum Quantity:</strong>{" "}
                            {inv.minimum_quantity ?? "N/A"}
                          </div>
                          <div>
                            <strong>Reserved Quantity:</strong>{" "}
                            {inv.reserved_quantity ?? "N/A"}
                          </div>

                          {inv.warehouse_details && (
                            <div className="mt-2 pl-2 border-l-4 border-gray-300">
                              <div>
                                <strong>Warehouse:</strong>{" "}
                                {inv.warehouse_details.name || "N/A"}
                              </div>
                              <div>
                                <strong>City:</strong>{" "}
                                {inv.warehouse_details.city || "N/A"}
                              </div>
                              <div>
                                <strong>State:</strong>{" "}
                                {inv.warehouse_details.state || "N/A"}
                              </div>
                              <div>
                                <strong>Country:</strong>{" "}
                                {inv.warehouse_details.country || "N/A"}
                              </div>
                              <div>
                                <strong>Pincode:</strong>{" "}
                                {inv.warehouse_details.pincode || "N/A"}
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    );
                  })()}
                </div>
              </div>

              <div>
                <strong>Created At:</strong>{" "}
                {new Date(viewData.created_at).toLocaleString()}
              </div>
              <div>
                <strong>Updated At:</strong>{" "}
                {new Date(viewData.updated_at).toLocaleString()}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setViewModal(false);
                  setViewData(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductsTab;
