// import React, { useState } from "react";
// import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
// import { endpoint } from "../../utils/APIRoutes";
// import toast from "react-hot-toast";
// import { useQuery } from "react-query";
// import ReactModal from "react-modal";
// import moment from "moment";
// import { Edit } from "lucide-react";
// import CustomToPagination from "../../Shared/Pagination";
// import CustomTable from "./Shared/CustomTable";

// const Customer = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     pincode: "",
//     date_of_birth: "",
//     aniversary: "",
//     occupation: "",
//     spouse_birthday: "",
//     govt_identity: "",
//     govt_no: "",
//     file: null, // 👈 For file input
//   });

//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [passwordModalOpen, setPasswordModalOpen] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//     userId: "",
//     new_password: "",
//   });

//   const openPasswordModal = (customerId) => {
//     setPasswordData({
//       userId: customerId,
//       new_password: "",
//     });
//     setPasswordModalOpen(true);
//   };

//   const { data, refetch } = useQuery(
//     ["get_all_customer", page, search],
//     () =>
//       apiConnectorGet(
//         `${endpoint.get_all_customer}?page=${page}&count=10&search=${search}`
//       ),
//     { keepPreviousData: true }
//   );

//   const customers = data?.data?.result || [];

//   const handlePasswordChange = async () => {
//     if (!passwordData.new_password) {
//       toast.error("Please enter a new password");
//       return;
//     }
//     try {
//       const payload = {
//         cust_id: passwordData.userId,
//         newpassword: passwordData.new_password,
//       };
//       await apiConnectorPost(endpoint.change_password_admin, payload)
//       toast.success("Password changed successfully");
//       setPasswordModalOpen(false);
//     } catch (error) {
//       toast.error("Failed to change password");
//       console.error(error);
//     }
//   };

//   const openModal = (customer = null) => {
//     setIsEditing(!!customer);

//     if (customer) {
//       setFormData({
//         name: customer.name || "",
//         email: customer.cl_email || "",
//         phone: customer.cl_phone || "",
//         address: customer.address || "",
//         city: customer.city || "",
//         state: customer.state || "",
//         country: customer.country || "",
//         pincode: customer.pincode || "",
//         date_of_birth: customer.date_of_birth || "",
//         aniversary: customer.aniversary || "",
//         spouse_birthday: customer.spouse_birthday || "",
//         occupation: customer.occupation || "",
//         govt_identity: customer.govt_identity || "",
//         govt_no: customer.govt_no || "",
//         file: null,
//         cust_id: customer.cust_unique_id || "", // for update API
//       });
//     } else {
//       // Reset for create
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         address: "",
//         city: "",
//         state: "",
//         country: "",
//         pincode: "",
//         date_of_birth: "",
//         aniversary: "",
//         spouse_birthday: "",
//         occupation: "",
//         govt_identity: "",
//         govt_no: "",
//         file: null,
//       });
//     }

//     setModalOpen(true);
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const form = new FormData();

//       for (const key in formData) {
//         if (formData[key]) {
//           form.append(key, formData[key]);
//         }
//       }

//       const endpointUrl = isEditing
//         ? endpoint.update_customer_profile_details_by_admin
//         : endpoint.create_customer;

//       await apiConnectorPost(endpointUrl, form, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast(endpointUrl?.data?.message);
//       if (endpointUrl?.data?.success) {
//         toast(isEditing ? "Customer updated." : "Customer created.");
//         setModalOpen(false);
//         refetch();
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong.");
//     }
//   };

//   const tablehead = [
//     "S.No",
//     "Unique Id",
//     "Name",
//     "Email",
//     "Phone",
//     "DOB",
//     "Password",
//     "Anniversary",
//     "Spouse Birthday",
//     "Occupation",
//     "Govt ID Type",
//     "Govt ID No",
//     "Govt ID Image",
//     "City",
//     "Country",
//     "Created",
//     "Status",
//     "Action",
//   ];

