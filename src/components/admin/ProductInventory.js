import { Edit } from "@mui/icons-material";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactModal from "react-modal";
import { useQuery, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";

const ProductInventory = () => {
  const [searchParams] = useSearchParams();
  const defaultVariantId = searchParams.get("variant_id");
  const [variant, setVariant] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const client = useQueryClient();
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    user_id: "",
    quantity: 1,
  });

  const offlineOrderFn = async () => {
    if (
      !orderForm.user_id ||
      orderForm.quantity < 1 ||
      orderForm.quantity > Number(inventory?.stock_in_store)
    ) {
      toast.error("Please enter valid user and quantity.");
      return;
    }

    const payload = {
      customer_unique: orderForm.user_id,
      varient_id: defaultVariantId,
      product_id: variant?.product_id || "",
      quantity: orderForm.quantity,
    };

    try {
      const res = await apiConnectorPost(endpoint.offline_order, payload);

      if (res?.data?.success) {
        toast.success("Order placed successfully!");
        setOrderModalOpen(false);
        setOrderForm({ user_id: "", quantity: 1 });
        client.refetchQueries("get_inventory");
      } else {
        toast.error(res?.data?.message || "Order failed.");
      }
    } catch (error) {
      toast.error("Something went wrong while placing the order.");
    }
  };
  const handleOrderChange = (e) => {
    const { name, value } = e.target;

    setOrderForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const [formData, setFormData] = useState({
    inventory_id: null,
    product_id: "",
    warehouse_id: "",
    quantity: "",
    reserved_quantity: "",
    minimum_quantity: "",
    batch_number: "",
    expiry_date: "",
    barcode: "",
  });
  const { data: price } = useQuery(
    ["get_price_va", defaultVariantId],
    () =>
      apiConnectorGet(`${endpoint.get_varient_price}?v_id=${defaultVariantId}`),
    { refetchOnMount: false }
  );
  const vaprice = price?.data?.result || [];

  const { data } = useQuery(
    ["get_inventory", defaultVariantId],
    () =>
      apiConnectorGet(
        `${endpoint.get_product_inventory}?varient_id=${defaultVariantId}`
      ),
    { refetchOnMount: false }
  );
  const inventory = data?.data?.result?.[0] || [];

  useEffect(() => {
    if (defaultVariantId) {
      const findProductForVariant = async () => {
        const res = await apiConnectorGet(
          `${endpoint.get_product_variant}?variant_id=${defaultVariantId}`
        );
        setVariant(res?.data?.result?.[0] || []);
      };
      findProductForVariant();
    }
  }, [defaultVariantId]);

  const openModalForAddUpdate = () => {
    const inv = inventory || {};
    setFormData({
      product_id: variant?.product_id || null,
      inventory_id: inv.inventory_id || null,
      warehouse_id: "1",
      quantity: Number(inv.stock_in_store) || "",
      reserved_quantity: Number(inv.reserved_quantity) || "",
      minimum_quantity: Number(inv.minimum_quantity) || "",
      batch_number: inv.batch_number || "",
      expiry_date: "",
      barcode: inv.barcode || "",
    });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    const payload = { ...formData, varient_id: defaultVariantId };
    try {
      const res = await apiConnectorPost(
        formData.inventory_id
          ? endpoint.update_product_inventory
          : endpoint.create_product_inventory,
        payload
      );
      toast(res?.data?.message);
      if (res?.data?.success) {
        setModalOpen(false);
        client.refetchQueries("get_inventory");
      }
    } catch {
      toast.error("Failed to submit inventory.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Product Inventory </h1>

      {/* Product Select */}
      <div className="flex justify-between gap-2">
        <div className="flex justify-start gap-2">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Product</label>
            <input
              className="w-full border p-2"
              readOnly
              value={variant.product_details?.product_name}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Variant</label>
            <input
              className="w-full border p-2"
              readOnly
              value={variant.varient_sku}
            />
          </div>
        </div>
        <div>
          {variant && (
            <div className=" flex gap-4">
              {!inventory ? (
                <button
                  onClick={openModalForAddUpdate}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <Plus size={16} /> Add Inventory
                </button>
              ) : (
                <button
                  onClick={openModalForAddUpdate}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Edit size={16} /> Update Inventory
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <table className="min-w-full bg-white border rounded shadow overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Reserved</th>
              <th className="py-2 px-4 border-b">Minimum</th>
              <th className="py-2 px-4 border-b">Batch #</th>
              {/* <th className="py-2 px-4 border-b">Expiry</th> */}
              <th className="py-2 px-4 border-b">Barcode</th>
              <th className="py-2 px-4 border-b">Order</th>
            </tr>
          </thead>
          <tbody>
            {!inventory ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Inventory not found
                </td>
              </tr>
            ) : (
              <tr className="text-sm">
                <td className="py-2 px-4 border-b text-blue-700 underline cursor-pointer">
                  {inventory.stock_in_store}
                </td>

                <td className="py-2 px-4 border-b">
                  {inventory.reserved_quantity}
                </td>
                <td className="py-2 px-4 border-b">
                  {inventory.minimum_quantity}
                </td>
                <td className="py-2 px-4 border-b">
                  {inventory.batch_number || "N/A"}
                </td>
                {/* <td className="py-2 px-4 border-b">{inventory.expiry_date?.split("T")[0] || "N/A"}</td> */}
                <td className="py-2 px-4 border-b">
                  {inventory.barcode || "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => setOrderModalOpen(true)}
                    className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    Book
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ReactModal
        isOpen={orderModalOpen}
        onRequestClose={() => setOrderModalOpen(false)}
        ariaHideApp={false}
        className="bg-white p-10 w-full max-w-xl mx-auto mt-20 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <h2 className="text-2xl text-center font-bold mb-4">Place Order</h2>

        {/* Price Display */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Variant Price (per unit)
          </label>
          <input
            value={vaprice}
            readOnly
            className="border p-2 w-full bg-gray-100"
          />
        </div>

        {/* Total Price Calculation */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Total Price</label>
          <input
            value={
              !isNaN(vaprice)
                ? Number(vaprice) * Number(orderForm.quantity || 0)
                : 0
            }
            readOnly
            className="border p-2 w-full bg-gray-100"
          />
        </div>

        {/* Order Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">User ID</label>
            <input
              name="user_id"
              placeholder="Enter user ID"
              value={orderForm.user_id}
              onChange={handleOrderChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setOrderForm((prev) => ({
                    ...prev,
                    quantity: Math.max(1, prev.quantity - 1),
                  }))
                }
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                −
              </button>
              <input
                name="quantity"
                value={orderForm.quantity}
                onChange={(e) =>
                  setOrderForm((prev) => ({
                    ...prev,
                    quantity: Math.min(
                      Number(inventory?.stock_in_store) || 1,
                      Math.max(1, Number(e.target.value))
                    ),
                  }))
                }
                type="number"
                className="border p-1 w-20 text-center"
              />
              <button
                onClick={() =>
                  setOrderForm((prev) => ({
                    ...prev,
                    quantity: Math.min(
                      Number(inventory?.stock_in_store) || 1,
                      prev.quantity + 1
                    ),
                  }))
                }
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Available: {inventory?.stock_in_store || 0}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => setOrderModalOpen(false)}
            className="mr-3 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={offlineOrderFn}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Submit
          </button>
        </div>
      </ReactModal>

      {/* Modal */}
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
        className="bg-white p-6 max-w-lg mx-auto mt-20 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <h2 className="text-lg font-bold mb-4">
          {formData.inventory_id ? "Update Inventory" : "Add Inventory"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Quantity</label>
            <input
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border p-2"
              type="number"
            />
          </div>
          <div>
            <label>Reserved Quantity</label>
            <input
              name="reserved_quantity"
              placeholder="Reserved Quantity"
              value={formData.reserved_quantity}
              onChange={handleChange}
              className="border p-2"
              type="number"
            />
          </div>
          <div>
            <label>Minimum Quantity</label>
            <input
              name="minimum_quantity"
              placeholder="Minimum Quantity"
              value={formData.minimum_quantity}
              onChange={handleChange}
              className="border p-2"
              type="number"
            />
          </div>
          <div>
            <label>Batch Number</label>
            <input
              name="batch_number"
              placeholder="Batch Number"
              value={formData.batch_number}
              onChange={handleChange}
              className="border p-2"
            />
          </div>
          {/* <div>
            <label>Expiry date</label>
            <input
              name="expiry_date"
              type="date"
              value={formData.expiry_date}
              onChange={handleChange}
              className="border p-2"
            />
          </div> */}
          <div>
            <label>Barcode</label>
            <input
              name="barcode"
              placeholder="Barcode"
              value={formData.barcode}
              onChange={handleChange}
              className="border p-2"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setModalOpen(false)}
            className="mr-3 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default ProductInventory;
