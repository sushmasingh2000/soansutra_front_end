import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import ReactModal from "react-modal";
import { useQuery, useQueryClient } from "react-query";
import { Edit2, Trash2, Plus } from "lucide-react";
import CustomTable from "./Shared/CustomTable";

const ProductDiscount = () => {
  const [searchParams] = useSearchParams();
  const variantId = searchParams.get("variant_id");

  const [variant, setVariant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const client = useQueryClient();

  const [formData, setFormData] = useState({
    id: null,
    product_id: "",
    varient_id: variantId,
    discount_id: "",
  });

  const { data } = useQuery(
    ["get_product_discount", variantId],
    () => apiConnectorGet(`${endpoint.get_product_discount}?varient_id=${variantId}`),
    { enabled: !!variantId }
  );

  const assignedDiscounts = data?.data?.result || [];

  useEffect(() => {
    if (variantId) {
      const fetchVariant = async () => {
        const res = await apiConnectorGet(`${endpoint.get_product_variant}?variant_id=${variantId}`);
        setVariant(res?.data?.result?.[0] || null);
      };
      fetchVariant();
    }
  }, [variantId]);

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const response = await apiConnectorGet(endpoint.get_discount);
      setDiscounts(response?.data?.result || []);
    } catch {
      toast.error("Failed to fetch discounts.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (existing = null) => {
    setFormData({
      id: existing?.id || null,
      product_id: variant?.product_id || "",
      varient_id: variantId,
      discount_id: existing?.discount_id || "",
    });
    setIsEditing(!!existing);
    setModalOpen(true);
    fetchDiscounts();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const endpointUrl = isEditing
        ? endpoint.update_product_discount
        : endpoint.create_product_discount;

      const res = await apiConnectorPost(endpointUrl, formData);
      toast.success(res?.data?.message);
      setModalOpen(false);
      client.refetchQueries(["get_product_discount"]);
    } catch {
      toast.error("Error saving discount.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await apiConnectorGet(`${endpoint.delete_product_discount}?id=${id}`);
      toast.success(res?.data?.message);
      client.refetchQueries(["get_product_discount"]);
    } catch {
      toast.error("Error deleting discount.");
    }
  };

  const tablehead = [
    "S.No.",
    "Discount Name",
    "Type",
    "Value",
    "Start",
    "End",
    "Actions"
  ];

  const tablerow = assignedDiscounts.map((discount, index) => [
    index + 1,
    discount.discount_name,
    discount.discount_type,
    discount.discount_value,
    discount.discount_start_date?.split("T")[0] || "--",
    discount.discount_end_date?.split("T")[0] || "--",
    <div className="flex gap-2">
      <button
        onClick={() => openModal(discount)}
        className="text-blue-600 hover:underline"
      >
        <Edit2 size={16} />
      </button>
      <button
        onClick={() => handleDelete(discount.id)}
        className="text-red-600 hover:underline"
      >
        <Trash2 size={16} />
      </button>
    </div>
  ]);


  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-6">Product Discount</h1>

      {/* Product Details */}
      {variant && (
        <div className="flex justify-between gap-2">
          <div className="flex gap-4">
            <div className="mb-4">
              <label className="block mb-1 font-medium ">Product</label>
              <input className="w-full border p-2 bg-white bg-opacity-45" readOnly value={variant.product_details?.product_name} />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Variant</label>
              <input className="w-full border p-2 bg-white bg-opacity-45" readOnly value={variant.varient_sku} />
            </div>
          </div>
          <div className="mb-4">
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Plus size={16} /> Add Discount
            </button>
          </div>
        </div>
      )}

      {/* Discount Table */}
      {assignedDiscounts.length > 0 ? (
        <div className="mt-4">
          <CustomTable
            tablehead={tablehead}
            tablerow={tablerow}
          // isLoading={isLoading}
          />

        </div>
      ) : (
        <p className="mt-4 text-gray-500">No discounts assigned yet.</p>
      )}

      {/* Modal */}
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        className="w-full max-w-md mx-auto mt-32 bg-white rounded-lg shadow-xl p-6 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">
          {isEditing ? "Edit Discount" : "Assign Discount"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Discount</label>
            <select
              name="discount_id"
              value={formData.discount_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Discount --</option>
              {discounts.map((d) => (
                <option key={d.discount_id} value={d.discount_id}>
                  {d.name} ({d.value}{d.discount_type === "percent" ? "%" : ""})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
          >
            Save
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default ProductDiscount;
