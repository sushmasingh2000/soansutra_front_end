import React from "react";
import { apiConnectorGet, usequeryBoolean } from "../../../utils/ApiConnector";
import { endpoint } from "../../../utils/APIRoutes";
import { useQuery } from "react-query";

const DeliveryDashboard = () => {
  const { data } = useQuery(
    ["get_dlv_dashboard"],
    () => apiConnectorGet(endpoint.get_dlv_dashboard),
    usequeryBoolean
  );

  const dashboardData = data?.data?.result?.[0] || {};

  // Map keys to labels and colors for display
  const cardData = [
    { key: "pending_order", label: "Pending Orders", color: "yellow" },
    { key: "accept_order", label: "Accepted Orders", color: "green" },
    { key: "reject_order", label: "Rejected Orders", color: "red" },
    { key: "otd_assign_to", label: "My Orders", color: "blue" },
    
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8"> Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map(({ key, label, color }) => (
          <StatCard
            key={key}
            label={label}
            value={dashboardData[key] || "0"}
            color={color}
          />
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ color, label, value }) => (
  <div className={`bg-${color}-50 p-6 rounded-lg border border-${color}-200`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-${color}-600 text-sm font-medium`}>{label}</p>
        <p className={`text-xl font-bold text-${color}-700`}>{value}</p>
      </div>
    </div>
  </div>
);

export default DeliveryDashboard;
