import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import ProductImageManager from "./ProductImage";
import { useNavigate } from "react-router-dom";
import { Edit, Eye, View } from "lucide-react";
import { Delete } from "@mui/icons-material";
import { useQuery, useQueryClient } from "react-query";
import CustomToPagination from "../../Shared/Pagination";
import CustomTable from "./Shared/CustomTable";
// Create this reusable component for repeated info rows
const InfoRow = ({ label, value }) => (
  <div>
    <p className="text-gray-500 font-medium">{label}:</p>
    <p className="text-gray-800">{value}</p>
  </div>
);

const Products = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [isCollection, setisCollection] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showCollectionField, setShowCollectionField] = useState(false);
  const client = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "1.0",
    product_category_id: "",
    product_subcategory_id: "",
    product_coll_id: "",
    file: null,
  });

  const { data: prod } = useQuery(
    ["get_products_admin", { searchTerm, startDate, endDate, page }, isCollection],
    () => apiConnectorGet(endpoint.get_product_all, {
      isCollection: isCollection,
      search: searchTerm,
      start_date: startDate,
      end_date: endDate,
      page: page,
      count: 10,
    }),
    usequeryBoolean
  );
  const products = prod?.data?.result?.data || [];


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
  const { data: categ } = useQuery(
    ["get_categ_admin"],
    () => apiConnectorGet(endpoint.get_product_categroy),
    usequeryBoolean
  );
  const categories = categ?.data?.result || [];

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

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "1.0",
      product_category_id: "",
      product_subcategory_id: "",
      product_coll_id: "",
      file: null,
    });
  };

  const isFormValid = () => {
    return formData.name && formData.product_category_id;
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
      client.refetchQueries("get_products_admin")
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
        price: 1.0,
        product_category_id: formData.product_category_id,
        product_coll_id: formData.product_coll_id,
        product_tags: "example_tag", // placeholder
      };

      const res = await apiConnectorPost(endpoint.update_product, payload);
      toast(res?.data?.message);
      if (res?.data?.success) {
        setEditModal(false);
        setSelectedProduct(null);
        resetForm();
        client.refetchQueries("get_products_admin")
      }
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
      toast(res?.data?.message);
      client.refetchQueries("get_products_admin")
    } catch (err) {
      toast.error("Error deleting product.");
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();


  const handleVariantClick = (product) => {
    console.log(product)
    if (!product || !product.product_id) {
      toast.error("Product is missing.");
      return;
    }
    navigate(`/product-variant/${product.product_id}`, {
      state: { product }, // Pass entire product object
    });
  };

  const openEditModal = async (product) => {
    setSelectedProduct(product);
    await fetchSubcategories(product.product_category_id);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: 0 || "",
      product_category_id: product.product_category_id || "",
      product_subcategory_id: product.product_subcategory_id || "",
      product_coll_id: product.product_coll_id || "",
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

  const { data } = useQuery(
    ["collection_get"],
    () => apiConnectorGet(endpoint.get_collection),
    usequeryBoolean
  );

  const collections = data?.data?.result || [];

  const tablehead = [
    "S.No",
    "Product Name & Image",
    "Category",
    "Subcategory",
    "Collection",
    "Variant",
    "Actions"
  ];

  const tablerow = products.map((product, index) => {
    let images = [];
    try {
      images = JSON.parse(product.product_images || "[]");
    } catch {
      images = [];
    }

    const firstImageUrl = images.length > 0 ? images[0].p_image_url : null;
    const subcategoryName = product.sub_category_details?.sub_cat_name || "N/A";
    const categoryName = product.sub_category_details?.category_details?.["`name`"] || "N/A";

    return [
      <span>{(page - 1) * 10 + index + 1}</span>,
      <div className="flex items-center space-x-3">
        {firstImageUrl && (
          <img
            src={firstImageUrl}
            alt={product.name}
            className="w-12 h-12 object-cover rounded border cursor-pointer"
            onClick={() => openEditModal(product)}
          />
        )}
        <span>{product.name}</span>
      </div>,
      <span>{categoryName}</span>,
      <span>{subcategoryName}</span>,
      <span>{product?.collection_details?.coll_name || "---"}</span>,
      <button
        onClick={() => handleVariantClick(product)}
        title="Manage Variant"
      >
        <Edit className="!text-green-500" />
      </button>,
      <div className="flex space-x-2">
        <button onClick={() => handleViewProduct(product)} title="View">
          <Eye className="!text-green-500" />
        </button>
        <button onClick={() => openEditModal(product)} title="Edit">
          <Edit className="!text-blue-500" />
        </button>
        <button onClick={() => deleteProduct(product)} title="Delete">
          <Delete className="!text-red-500" />
        </button>
      </div>
    ];
  });


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>

        <button
          onClick={() => setCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add  Product</span>
        </button>
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
      <div className="flex justify-start gap-5 mb-2">
        <button
          onClick={() => setisCollection(false)}
          className={`
            ${isCollection ? "bg-gray-300 text-black" : "bg-blue-600 text-white"}  px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2
            `}
        >
          <span>Product</span>
        </button>
        <button
          onClick={() => setisCollection(true)}
          className={`
            ${!isCollection ? "bg-gray-300 text-black" : "bg-blue-600 text-white"}  px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2
            `}        >
          <span>Collection</span>
        </button>
      </div>
      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
      />


      {createModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowCollectionField(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-fit"
              >
                Add Collection
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">

              <div className="flex flex-col gap-1  justify-start">
                <label>Select Category</label>
                <select
                  name="product_category_id"
                  value={formData.product_category_id}
                  onChange={handleInputChange}
                  className="border border-gray-200 rounded p-2"
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
              </div>
              <div className="flex flex-col gap-1  justify-start">
                <label>Select SubCategory</label>
                <select
                  name="product_subcategory_id"
                  value={formData.product_subcategory_id}
                  onChange={handleInputChange}
                  className="border border-gray-200 rounded p-2"
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcat) => (
                    <option
                      key={subcat.product_subcategory_id}
                      value={subcat.product_subcategory_id} >
                      {subcat.sub_cat_name}
                    </option>
                  ))}
                </select>
              </div>
              {showCollectionField && (
                <div className="flex flex-col gap-1 justify-start">
                  <label>Select Collection</label>
                  <select
                    name="product_coll_id"
                    value={formData.product_coll_id}
                    onChange={handleInputChange}
                    className="border border-gray-200 rounded p-2"
                  >
                    <option value="">Select Collection</option>
                    {collections.map((item) => (
                      <option key={item.coll_id} value={item.coll_id}>
                        {item.coll_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-col gap-1  justify-start">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Product Name *"
                  className="w-full p-3 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              {/* <div className="flex flex-col gap-1  justify-start">
                <label>Product Image</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div> */}
              {/* <div className="flex flex-col gap-1  justify-start">
                <label>Product Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price *"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div> */}
              <div className="flex flex-col gap-1  justify-start">
                <label>Product Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description *"
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1  justify-start">
                <label>Product Tags</label>
                <input
                  type="text"
                  name="product_tags"
                  value={formData.product_tags}
                  onChange={handleInputChange}
                  placeholder="Tags (comma separated)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowCollectionField(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-fit"
              >
                Add Collection
              </button>
            </div>
            {selectedProduct?.product_id && (
              <>
                <h3 className="text-lg font-semibold mb-2"> Multiple Images</h3>
                <ProductImageManager productId={selectedProduct.product_id} />
              </>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-1 mt-5 justify-start">
                <label>Select Category</label>
                <select
                  name="product_category_id"
                  value={formData.product_category_id}
                  onChange={handleInputChange}
                  className="border border-gray-200 rounded p-2"
                >
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
              <div className="flex flex-col gap-1  justify-start">
                <label>Select Subcategory</label>
                <select
                  name="product_subcategory_id"
                  value={formData.product_subcategory_id}
                  onChange={handleInputChange}
                  className="border border-gray-200 rounded p-2"
                >
                  {subcategories.map((subcat) => (
                    <option
                      key={subcat.product_subcategory_id}
                      value={subcat.product_subcategory_id}
                    >
                      {subcat.sub_cat_name}
                    </option>
                  ))}
                </select>
              </div>
              {showCollectionField && (
                <div className="flex flex-col gap-1 justify-start">
                  <label>Select Collection</label>
                  <select
                    name="product_coll_id"
                    value={formData.product_coll_id}
                    onChange={handleInputChange}
                    className="border border-gray-200 rounded p-2"
                  >
                    <option value="">Select Collection</option>
                    {collections.map((item) => (
                      <option key={item.coll_id} value={item.coll_id}>
                        {item.coll_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-col gap-1  justify-start">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Product Name *"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* <div className="flex flex-col gap-1  justify-start">
                <label> Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price *"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div> */}
              {/* <div className="flex flex-col gap-1  justify-start">
                <label>Product Image</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div> */}
              <div className="flex flex-col gap-1  justify-start">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description *"
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1  justify-start">
                <label>Tags</label>
                <input
                  type="text"
                  name="product_tags"
                  value={formData.product_tags}
                  onChange={handleInputChange}
                  placeholder="Tags (comma separated)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

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
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
    <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl transform transition-all duration-300 scale-100">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">📦 Product Details</h2>
        <p className="text-sm text-gray-500">Here is a detailed view of the selected product.</p>
      </div>

      <div className="p-6 space-y-8">

        {/* Basic Info Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">🔍 Basic Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <InfoRow label="Name" value={viewData.name} />
            <InfoRow label="Tags" value={viewData.product_tags || "N/A"} />
            <InfoRow label="Category" value={viewData.sub_category_details?.category_details?.["`name`"] || "N/A"} />
            <InfoRow label="Subcategory" value={viewData.sub_category_details?.sub_cat_name || "N/A"} />
          </div>
        </section>
            <InfoRow label="Description" value={viewData.description || "N/A"} />

        {/* Images Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">🖼️ Product Images</h3>
          <div className="flex flex-wrap gap-3">
            {(() => {
              let images = [];
              try {
                images = JSON.parse(viewData.product_images || "[]");
              } catch (err) {
                console.error("Invalid product_images JSON", err);
              }

              return images.length > 0 ? (
                images.filter(img => img?.p_image_url).map((img, idx) => (
                  <img
                    key={idx}
                    src={img.p_image_url}
                    alt={`Product image ${idx + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No images available.</p>
              );
            })()}
          </div>
        </section>

        {/* Inventory Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">📦 Inventory Details</h3>
          <div className="space-y-4">
            {(() => {
              let inventory = [];
              try {
                inventory = JSON.parse(viewData.inventory_details || "[]");
              } catch (err) {
                console.error("Invalid inventory_details JSON", err);
              }

              return inventory.length === 0 ? (
                <p className="text-gray-500">No inventory data available.</p>
              ) : (
                inventory.map((inv, idx) => (
                  <div key={idx} className="p-4 border rounded-md bg-gray-50 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <InfoRow label="Quantity" value={inv.quantity ?? "N/A"} />
                      <InfoRow label="Barcode" value={inv.barcode ?? "N/A"} />
                      <InfoRow label="Batch Number" value={inv.batch_number ?? "N/A"} />
                      <InfoRow label="Expiry Date" value={inv.expiry_date ?? "N/A"} />
                      <InfoRow label="Inventory Unique" value={inv.inventory_unique ?? "N/A"} />
                      <InfoRow label="Last Updated" value={inv.last_updated ? new Date(inv.last_updated).toLocaleString() : "N/A"} />
                      <InfoRow label="Minimum Quantity" value={inv.minimum_quantity ?? "N/A"} />
                      <InfoRow label="Reserved Quantity" value={inv.reserved_quantity ?? "N/A"} />
                    </div>

                    {/* Warehouse Info */}
                    {inv.warehouse_details && (
                      <div className="mt-3 pl-4 border-l-4 border-blue-200 text-sm text-gray-700">
                        <p className="font-medium">🏠 Warehouse Info</p>
                        <p><strong>Name:</strong> {inv.warehouse_details.name || "N/A"}</p>
                        <p><strong>City:</strong> {inv.warehouse_details.city || "N/A"}</p>
                        <p><strong>State:</strong> {inv.warehouse_details.state || "N/A"}</p>
                        <p><strong>Country:</strong> {inv.warehouse_details.country || "N/A"}</p>
                        <p><strong>Pincode:</strong> {inv.warehouse_details.pincode || "N/A"}</p>
                      </div>
                    )}
                  </div>
                ))
              );
            })()}
          </div>
        </section>

        {/* Timestamps */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">🕒 Timestamps</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <InfoRow label="Created At" value={new Date(viewData.created_at).toLocaleString()} />
            <InfoRow label="Updated At" value={new Date(viewData.updated_at).toLocaleString()} />
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="flex justify-end px-6 py-4 border-t border-gray-200 bg-gray-50">
        <button
          onClick={() => {
            setViewModal(false);
            setViewData(null);
          }}
          className="px-5 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  
)}


      <CustomToPagination data={prod?.data?.result} setPage={setPage} page={page} />
    </div>
  );
};
export default Products;
