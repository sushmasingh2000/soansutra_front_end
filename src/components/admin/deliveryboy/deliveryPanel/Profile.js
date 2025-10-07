import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../../../utils/ApiConnector";
import { endpoint } from "../../../../utils/APIRoutes";
import toast from "react-hot-toast";

const DeliveryBoyProfile = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: "",
        mob: "",
        dob: "",
        address: "",
        pin_code: "",
    });

    // Fetch profile on load
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const res = await apiConnectorGet(endpoint.get_div_profile);
            if (res?.data?.success) {
                const data = res.data.result;
                setFormData({
                    // dl_reg_id: data.dl_reg_id,
                    name: data.dl_dlv_name || "",
                    password: data?.dl_pass || "",
                    email: data.dl_email || "",
                    mob: data.dl_mob || "",
                    dob: data.dl_dob || "",
                    address: data.dl_address || "",
                    pin_code: data.dl_pin_code || "",
                });
            } else {
                toast.error("Failed to fetch profile.");
            }
        } catch (error) {
            toast.error("Error fetching profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const updateProfile = async () => {
        try {
            setLoading(true);
            const res = await apiConnectorPost(endpoint.update_div_profile, formData);
            toast(res?.data?.message);
            if (res?.data?.success) {
                fetchProfile();
            }
        } catch (err) {
            toast.error("Error updating profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6  w-full">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h1>

            {loading && <p className="text-gray-500 mb-4">Loading...</p>}

            <div className=" grid grid-cols-3 gap-10 bg-gray-300 opacity-75 text-black shadow-md rounded p-6 border">

                {[
                    { label: "Name", name: "name" },
                    { label: "Email", name: "email", type: "email" },
                    { label: "Password", name: "password", optional: true },
                    { label: "Mobile", name: "mob" },
                    { label: "Date of Birth", name: "dob", type: "date" },
                    { label: "Address", name: "address" },
                    { label: "Pin Code", name: "pin_code" },
                ].map(({ label, name, type = "text", optional }) => (
                    <div key={name} className="flex flex-col">
                        <label className="text-sm font-medium text-gray-900 mb-1">{label}{!optional && " *"}</label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder={`Enter ${label}`}
                        />
                    </div>
                ))}

                <button
                    onClick={updateProfile}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Update Profile"}
                </button>
            </div>
        </div>
    );
};

export default DeliveryBoyProfile;
