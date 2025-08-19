import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { Delete, Edit } from "lucide-react";

const Discount = () => {
    const [discounts, setDiscounts] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        discount_type: "",
        value: "",
        start_date: "",
        end_date: "",
        is_active: "Active",
    });

    const fetchDiscounts = async () => {
        try {
            setLoading(true);
            const response = await apiConnectorGet(endpoint.get_discount);
            setDiscounts(response?.data?.result || []);
        } catch (err) {
            toast.error("Failed to fetch discounts.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            discount_type: "",
            value: "",
            start_date: "",
            end_date: "",
            is_active: "Active",
        });
        setSelectedDiscount(null);
    };

    const createDiscount = async () => {
        try {
            setLoading(true);
            const res = await apiConnectorPost(endpoint.create_discount, formData);
            toast(res?.data?.message);
            if (res?.data?.success) {
                setCreateModal(false);
                resetForm();
                fetchDiscounts();
            }

        } catch (err) {
            toast.error("Error creating discount.");
        } finally {
            setLoading(false);
        }
    };

    const updateDiscount = async () => {
        try {
            setLoading(true);
            const payload = {
                discount_id: selectedDiscount.discount_id,
                ...formData,
            };
            const res = await apiConnectorPost(endpoint.update_discount, payload);
            toast(res?.data?.message);
            if (res?.data?.success) {
                setEditModal(false);
                resetForm();
                fetchDiscounts();
            }
        } catch (err) {
            toast.error("Error updating discount.");
        } finally {
            setLoading(false);
        }
    };

    const deleteDiscount = async (discount_id) => {
        try {
            setLoading(true);
            const res = await apiConnectorGet(`${endpoint.delete_discount}?discount_id=${discount_id}`);
            toast(res?.data?.message);
            if (res?.data?.message) {
                fetchDiscounts();
            }
        } catch (err) {
            toast.error("Error deleting discount.");
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (discount) => {
        setSelectedDiscount(discount);
        setFormData({
            name: discount.name,
            discount_type: discount.discount_type,
            value: discount.value,
            start_date: discount.start_date,
            end_date: discount.end_date,
            is_active: discount.is_active,
        });
        setEditModal(true);
    };

    useEffect(() => {
        fetchDiscounts();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Discounts</h1>
                <button
                    onClick={() => setCreateModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    ➕ Add Discount
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">S.No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {discounts.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-6 text-gray-500">No discounts found.</td>
                            </tr>
                        ) : (
                            discounts.map((discount, index) => (
                                <tr key={discount.discount_id}>
                                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm">{discount.name}</td>
                                    <td className="px-6 py-4 text-sm">{discount.discount_type}</td>
                                    <td className="px-6 py-4 text-sm">{discount.value}</td>
                                    <td className="px-6 py-4 text-sm">{discount.start_date}</td>
                                    <td className="px-6 py-4 text-sm">{discount.end_date}</td>
                                    <td className="px-6 py-4 text-sm">{discount.is_active}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openEditModal(discount)}
                                                className="text-green-600 hover:text-green-800"
                                            ><Edit /></button>
                                            <button
                                                onClick={() => deleteDiscount(discount.discount_id)}
                                                className="text-red-600 hover:text-red-800"
                                            ><Delete /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create Modal */}
            {createModal && (
                <DiscountModal
                    title="Add Discount"
                    formData={formData}
                    onClose={() => {
                        setCreateModal(false);
                        resetForm();
                    }}
                    onSubmit={createDiscount}
                    onChange={handleInputChange}
                    loading={loading}
                />
            )}

            {/* Edit Modal */}
            {editModal && (
                <DiscountModal
                    title="Edit Discount"
                    formData={formData}
                    onClose={() => {
                        setEditModal(false);
                        resetForm();
                    }}
                    onSubmit={updateDiscount}
                    onChange={handleInputChange}
                    loading={loading}
                />
            )}
        </div>
    );
};

const DiscountModal = ({ title, formData, onClose, onSubmit, onChange, loading }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div className="grid grid-cols-1 gap-4">
                    <input name="name" value={formData.name} onChange={onChange} placeholder="Name *" className="p-3 border rounded-lg" />
                    <select name="discount_type" value={formData.discount_type} onChange={onChange} className="p-3 border rounded-lg">
                        <option value="">Select Type</option>
                        <option value="Flat">Flat</option>
                        <option value="Percentage">Percentage</option>
                    </select>
                    <input name="value" type="number" value={formData.value} onChange={onChange} placeholder="Value *" className="p-3 border rounded-lg" />
                    <input name="start_date" type="date" value={formData.start_date} onChange={onChange} className="p-3 border rounded-lg" />
                    <input name="end_date" type="date" value={formData.end_date} onChange={onChange} className="p-3 border rounded-lg" />
                    <select name="is_active" value={formData.is_active} onChange={onChange} className="p-3 border rounded-lg">
                        <option value="Active">Active</option>
                        <option value="Deactive">Deactive</option>
                    </select>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50" disabled={loading}>Cancel</button>
                    <button onClick={onSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Discount;
