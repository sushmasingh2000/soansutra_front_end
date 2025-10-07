import React, { useEffect, useState } from "react";
import {
    apiConnectorGet,
    apiConnectorPost,
    usequeryBoolean,
} from "../../../../utils/ApiConnector";
import { endpoint } from "../../../../utils/APIRoutes";
import toast from "react-hot-toast";
import CustomTable from "../../Shared/CustomTable";
import { useQuery } from "react-query";
import CustomToPagination from "../../../../Shared/Pagination";
import { LocationOn, Lock } from "@mui/icons-material";
import { Step, StepContent, StepLabel, Stepper } from "@mui/material";

const AssignOrder = () => {
    const [loading, setLoading] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedOrderUnique, setSelectedOrderUnique] = useState(null);
    const [viewLocationModal, setViewLocationModal] = useState(false);
    const [locationData, setLocationData] = useState(null);
    const [locationLoading, setLocationLoading] = useState(false);


    const [orderStatusMap, setOrderStatusMap] = useState({});
    const [locationModal, setLocationModal] = useState(false);
    const [selectedLocationOrder, setSelectedLocationOrder] = useState(null);

    const [location, setLocation] = useState("");
    const [pinCode, setPinCode] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const {
        data,
        isLoading: isQueryLoading,
        refetch,
    } = useQuery(
        ["get_assign_order", { searchTerm, startDate, endDate, page }],
        () =>
            apiConnectorGet(endpoint.get_assign_order, {
                search: searchTerm,
                start_date: startDate,
                end_date: endDate,
                page: page,
                count: 10,
            }),
        { ...usequeryBoolean, keepPreviousData: true }
    );

    const orders = data?.data?.result || [];


    const handleViewLocation = async (orderUnique) => {
        try {
            setLocationLoading(true);
            setViewLocationModal(true); // Show modal first with loading state

            const res = await apiConnectorGet(`${endpoint.get_order_location}?order_id=${orderUnique}`);
            setLocationData(res?.data?.result);
            console.log(res?.data?.result);
        } catch (error) {
            toast.error("Failed to fetch location");
            console.error("Location fetch error:", error);
        } finally {
            setLocationLoading(false);
        }
    };


    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            refetch();
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm, startDate, endDate]);


    const handleOrderStatusChange = async (otd_id, order_unique, status, reason = "") => {
        if (status === 3 && !reason) {
            toast.error("Please provide a rejection reason.");
            return;
        }
        try {
            setLoading(true);
            const payload = {
                order_unique,
                otd_id,
                status,
                discription: status === 2 ? "Accepted by delivery boy" : reason,
            };
            const res = await apiConnectorPost(endpoint.status_assign_order, payload);
            toast(res?.data?.message);
            if (res?.data?.success) {
                refetch();
                setRejectModal(false);
            }
        } catch (err) {
            console.error("handleOrderStatusChange error:", err);
            toast.error(`Failed to ${status === 2 ? "accept" : "reject"} order.`);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        if (!status) {
            toast.error("Select a status");
            return;
        }
        try {
            setLoading(true);
            const payload = {
                order_id: orderId,
                status,
            };
            const res = await apiConnectorPost(endpoint.update_cust_order_status, payload);
            toast(res?.data?.message);
            if (res?.data?.success) {
                refetch();
            }
        } catch (err) {
            console.error("updateOrderStatus error:", err);
            toast.error("Failed to update order status.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (orders?.length > 0) {
            const initialStatusMap = {};
            orders.forEach((order) => {
                initialStatusMap[order.otd_id] = order.status || "";
            });
            setOrderStatusMap(initialStatusMap);
        }
    }, [orders]);

    const SubmitLocationUpdate = async () => {
        if (!location || !pinCode) {
            toast.error("Please enter location and pin code");
            return;
        }

        try {
            setLoading(true);
            const payload = {
                order_id: selectedLocationOrder?.order_unique,
                ol_otd_id: selectedLocationOrder?.otd_id,
                location,
                pin_code: pinCode,
            };
            const res = await apiConnectorPost(endpoint.update_order_location, payload);
            toast(res?.data?.message);
            if (res?.data?.success) {
                setLocationModal(false);
                setLocation("");
                setPinCode("");
                refetch();
            }
        } catch {
            toast.error("Failed to update location");
        } finally {
            setLoading(false);
        }
    };

    const tablehead = [
        "S.No",
        "Order ID",
        "Product",
        "Customer Name",
        "Address",
        "Assign Date",
        "Status",
        "Order Status",
        "Order Location",
        "Actions",
    ];

    const tablerow = orders?.data?.map((order, index) => {
        const currentStatus = orderStatusMap[order.otd_id] ?? order.status ?? "";

        return [
            index + 1,
            <span
                className="text-blue-600 cursor-pointer underline"
                onClick={() => handleViewLocation(order.order_unique)}
            >
                {order.order_unique}
            </span>
            ,
            <div className="flex flex-col items-center gap-2" key={`prod-${order.otd_id}`}>
                <img
                    src={order?.order_items?.[0]?.p_image_url}
                    alt="product"
                    className="w-8 h-8 rounded object-cover"
                />
                <span>{order?.order_items?.[0]?.sku || "N/A"}</span>
            </div>,
            order?.shipping_details?.name || "N/A",
            `${order?.shipping_details?.address || ""}, ${order?.shipping_details?.city || ""
            }, ${order?.shipping_details?.state || ""} - ${order?.shipping_details?.postal_code || ""
            }`,
            new Date(order?.otd_assign_date).toLocaleDateString("en-IN"),
            <span
                key={`status-${order.otd_id}`}
                className={`px-2 py-1 rounded-full text-xs font-medium ${order.otd_status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.otd_status === "Accept"
                        ? "bg-green-100 text-green-700"
                        : order.otd_status === "Reject"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
            >
                {order.otd_status}
            </span>,

            // Order Status control
            <div className="flex flex-col justify-center gap-2" key={`order-status-${order.otd_id}`}>
                {order?.otd_status !== "Reject" && order?.status!=="Delivered" ? (
                    <><select
                        value={currentStatus}
                        onChange={(e) =>
                            setOrderStatusMap((prev) => ({
                                ...prev,
                                [order.otd_id]: e.target.value,
                            }))
                        }
                        className="border px-2 py-1 rounded text-xs"
                    >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                        <button
                            onClick={() =>
                                updateOrderStatus(order.order_unique, currentStatus)
                            }
                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                        >
                            Update
                        </button></>
                ) : (
                   <p> {order?.status === "Delivered" ?"Delivered"  :<Lock />}</p>
                )}
            </div>,

            // Location button (opens modal)
            <div className="text-center" key={`loc-btn-${order.otd_id}`}>
                {order?.otd_status !== "Reject" && order?.status !== "Delivered" ? (
                    <button
                        onClick={() => {
                            setSelectedLocationOrder(order);
                            setLocationModal(true);
                        }}
                        className=" text-purple-800 px-3 py-1 rounded text-xs "
                    >
                        <LocationOn />
                    </button>
                ) : (
                    <span>{order?.status === "Delivered" ? "Delivered" : <Lock />}</span>
                )}
            </div>,

            // Accept / Reject or lock
            <div className="flex gap-2" key={`actions-${order.otd_id}`}>
                {order?.otd_status === "Pending" ? (
                    <>
                        <button
                            onClick={() => handleOrderStatusChange(order.otd_id, order.order_unique, 2)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => {
                                setSelectedOrderId(order.otd_id);
                                setSelectedOrderUnique(order.order_unique);
                                setRejectReason("");
                                setRejectModal(true);
                            }}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Reject
                        </button>
                    </>
                ) : (
                    <Lock />
                )}
            </div>,
        ];
    });

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Assigned Orders</h1>

            <div className="mb-4 flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border px-3 py-2 rounded w-60"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border px-3 py-2 rounded"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border px-3 py-2 rounded"
                />
            </div>

            <CustomTable
                tablehead={tablehead}
                tablerow={tablerow}
                isLoading={isQueryLoading || loading}
            />

            {rejectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
                        <h2 className="text-xl font-semibold text-red-600">
                            Reject Order
                        </h2>
                        <textarea
                            rows="4"
                            placeholder="Enter reason for rejection"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setRejectModal(false)}
                                className="px-4 py-2 border rounded hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleOrderStatusChange(selectedOrderId, selectedOrderUnique, 3, rejectReason)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <CustomToPagination data={orders} page={page} setPage={setPage} />

            {locationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
                        <h2 className="text-xl font-semibold text-purple-600">
                            Update Order Location
                        </h2>
                        <input
                            type="text"
                            placeholder="Enter location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Enter pin code"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setLocationModal(false)}
                                className="px-4 py-2 border rounded hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={SubmitLocationUpdate}
                                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {viewLocationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
                        <h2 className="text-xl font-semibold text-blue-600">
                            Order Location Details
                        </h2>

                        {locationLoading ? (
                            <p className="text-center text-gray-500">Loading...</p>
                        ) : locationData?.[0]?.order_locations?.length > 0 ? (
                            <Stepper
                                orientation="vertical"
                                activeStep={locationData[0].order_locations.length - 1}
                            >
                                {locationData[0].order_locations.map((loc, index) => (
                                    <Step
                                        key={index}
                                        completed={index < locationData[0].order_locations.length - 1}
                                    >
                                        <StepLabel>
                                            🧭 Location #{index + 1} — {loc?.ol_location}
                                        </StepLabel>
                                        <StepContent>
                                            <p className="text-sm text-gray-700">
                                                <strong>Pin Code:</strong> {loc?.ol_pin_code || "N/A"}
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                <strong>Distance:</strong> <span className="font-extrabold">{loc?.ol_last_dist ?? "N/A"} </span>
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                <strong>Updated At:</strong>{" "}
                                                {loc?.ol_created_at
                                                    ? new Date(loc.ol_created_at).toLocaleString("en-IN", {
                                                        dateStyle: "medium",
                                                        timeStyle: "short",
                                                    })
                                                    : "N/A"}
                                            </p>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>

                        ) : (
                            <p className="text-red-500">No location data found for this order.</p>
                        )}


                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    setViewLocationModal(false);
                                    setLocationData(null);
                                }}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default AssignOrder;
