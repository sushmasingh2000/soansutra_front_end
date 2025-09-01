import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { DeleteForever, Edit } from "@mui/icons-material";

const ProductMaterial = () => {
    const [materials, setMaterials] = useState([]);
    const [Mastmaterials, setMastMaterials] = useState([]);
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const [formData, setFormData] = useState({
        ma_material_id: "",
        material_name: "",
        unit: "",
        material_price: ""
    });

    const fetchMasterMaterials = async () => {
        try {
            setLoading(true);
            const res = await apiConnectorGet(endpoint.get_master_material);
            setMastMaterials(res?.data?.result || []);
        } catch {
            toast.error("Failed to fetch materials.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMasterMaterials();
    }, [])

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
            ma_material_id:"",
            material_name: "",
            unit: "",
            material_price: ""
        });
        setSelectedMaterial(null);
    };

    const handleSubmit = async () => {
        const { ma_material_id ,material_name, unit, material_price } = formData;

        if ( !ma_material_id || !material_name || !unit || !material_price) {
            toast.error("Name & Unit  & Price are required.");
            return;
        }

        setLoading(true);
        const payload = selectedMaterial
            ? { ma_material_id: selectedMaterial.ma_material_id, ...formData }
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
            ma_material_id: material.master_mat_id  || "",
            material_name: material.material_name || "",
            unit: material.un_id || "",
            material_price: material.material_price || "",

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
                            <th className="px-4 py-3 text-left">S.No</th>
                            <th className="px-4 py-3 text-left">Master Material</th>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Unit</th>
                            <th className="px-4 py-3 text-left">Price</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map((material, index) => (
                            <tr key={material.material_id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{material.ma_material_name || "--"}</td>
                                <td className="px-4 py-2">{material.material_name || "--"}</td>
                                <td className="px-4 py-2">{material.un_name || "--"}</td>
                                <td className="px-4 py-2">{material.material_price || "--"}</td>
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
                      <select
                            name="ma_material_id"
                            value={formData.ma_material_id}
                            onChange={(e) => setFormData({ ...formData, ma_material_id: e.target.value })}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select Master Material</option>
                            {Mastmaterials.map((item) => (
                                <option key={item.ma_material_id} value={item.ma_material_id}>
                                    {item.ma_material_name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="material_name"
                            placeholder="Material Name"
                            value={formData.material_name}
                            onChange={(e) => setFormData({ ...formData, material_name: e.target.value })}
                            className="w-full border p-2 rounded"
                        />
                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select Unit</option>
                            {units.map((unit) => (
                                <option key={unit.un_id} value={unit.un_id}>
                                    {unit.un_name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            name="material_price"
                            placeholder="Material Price"
                            value={formData.material_price}
                            onChange={(e) => setFormData({ ...formData, material_price: e.target.value })}
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