//   const tablerow = customers?.data?.map((c, index) => [
//     index + 1,
//     c.cust_unique_id,
//     c.name,
//     c.cl_email,
//     c.cl_phone,
//     c.date_of_birth || "-",
//     <span
//       className="text-blue-600 underline cursor-pointer"
//       onClick={() => openPasswordModal(c.cust_unique_id)}
//     >
//       {c.cl_password ? `${c.cl_password.slice(0, 5)}xxx` : "-"}
//     </span>,
//     c.aniversary || "-",
//     c.spouse_birthday || "-",
//     c.occupation || "-",
//     c.govt_identity || "-",
//     c.govt_no || "-",
//     c.govt_id_image ? (
//       <img
//         src={c.govt_id_image}
//         alt="Govt ID"
//         className="h-10 w-16 object-cover rounded cursor-pointer hover:scale-105 transition"
//         onClick={() => window.open(c.govt_id_image, "_blank")}
//       />
//     ) : (
//       "-"
//     ),
//     c.city,
//     c.country,
//     moment(c.created_at).format("YYYY-MM-DD"),
//     c.cl_lgn_status,
//     <button
//       onClick={() => openModal(c)}
//       className="text-blue-600 hover:text-blue-800"
//       title="Edit Customer"
//     >
//       <Edit size={18} />
//     </button>,
//   ])

//   return (
//     <div className="p-6 ">
//       <h1 className="text-2xl font-bold">Customer Management</h1>

//       {/* Search bar */}
//       <div className="my-4 flex items-center gap-4">
//         <input
//           type="text"
//           placeholder="Search by email or ID"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded w-72 bg-white bg-opacity-30"
//         />
//         <button
//           onClick={() => refetch()}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Search
//         </button>
//         <button
//     onClick={() => openModal()}
//     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//   >
//     + Add Customer
//   </button>
//       </div>

//       {/* Table */}

//       <CustomTable
//         tablehead={tablehead}
//         tablerow={tablerow}
//         isLoading={data?.isLoading}
//       />

//       <CustomToPagination data={customers} page={page} setPage={setPage} />

//       {/* Modal */}
//       <ReactModal
//         isOpen={modalOpen}
//         onRequestClose={() => setModalOpen(false)}
//         ariaHideApp={false}
//         className="w-full max-w-3xl mx-auto mt-16 bg-white rounded-lg shadow-xl p-6 outline-none"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
//       >
//         <h2 className="text-xl font-semibold mb-4">
//           {isEditing ? "Edit Customer" : "Add New Customer"}
//         </h2>
//         <div className="grid grid-cols-3  gap-4">
//           {[
//             { label: "Name", name: "name" },
//             { label: "Email", name: "email" },
//             { label: "Phone", name: "phone" },
//             { label: "Address", name: "address" },
//             { label: "City", name: "city" },
//             { label: "State", name: "state" },
//             { label: "Country", name: "country" },
//             { label: "Pincode", name: "pincode" },
//             { label: "Date of Birth", name: "date_of_birth", type: "date" },
//             { label: "Anniversary", name: "aniversary", type: "date" },
//             { label: "Spouse Birthday", name: "spouse_birthday", type: "date" },
//             { label: "Occupation", name: "occupation" },
//             { label: "Govt ID Type", name: "govt_identity" },
//             { label: "Govt ID No", name: "govt_no" },
//           ].map((f) => (
//             <input
//               key={f.name}
//               name={f.name}
//               placeholder={f.label}
//               type={f.type || "text"}
//               value={formData[f.name]}
//               onChange={handleChange}
//               className="border p-2 rounded"
//             />
//           ))}

//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 file: e.target.files[0],
//               }))
//             }
//             className="border p-2 rounded"
//           />
//         </div>
//         <div className="mt-6 flex justify-end gap-2">
//           <button
//             onClick={() => setModalOpen(false)}
//             className="px-4 py-2 bg-gray-300 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             {isEditing ? "Update" : "Create"}
//           </button>
//         </div>
//       </ReactModal>
//       <ReactModal
//         isOpen={passwordModalOpen}
//         onRequestClose={() => setPasswordModalOpen(false)}
//         ariaHideApp={false}
//         className="w-full max-w-md mx-auto mt-32 bg-white rounded-lg shadow-xl p-6 outline-none"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
//       >
//         <h2 className="text-xl font-semibold mb-4">Change Password</h2>

//         <div className="grid grid-cols-1 gap-4">
//           {/* User ID - visible and readonly */}
//           <input
//             type="text"
//             value={passwordData.userId}
//             readOnly
//             className="border p-2 rounded bg-gray-100 text-gray-600"
//           />

