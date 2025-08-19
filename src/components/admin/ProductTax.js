import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import ReactModal from "react-modal";
import { useQuery, useQueryClient } from "react-query";
import { Delete, Edit, Edit2, Plus, Trash2 } from "lucide-react";
import { Add } from "@mui/icons-material";

const ProductTax = () => {
    const [searchParams] = useSearchParams();
    const variantId = searchParams.get("variant_id");
    const [variant, setVariant] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [taxes, setTaxes] = useState([]);
    const [loading, setLoading] = useState(false);

    const client = useQueryClient();

    const [formData, setFormData] = useState({
        id: null,
        product_id: "",
        variant_id: variantId,
        tax_id: "",
    });


    const { data } = useQuery(
        ["get_product_tax", variantId],
        () => apiConnectorGet(`${endpoint.get_product_tax}?variant_id=${variantId}`),
        { enabled: !!variantId }
    );

    const assignedTaxes = data?.data?.result || [];


    useEffect(() => {
        if (variantId) {
            const fetchVariant = async () => {
                const res = await apiConnectorGet(`${endpoint.get_product_variant}?variant_id=${variantId}`);
                setVariant(res?.data?.result?.[0] || null);
            };
            fetchVariant();
        }
    }, [variantId]);

    const fetchTaxes = async () => {
        try {
            setLoading(true);
            const response = await apiConnectorGet(endpoint.get_tax);
            setTaxes(response?.data?.result || []);
        } catch (err) {
            toast.error("Failed to fetch taxes.");
        } finally {
            setLoading(false);
        }
    };

    const openModal = (existing = null) => {
        setFormData({
            id: String(existing?.id) || null,
            product_id: variant?.product_id?.toString() || "", // Ensure string
            variant_id: variantId,
            tax_id: existing?.tax_id?.toString() || "",
        });
        setIsEditing(!!existing);
        setModalOpen(true);
        fetchTaxes();
    };


    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

   const handleSubmit = async () => {
    if (!formData.tax_id || !formData.product_id) {
        toast.error("Please select a valid tax and ensure product is loaded.");
        return;
    }

    try {
        const endpointUrl = isEditing ? endpoint.update_product_tax : endpoint.create_product_tax;
        const res = await apiConnectorPost(endpointUrl, formData);
        toast.success(res?.data?.message);
        setModalOpen(false);
        client.refetchQueries(["get_product_tax"]);
    } catch (err) {
        toast.error("Error saving tax.");
    }
};


    const handleDelete = async (id) => {
        try {
            const res = await apiConnectorGet(`${endpoint.delete_product_tax}?id=${id}`);
            toast.success(res?.data?.message);
            client.refetchQueries(["get_product_tax"]);
        } catch (err) {
            toast.error("Error deleting tax.");
        }
    };


    return (
        <div className="p-6  mx-auto">
            <h1 className="text-2xl font-bold mb-6">Product Tax</h1>

            {variant && (
                <>
                   <div className="flex justify-between gap-2">
                   <div className="flex justify-start gap-2">
                     <div className="mb-4">
                        <label className="block mb-1 font-medium">Product</label>
                        <input
                            className="w-full border p-2"
                            readOnly
                            value={variant.product_details?.product_name}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Variant</label>
                        <input
                            className="w-full border p-2"
                            readOnly
                            value={variant.varient_sku}
                        />
                    </div>
                    </div>
                    <div>
                    <div className="mb-4">
                         <button
                            onClick={() => openModal()}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            <Add size={16} /> ADD
                        </button>
                    </div>
                   </div>
                   </div>
                </>
            )}

            {assignedTaxes.length > 0 && (
                <div className="mt-4">
                    <table className="min-w-full bg-white border rounded shadow overflow-hidden">
                        <thead className="bg-gray-100 text-gray-700 text-left">
                            <tr>
                                <th className="py-2 px-4 border-b">Tax Name</th>
                                <th className="py-2 px-4 border-b">Percentage</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedTaxes.map((tax) => (
                                <tr key={tax.id} className="text-sm">
                                    <td className="py-2 px-4 border-b">{tax.tax_name}</td>
                                    <td className="py-2 px-4 border-b">{tax.tax_percentage}%</td>
                                    <td className="py-2 px-4 border-b">{tax.tax_is_active}</td>
                                    <td className="py-2 px-4 border-b">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openModal(tax)}
                                                className="px-2 py-1 text-sm  text-blue-800 rounded "
                                            >
                                                <Edit2 />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(tax.id)}
                                                className="px-2 py-1 text-sm  text-red-800 rounded "
                                            >
                                                <Delete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


            {/* Modal */}
            <ReactModal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                ariaHideApp={false}
                className="w-full max-w-md mx-auto mt-32 bg-white rounded-lg shadow-xl p-6 outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
            >
                <h2 className="text-xl font-semibold mb-6 text-center">{isEditing ? "Edit Tax" : "Assign Tax"}</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Select Tax</label>
                        <select
                            name="tax_id"
                            value={formData.tax_id}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Select Tax --</option>
                            {taxes.map((tax) => (
                                <option key={tax.tax_id} value={tax.tax_id}>
                                    {tax.name} ({tax.percentage}%)
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

export default ProductTax;
