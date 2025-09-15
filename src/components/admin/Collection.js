import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { DeleteForever, Edit, ToggleOn, ToggleOff } from "@mui/icons-material";

const Collection = () => {
    const [Collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [formData, setFormData] = useState({
        coll_id: "",
        coll_name: "",
        coll_description: "",
        coll_image: "",
    });

    const fetchCollection = async () => {
        try {
            setLoading(true);
            const res = await apiConnectorGet(endpoint.get_collection);
            setCollection(res?.data?.result || []);
        } catch {
            toast.error("Failed to fetch Collection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollection();
    }, []);

    const resetForm = () => {
        setFormData({ coll_id: "", coll_name: "", coll_image: "", coll_description:"" });
        setSelectedBanner(null);
    };

    const handleSubmit = async () => {
        const { coll_name, coll_image, coll_id , coll_description } = formData;
        if (!coll_name || !coll_image || !coll_description) {
            toast.error("Collection & image are required.");
            return;
        }
        setLoading(true);
        const formPayload = new FormData();
        formPayload.append("coll_name", coll_name);
        formPayload.append("coll_description", coll_description);
        formPayload.append("file", coll_image); // file
        if (selectedBanner) {
            formPayload.append("coll_id", coll_id);
        }
        const apiUrl = selectedBanner ? endpoint.update_collection : endpoint.create_collection;
        try {
            const res = await apiConnectorPost(apiUrl, formPayload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success(res?.data?.message || "Banner saved.");
            fetchCollection();
            setModalOpen(false);
            resetForm();
        } catch {
            toast.error("Operation failed.");
        } finally {
            setLoading(false);
        }
    };


    const handleEdit = (collection) => {
        setSelectedBanner(collection);
        setFormData({
            coll_id: collection.coll_id,
            coll_name: collection.coll_name,
            coll_description: collection.coll_description,
            file: collection.coll_image,
        });
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const res = await apiConnectorGet( `${endpoint.delete_collection}?coll_id=${id}` );
            toast(res?.data?.message);
            fetchCollection();
        } catch {
            toast.error("Delete failed.");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Collection</h1>
                <button
                    onClick={() => {
                        setModalOpen(true);
                        resetForm();
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add Collection
                </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left">S.No</th>
                            <th className="px-4 py-3 text-left">coll_name</th>
                            <th className="px-4 py-3 text-left">Image</th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Collection.map((item, index) => (
                            <tr key={item.coll_id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{item.coll_name}</td>
                                <td className="px-4 py-2">
                                    <img
                                        src={item.coll_image}
                                        alt={item.coll_name}
                                        className="w-16 h-auto rounded"
                                    />
                                </td>
                              
                                <td className="px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        <Edit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.coll_id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        <DeleteForever />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {Collection.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-4 text-center text-gray-500">
                                    No Collection found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
                        <h2 className="text-xl font-semibold">
                            {selectedBanner ? "Edit Banner" : "Add Banner"}
                        </h2>
                        <input
                            type="text"
                            name="coll_name"
                            placeholder="Collection"
                            value={formData.coll_name}
                            onChange={(e) =>
                                setFormData({ ...formData, coll_name: e.target.value })
                            }
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setFormData({ ...formData, coll_image: e.target.files[0] })
                            }
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="coll_description"
                            placeholder="Collection"
                            value={formData.coll_description}
                            onChange={(e) =>
                                setFormData({ ...formData, coll_description: e.target.value })
                            }
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
                                {loading ? "Saving..." : selectedBanner ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Collection;
