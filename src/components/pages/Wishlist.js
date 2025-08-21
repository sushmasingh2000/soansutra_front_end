import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    // Move fetchWishlist outside to reuse
    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const res = await apiConnectorGet(endpoint?.get_wishlist);
            setWishlist(res?.data?.result || []);
        } catch (err) {
            toast.error("Failed to fetch wishlist.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const removeFromWishlist = async (wishlistItemId) => {
        try {
            const res = await apiConnectorGet(`${endpoint?.remove_wishlist}?wishlist_item_id=${wishlistItemId}`);
            toast(res?.data?.message || "Item removed");

            if (res?.data?.success) {
                // Re-fetch wishlist to reflect changes
                fetchWishlist();
            }
        } catch {
            toast.error("Failed to remove item from wishlist");
        }
    };
    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-semibold mb-6">Your Wishlist</h1>
            {wishlist.map((item) => {
                const variant = item.varient_details;
                const product = variant?.product_details;
                const imageUrl = product?.product_image?.p_image_url || "https://via.placeholder.com/80";

                return (
                    <div key={item.product_id} className="flex justify-between items-center border-b py-4">
                        <div className="flex items-center space-x-4">
                            <img
                                src={imageUrl}
                                alt={product?.product_name || "Product Image"}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div>
                                <h2 className="font-semibold">{product?.product_name || "Unnamed Product"}</h2>
                                <p className="text-gray-500 mt-1">{product?.product_description || "No description"}</p>
                            </div>
                        </div>
                        <div>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => removeFromWishlist(item.wishlist_item_id)}
                                aria-label="Remove from wishlist"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                );
            })}

        </div>
    );
};

export default WishlistPage;