//           {/* New Password */}
//           <input
//             type="password"
//             placeholder="New Password"
//             value={passwordData.new_password}
//             onChange={(e) =>
//               setPasswordData({ ...passwordData, new_password: e.target.value })
//             }
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="mt-6 flex justify-end gap-2">
//           <button
//             onClick={() => setPasswordModalOpen(false)}
//             className="px-4 py-2 bg-gray-300 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handlePasswordChange}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Submit
//           </button>
//         </div>
//       </ReactModal>
//     </div>
//   );
// };

// export default Customer;

import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import ReactModal from "react-modal";
import moment from "moment";
import { Edit } from "lucide-react";
import CustomToPagination from "../../Shared/Pagination";
import CustomTable from "./Shared/CustomTable";

const Customer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mlmModalOpen, setMlmModalOpen] = useState(false);
  const [mlmData, setMlmData] = useState({
    cust_id: "",
    self_id: "",
  });
  const [name, setName] = useState("");

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
    file: null,
    password: "",
    confirm_password: "",
    spon_id: "",
    spon_name: "",
    mlm_is_distributor: 0, // ✅ toggle default = 0
    status: "Active",
    created_by: "admin",
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
      userId: customerId,
      new_password: "",
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

  const customers = data?.data?.result || [];

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
      // Editing existing customer
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
        password: "",
        confirm_password: "",
        spon_id: customer.spon_id || "",
        spon_name: customer.spon_name || "",
        mlm_is_distributor: customer.mlm_is_distributor || 0,
        status: customer.cl_lgn_status || "Active",
        // created_by: "admin",
        cust_id: customer.cust_unique_id || "",
      });
    } else {
      // Creating new customer
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
        password: "",
        confirm_password: "",
        spon_id: "",
        spon_name: "N/A",
        mlm_is_distributor: 0,
        status: "Active",
        // created_by: "admin",
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
      if (!isEditing && formData.password !== formData.confirm_password) {
        toast.error("Passwords do not match!");
        return;
      }

      const form = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== "") {
          form.append(key, formData[key]);
        }
      }

      if (!isEditing) form.append("created_by", "admin");

      const endpointUrl = isEditing
        ? endpoint.update_customer_profile_details_by_admin
        : endpoint.create_customer;

      const res = await apiConnectorPost(endpointUrl, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast(
        res?.data?.message ||
          (isEditing ? res?.data?.message : res?.data?.message)
      );

      setModalOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  const handleMLMSubmit = async () => {
    if (!mlmData.cust_id) {
      toast.error("Please enter Cust ID");
      return;
    }
    try {
      const payload = {
        cust_id: mlmData.cust_id,
        self_id: mlmData.self_id,
      };

      const res = await apiConnectorPost(
        endpoint.distributor_registration_admin,
        payload
      );

      toast(res?.data?.message);
      if (res?.data?.success) {
        setMlmModalOpen(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to register as Distributor");
    }
  };

  const Customerfunction = async () => {
    const reqbody = {
      customer_id: formData.spon_id || mlmData.cust_id,
    };
    try {
      const res = await apiConnectorPost(
        endpoint?.get_distributor_name,
        reqbody
      );
      setName(res?.data?.result?.[0]);
    } catch (e) {
      console.log("something went wrong");
    }
  };
  useEffect(() => {
    Customerfunction();
  }, [formData.spon_id, mlmData.cust_id]);

  const tablehead = [
    "S.No",
    "Unique Id",
    "Name",
    "Email",
    "Phone",
    "Sponsor ID",
    "Sponsor Name",
    "Is Distributor",
    "Status Distributor",
    "DOB",
    "Password",
    "Anniversary",
    "Spouse Birthday",
    "Occupation",
    "Govt ID Type",
    "Govt ID No",
    "Govt ID Image",
    "City",
    "Country",
    "Created",
    "Status",
    "Action",
  ];

  const tablerow = customers?.data?.map((c, index) => [
    index + 1,
    c.cust_unique_id,
    c.name,
    c.cl_email,
    c.cl_phone,
    c.spon_id || "-",
    c.spon_name || "-",
    <div className="flex justify-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={c.mlm_is_distributor === 1}
        />
        <div
          className={`w-10 h-5 rounded-full transition-colors duration-300 ${
            c.mlm_is_distributor === 1 ? "bg-green-500" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`absolute left-[2px] top-[2px] bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
            c.mlm_is_distributor === 1 ? "translate-x-5" : ""
          }`}
        ></div>
      </label>
    </div>,
    <span className="text-green-600  cursor-pointer">
      <Edit
        onClick={() => {
          setMlmData({
            cust_id: "",
            self_id: c.cust_unique_id,
          });
          setMlmModalOpen(true);
        }}
      />
    </span>,
    c.date_of_birth || "-",
    <span
      className="text-blue-600 underline cursor-pointer"
      onClick={() => openPasswordModal(c.cust_unique_id)}
    >
      {c.cl_password ? `${c.cl_password.slice(0, 5)}xxx` : "-"}
    </span>,
    c.aniversary || "-",
    c.spouse_birthday || "-",
    c.occupation || "-",
    c.govt_identity || "-",
    c.govt_no || "-",
    c.govt_id_image ? (
      <img
        src={c.govt_id_image}
        alt="Govt ID"
        className="h-10 w-16 object-cover rounded cursor-pointer hover:scale-105 transition"
        onClick={() => window.open(c.govt_id_image, "_blank")}
      />
    ) : (
      "-"
    ),
    c.city,
    c.country,
    moment(c.created_at).format("YYYY-MM-DD"),
    c.cl_lgn_status,
    <button
      onClick={() => openModal(c)}
      className="text-blue-600 hover:text-blue-800"
      title="Edit Customer"
    >
      <Edit size={18} />
    </button>,
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Customer Management</h1>

      {/* Search + Add Customer */}
      <div className="flex lg:flex-row flex-col gap-4 justify-between items-center my-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by email or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded lg:w-72 bg-white bg-opacity-30"
          />
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Add Customer Button */}
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Customer
        </button>
      </div>

      {/* Table */}
      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={data?.isLoading}
      />

      <CustomToPagination data={customers} page={page} setPage={setPage} />

      {/* Add/Edit Customer Modal */}
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        className="w-full max-w-5xl mx-auto mt-16 bg-white rounded-lg shadow-xl p-6 outline-none max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50 overflow-y-auto"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Customer" : "Add New Customer"}
        </h2>

        <div className="grid lg:grid-cols-5 grid-cols-1 gap-4">
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
            { label: "Sponsor ID", name: "spon_id" },
          ].map((f) => (
            <div key={f.name} className="flex flex-col">
              <label className="mb-1 text-sm font-medium">{f.label}</label>
              <input
                name={f.name}
                type={f.type || "text"}
                value={formData[f.name]}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {f.label === "Sponsor ID" && (
                <span className="!text-xs !text-red-500">
                  {name?.name || "Invalid Id"}
                </span>
              )}
            </div>
          ))}

          {/* Status Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {/* Password Fields (only in create mode) */}
          {!isEditing && (
            <>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="border p-2 rounded"
              />{" "}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>
            </>
          )}

          {/* File Upload */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Upload File</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, file: e.target.files[0] }))
              }
              className="border p-2 rounded"
            />
          </div>
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

      {/* Change Password Modal */}
      <ReactModal
        isOpen={passwordModalOpen}
        onRequestClose={() => setPasswordModalOpen(false)}
        ariaHideApp={false}
        className="w-full max-w-md mx-auto mt-32 bg-white rounded-lg shadow-xl p-6 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            value={passwordData.userId}
            readOnly
            className="border p-2 rounded bg-gray-100 text-gray-600"
          />
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
      <ReactModal
        isOpen={mlmModalOpen}
        onRequestClose={() => setMlmModalOpen(false)}
        ariaHideApp={false}
        className="w-full max-w-md mx-auto mt-32 bg-white rounded-lg shadow-xl p-6 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-semibold mb-4">Distributor Registration</h2>

        <div className="grid grid-cols-1 gap-4">
          {/* Cust ID (readonly) */}
          <input
            type="text"
            name="self_id"
            value={mlmData.self_id}
            readOnly
            className="border p-2 rounded bg-gray-100 text-gray-600"
          />

          <div className="!flex !flex-col">
            <input
              type="text"
              name="cust_id"
              placeholder="Enter Cust ID"
              value={mlmData.cust_id}
              onChange={(e) =>
                setMlmData((prev) => ({ ...prev, cust_id: e.target.value }))
              }
              className="border p-2 rounded"
            />
            {mlmData.cust_id && (
              <span className="!text-xs !text-red-500">
                {name?.name || "Invalid Id"}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => setMlmModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleMLMSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default Customer;
