import React, { useEffect, useState } from "react";
import {
  apiConnectorGet,
  apiConnectorPost,
  usequeryBoolean,
} from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import CustomToPagination from "../../Shared/Pagination";
import { useQuery } from "react-query";
import moment from "moment";
import { Dialog } from "@mui/material";
import CustomTable from "./Shared/CustomTable";

const BankDetails = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const count = 10;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
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
  }).map(([country, code]) => ({ country, code }))

  const [formData, setFormData] = useState({
    bank_id: "",
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

  const { data, isLoading, refetch } = useQuery(
    ["bank_detail_admin", { searchTerm, startDate, endDate, page }],
    () =>
      apiConnectorGet(endpoint?.bank_get_all, {
        search: searchTerm,
        start_date: startDate,
        end_date: endDate,
        page: page,
        count: count,
      }),
    usequeryBoolean
  );

  const bankList = data?.data?.result || [];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, startDate, endDate, page]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await apiConnectorPost(endpoint.update_customer_bank, formData);
      if (res?.data?.success) {
        toast.success("Bank details updated successfully");
        setEditModalOpen(false);
        refetch();
      } else {
        toast.error(res?.data?.message || "Failed to update");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };




  const tablehead = [
    <span>S.No</span>,
    <span>Acc. Holder Name</span>,
    <span>Acc. No.</span>,
    <span>Beneficery ID</span>,
    <span> Email</span>,
    <span> Phone</span>,
    <span> VPA</span>,
    <span>Bank Name</span>,
    <span>Branch Name</span>,
    <span>IFSC Code</span>,
    <span> Address</span>,
    <span> City</span>,
    <span> Postal Code</span>,
    <span> State</span>,
    <span>Country Code</span>,
    <span>Updated At</span>,
  ]

  const tablerow = bankList?.data?.map((item, idx) => [
    <span>{(page - 1) * count + idx + 1}</span>,
    <span>{item?.account_holder_name || "--"}</span>,
    <span>{item?.account_number || "--"}</span>,
    <span>{item?.bene_id || "--"}</span>,
    <span>{item?.bene_email || "--"}</span>,
    <span>{item?.bene_phone || "--"}</span>,
    <span>{item?.bene_vpa || "--"}</span>,
    <span>{item?.bank_name || "--"}</span>,
    <span>{item?.branch_name || "--"}</span>,
    <span>{item?.ifsc_code || "--"}</span>,
    <span>{item?.bene_address || "--"}</span>,
    <span>{item?.bene_city || "--"}</span>,
    <span>{item?.bene_postal_code || "--"}</span>,
    <span>{item?.bene_state || "--"}</span>,
    <span>{item?.country_code || "--"}</span>,
    <span>
      {item?.updated_at ? moment(item?.updated_at).format("DD-MM-YYYY") : "--"}
    </span>,
  ])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bank List</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by username"
          className="border px-3 py-2 rounded bg-white bg-opacity-45"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="border px-3 py-2 rounded bg-white bg-opacity-45"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border px-3 py-2 rounded bg-white bg-opacity-45"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>


      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
      // isLoading={loading}
      />
      <div className="mt-6">
        <CustomToPagination page={page} data={bankList} setPage={setPage} />
      </div>

      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <h2 className="text-xl font-semibold text-yellow-700 m-2">
          Update Bank Details
        </h2>
        <div className="grid grid-cols-2 p-6 gap-5 bg-white">
          {[
            { name: "account_holder_name", label: "Account Holder Name" },
            { name: "account_number", label: "Account Number" },
            { name: "ifsc_code", label: "IFSC Code" },
            { name: "bank_name", label: "Bank Name" },
            { name: "branch_name", label: "Branch Name" },
            { name: "bene_vpa", label: "VPA" },
            { name: "bene_email", label: "Email" },
            { name: "bene_address", label: "Address" },
            { name: "bene_city", label: "City" },
            { name: "bene_state", label: "State" },
            { name: "bene_postal_code", label: "Postal Code" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-yellow-500 focus:outline-none"
              />
            </div>
          ))}

          {/* Country Code + Phone */}
          <div className="flex flex-col">
            <label
              htmlFor="bene_phone"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Mobile No.
            </label>
            <div className="flex">
              <select
                value={selectedCountryCode}
                onChange={(e) => {
                  setSelectedCountryCode(e.target.value);
                  setFormData((prev) => ({ ...prev, country_code: e.target.value }));
                }}
                className="w-28 px-4 py-2 border border-gray-300 rounded-l-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                onChange={handleInputChange}
                className="w-[60%] px-4 py-2 border border-gray-300 border-l-0 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 m-4">
          <button
            onClick={() => setEditModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800"
          >
            Update
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default BankDetails;
