
import { useFormik } from "formik";
import { Copy, CopyIcon, Gift, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import {
  apiConnectorGet,
  apiConnectorPost,
  usequeryBoolean,
} from "../utils/ApiConnector";
import { endpoint } from "../utils/APIRoutes";
import Swal from "sweetalert2";
import { Download } from "@mui/icons-material";
import copy from "copy-to-clipboard";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const ProfileContent = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [govtIdExpanded, setGovtIdExpanded] = React.useState(true);
  const [personalExpanded, setPersonalExpanded] = React.useState(false);
  const [occasionExpanded, setOccasionExpanded] = React.useState(false);
  const [selectedDocument, setSelectedDocument] = React.useState("");
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [showUploadOptions, setShowUploadOptions] = React.useState(false);
  const [showChangePassword, setShowChangePassword] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = React.useRef(null);

  const { data } = useQuery(
    ["profile"],
    () => apiConnectorGet(endpoint?.get_customer_profile),
    usequeryBoolean
  );

  const profileData = data?.data?.result || [];
  const client = useQueryClient();

  const initialValues = {
    name: profileData?.name || "",
    email: profileData?.cl_email || "",
    mobile: profileData?.cl_phone || "",
    spouse_birthday: profileData?.spouse_birthday || "",
    occupation: profileData?.occupation || "",
    pincode: profileData?.pincode || "",
    anniversary: profileData?.aniversary || "",
    date_of_birth: profileData?.date_of_birth || "",
    govt_no: profileData?.govt_no || "",
    govt_identity: profileData?.govt_identity || ""
  };

  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const reqbody = {
        name: fk?.values?.name,
        mobile: fk?.values?.mobile,
        email: fk?.values?.email,
        spouse_birthday: fk?.values?.spouse_birthday,
        occupation: fk?.values?.occupation,
        pincode: fk?.values?.pincode,
        aniversary: fk?.values?.anniversary,
        date_of_birth: fk?.values?.date_of_birth,
        govt_identity: selectedDocument,
        govt_no: fk.values?.govt_no,
      };
      const formData = new FormData();

      for (let key in reqbody) {
        if (reqbody.hasOwnProperty(key)) {
          formData.append(key, reqbody[key]);
        }
      }
      formData.append("file", uploadedFile)
      updatecustomer(formData);
    },
  });

  const updatecustomer = async (reqbody) => {

    try {
      const response = await apiConnectorPost(
        endpoint?.update_customer_profile,
        reqbody
      );
      toast(response?.data?.message);
      if (response?.data?.success) {
        client.refetchQueries("profile");
      }
    } catch (e) {
      console.log("somthing went wrong");
    }
  };
  const initialValuesgfg = {
    old_password: "",
    new_password: "",
  };

  const formik = useFormik({
    initialValues: initialValuesgfg,
    enableReinitialize: true,
    onSubmit: () => {
      const reqbody = {
        old_password: formik.values.old_password,
        new_password: formik.values.new_password,
      };
      changepassword(reqbody);
    },
  });

  const changepassword = async (reqbody) => {
    try {
      const response = await apiConnectorPost(endpoint?.change_password, reqbody);
      toast(response?.data?.message);
      if (response?.data?.success) {
        client.refetchQueries("profile");
      }
    } catch (e) {
      console.log("somthing went wrong");
    }
  };
  const handleImageDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "government-id.png"; // change filename if needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Image download failed:", error);
      alert("Image download failed. Try again.");
    }
  };

  // Occasion details state
  const [occasionData, setOccasionData] = React.useState({
    giftPreferences: [],
    occasionDate: "",
    celebrationType: [],
  });


  const handleGiftPreferenceToggle = (preference) => {
    setOccasionData((prev) => ({
      ...prev,
      giftPreferences: prev.giftPreferences.includes(preference)
        ? prev.giftPreferences.filter((p) => p !== preference)
        : [...prev.giftPreferences, preference],
    }));
  };

  const handleCelebrationToggle = (celebration) => {
    setOccasionData((prev) => ({
      ...prev,
      celebrationType: prev.celebrationType.includes(celebration)
        ? prev.celebrationType.filter((c) => c !== celebration)
        : [...prev.celebrationType, celebration],
    }));
  };


  const handleSaveOccasions = () => {
    alert("Occasion details saved successfully!");
  };

  const DeleteAccountFn = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete your account and cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const response = await apiConnectorGet(endpoint?.disable_customer_account);
        Swal.fire('Deleted!', response?.data?.message);
      } catch (e) {
        Swal.fire('Error!', 'Something went wrong while deleting the account.', 'error');
        console.log('Something went wrong');
      }
    }
  };



  const getPlaceholder = () => {
    switch (selectedDocument) {
      case "aadhaar":
        return "Enter Aadhaar Card Number";
      case "passport":
        return "Enter Passport Number";
      case "driving-license":
        return "Enter Driving License Number";
      case "voter-id":
        return "Enter Voter ID Number";
      case "pan":
        return "Enter PAN Card Number";
      default:
        return "Enter Document Number";
    }
  };

  const getUploadText = () => {
    switch (selectedDocument) {
      case "aadhaar":
        return "UPLOAD AADHAAR CARD";
      case "passport":
        return "UPLOAD PASSPORT";
      case "driving-license":
        return "UPLOAD DRIVING LICENSE";
      case "voter-id":
        return "UPLOAD VOTER ID";
      case "pan":
        return "UPLOAD PAN CARD";
      default:
        return "UPLOAD DOCUMENT";
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setShowUploadOptions(false);
    }
  };

  const handleUploadClick = () => {
    setShowUploadOptions(!showUploadOptions);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
    setShowUploadOptions(false);
  };

  const handleSubmitDocument = () => {
    if (uploadedFile) {
      alert(`Document "${uploadedFile.name}" submitted successfully!`);
      setUploadedFile(null);
    }
  };

  // Change Password Modal
  const ChangePasswordModal = () => {
    if (!showChangePassword) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-md mx-auto">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Change Password
              </h2>
              <button
                onClick={() => setShowChangePassword(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OLD PASSWORD
                </label>
                <input
                  type="text"
                  id="old_password"
                  name="old_password"
                  value={formik.values.old_password}
                  onChange={formik.handleChange}
                  className="w-full px-3 py-3 bg-white border border-yellow-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NEW PASSWORD
                </label>
                <input
                  type="text"
                  id="new_password"
                  name="new_password"
                  value={formik.values.new_password}
                  onChange={formik.handleChange}
                  className="w-full px-3 py-3 bg-white border border-yellow-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>


            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={formik.handleSubmit}
                className="flex-1 py-3 bg-red-600 text-white font-medium rounded-lg text-sm transition-colors hover:bg-red-400"
              >
                Change Password
              </button>
              <button
                onClick={() => setShowChangePassword(false)}
                className="flex-1 py-3 border border-yellow-300 text-gray-700 font-medium rounded-lg text-sm transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 p-3">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setIsEditing(false)}
            className="mr-3 text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-s font-semibold text-gray-900">My Profile</h1>
        </div>

        <div className="w-full max-w-6xl mx-auto space-y-4">
          {/* Personal Details Section */}
          <div className="bg-white rounded-lg border border-yellow-200">
            <button
              onClick={() => setPersonalExpanded(!personalExpanded)}
              className="w-full px-4 py-3 bg-red-100 rounded-t-lg flex justify-between items-center hover:bg-yellow-150"
            >
              <h2 className="font-medium text-gray-900">Personal Details</h2>
              <svg
                className={`w-5 h-5 text-gray-600 transition-transform ${personalExpanded ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {personalExpanded && (
              <div className="p-4 md:p-6 space-y-6">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-4 text-black flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm md:text-base">
                      Earn 250 xCLusive points.{" "}
                      <span className="font-normal">
                        By completing your Personal Details. (1 xCLusive point=
                        ₹1)
                      </span>
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center ml-3">
                    <span className="text-yellow-800 font-bold text-lg">₹</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-gray-800 font-medium mb-3 text-sm md:text-base">
                        Let's start with your name*
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">
                            First Name*
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={fk?.values?.name}
                            onChange={fk.handleChange}
                            className="w-full px-3 py-3 bg-white border border-yellow-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-gray-800 font-medium mb-3 text-sm md:text-base">
                        Enter your mobile number*
                      </h3>
                      <div className="flex">
                        <select className="px-3 py-3 bg-white border border-yellow-200 rounded-l-lg text-gray-700 text-sm border-r-0">
                          <option>IN +91</option>
                        </select>
                        <input
                          type="tel"
                          placeholder="Mobile Number*"
                          id="mobile"
                          name="mobile"
                          value={fk?.values?.mobile}
                          onChange={fk.handleChange}
                          className="flex-1 px-3 py-3 bg-white border border-yellow-200 rounded-r-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-gray-800 font-medium mb-1 text-sm md:text-base">
                        Tell us your birth date*
                      </h3>
                      <p className="text-xs text-gray-600 mb-3">
                        Psst, don't miss out on the special discounts
                      </p>
                      <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        value={fk?.values?.date_of_birth}
                        onChange={fk.handleChange}
                        className="w-full px-3 py-3 bg-white border border-yellow-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <h3 className="text-gray-800 font-medium mb-1 text-sm md:text-base">
                        Are you a professional?
                      </h3>
                      <p className="text-xs text-gray-600 mb-3">Tell us more</p>
                      <select
                        id="occupation"
                        name="occupation"
                        value={fk?.values?.occupation}
                        onChange={fk.handleChange}
                        className="w-full px-3 py-3 bg-white border border-yellow-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="">Occupation (Optional)</option>
                        <option value="Software Engineer">
                          Software Engineer
                        </option>
                        <option value="Doctor">Doctor</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Business Owner">Business Owner</option>
                        <option value="Student">Student</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* <div>
                      <h3 className="text-gray-800 font-medium mb-3 text-sm md:text-base">
                        Select your Gender*
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {["Male", "Female", "Other"].map((gender) => (
                          <button
                            key={gender}
                            onClick={() =>
                              setProfileData((prev) => ({ ...prev, gender }))
                            }
                            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                              profileData.gender === gender
                                ? "bg-yellow-600 text-white"
                                : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                            }`}
                          >
                            {gender}
                          </button>
                        ))}
                      </div>
                    </div> */}

                    <div>
                      <h3 className="text-gray-800 font-medium mb-1 text-sm md:text-base">
                        Share your pincode*
                      </h3>
                      <p className="text-xs text-gray-600 mb-3">
                        This helps us find your product in store
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            placeholder="Enter Pincode"
                            id="pincode"
                            name="pincode"
                            value={fk?.values?.pincode}
                            onChange={fk.handleChange}
                            className="w-full pl-10 pr-3 py-3 bg-white border border-yellow-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                        <button className="px-4 py-3 text-red-600 font-medium text-sm whitespace-nowrap hover:text-red-700">
                          Locate Me
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-gray-800 font-medium mb-3 text-sm md:text-base">
                        Email address*
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <label className="block text-xs text-gray-600 mb-1">
                            Email ID*
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={fk?.values?.email}
                            onChange={fk.handleChange}
                            className="w-full px-3 py-3 bg-white border border-yellow-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                        <button className="px-4 py-3 text-red-600 font-medium text-sm whitespace-nowrap hover:text-red-700 mt-6">
                          Verify
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-gray-800 font-medium mb-1 text-sm md:text-base">
                        Anniversary Date
                      </h3>
                      <p className="text-xs text-gray-600 mb-3">
                        Get special offers on your anniversary
                      </p>
                      <input
                        type="date"
                        id="anniversary"
                        name="anniversary"
                        value={fk?.values?.anniversary}
                        onChange={fk.handleChange}
                        className="w-full px-3 py-3 bg-white border border-yellow-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <h3 className="text-gray-800 font-medium mb-1 text-sm md:text-base">
                        Spouse Birthday
                      </h3>
                      <p className="text-xs text-gray-600 mb-3">
                        Never miss celebrating your loved one
                      </p>
                      <input
                        type="date"
                        id="spouse_birthday"
                        name="spouse_birthday"
                        value={fk?.values?.spouse_birthday}
                        onChange={fk.handleChange}
                        className="w-full px-3 py-3 bg-white border border-yellow-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={fk.handleSubmit}
                    className="w-full md:w-auto md:min-w-[200px] py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:bg-yellow-900 text-black font-semibold rounded-lg text-sm transition-colors"
                  >
                    SAVE & EARN
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Occasion Details Section */}
          <div className="bg-white rounded-lg border border-yellow-200">
            <button
              onClick={() => setOccasionExpanded(!occasionExpanded)}
              className="w-full px-4 py-3 bg-red-100 rounded-t-lg flex justify-between items-center hover:bg-red-150"
            >
              <h2 className="font-medium text-gray-900">Occasion Details</h2>
              <svg
                className={`w-5 h-5 text-gray-600 transition-transform ${occasionExpanded ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {occasionExpanded && (
              <div className="p-4 md:p-6 space-y-6">
                {/* Personalized Offers Banner */}
                <div className="bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg p-4 text-black flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm md:text-base mb-1">
                      Personalised offers for your occasions!
                    </h3>
                    <p className="text-sm opacity-90">
                      Receive offers 21 days before every occasion you add,
                      without disturbing your celebration!
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-300 rounded-lg flex items-center justify-center">
                      <Gift className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>

                {/* Who are you most likely to gift? */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-800 font-medium text-sm md:text-base mb-1">
                      Who are you most likely to gift?
                    </h3>
                    <p className="text-xs text-gray-600 mb-3">
                      Your gifting preferences help us suggest better
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 ">
                    {[
                      "Self",
                      "Wife",
                      "Mother",
                      "Sister",
                      "Friend",
                      "Girlfriend",
                      "Daughter",
                      "Husband",
                      "Father",
                      "Son",
                      "Niece/ Nephew",
                      "Grandparent",
                      "Others",
                    ].map((person) => (
                      <button
                        key={person}
                        onClick={() => handleGiftPreferenceToggle(person)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${occasionData.giftPreferences.includes(person)
                          ? "bg-yellow-100 text-yellow-700 border-red-300"
                          : "bg-white text-gray-700 border-yellow-300 hover:bg-yellow-50"
                          }`}
                      >
                        {person}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tell us which dates are important for you */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-800 font-medium text-sm md:text-base mb-1">
                      Tell us which dates are important for you?
                    </h3>
                    <p className="text-xs text-gray-600 mb-3">
                      And we'll make them extra special
                    </p>
                  </div>

                  <div className="relative">
                    <input
                      type="date"
                      value={occasionData.occasionDate}
                      onChange={(e) =>
                        setOccasionData((prev) => ({
                          ...prev,
                          occasionDate: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-3 bg-white border border-yellow-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Date of Occasion"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Are you celebrating an occasion? */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-800 font-medium text-sm md:text-base mb-1">
                      Are you celebrating an occasion?
                    </h3>
                    <p className="text-xs text-gray-600 mb-3">
                      Don't worry we'll keep it private too!
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {["Anniversary", "Birthday"].map((celebration) => (
                      <button
                        key={celebration}
                        onClick={() => handleCelebrationToggle(celebration)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${occasionData.celebrationType.includes(celebration)
                          ? "bg-yellow-100 text-red-700 border-red-300"
                          : "bg-white text-gray-700 border-yellow-300 hover:bg-gray-50"
                          }`}
                      >
                        {celebration}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleSaveOccasions}
                    className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg text-sm transition-colors"
                  >
                    SAVE OCCASIONS DETAILS
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Govt. ID Section */}
          <div className="bg-white rounded-lg border border-yellow-200">
            <button
              onClick={() => setGovtIdExpanded(!govtIdExpanded)}
              className="w-full px-4 py-3 bg-red-100 rounded-t-lg flex justify-between items-center hover:bg-red-150"
            >
              <h2 className="font-medium text-gray-900">Govt. ID</h2>
              <svg
                className={`w-5 h-5 text-gray-600 transition-transform ${govtIdExpanded ? "" : "rotate-180"
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>

            {govtIdExpanded && (
              <div className="p-4 space-y-4">
                <div>
                  <select
                    className="w-full px-3 py-3 bg-white border border-yellow-200 rounded-lg text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={selectedDocument}
                    onChange={(e) => setSelectedDocument(e.target.value)}
                  >
                    <option value="">Choose other document to upload</option>
                    <option value="aadhaar">Aadhaar Card</option>
                    <option value="passport">Passport</option>
                    <option value="driving-license">Driving License</option>
                    <option value="voter-id">Voter ID</option>
                    <option value="pan">PAN Card</option>
                  </select>
                  <p className="text-xs text-red-500 mt-2">
                    This field is mandatory in case order value exceeds Rs. 2
                    lacs
                  </p>
                </div>

                {selectedDocument && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      id="govt_no"
                      name="govt_no"
                      placeholder={getPlaceholder()}
                      value={fk.values.govt_no}
                      onChange={fk.handleChange}
                      className="w-full px-3 py-3 bg-white border border-yellow-200 rounded-lg text-gray-700 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*,.pdf"
                      className="hidden"
                    />

                    <div className="relative">
                      <button
                        onClick={handleUploadClick}
                        className="w-full py-3 text-black bg-gradient-to-r from-yellow-400 to-yellow-600 font-medium rounded-lg flex items-center justify-center text-sm hover:bg-yellow-50 transition-colors"

                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        {getUploadText()}
                      </button>

                      {showUploadOptions && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-yellow-200 rounded-lg shadow-lg z-10">
                          <button
                            onClick={handleFileSelect}
                            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg flex items-center"
                          >
                            <svg
                              className="w-4 h-4 mr-3 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            Choose File from Device
                          </button>
                          <button
                            onClick={() => {
                              setShowUploadOptions(false);
                              alert(
                                "Camera functionality would be implemented here"
                              );
                            }}
                            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg flex items-center border-t border-gray-100"
                          >
                            <svg
                              className="w-4 h-4 mr-3 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            Take Photo with Camera
                          </button>
                        </div>
                      )}
                    </div>

                    {uploadedFile && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="w-5 h-5 text-green-600 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-sm text-green-800 font-medium">
                              {uploadedFile.name}
                            </span>
                          </div>
                          <button
                            onClick={() => setUploadedFile(null)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="mt-2">
                          <button
                            onClick={handleSubmitDocument}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Submit Document
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              fk.handleSubmit()
              setShowUploadOptions(false)
            }}
            className="w-full py-4 bg-red-800 hover:bg-red-600 text-white font-medium rounded-lg text-sm transition-colors"
          >
            SAVE DETAILS
          </button>
        </div>

        <ChangePasswordModal />
      </div>
    );
  }
  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!", { id: 1 });
  };
  return (
    <div className="p-3 md:p-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-center">
        <div className="w-10 h-10 bg-yellow-200 rounded-lg flex items-center justify-center mr-3">
          <Gift className="w-5 h-5 text-yellow-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 text-sm">
            Complete your profile & get rewards!
          </h3>
          <p className="text-xs text-gray-600">
            Don't miss out on EXTRA discounts! Update your profile details now
            and get instant xClusive Points, and an Extra 5%* off during your
            Birthday and Anniversary months!
          </p>
          <p className="text-xs text-gray-500 mt-1">*TCA.</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-base font-medium text-gray-900">Your Profile</h2>

        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-xs"
        >
          Edit Profile
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="divide-y divide-gray-200">
          {[
            {
              label: "CUSTOMER ID",
              value: profileData?.cust_unique_id,
            },
            {
              label: "NAME",
              value: profileData?.name,
            },
            { label: "EMAIL", value: profileData?.cl_email },
            { label: "MOBILE NO.", value: profileData?.cl_phone },
            { label: "PINCODE", value: profileData.pincode },
            { label: "DOB", value: profileData.spouse_birthday || "-" },
            { label: "PURCHASE WALLET", value: `₹ ${Number(profileData.purchase_wallet || 0).toFixed(2)}` || "-" },
            { label: "GOLD WALLET", value: profileData.gold_wallet || "-" },

            { label: "ANNIVERSARY", value: profileData.aniversary || "-" },
            { label: "OCCUPATION", value: profileData.occupation || "-" },
            {
              label: "SPOUSE BIRTHDAY",
              value: profileData.spouse_birthday || "-",
            },
            {
              label: "Goverment Id Name",
              value: profileData.govt_identity || "-",
            },
            {
              label: "Goverment Id Number",
              value: profileData.govt_no || "-",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="px-3 py-3 flex justify-between items-center"
            >
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                {item.label}
              </span>
              <span
                className={`text-xs flex items-center gap-2 ${item.label === "PURCHASE WALLET" ? "font-bold text-gray-900" : "text-gray-900"
                  }`}
              >
                {item.value}
                {item.label === "CUSTOMER ID" && item.value && (
                  <ClipboardDocumentIcon
                    className="text-gray-500 w-5 h-5 cursor-pointer hover:text-blue-600 transition"
                    onClick={() => functionTOCopy(item?.value)}
                  />
                )}
              </span>
              {/* <span className="text-xs text-gray-900 flex items-center gap-2">
                {item.value}
                {item.label === "CUSTOMER ID" && item.value && (
                  <ClipboardDocumentIcon 
                    className="text-gray-500 w-5 h-5 cursor-pointer hover:text-blue-600 transition"
                     onClick={() => functionTOCopy(item?.value)}
                   />
                )}
              </span> */}
            </div>
          ))}
        </div>
        <div className="px-3 py-3 flex justify-between items-center border-t">
          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Government Id Image
          </span>
          {profileData?.govt_id_image ? (
            <div className="flex items-center gap-2">
              <img
                src={profileData.govt_id_image}
                alt="Government ID"
                className="h-5 w-20 object-contain rounded cursor-pointer hover:scale-105 transition"
                onClick={() => setIsModalOpen(true)}
              />
              <Download
                className="!text-green-500 !text-2xl cursor-pointer"
                onClick={() => handleImageDownload(profileData.govt_id_image)}
              />
            </div>
          ) : (
            <span className="text-xs text-gray-900">-</span>
          )}
        </div>


        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-0 right-0 text-white text-2xl font-bold px-2"
              >
                &times;
              </button>
              <img
                src={profileData.govt_id_image}
                alt="Zoomed Government ID"
                className="max-h-[80vh] max-w-[90vw] rounded shadow-lg"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
        <button
          onClick={() => setShowChangePassword(true)}
          className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-xs"
        >
          Change Password
        </button>
        <button className="text-red-600 hover:text-red-700 px-4 py-2 font-medium
         transition-colors flex items-center justify-center text-xs" onClick={DeleteAccountFn}>
          <Trash2 className="w-3 h-3 mr-1" />
          Delete My Account
        </button>
      </div>

      <ChangePasswordModal />
    </div>
  );
};

export default ProfileContent;
