import React, { useContext, useState } from 'react';
import DeliveryContext from '../context/DeliveryContext';

const DeliveryAdminPanel = () => {
    const {
        orders,
        setOrders,
        deliveryBoys,
        setDeliveryBoys,
        notifications,
        addNotification,
        dismissNotification,
        statuses,
    } = useContext(DeliveryContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Status: All');
    const [distanceFilter, setDistanceFilter] = useState('Distance: All');
    const [activeTab, setActiveTab] = useState('orders');

    // Modal states for Assign
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [modalOrder, setModalOrder] = useState(null);
    const [localBoy, setLocalBoy] = useState('');
    const [thirdParty, setThirdParty] = useState('');
    const [awbNumber, setAwbNumber] = useState('');

    // Boy add states
    const [boyName, setBoyName] = useState('');
    const [boyEmail, setBoyEmail] = useState('');
    const [boyMobile, setBoyMobile] = useState('');
    const [boyDOB, setBoyDOB] = useState('');
    const [boyAddress, setBoyAddress] = useState('');
    const [boyAvailability, setBoyAvailability] = useState('true');

    // Edit Boy Modal
    const [isEditBoyModalOpen, setIsEditBoyModalOpen] = useState(false);
    const [editBoy, setEditBoy] = useState(null);

    // Notifications visibility
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const filteredOrders = orders.filter((order) => {
        if (searchTerm && !order.id.toLowerCase().includes(searchTerm.toLowerCase()) && !order.customer.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        if (statusFilter !== 'Status: All' && order.status !== statusFilter) return false;
        if (distanceFilter !== 'Distance: All') {
            if (distanceFilter === '≤3km' && order.distance > 3) return false;
            if (distanceFilter === '>3km' && order.distance <= 3) return false;
        }
        return true;
    });

    const openAssignModal = (orderId) => {
        const order = orders.find((o) => o.id === orderId);
        setModalOrder(order);
        setIsAssignModalOpen(true);
        setLocalBoy('');
        setThirdParty('');
        setAwbNumber('');
    };

    const confirmAssign = () => {
        if (!localBoy && !thirdParty) {
            alert('Please select a delivery option.');
            return;
        }
        if (thirdParty && !awbNumber) {
            alert('Please enter AWB number for third-party.');
            return;
        }
        const updatedOrders = orders.map((o) =>
            o.id === modalOrder.id
                ? {
                    ...o,
                    assignee: localBoy ? `Local: ${localBoy}` : `Third-Party: ${thirdParty}`,
                    awb: thirdParty ? awbNumber : '',
                    status: 'Assigned',
                }
                : o
        );
        setOrders(updatedOrders);
        addNotification(`Order #${modalOrder.id} assigned to ${localBoy ? `Local: ${localBoy}` : `Third-Party: ${thirdParty}`}`);
        alert('Order assigned successfully!');
        setIsAssignModalOpen(false);
    };

    const updateStatus = (orderId, status) => {
        const updatedOrders = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
        setOrders(updatedOrders);
        addNotification(`Admin updated Order #${orderId} status to ${status}`);
        alert(`Status updated to ${status}`);
    };

    const addBoy = () => {
        if (!boyName || !boyEmail || !boyMobile || !boyDOB || !boyAddress) {
            alert('Please fill all fields.');
            return;
        }
        const newBoy = {
            id: Date.now(),
            name: boyName,
            email: boyEmail,
            mobile: boyMobile,
            dob: boyDOB,
            address: boyAddress,
            available: boyAvailability === 'true',
        };
        setDeliveryBoys((prev) => [...prev, newBoy]);
        setBoyName('');
        setBoyEmail('');
        setBoyMobile('');
        setBoyDOB('');
        setBoyAddress('');
        setBoyAvailability('true');
        alert('Delivery boy added!');
    };

    const openEditBoyModal = (boy) => {
        setEditBoy({ ...boy });
        setIsEditBoyModalOpen(true);
    };

    const saveEditBoy = () => {
        if (!editBoy.name || !editBoy.email || !editBoy.mobile || !editBoy.dob || !editBoy.address) {
            alert('Please fill all fields.');
            return;
        }
        const updatedBoys = deliveryBoys.map((b) => (b.id === editBoy.id ? editBoy : b));
        setDeliveryBoys(updatedBoys);
        alert('Delivery boy updated!');
        setIsEditBoyModalOpen(false);
    };

    const deleteBoy = (boyId) => {
        if (window.confirm('Are you sure you want to delete this delivery boy?')) {
            setDeliveryBoys((prev) => prev.filter((b) => b.id !== boyId));
            alert('Delivery boy deleted!');
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Delivery Management</h1>
                <div className="relative">
                    <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {notifications.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {notifications.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {isNotificationsOpen && (
                <div className="mb-4 max-h-64 overflow-y-auto bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                    <div>
                        {notifications.map((notif, index) => (
                            <div key={index} className="notification p-2 bg-yellow-100 rounded mb-2 flex justify-between items-center">
                                <p className="text-sm">{notif.message}</p>
                                <button onClick={() => dismissNotification(index)} className="text-red-500 hover:text-red-700">✕</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-around mb-4">
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                >
                    Orders
                </button>
                <button
                    onClick={() => setActiveTab('boys')}
                    className={`px-4 py-2 rounded ${activeTab === 'boys' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                >
                    Manage Boys
                </button>
            </div>

            {activeTab === 'orders' && (
                <div>
                    <div className="flex space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="Search Order ID/Customer"
                            className="border p-2 rounded w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            className="border p-2 rounded"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>Status: All</option>
                            {statuses.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        <select
                            className="border p-2 rounded"
                            value={distanceFilter}
                            onChange={(e) => setDistanceFilter(e.target.value)}
                        >
                            <option>Distance: All</option>
                            <option>&le;3km</option>
                            <option>&gt;3km</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredOrders.map((order) => {
                            let buttons = null;
                            if (order.status === 'Ready to Dispatch') {
                                buttons = (
                                    <button
                                        onClick={() => openAssignModal(order.id)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Assign
                                    </button>
                                );
                            } else if (order.assignee.startsWith('Third-Party:')) {
                                buttons = (
                                    <select
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                        className="border p-1 rounded"
                                        value={order.status}
                                    >
                                        {statuses.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                );
                            }
                            return (
                                <div
                                    key={order.id}
                                    className={`bg-white p-4 rounded-lg shadow border-l-4 ${order.distance <= 3 ? 'border-green-500' : 'border-red-500'}`}
                                >
                                    <div className="flex">
                                        <img src={order.image} alt={order.item} className="w-16 h-16 object-cover rounded mr-4" />
                                        <div>
                                            <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                                            <p className="text-sm text-gray-600">{order.item} - ₹{order.price}</p>
                                            <p className="text-sm text-gray-600">{order.customer}</p>
                                            <p className="text-sm text-gray-600">{order.address}</p>
                                            <p className="text-sm font-medium">
                                                Distance: {order.distance}km
                                                <span
                                                    className={`ml-2 px-2 py-1 rounded text-white text-xs ${order.distance <= 3 ? 'bg-green-500' : 'bg-red-500'}`}
                                                >
                                                    {order.distance <= 3 ? 'Local' : 'Third-Party'}
                                                </span>
                                            </p>
                                            <p className="text-sm font-medium">Status: {order.status}</p>
                                            {order.assignee && (
                                                <p className="text-sm text-gray-600">
                                                    Assigned to: {order.assignee}
                                                    {order.awb ? ` (AWB: ${order.awb})` : ''}
                                                </p>
                                            )}
                                            {order.currentLocation && <p className="text-sm text-gray-600">Current Location: {order.currentLocation}</p>}
                                        </div>
                                    </div>
                                    <div className="mt-4 flex space-x-2">{buttons}</div>
                                    <div className="mt-2 flex space-x-2 timeline">
                                        {statuses.map((s, i) => (
                                            <div
                                                key={s}
                                                className={`flex-1 ${i <= statuses.indexOf(order.status) ? 'bg-yellow-500' : 'bg-gray-200'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {activeTab === 'boys' && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Manage Delivery Boys</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Boy Name"
                            className="border p-2 rounded mr-2 mb-2"
                            value={boyName}
                            onChange={(e) => setBoyName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Boy Email"
                            className="border p-2 rounded mr-2 mb-2"
                            value={boyEmail}
                            onChange={(e) => setBoyEmail(e.target.value)}
                        />
                        <input
                            type="tel"
                            placeholder="Boy Mobile Number"
                            className="border p-2 rounded mr-2 mb-2"
                            value={boyMobile}
                            onChange={(e) => setBoyMobile(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Boy DOB"
                            className="border p-2 rounded mr-2 mb-2"
                            value={boyDOB}
                            onChange={(e) => setBoyDOB(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Boy Address"
                            className="border p-2 rounded mr-2 mb-2"
                            value={boyAddress}
                            onChange={(e) => setBoyAddress(e.target.value)}
                        />
                        <select
                            className="border p-2 rounded mr-2"
                            value={boyAvailability}
                            onChange={(e) => setBoyAvailability(e.target.value)}
                        >
                            <option value="true">Available</option>
                            <option value="false">Busy</option>
                        </select>
                        <button onClick={addBoy} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            Add Boy
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {deliveryBoys.map((boy) => (
                            <div key={boy.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">{boy.name}</h3>
                                    <p className="text-sm text-gray-600">Email: {boy.email}</p>
                                    <p className="text-sm text-gray-600">Mobile: {boy.mobile}</p>
                                    <p className="text-sm text-gray-600">DOB: {boy.dob}</p>
                                    <p className="text-sm text-gray-600">Address: {boy.address}</p>
                                    <p className="text-sm text-gray-600">{boy.available ? 'Available' : 'Busy'}</p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => openEditBoyModal(boy)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteBoy(boy.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isAssignModalOpen && modalOrder && (
                <div className="modal active">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Assign Order #{modalOrder.id}</h2>
                        <p className="text-sm mb-2">Distance: {modalOrder.distance}km</p>
                        <p className="text-sm mb-4">Suggestion: {modalOrder.distance <= 3 ? 'Local Boy' : 'Third-Party'}</p>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Assign To:</label>
                            <select
                                className="border p-2 rounded w-full"
                                value={localBoy}
                                onChange={(e) => {
                                    setLocalBoy(e.target.value);
                                    setThirdParty('');
                                }}
                            >
                                <option value="">Select Local Boy</option>
                                {deliveryBoys.map((boy) => (
                                    <option key={boy.id} value={boy.name}>
                                        {boy.name} ({boy.available ? 'Available' : 'Busy'})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Or Third-Party:</label>
                            <select
                                className="border p-2 rounded w-full"
                                value={thirdParty}
                                onChange={(e) => {
                                    setThirdParty(e.target.value);
                                    setLocalBoy('');
                                }}
                            >
                                <option value="">Select Third-Party</option>
                                <option value="Ekart">Ekart</option>
                                <option value="Bluedart">Bluedart</option>
                            </select>
                        </div>
                        {thirdParty && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">AWB Number:</label>
                                <input
                                    type="text"
                                    className="border p-2 rounded w-full"
                                    placeholder="Enter AWB Number"
                                    value={awbNumber}
                                    onChange={(e) => setAwbNumber(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setIsAssignModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">
                                Cancel
                            </button>
                            <button onClick={confirmAssign} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isEditBoyModalOpen && editBoy && (
                <div className="modal active">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Delivery Boy</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Name:</label>
                            <input
                                type="text"
                                className="border p-2 rounded w-full"
                                value={editBoy.name}
                                onChange={(e) => setEditBoy({ ...editBoy, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Email:</label>
                            <input
                                type="email"
                                className="border p-2 rounded w-full"
                                value={editBoy.email}
                                onChange={(e) => setEditBoy({ ...editBoy, email: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Mobile Number:</label>
                            <input
                                type="tel"
                                className="border p-2 rounded w-full"
                                value={editBoy.mobile}
                                onChange={(e) => setEditBoy({ ...editBoy, mobile: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">DOB:</label>
                            <input
                                type="date"
                                className="border p-2 rounded w-full"
                                value={editBoy.dob}
                                onChange={(e) => setEditBoy({ ...editBoy, dob: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Address:</label>
                            <input
                                type="text"
                                className="border p-2 rounded w-full"
                                value={editBoy.address}
                                onChange={(e) => setEditBoy({ ...editBoy, address: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Availability:</label>
                            <select
                                className="border p-2 rounded w-full"
                                value={editBoy.available.toString()}
                                onChange={(e) => setEditBoy({ ...editBoy, available: e.target.value === 'true' })}
                            >
                                <option value="true">Available</option>
                                <option value="false">Busy</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setIsEditBoyModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">
                                Cancel
                            </button>
                            <button onClick={saveEditBoy} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveryAdminPanel;