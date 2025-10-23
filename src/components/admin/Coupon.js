import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { Delete, Edit } from "lucide-react";
import CustomToPagination from "../../Shared/Pagination";
import { useQuery, useQueryClient } from "react-query";
import { useFormik } from "formik";
import { Switch } from "@mui/material";
import CustomTable from "./Shared/CustomTable";

const Coupon = () => {
    const [page, setPage] = useState(1);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        coupon_code: "",
        coupon_discount_type: "",
        coupon_value: "",
        coupon_start_date: "",
        coupon_end_date: "",
        is_active: "Active",
        coupon_apply_on: "",
        coupon_middle_id: "",
        coupon_description: "",
    });


    const client = useQueryClient();
    const initialValues = {
        search: '',
        page: "",
        pageSize: 10,
        coupon_start_date: '',
        coupon_end_date: '',
    };

    const fk = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,

    })
    const { data } = useQuery(
        ['get_coupon', fk.values.search, fk.values.coupon_start_date, fk.values.coupon_end_date, page],
        () =>
            apiConnectorGet(endpoint?.get_coupon, {
                search: fk.values.search,
                start_date: fk.values.coupon_start_date,
                end_date: fk.values.coupon_end_date,
                page: page,
                pageSize: "10",
            }),
        {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onError: (err) => console.error("Error fetching level data:", err),
        }
    );
    const coupons = data?.data?.result || [];


    const { data: categories } = useQuery(
        ["get_categories"],
        () => apiConnectorGet(endpoint.get_product_categroy),
        usequeryBoolean
    );
    const cat_data = categories?.data?.result || [];


    const { data: material } = useQuery(
        ["get_master_mat"],
        () => apiConnectorGet(endpoint.get_master_material),
        usequeryBoolean
    );
    const mat_data = material?.data?.result || [];

    const { data: price_range } = useQuery(
        ["get_range"],
        () => apiConnectorGet(endpoint.get_coupon_range),
        usequeryBoolean
    );
    const price_range_data = price_range?.data?.result || [];


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const resetForm = () => {
        setFormData({
            coupon_code: "",
            coupon_discount_type: "",
            coupon_value: "",
            coupon_start_date: "",
            coupon_end_date: "",
            is_active: "Active",
            coupon_description: "",
        });
        setSelectedCoupon(null);
    };

    const createCoupon = async () => {
        try {
            setLoading(true);
            const res = await apiConnectorPost(endpoint.create_coupon, formData);
            toast(res?.data?.message);
            if (res?.data?.success) {
                setCreateModal(false);
                resetForm();
                client.invalidateQueries(["get_coupon"]);
            }

        } catch (err) {
            toast.error("Error creating discount.");
        } finally {
            setLoading(false);
        }
    };

    const updateCoupon = async () => {
        try {
            setLoading(true);
            const payload = {
                coupon_id: selectedCoupon.coupon_id,
                coupon_code: formData.coupon_code,
                coupon_description: formData.coupon_description, // if same as name or else separate field
                coupon_discount_type: formData.coupon_discount_type === "Flat" ? 1 : 2,
                coupon_value: formData.coupon_value,
                coupon_start_date: formData.coupon_start_date,
                coupon_end_date: formData.coupon_end_date,
                coupon_apply_on: formData.coupon_apply_on ? Number(formData.coupon_apply_on) : null,
                coupon_middle_id: formData.coupon_middle_id,
                coupon_is_active: formData.is_active,
                coupon_description: formData?.coupon_description
            };

            const res = await apiConnectorPost(endpoint.update_coupon, payload);
            toast(res?.data?.message);
            if (res?.data?.success) {
                setEditModal(false);
                resetForm();
                client.invalidateQueries(["get_coupon"]);
            }
        } catch (err) {
            toast.error("Error updating discount.");
        } finally {
            setLoading(false);
        }
    };

    const ChangeCouponStatus = async (coupon_id) => {
        try {
            setLoading(true);
            const res = await apiConnectorGet(`${endpoint.update_coupon_status}?coupon_id=${coupon_id}`);
            toast(res?.data?.message);
            if (res?.data?.message) {
                client.invalidateQueries(["get_coupon"]);
            }
        } catch (err) {
            toast.error("Error deleting discount.");
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (item) => {
        setSelectedCoupon(item);
        setFormData({
            coupon_code: item.coupon_code,
            coupon_discount_type:
                item.coupon_discount_type === "Flat"
                    ? "1"
                    : item.coupon_discount_type === "Percentage"
                        ? "2"
                        : "",
            coupon_value: item.coupon_value,
            coupon_start_date: item.coupon_start_date,
            coupon_end_date: item.coupon_end_date,
            is_active: item.coupon_is_active,
            coupon_description: item.coupon_description,
            coupon_apply_on:
                item.coupon_apply_on === "Category"
                    ? "1"
                    : item.coupon_apply_on === "Material"
                        ? "2"
                        : item.coupon_apply_on === "Package"
                            ? "3"
                            : "",
            coupon_middle_id: item.coupon_middle_id?.toString() || "",
        });

        setEditModal(true);
    };

    const tablehead = [
        <span>S.No</span>,
        <span>Apply On</span>,
        <span>Apply Name</span>,
        <span>Code</span>,
        <span>Type</span>,
        <span>Value</span>,
        <span>Description</span>,
        <span>Start Date</span>,
        <span>End Date</span>,
        <span>Status</span>,
        <span>Actions</span>,

    ]


    const tablerow = coupons?.data?.map((item, index) => [
        <span>{index + 1}</span>,
        <span>{item.coupon_apply_on}</span>,
        <span>{item?.applied_name}</span>,
        <span>{item.coupon_code}</span>,
        <span>{item.coupon_discount_type}</span>,
        <span>{item.coupon_value}</span>,
        <span>{item.coupon_description}</span>,
        <span>{item.coupon_start_date}</span>,
        <span>{item.coupon_end_date}</span>,
        <span> <Switch
            checked={item.coupon_is_active === "Active"}
            onChange={() => ChangeCouponStatus(item.coupon_id)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${item.coupon_is_active === "Active" ? "" : ""
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${item.coupon_is_active === "Active" ? "translate-x-6" : "translate-x-1"
                    }`}
            />
        </Switch></span>,
        <span className="px-6 py-4">
            <div className="flex space-x-2">
                <button
                    onClick={() => openEditModal(item)}
                    className="text-green-600 hover:text-green-800"
                ><Edit /></button>

            </div>
        </span>

    ])
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Coupons</h1>
                <button
                    onClick={() => setCreateModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    ➕ Add Coupon
                </button>
            </div>
            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-3 text-white mb-6">


                <div className="flex flex-col sm:flex-wrap md:flex-row items-center gap-3 sm:gap-4 w-full text-sm sm:text-base">
                    <input
                        type="date"
                        name="coupon_start_date"
                        id="coupon_start_date"
                        value={fk.values.coupon_start_date}
                        onChange={fk.handleChange}
                        className="bg-white bg-opacity-50 border border-gray-600 rounded-md py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
                    />
                    <input
                        type="date"
                        name="coupon_end_date"
                        id="coupon_end_date"
                        value={fk.values.coupon_end_date}
                        onChange={fk.handleChange}
                        className="bg-white bg-opacity-50 border border-gray-600 rounded-md py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={fk.values.search}
                        onChange={fk.handleChange}
                        placeholder="User ID"
                        className="bg-white bg-opacity-50 border border-gray-600 rounded-full py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
                    />
                    <button
                        onClick={() => {
                            setPage(1);
                            client.invalidateQueries(["get_coupon"]);
                        }}
                        type="submit"
                        className="bg-blue-500 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-dark-color transition-colors w-full sm:w-auto text-sm"
                    >
                        Search
                    </button>
                    <button
                        onClick={() => {
                            fk.handleReset();
                            setPage(1);
                        }}
                        className="bg-gray-color text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-black hover:text-white transition-colors w-full sm:w-auto text-sm"
                    >
                        Clear
                    </button>
                </div>
            </div>
            <CustomTable
                tablehead={tablehead}
                tablerow={tablerow}
            // isLoading={loading}
            />
            <CustomToPagination data={coupons} setPage={setPage} page={page} />
            {/* Create Modal */}
            {createModal && (
                <CouponModal
                    title="Add Coupon"
                    formData={formData}
                    onClose={() => {
                        setCreateModal(false);
                        resetForm();
                    }}
                    onSubmit={createCoupon}
                    onChange={handleInputChange}
                    loading={loading}
                    cat_data={cat_data}
                    mat_data={mat_data}
                    price_range_data={price_range_data}
                />

            )}

            {/* Edit Modal */}
            {editModal && (
                <CouponModal
                    title="Edit Coupon"
                    formData={formData}
                    onClose={() => {
                        setEditModal(false);
                        resetForm();
                    }}
                    onSubmit={updateCoupon}
                    onChange={handleInputChange}
                    loading={loading}
                    cat_data={cat_data}
                    mat_data={mat_data}
                    price_range_data={price_range_data}
                />


            )}
        </div>
    );
};

const CouponModal = ({ title, formData, onClose, onSubmit, onChange, loading, cat_data, mat_data, price_range_data }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div className="grid grid-cols-1 gap-4">
                    <input name="coupon_code" value={formData.coupon_code} onChange={onChange} placeholder="Coupon Code *" className="p-3 border rounded-lg" />
                    <input name="coupon_description" value={formData.coupon_description} onChange={onChange} placeholder="Coupon Description " className="p-3 border rounded-lg" />

                    <select name="coupon_discount_type" value={formData.coupon_discount_type} onChange={onChange} className="p-3 border rounded-lg">
                        <option value="">Select Discount</option>
                        <option value="1">Flat</option>
                        <option value="2">Percentage</option>
                    </select>

                    <input name="coupon_value" type="number" value={formData.coupon_value} onChange={onChange} placeholder="Coupon Value *" className="p-3 border rounded-lg" />

                    <select
                        name="coupon_apply_on"
                        value={formData.coupon_apply_on}
                        onChange={onChange}
                        className="p-3 border rounded-lg"
                    >

                        <option value=""> Select Apply Coupon</option>
                        <option value="1"> Category</option>
                        <option value="2"> Material</option>
                        <option value="3"> Package</option>
                    </select>

                    {formData.coupon_apply_on === "1" && (
                        <select
                            name="coupon_middle_id"
                            value={formData.coupon_middle_id}
                            onChange={onChange}
                            className="p-3 border rounded-lg"
                        >
                            <option value="">Select Category</option>
                            {cat_data.map((cat) => (
                                <option key={cat.product_category_id} value={cat.product_category_id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    )}

                    {formData.coupon_apply_on === "2" && (
                        <select
                            name="coupon_middle_id"
                            value={formData.coupon_middle_id}
                            onChange={onChange}
                            className="p-3 border rounded-lg"
                        >
                            <option value="">Select Material</option>
                            {mat_data.map((mat) => (
                                <option key={mat.ma_material_id} value={mat.ma_material_id}>
                                    {mat.ma_material_name}
                                </option>
                            ))}
                        </select>
                    )}

                    {formData.coupon_apply_on === "3" && (
                        <select
                            name="coupon_middle_id"
                            value={formData.coupon_middle_id}
                            onChange={onChange}
                            className="p-3 border rounded-lg"
                        >
                            <option value="">Select Package</option>
                            {price_range_data?.map((price) => (
                                <option key={price.range_id} value={price.range_id}>
                                    {price.range_title}
                                </option>
                            ))}
                        </select>
                    )}

                    <input name="coupon_start_date" type="date" value={formData.coupon_start_date} onChange={onChange} className="p-3 border rounded-lg" />
                    <input name="coupon_end_date" type="date" value={formData.coupon_end_date} onChange={onChange} className="p-3 border rounded-lg" />

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

export default Coupon;
