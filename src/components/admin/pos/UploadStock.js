import { useFormik } from "formik";
import { useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";


const UploadStock = () => {
  const [loading, setLoading] = useState(false);
  const [selectedSKU, setSelectedSKU] = useState(null);
  const [quantity, setQuantity] = useState("");

  const { data, refetch } = useQuery(
    ["sku_dropdown_by_admin"],
    () => apiConnectorGet(endpoint.sku_dropdown_by_admin),
    { keepPreviousData: true }
  );

  const skuList = data?.data?.result || [];

  const skuOptions = skuList.map((item) => ({
    label: item.sku,
    product_id: item.product_id,
    variant_id: item.variant_id,
  }));

  const formik = useFormik({
    initialValues: {
      quantity: "",
      sku: "",
    },
    onSubmit: async (values) => {
      if (!selectedSKU || !quantity) {
        Swal.fire({
          title: "Missing Fields",
          text: "Please select a SKU and enter quantity.",
          icon: "warning",
        });
        return;
      }
      setLoading(true);
      try {
        const payload = {
          product_id: selectedSKU.product_id,
          varient_id: selectedSKU.variant_id,
          barcode: "34567867",
          quantity: quantity,
          reserved_quantity: 0,
          minimum_quantity: 0,
          batch_number: "45678987",
          expiry_date: null,
        };

        const response = await apiConnectorPost(endpoint.upload_Stock_by_admin, payload);

        Swal.fire({
          title: response?.data?.success ? "Success" : "Error",
          text: response?.data?.message,
          icon: response?.data?.success ? "success" : "error",
        });

        if (response?.data?.success) {
          formik.resetForm();
          setQuantity("");
          setSelectedSKU(null);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error?.message || "Something went wrong.",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSubmitClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed with this transaction?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        formik.submitForm();
      }
    });
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="lg:w-[45%] w-full bg-white opacity-75 p-6 rounded shadow mt-5">
        <h2 className="text-xl text-center font-semibold mb-8">Upload Stock</h2>

        <div className="grid grid-cols-1 gap-4">
          <div className="col-span-2">
            <label className="block mb-1 font-medium">SKU</label>
            <Autocomplete
              disablePortal
              options={skuOptions}
              value={selectedSKU}
              onChange={(event, newValue) => setSelectedSKU(newValue)}
              renderInput={(params) => <TextField {...params} label="Select SKU" />}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Quantity"
            />
          </div>



          <div className="col-span-2">
            <button
              onClick={handleSubmitClick}
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadStock;
