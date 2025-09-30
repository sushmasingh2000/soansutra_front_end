import React, { useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import ReactModal from "react-modal";
import moment from "moment";
import { Edit } from "lucide-react";
import CustomToPagination from "../../Shared/Pagination";

const Customer = () => {
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
    date_of_birth: "",
    aniversary: "",
    occupation: "",
    spouse_birthday: "",
    govt_identity: "",
    govt_no: "",
    file: null, // 👈 For file input
  });

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    userId: "",
    new_password: "",
  });

  const openPasswordModal = (customerId) => {
    setPasswordData({
      userId: customerId, // 👈 Fill userId
      new_password: "", // 👈 Keep password empty
    });
    setPasswordModalOpen(true);
  };

  const { data, refetch } = useQuery(
    ["get_all_customer", page, search],
    () =>
      apiConnectorGet(
        `${endpoint.get_all_customer}?page=${page}&count=10&search=${search}`
      ),
    { keepPreviousData: true }
  );

  const customers = data?.data?.message || [];

  const handlePasswordChange = async () => {
    if (!passwordData.new_password) {
      toast.error("Please enter a new password");
      return;
    }

    try {
      const payload = {
        cust_id: passwordData.userId,
        newpassword: passwordData.new_password,
      };

      await apiConnectorPost(endpoint.change_password_admin, payload);

      toast.success("Password changed successfully");
      setPasswordModalOpen(false);
    } catch (error) {
      toast.error("Failed to change password");
      console.error(error);
    }
  };

  const openModal = (customer = null) => {
    setIsEditing(!!customer);

    if (customer) {
      setFormData({
        name: customer.name || "",
        email: customer.cl_email || "",
        phone: customer.cl_phone || "",
        address: customer.address || "",
        city: customer.city || "",
        state: customer.state || "",
        country: customer.country || "",
        pincode: customer.pincode || "",
        date_of_birth: customer.date_of_birth || "",
        aniversary: customer.aniversary || "",
        spouse_birthday: customer.spouse_birthday || "",
        occupation: customer.occupation || "",
        govt_identity: customer.govt_identity || "",
        govt_no: customer.govt_no || "",
        file: null,
        cust_id: customer.cust_unique_id || "", // for update API
      });
    } else {
      // Reset for create
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        date_of_birth: "",
        aniversary: "",
        spouse_birthday: "",
        occupation: "",
        govt_identity: "",
        govt_no: "",
        file: null,
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
      const form = new FormData();

      for (const key in formData) {
        if (formData[key]) {
          form.append(key, formData[key]);
        }
      }

      const endpointUrl = isEditing
        ? endpoint.update_customer_profile_details_by_admin
        : endpoint.create_customer;

      await apiConnectorPost(endpointUrl, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast(endpointUrl?.data?.message)
          if(endpointUrl?.data?.success){
            toast(isEditing ? "Customer updated." : "Customer created.");
            setModalOpen(false);
            refetch();
          }
      
    } catch (error) {
      console.error(error);
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
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">DOB</th>
              <th className="px-4 py-2 border-b">Password</th>
              <th className="px-4 py-2 border-b">Anniversary</th>
              <th className="px-4 py-2 border-b">Spouse Birthday</th>
              <th className="px-4 py-2 border-b">Occupation</th>
              <th className="px-4 py-2 border-b">Govt ID Type</th>
              <th className="px-4 py-2 border-b">Govt ID No</th>
              <th className="px-4 py-2 border-b">Govt ID Image</th>
              <th className="px-4 py-2 border-b">City</th>
              <th className="px-4 py-2 border-b">Country</th>
              <th className="px-4 py-2 border-b">Created</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Action</th>
              {/* <th className="px-4 py-2 border-b">Status</th>
                            <th className="px-4 py-2 border-b">Status</th> */}
            </tr>
          </thead>

          <tbody>
            {customers?.data?.map((c) => (
              <tr key={c.customer_id}>
                <td className="px-4 py-2 border-b">{c.name}</td>
                <td className="px-4 py-2 border-b">{c.cl_email}</td>
                <td className="px-4 py-2 border-b">{c.cl_phone}</td>
                <td className="px-4 py-2 border-b">{c.date_of_birth || "-"}</td>
                <td
                  className="px-4 py-2 border-b text-blue-600 cursor-pointer underline"
                  onClick={() => openPasswordModal(c.cust_unique_id)}
                >
                  {c.cl_password || "-"}
                </td>
                <td className="px-4 py-2 border-b">{c.aniversary || "-"}</td>
                <td className="px-4 py-2 border-b">
                  {c.spouse_birthday || "-"}
                </td>
                <td className="px-4 py-2 border-b">{c.occupation || "-"}</td>
                <td className="px-4 py-2 border-b">{c.govt_identity || "-"}</td>
                <td className="px-4 py-2 border-b">{c.govt_no || "-"}</td>

                <td className="px-4 py-2 border-b">
                  {c.govt_id_image ? (
                    <img
                      src={c.govt_id_image}
                      alt="Govt ID"
                      className="h-10 w-16 object-cover rounded cursor-pointer hover:scale-105 transition"
                      onClick={() => window.open(c.govt_id_image, "_blank")}
                    />
                  ) : (
                    "-"
                  )}
                </td>

                <td className="px-4 py-2 border-b">{c.city}</td>
                <td className="px-4 py-2 border-b">{c.country}</td>
                <td className="px-4 py-2 border-b">
                  {moment(c.created_at).format("YYYY-MM-DD")}
                </td>
                <td className="px-4 py-2 border-b">{c.cl_lgn_status}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => openModal(c)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Customer"
                  >
                    <Edit size={18} />
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

      <CustomToPagination data={customers} page={page} setPage={setPage} />

      {/* Modal */}
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        className="w-full max-w-3xl mx-auto mt-16 bg-white rounded-lg shadow-xl p-6 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Customer" : "Add New Customer"}
        </h2>
        <div className="grid grid-cols-3  gap-4">
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Phone", name: "phone" },
            { label: "Address", name: "address" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "Country", name: "country" },
            { label: "Pincode", name: "pincode" },
            { label: "Date of Birth", name: "date_of_birth", type: "date" },
            { label: "Anniversary", name: "aniversary", type: "date" },
            { label: "Spouse Birthday", name: "spouse_birthday", type: "date" },
            { label: "Occupation", name: "occupation" },
            { label: "Govt ID Type", name: "govt_identity" },
            { label: "Govt ID No", name: "govt_no" },
          ].map((f) => (
            <input
              key={f.name}
              name={f.name}
              placeholder={f.label}
              type={f.type || "text"}
              value={formData[f.name]}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          ))}

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                file: e.target.files[0],
              }))
            }
            className="border p-2 rounded"
          />
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
      <ReactModal
        isOpen={passwordModalOpen}
        onRequestClose={() => setPasswordModalOpen(false)}
        ariaHideApp={false}
        className="w-full max-w-md mx-auto mt-32 bg-white rounded-lg shadow-xl p-6 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <div className="grid grid-cols-1 gap-4">
          {/* User ID - visible and readonly */}
          <input
            type="text"
            value={passwordData.userId}
            readOnly
            className="border p-2 rounded bg-gray-100 text-gray-600"
          />

          {/* New Password */}
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.new_password}
            onChange={(e) =>
              setPasswordData({ ...passwordData, new_password: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => setPasswordModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handlePasswordChange}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default Customer;
