import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { Delete, Edit } from "lucide-react";

const Tax = () => {
    const [tax, setTaxs] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedTax, setSelectedTax] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        percentage: "",
        is_active: "Active",
    });

    const fetchTaxs = async () => {
        try {
            setLoading(true);
            const response = await apiConnectorGet(endpoint.get_tax);
            setTaxs(response?.data?.result || []);
        } catch (err) {
            toast.error("Failed to fetch tax.");
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
            percentage: "",
            is_active: "Active",
        });
        setSelectedTax(null);
    };

    const createTax = async () => {
        try {
            setLoading(true);
            const res = await apiConnectorPost(endpoint.create_tax, formData);
            toast(res?.data?.message);
            if (res?.data?.success) {
                setCreateModal(false);
                resetForm();
                fetchTaxs();
            }
        } catch (err) {
            toast.error("Error creating tax.");
        } finally {
            setLoading(false);
        }
    };

    const updateTax = async () => {
        try {
            setLoading(true);
            const payload = {
                tax_id: selectedTax.tax_id,
                ...formData,
            };
            const res = await apiConnectorPost(endpoint.update_tax, payload);
            toast(res?.data?.message);
            if (res?.data?.success) {
                setEditModal(false);
                resetForm();
                fetchTaxs();
            }
        } catch (err) {
            toast.error("Error updating tax.");
        } finally {
            setLoading(false);
        }
    };

    const deleteTax = async (tax_id) => {
        try {
            setLoading(true);
            const res = await apiConnectorGet(`${endpoint.delete_tax}?tax_id=${tax_id}`);
            toast(res?.data?.message);
            if (res?.data?.message) {
                fetchTaxs();
            }
        } catch (err) {
            toast.error("Error deleting tax.");
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (tax) => {
        setSelectedTax(tax);
        setFormData({
            name: tax.name,
            percentage: tax.percentage,
            is_active: tax.is_active,
        });
        setEditModal(true);
    };

    useEffect(() => {
        fetchTaxs();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Taxes</h1>
                <button
                    onClick={() => setCreateModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    ➕ Add Tax
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">S.No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tax.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">No tax found.</td>
                            </tr>
                        ) : (
                            tax.map((tax, index) => (
                                <tr key={tax.tax_id}>
                                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm">{tax.name}</td>
                                    <td className="px-6 py-4 text-sm">{tax.percentage}</td>
                                    <td className="px-6 py-4 text-sm">{tax.is_active}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openEditModal(tax)}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <Edit />
                                            </button>
                                            <button
                                                onClick={() => deleteTax(tax.tax_id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Delete />
                                            </button>
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
                <TaxModal
                    title="Add Tax"
                    formData={formData}
                    onClose={() => {
                        setCreateModal(false);
                        resetForm();
                    }}
                    onSubmit={createTax}
                    onChange={handleInputChange}
                    loading={loading}
                />
            )}

            {/* Edit Modal */}
            {editModal && (
                <TaxModal
                    title="Edit Tax"
                    formData={formData}
                    onClose={() => {
                        setEditModal(false);
                        resetForm();
                    }}
                    onSubmit={updateTax}
                    onChange={handleInputChange}
                    loading={loading}
                />
            )}
        </div>
    );
};

const TaxModal = ({ title, formData, onClose, onSubmit, onChange, loading }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div className="grid grid-cols-1 gap-4">
                    <input
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        placeholder="Name *"
                        className="p-3 border rounded-lg"
                    />
                    <input
                        name="percentage"
                        type="number"
                        value={formData.percentage}
                        onChange={onChange}
                        placeholder="Percentage *"
                        className="p-3 border rounded-lg"
                    />
                    <select
                        name="is_active"
                        value={formData.is_active}
                        onChange={onChange}
                        className="p-3 border rounded-lg"
                    >
                        <option value="Active">Active</option>
                        <option value="Deactive">Deactive</option>
                    </select>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tax;
