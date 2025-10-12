import React, { useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";

const OfflineOrder = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [confirmingOrder, setConfirmingOrder] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const fetchCart = async (customerId) => {
    // if (!customerId) {
    //   toast.error("Enter customer unique ID.");
    //   return;
    // }

    setLoading(true);
    try {
      const res = await apiConnectorGet(
        `${endpoint.get_cart_admin}?customer_unique=${customerId}`
      );
      setCartData(res?.data?.result || []);
      if (!res?.data?.result?.length) {
        toast("No cart items found.");
      }
    } catch (err) {
      toast.error("Failed to fetch cart data.");
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (cartItemId) => {
    try {
      const res = await apiConnectorGet(
        `${endpoint.remove_cart_admin}?cart_item_id=${cartItemId}`
      );
      toast(res?.data?.message);
      fetchCart(searchValue);
    } catch (err) {
      toast.error("Failed to remove item.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCart(searchValue);
  };

  const handleConfirmOrder = async () => {
    if (!searchValue || cartData.length === 0) {
      toast.error("Cart is empty or customer ID missing.");
      return;
    }

    setConfirmingOrder(true);

    const items = cartData.map((item) => ({
      varient_id: item.varient_id,
      quantity: item.quantity,
    }));

    const payment = {
      method: 1,
      status: "Unpaid",
      amount: cartData.reduce(
        (total, item) => total + item.final_varient_price * item.quantity,
        0
      ),
    };

    const body = {
      status: "Pending",
      payment_method: 1,
      payment_status: "Unpaid",
      notes: "N/A",
      items,
      payment,
      isCoupon: false,
    };

    try {
      const res = await apiConnectorPost(
        `${endpoint.create_order_by_admin}?customer_unique=${searchValue}`,
        body
      );
      toast(res?.data?.message);
      //   setShowAddressModal(true);

      // ✅ If backend responds with "Please add address"
      if (res?.data?.message?.includes("Please add a shipping address")) {
        setShowAddressModal(true);
        return;
      }

      if (res?.data?.success) {
        fetchCart();
      }
    } catch (err) {
      toast.error("Failed to confirm order.");
    } finally {
      setConfirmingOrder(false);
    }
  };

  const AddressModal = ({ isOpen, onClose, onSubmit, customerId }) => {
    const [address, setAddress] = useState({
      full_name: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      phone_number: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const body = {
        ...address,
        is_default: 1,
        customer_unique: customerId,
      };

      try {
        const res = await apiConnectorPost(endpoint.add_address_by_admin, body);
        toast(res?.data?.message);
        if (res?.data?.success) {
          onClose(); // close modal
        }
        // onSubmit(); // callback to retry order
      } catch (err) {
        toast.error("Failed to add address");
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add Address</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={address.full_name}
              onChange={handleChange}
              required
              className="border p-2 col-span-2"
            />
            <input
              type="text"
              name="address_line1"
              placeholder="Address Line 1"
              value={address.address_line1}
              onChange={handleChange}
              required
              className="border p-2 col-span-2"
            />
            <input
              type="text"
              name="address_line2"
              placeholder="Address Line 2"
              value={address.address_line2}
              onChange={handleChange}
              className="border p-2 col-span-2"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
              required
              className="border p-2"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleChange}
              required
              className="border p-2"
            />
            <input
              type="text"
              name="postal_code"
              placeholder="Postal Code"
              value={address.postal_code}
              onChange={handleChange}
              required
              className="border p-2"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleChange}
              required
              className="border p-2"
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={address.phone_number}
              onChange={handleChange}
              required
              className="border p-2 col-span-2"
            />

            <div className="col-span-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Offline Cart Orders</h1>

      <form onSubmit={handleSearch} className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Enter customer unique"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border px-4 py-2 rounded w-72"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="bg-white rounded shadow overflow-x-auto mb-4">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">S.No</th>
              <th className="text-left px-4 py-2">Product</th>
              <th className="text-left px-4 py-2">Variant SKU</th>
              <th className="text-left px-4 py-2">Quantity</th>
              <th className="text-left px-4 py-2">Price</th>
              <th className="text-left px-4 py-2">Image</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartData.length > 0 ? (
              cartData.map((item, idx) => {
                const product = item.varient_details?.product_details;
                const image = product?.product_image?.p_image_url;

                return (
                  <tr
                    key={item.cart_item_id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">
                      {product?.product_name || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {item.varient_details?.varient_sku || "N/A"}
                    </td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.final_varient_price}</td>
                    <td className="px-4 py-2">
                      {image ? (
                        <img
                          src={image}
                          alt="Product"
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => removeCartItem(item.cart_item_id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  {loading ? "Loading..." : "No cart items found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Confirm Order Button */}
      {cartData.length > 0 && (
        <button
          onClick={handleConfirmOrder}
          disabled={confirmingOrder}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {confirmingOrder ? "Confirming..." : "Confirm Order"}
        </button>
      )}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSubmit={handleConfirmOrder} // Retry after address
        customerId={searchValue}
      />
    </div>
  );
};

export default OfflineOrder;
