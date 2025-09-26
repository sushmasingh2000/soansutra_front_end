import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { apiConnectorGet } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import Header from "../Header1";
import Footer from "../Footer1";
import NavigationBar from "../navigationbar";
import { useQueryClient } from "react-query";

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
    const queryClient = useQueryClient();

    const removeFromWishlist = async (wishlistItemId) => {
        try {
            const res = await apiConnectorGet(`${endpoint?.remove_wishlist}?wishlist_item_id=${wishlistItemId}`);
            toast(res?.data?.message || "Item removed");

            if (res?.data?.success) {
                queryClient.invalidateQueries(["get_wish"]);
                fetchWishlist()
            }
        } catch {
            toast.error("Failed to remove item from wishlist");
        }
    };
    return (
        <>
            <Header />
            <NavigationBar />
            <div className="max-w-6xl mx-auto p-4 sm:p-6 my-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Wishlist</h1>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : wishlist.length === 0 ? (
                    <p className="text-center text-gray-500">No items found in your wishlist.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                        {wishlist.map((item) => {
                            const variant = item.varient_details;
                            const product = variant?.product_details;
                            const imageUrl = product?.product_image?.p_image_url || "https://via.placeholder.com/80";

                            return (
                                <div
                                    key={item.product_id}
                                    className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex"
                                >
                                    <img
                                        src={imageUrl}
                                        alt={product?.product_name || "Product"}
                                        className="w-32 h-32 object-cover rounded-l-lg"
                                    />
                                    <div className="flex flex-col justify-between p-4 flex-grow">
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">{product?.product_name || "Unnamed Product"}</h2>
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-3">{product?.product_description || "No description"}</p>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                className="text-red-500 hover:text-red-700 transition"
                                                onClick={() => removeFromWishlist(item.wishlist_item_id)}
                                                aria-label="Remove from wishlist"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default WishlistPage;
