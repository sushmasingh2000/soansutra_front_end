import React, { useState, useEffect } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import ReactModal from "react-modal";
import { Edit2, Plus } from "lucide-react";
import moment from "moment";

const Customer = () => {
    const queryClient = useQueryClient();

    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        password: "",
        confirm_password: "",
    });

    const [pagination, setPagination] = useState({ page: 1, count: 10 });
    const [search, setSearch] = useState("");

    const { data, refetch } = useQuery(
        ["get_all_customer", pagination.page, search],
        () =>
            apiConnectorGet(
                `${endpoint.get_all_customer}?page=${pagination.page}&count=${pagination.count}&search=${search}`
            ),
        { keepPreviousData: true }
    );

    const customers = data?.data?.message?.data || [];
    const totalPages = data?.data?.message?.totalPage || 1;



    const openModal = (customer = null) => {
        setIsEditing(!!customer);
        if (customer) {
            setFormData({
                ...customer,
                password: "",
                confirm_password: "",
            });
        } else {
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                password: "",
                confirm_password: "",
            });
        }
        setModalOpen(true);
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        try {
            if (isEditing) {
                await apiConnectorPost(endpoint.update_customer_profile, formData);
                toast.success("Customer updated.");
            } else {
                await apiConnectorPost(endpoint.create_customer, formData);
                toast.success("Customer created.");
            }
            setModalOpen(false);
            refetch();
        } catch {
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="p-6  mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Customer Management</h1>
                {/* <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    <Plus size={16} />
                    Add Customer
                </button> */}
            </div>

            {/* Search bar */}
           

            {/* Table */}
            <div className="overflow-auto rounded border">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 text-sm text-left text-gray-700">
                        <tr>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Email</th>
                            <th className="px-4 py-2 border-b">Phone</th>
                            <th className="px-4 py-2 border-b">City</th>
                            <th className="px-4 py-2 border-b">Country</th>
                            <th className="px-4 py-2 border-b">Created</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c) => (
                            <tr key={c.customer_id} className="text-sm">
                                <td className="px-4 py-2 border-b">{c.name}</td>
                                <td className="px-4 py-2 border-b">{c.cl_email}</td>
                                <td className="px-4 py-2 border-b">{c.cl_phone}</td>
                                <td className="px-4 py-2 border-b">{c.city}</td>
                                <td className="px-4 py-2 border-b">{c.country}</td>
                                <td className="px-4 py-2 border-b">
                                    {moment(c.created_at).format("YYYY-MM-DD")}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => openModal(c)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {customers.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-gray-500">
                                    No customers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <p>
                    Page {pagination.page} of {totalPages}
                </p>
                <div className="flex gap-2">
                    <button
                        disabled={pagination.page === 1}
                        onClick={() =>
                            setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                        }
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <button
                        disabled={pagination.page === totalPages}
                        onClick={() =>
                            setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                        }
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Modal */}
            <ReactModal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                ariaHideApp={false}
                className="w-full max-w-md mx-auto mt-32 bg-white rounded-lg shadow-xl p-6 outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
            >
                <h2 className="text-xl font-semibold mb-4">
                    {isEditing ? "Edit Customer" : "Add New Customer"}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                    {[
                        { label: "Name", name: "name" },
                        { label: "Email", name: "email" },
                        { label: "Phone", name: "phone" },
                        { label: "Address", name: "address" },
                        { label: "City", name: "city" },
                        { label: "State", name: "state" },
                        { label: "Country", name: "country" },
                        { label: "Pincode", name: "pincode" },
                    ].map((f) => (
                        <input
                            key={f.name}
                            name={f.name}
                            placeholder={f.label}
                            value={formData[f.name]}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                    ))}

                    {!isEditing && (
                        <>
                            <input
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border p-2 rounded"
                            />
                            <input
                                name="confirm_password"
                                placeholder="Confirm Password"
                                type="password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                className="border p-2 rounded"
                            />
                        </>
                    )}
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={() => setModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {isEditing ? "Update" : "Create"}
                    </button>
                </div>
            </ReactModal>
        </div>
    );
};

export default Customer;
