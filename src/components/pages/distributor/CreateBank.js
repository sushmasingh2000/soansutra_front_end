import React, { useState } from "react";
import { endpoint } from "../../../utils/APIRoutes";
import { apiConnectorPost } from "../../../utils/ApiConnector";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useQueryClient } from "react-query";

const CreateBank = ({ onClose }) => {
  const [formData, setFormData] = useState({
    account_holder_name: "",
    account_number: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
    bene_vpa: "",
    bene_phone: "",
    country_code: "91",
    bene_email: "",
    bene_address: "",
    bene_city: "",
    bene_state: "",
    bene_postal_code: "",
  });

  const [loading, setLoading] = useState(false);
  const client = useQueryClient();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [selectedCountryCode, setSelectedCountryCode] = useState("91");

  const countryCodes = Object.entries({
    "BD": "880", "BE": "32", "BF": "226", "BG": "359", "BA": "387", "BB": "1-246"
    , "WF": "681", "BL": "590", "BM": "1-441", "BN": "673", "BO": "591",
    "BH": "973", "BI": "257", "BJ": "229", "BT": "975", "JM": "1-876",
    "BV": "", "BW": "267", "WS": "685", "BQ": "599", "BR": "55", "BS": "1-242", "JE": "44-1534",
    "BY": "375", "BZ": "501", "RU": "7", "RW": "250", "RS": "381", "TL": "670", "RE": "262", "TM": "993",
    "TJ": "992", "RO": "40", "TK": "690", "GW": "245", "GU": "1-671", "GT": "502", "GS": "", "GR": "30", "GQ": "240",
    "GP": "590", "JP": "81", "GY": "592", "GG": "44-1481", "GF": "594", "GE": "995", "GD": "1-473", "GB": "44",
    "GA": "241", "SV": "503", "GN": "224", "GM": "220", "GL": "299", "GI": "350", "GH": "233", "OM": "968", "TN": "216",
    "JO": "962", "HR": "385", "HT": "509", "HU": "36", "HK": "852", "HN": "504", "HM": " ", "VE": "58", "PR": "1-787 and 1-939", "PS": "970", "PW": "680",
    "PT": "351", "SJ": "47", "PY": "595", "IQ": "964", "PA": "507", "PF": "689", "PG": "675", "PE": "51",
    "PK": "92", "PH": "63", "PN": "870", "PL": "48", "PM": "508", "ZM": "260", "EH": "212", "EE": "372", "EG": "20", "ZA": "27",
    "EC": "593", "IT": "39", "VN": "84", "SB": "677", "ET": "251", "SO": "252", "ZW": "263", "SA": "966", "ES": "34", "ER": "291",
    "ME": "382", "MD": "373", "MG": "261", "MF": "590", "MA": "212", "MC": "377", "UZ": "998", "MM": "95", "ML": "223", "MO": "853",
    "MN": "976", "MH": "692", "MK": "389", "MU": "230", "MT": "356", "MW": "265", "MV": "960", "MQ": "596", "MP": "1-670",
    "MS": "1-664", "MR": "222", "IM": "44-1624", "UG": "256", "TZ": "255", "MY": "60", "MX": "52", "IL": "972", "FR": "33",
    "IO": "246", "SH": "290", "FI": "358", "FJ": "679", "FK": "500", "FM": "691", "FO": "298", "NI": "505", "NL": "31", "NO": "47",
    "NA": "264", "VU": "678", "NC": "687", "NE": "227", "NF": "672", "NG": "234", "NZ": "64", "NP": "977", "NR": "674", "NU": "683",
    "CK": "682", "XK": "", "CI": "225", "CH": "41", "CO": "57", "CN": "86", "CM": "237", "CL": "56", "CC": "61", "CA": "1", "CG": "242",
    "CF": "236", "CD": "243", "CZ": "420", "CY": "357", "CX": "61", "CR": "506", "CW": "599", "CV": "238", "CU": "53", "SZ": "268",
    "SY": "963", "SX": "599", "KG": "996", "KE": "254", "SS": "211", "SR": "597", "KI": "686", "KH": "855", "KN": "1-869",
    "KM": "269", "ST": "239", "SK": "421", "KR": "82", "SI": "386", "KP": "850", "KW": "965", "SN": "221", "SM": "378",
    "SL": "232", "SC": "248", "KZ": "7", "KY": "1-345", "SG": "65", "SE": "46", "SD": "249", "DO": "1-809 and 1-829",
    "DM": "1-767", "DJ": "253", "DK": "45", "VG": "1-284", "DE": "49", "YE": "967", "DZ": "213", "US": "1", "UY": "598",
    "YT": "262", "UM": "1", "LB": "961", "LC": "1-758", "LA": "856", "TV": "688", "TW": "886", "TT": "1-868", "TR": "90",
    "LK": "94", "LI": "423", "LV": "371", "TO": "676", "LT": "370", "LU": "352", "LR": "231", "LS": "266", "TH": "66", "TF": "",
    "TG": "228", "TD": "235", "TC": "1-649", "LY": "218", "VA": "379", "VC": "1-784", "AE": "971", "AD": "376", "AG": "1-268",
    "AF": "93", "AI": "1-264", "VI": "1-340", "IS": "354", "IR": "98", "AM": "374", "AL": "355", "AO": "244", "AQ": "",
    "AS": "1-684", "AR": "54", "AU": "61", "AT": "43", "AW": "297", "IN": "91", "AX": "358-18", "AZ": "994", "IE": "353",
    "ID": "62", "UA": "380", "QA": "974", "MZ": "258"
  }).map(([country, code]) => ({ country, code }));

  const handleSubmit = async () => {
    const {
      account_holder_name,
      account_number,
      ifsc_code,
      bank_name,
      branch_name,
      bene_vpa,
      bene_phone,
      country_code,
      bene_email,
      bene_address,
      bene_city,
      bene_state,
      bene_postal_code,
    } = formData;

    if (
      !account_holder_name ||
      !account_number ||
      !ifsc_code ||
      !bank_name ||
      !branch_name ||
      !bene_vpa ||
      !bene_phone ||
      !country_code ||
      !bene_email ||
      !bene_address ||
      !bene_city ||
      !bene_state ||
      !bene_postal_code

    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await apiConnectorPost(endpoint?.bank_create, formData);
      toast(response?.data?.message)

      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response?.data?.message,
          confirmButtonColor: "#dbb855",
        });
        // Reset form
        setFormData({
          account_holder_name: "",
          account_number: "",
          ifsc_code: "",
          bank_name: "",
          branch_name: "",
          bene_vpa: "",
          bene_phone: "",
          country_code: "",
          bene_email: "",
          bene_address: "",
          bene_city: "",
          bene_state: "",
          bene_postal_code: "",
        });
        // Close modal
        client.refetchQueries('bank_detail')
        if (onClose) onClose();

      }
    } catch (error) {
      console.error("Error creating bank", error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className=" flex items-center justify-center px-4">
      <div className="shadow-md rounded-lg w-full lg:max-w-4xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-8 text-[#dbb855]">
          Add Bank Details
        </h2>

        <form className="grid grid-cols-2 gap-3">
          {/* Account Holder Name */}
          <div className="flex flex-col">
            <label htmlFor="account_holder_name" className="mb-1 text-sm font-medium text-gray-700">
              Account Holder Name
            </label>
            <input
              type="text"
              name="account_holder_name"
              id="account_holder_name"
              value={formData.account_holder_name}
              onChange={handleChange}
              placeholder="Enter Account Holder Name"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
            />
          </div>

          {/* Account Number */}
          <div className="flex flex-col">
            <label htmlFor="account_number" className="mb-1 text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              type="text"
              name="account_number"
              id="account_number"
              value={formData.account_number}
              onChange={handleChange}
              placeholder="Enter Account Number"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
            />
          </div>

          {/* IFSC Code */}
          <div className="flex flex-col">
            <label htmlFor="ifsc_code" className="mb-1 text-sm font-medium text-gray-700">
              IFSC Code
            </label>
            <input
              type="text"
              name="ifsc_code"
              id="ifsc_code"
              value={formData.ifsc_code}
              onChange={handleChange}
              placeholder="Enter IFSC Code"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
            />
          </div>

          {/* Bank Name */}
          <div className="flex flex-col">
            <label htmlFor="bank_name" className="mb-1 text-sm font-medium text-gray-700">
              Bank Name
            </label>
            <input
              type="text"
              name="bank_name"
              id="bank_name"
              value={formData.bank_name}
              onChange={handleChange}
              placeholder="Enter Bank Name"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
            />
          </div>

          {/* Branch Name */}
          <div className="flex flex-col">
            <label htmlFor="branch_name" className="mb-1 text-sm font-medium text-gray-700">
              Branch Name
            </label>
            <input
              type="text"
              name="branch_name"
              id="branch_name"
              value={formData.branch_name}
              onChange={handleChange}
              placeholder="Enter Branch Name"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
            />
          </div>

          {/* Beneficiary VPA */}
          <div className="flex flex-col">
            <label htmlFor="bene_vpa" className="mb-1 text-sm font-medium text-gray-700">
              VPA
            </label>
            <input
              type="text"
              name="bene_vpa"
              id="bene_vpa"
              value={formData.bene_vpa}
              onChange={handleChange}
              placeholder="Enter Beneficiary VPA"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
            />
          </div>

          {/* Beneficiary Email */}
          <div className="flex flex-col">
            <label htmlFor="bene_email" className="mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="bene_email"
              id="bene_email"
              value={formData.bene_email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
            />
          </div>


          {/* Beneficiary Address */}
          <div className="flex flex-col">
            <label htmlFor="bene_address" className="mb-1 text-sm font-medium text-gray-700">
              Beneficiary Address
            </label>
            <input
              type="text"
              name="bene_address"
              id="bene_address"
              value={formData.bene_address}
              onChange={handleChange}
              placeholder="Enter Address"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
            />
          </div>

          {/* Beneficiary City */}
          <div className="flex flex-col">
            <label htmlFor="bene_city" className="mb-1 text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="bene_city"
              id="bene_city"
              value={formData.bene_city}
              onChange={handleChange}
              placeholder="Enter City"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
            />
          </div>

          {/* Beneficiary State */}
          <div className="flex flex-col">
            <label htmlFor="bene_state" className="mb-1 text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              name="bene_state"
              id="bene_state"
              value={formData.bene_state}
              onChange={handleChange}
              placeholder="Enter State"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
            />
          </div>

          {/* Beneficiary Postal Code */}
          <div className="flex flex-col">
            <label htmlFor="bene_postal_code" className="mb-1 text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              name="bene_postal_code"
              id="bene_postal_code"
              value={formData.bene_postal_code}
              onChange={handleChange}
              placeholder="Enter Postal Code"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
            />
          </div>

          {/* Country Code + Phone */}
          <div className="flex flex-col">
            <label htmlFor="bene_phone" className="mb-1 text-sm font-medium text-gray-700">
              Mobile No.
            </label>
            <div className="flex">
              <select
                value={selectedCountryCode}
                onChange={(e) => {
                  setSelectedCountryCode(e.target.value);
                  setFormData({ ...formData, country_code: e.target.value });
                }}
                className="w-28 px-4 py-2 border border-gray-300 rounded-l-md bg-white focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
              >
                {countryCodes.map(({ country, code }) => (
                  <option key={country} value={code}>
                    +{code} ({country})
                  </option>
                ))}
              </select>
              <input
                id="bene_phone"
                name="bene_phone"
                placeholder="Enter Mobile No."
                value={formData.bene_phone}
                onChange={handleChange}
                className="w-[60%] px-4 py-2 border border-gray-300 border-l-0 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#dbb855]"
              />
            </div>
          </div>

        </form>

        <div className="flex justify-end gap-5">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-800 text-white py-2 px-4 mt-4 rounded hover:bg-red-400 transition-all w-fit"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="bg-yellow-950 text-white py-2 w-fit p-2 mt-4 items-end rounded hover:bg-yellow-900 disabled:opacity-50 transition-all"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBank;
