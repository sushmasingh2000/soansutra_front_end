import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { DeleteForever, Edit } from "@mui/icons-material";
import CustomTable from "./Shared/CustomTable";

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
        unit: 0,
        material_price: 1
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
            ma_material_id: "",
            material_name: "",
            unit: 0,
            material_price: 1
        });
        setSelectedMaterial(null);
    };

    const handleSubmit = async () => {
        const { ma_material_id, material_name } = formData;

        if (!ma_material_id || !material_name) {
            toast.error("Name are required.");
            return;
        }

        setLoading(true);
        const payload = selectedMaterial
            ? { material_id: selectedMaterial.material_id, ma_material_id: selectedMaterial.ma_material_id, ...formData }
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
            material_id: material.material_id,
            ma_material_id: material.master_mat_id || "",
            material_name: material.material_name || "",
            unit: 0,
            material_price: 1,

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

    const tablehead = [
        <span>S.No</span>,
        <span>Master Material</span>,
        <span>Name</span>,
        <span>Actions</span>,
    ]

    const tablerow = materials.map((material, index) => [
        <span>{index + 1}</span>,
        <span>{material.ma_material_name || "--"}</span>,
        <span>{material.material_name || "--"}</span>,
        <span className="px-4 py-2 space-x-2">
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
        </span>
    ])
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

            <CustomTable
                tablehead={tablehead}
                tablerow={tablerow}
            // isLoading={loading}
            />
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
                        {/* <select
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
                        </select> */}

                        {/* <input
                            type="text"
                            name="material_price"
                            placeholder="Material Price"
                            value={formData.material_price}
                            onChange={(e) => setFormData({ ...formData, material_price: e.target.value })}
                            className="w-full border p-2 rounded"
                        /> */}
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
