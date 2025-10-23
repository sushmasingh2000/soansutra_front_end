import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { Delete, Edit, Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactModal from "react-modal";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Shared/Loader";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import VariantModal from "./Variant";
import VariantMaterialModal from "./VariantMaterial";
import CustomTable from "./Shared/CustomTable";

const ProductVariant = () => {
  const location = useLocation();
  const product = location?.state?.product;
  const [variants, setVariants] = useState([]);
  const [loding, setLoding] = useState(false);
  const [units, setUnits] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [materialModalVariant, setMaterialModalVariant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (product?.product_id) {
      fetchVariants();
      fetchUnits();
    }
  }, [product]);

  const fetchVariants = async () => {
    setLoding(true);
    try {
      const response = await apiConnectorGet(
        `${endpoint.get_product_variant}?product_id=${product.product_id}`
      );
      setVariants(response?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch variants.");
    }
    setLoding(false);
  };

  const fetchUnits = async () => {
    setLoding(true);
    try {
      const res = await apiConnectorGet(
        `${endpoint.get_product_unitt}?un_category=${product.product_category_id}`
      );
      setUnits(res?.data?.result || []);
    } catch (err) {
      toast.error("Failed to fetch units");
    }
    setLoding(false);
  };

  const handleDeleteVariant = async (variant_id) => {
    setLoding(true);
    try {
      const res = await apiConnectorGet(
        `${endpoint.delete_product_variant}?variant_id=${variant_id}`
      );
      toast(res?.data?.message);
      if (res?.data?.success) {
        fetchVariants();
      }
    } catch (err) {
      toast.error("Error deleting variant");
    }
    setLoding(false);
  };

  const openModalForEdit = (variant) => {
    setEditingVariant(variant);
    setModalIsOpen(true);
  };

  const openModalForCreate = () => {
    setEditingVariant(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const [storeDialogOpen, setStoreDialogOpen] = useState(false);
  const [storeInventory, setStoreInventory] = useState([]);

  const handleQuantityClick = async (inv_id) => {
    setLoding(true);
    try {
      const res = await apiConnectorGet(
        `${endpoint.product_quantity}?inv_id=${inv_id}`
      );
      const result = res?.data?.result || [];
      console.log(result);
      setStoreInventory(result);
      setStoreDialogOpen(true);
    } catch (err) {
      toast.error("Failed to fetch store inventory.");
    }
    setLoding(false);
  };
  if (!product) {
    return <div className="p-6 text-red-500">Product data not found!</div>;
  }
  const tablehead = [
    "S.No",
    "SKU",
    "Making Price (₹)",
    "Price Type",
    "Weight",
    "Quantity",
    "Reserved Quantity",
    "Minimum Quantity",
    "Inventory",
    "Attribute",
    "Material",
    "Discount",
    "Tax",
    "Actions",
  ];


  const tablerow = variants.map((variant, index) => [
    <span>{index + 1}</span>,
    <span>{variant.varient_sku || "--"}</span>,
    <span>{variant.making_price || "--"}</span>,
    <span>{variant.mak_price_type || "--"}</span>,
    <span>{variant.varient_weight || "--"}</span>,
    <span
      className="text-blue-600 underline cursor-pointer"
      onClick={() =>
        variant?.inventory_id > 0 && handleQuantityClick(variant?.inventory_id)
      }
    >
      {variant.inventory_details?.quantity || "--"}
    </span>,
    <span>{variant.inventory_details?.reserved_quantity || "--"}</span>,
    <span>{variant.inventory_details?.minimum_quantity || "--"}</span>,

    <button
      onClick={() =>
        navigate(`/inventory?variant_id=${variant.varient_id}`)
      }
      className="text-indigo-600 hover:underline"
    >
      <Edit2 />
    </button>,

    <button
      onClick={() =>
        navigate(
          `/product-attribute?variant_id=${variant.varient_id}&&product_id=${variant?.product_id}`
        )
      }
      className="text-green-600 hover:underline"
    >
      <Edit />
    </button>,

    <button
      onClick={() => setMaterialModalVariant(variant)}
      className="text-green-600 hover:underline"
    >
      <Edit />
    </button>,

    <button
      onClick={() =>
        navigate(`/product-discount?variant_id=${variant.varient_id}`)
      }
      className="text-green-600 hover:underline"
    >
      <Edit />
    </button>,

    <button
      onClick={() =>
        navigate(`/product-tax?variant_id=${variant.varient_id}`)
      }
      className="text-green-600 hover:underline"
    >
      <Edit />
    </button>,

    <div className="space-x-2">
      <button
        onClick={() => openModalForEdit(variant)}
        className="text-blue-600 hover:underline"
      >
        <Edit />
      </button>
      <button
        onClick={() => handleDeleteVariant(variant.varient_id)}
        className="text-red-600 hover:underline"
      >
        <Delete />
      </button>
    </div>,
  ]);


  return (
    <div className="p-6">
      <Loader isLoading={loding} />
      <h1 className="text-2xl font-bold mb-4">Product : {product?.name}</h1>
      <div className="flex justify-end">
        <button
          onClick={openModalForCreate}
          className="mb-4 px-4 py-2  bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Variant
        </button>
      </div>

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={loding}
      />


      {/* Modal for Create/Edit Variant */}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="bg-white p-6 max-w-5xl mx-auto mt-20 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <VariantModal
          product={product}
          variant={editingVariant}
          units={units}
          onClose={closeModal}
          refreshVariants={fetchVariants}
        />
      </ReactModal>
      <ReactModal
        isOpen={!!materialModalVariant}
        onRequestClose={() => setMaterialModalVariant(null)}
        ariaHideApp={false}
        className="bg-white p-6 max-w-4xl mx-auto mt-20 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        {materialModalVariant && (
          <VariantMaterialModal
            variant={materialModalVariant}
            units={units}
            onClose={() => setMaterialModalVariant(null)}
          />
        )}
      </ReactModal>
      <Dialog
        open={storeDialogOpen}
        onClose={() => setStoreDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Store-wise Inventory</DialogTitle>
        <DialogContent>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    S No.
                  </th>
                  <th
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    Store Name
                  </th>
                  <th
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    Quantity
                  </th>
                  {/* <th
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    Updated At
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {storeInventory.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      style={{ textAlign: "center", padding: "12px" }}
                    >
                      No Data Available
                    </td>
                  </tr>
                ) : (
                  storeInventory?.map((store, index) => (
                    <tr key={store.swi_inv_id || index}>
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {store.name || "N/A"}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {store.swi_qnty || 0}
                      </td>
                      {/* <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        {store.isUpdated ? (
                          <span
                            style={{
                              color: "blue",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            <Edit />
                          </span>
                        ) : (
                          <Lock />
                        )}
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductVariant;
