import React, { useEffect, useState } from "react";
import { X } from "lucide-react"; // for remove icon
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            setLoading(true);
            const res = await apiConnectorGet(endpoint?.get_wishlist);
            setWishlist(res?.data?.result)
        };

        fetchWishlist();
    }, []);

    const removeFromWishlist = async (id) => {
        try {
            const res = await apiConnectorGet(`${endpoint?.remove_wishlist}?wishlist_item_id=${id}`);
            toast(res?.data?.message)
            if (res?.data?.success) {
                setWishlist(prev => prev.filter(item => item.product_id !== id));
            }
        }
        catch {
            toast("Failed to remove item from wishlist");
        }
    };
    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-semibold mb-6">Your Wishlist</h1>
            {wishlist.map((item) => {
                const product = item.product_details;
                const imageUrl = product.product_image?.p_image_url || "https://via.placeholder.com/80";

                return (
                    <div key={item.product_id} className="flex justify-between items-center border-b py-4">
                        <div className="flex items-center space-x-4">
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div>
                                <h2 className="font-semibold">{product.name}</h2>
                                <p className="text-gray-500 mt-1">{product.description}</p>
                            </div>
                        </div>
                        <div>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => removeFromWishlist(item.product_id)}
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
