import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { DeleteForever, Edit } from "@mui/icons-material";

const ProductMaterial = () => {
    const [materials, setMaterials] = useState([]);
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const [formData, setFormData] = useState({
        material_name: "",
        unit_id: "",
        description: "",
    });

    const fetchMaterials = async () => {
        try {
            setLoading(true);
            const res = await apiConnectorGet(endpoint.get_material);
            setMaterials(res?.data?.result || []);
        } catch {
            toast.error("Failed to fetch materials.");
        } finally {
            setLoading(false);
        }
    };

    const fetchUnits = async () => {
        try {
            const res = await apiConnectorGet(endpoint.get_product_unitt);
            setUnits(res?.data?.result || []);
        } catch {
            toast.error("Failed to fetch units.");
        }
    };

    useEffect(() => {
        fetchMaterials();
        fetchUnits();
    }, []);

    const resetForm = () => {
        setFormData({
            material_name: "",
            unit_id: "",
            description: "",
        });
        setSelectedMaterial(null);
    };

    const handleSubmit = async () => {
        const { material_name, unit_id } = formData;

        if (!material_name || !unit_id) {
            toast.error("Name & Unit are required.");
            return;
        }

        setLoading(true);
        const payload = selectedMaterial
            ? { material_id: selectedMaterial.material_id, ...formData }
            : { ...formData };

        const endpointUrl = selectedMaterial
            ? endpoint.update_material
            : endpoint.create_material;

        try {
            const res = await apiConnectorPost(endpointUrl, payload);
            toast(res?.data?.message);
            if (res?.data?.success) {
                fetchMaterials();
                setModalOpen(false);
                resetForm();
            }

        } catch {
            toast.error("Operation failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (material) => {
        setSelectedMaterial(material);
        setFormData({
            material_name: material.material_name || "",
            unit_id: material.unit_id || "",
            description: material.description || "",
        });
        setModalOpen(true);
    };

    const handleDelete = async (material_id) => {
        try {
            const res = await apiConnectorGet(`${endpoint.delete_material}?material_id=${material_id}`);
            toast(res?.data?.message);
            fetchMaterials();
        } catch {
            toast.error("Delete failed.");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Materials</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add Material
                </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Unit</th>
                            <th className="px-4 py-3 text-left">Description</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map((material) => (
                            <tr key={material.material_id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{material.material_name || "--"}</td>
                                <td className="px-4 py-2">{material.unit_name || "--"}</td>
                                <td className="px-4 py-2">{material.description || "--"}</td>
                                <td className="px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleEdit(material)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        <Edit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(material.material_id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        <DeleteForever />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {materials.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-4 text-center text-gray-500">
                                    No materials found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4">
                        <h2 className="text-xl font-semibold">
                            {selectedMaterial ? "Edit Material" : "Add Material"}
                        </h2>

                        <input
                            type="text"
                            name="material_name"
                            placeholder="Material Name"
                            value={formData.material_name}
                            onChange={(e) => setFormData({ ...formData, material_name: e.target.value })}
                            className="w-full border p-2 rounded"
                        />

                        <select
                            name="unit_id"
                            value={formData.unit_id}
                            onChange={(e) => setFormData({ ...formData, unit_id: e.target.value })}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select Unit</option>
                            {units.map((unit) => (
                                <option key={unit.un_id} value={unit.un_id}>
                                    {unit.un_name}
                                </option>
                            ))}
                        </select>

                        <textarea
                            name="description"
                            placeholder="Description"
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full border p-2 rounded"
                        />

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    setModalOpen(false);
                                    resetForm();
                                }}
                                disabled={loading}
                                className="px-4 py-2 border rounded hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {loading ? "Saving..." : selectedMaterial ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductMaterial;
