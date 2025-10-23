import React from "react";
import { apiConnectorGet, usequeryBoolean } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import { useQuery } from "react-query";
import {
  UserGroupIcon,
  ShoppingBagIcon,
  CubeIcon,
  TruckIcon,
  XCircleIcon,
  CheckCircleIcon,
  PhoneIcon,
  BanknotesIcon,
  ArrowDownTrayIcon,
  UserIcon,
} from "@heroicons/react/24/solid";


// Mapping for label, color, and icon for known metrics
const metricMap = {
  product_category_count: {
    label: "Product Categories",
    color: "purple",
    icon: CubeIcon,
  },
  product_count: {
    label: "Total Products",
    color: "blue",
    icon: ShoppingBagIcon,
  },
  user_count: {
    label: "Users",
    color: "green",
    icon: UserGroupIcon,
  },
  customer_count: {
    label: "Customers",
    color: "orange",
    icon: UserIcon,
  },

  // Orders
  order_status_Pending: {
    label: "Orders - Pending",
    color: "yellow",
    icon: TruckIcon,
  },
  order_status_Shipped: {
    label: "Orders - Shipped",
    color: "blue",
    icon: TruckIcon,
  },
  order_status_In_Transit: {
    label: "Orders - In Transit",
    color: "purple",
    icon: TruckIcon,
  },
  order_status_Delivered: {
    label: "Orders - Delivered",
    color: "green",
    icon: CheckCircleIcon,
  },
  order_status_Cancelled: {
    label: "Orders - Cancelled",
    color: "red",
    icon: XCircleIcon,
  },

  // Custom orders
  custom_order_status_Pending: {
    label: "Custom Orders - Pending",
    color: "yellow",
    icon: ShoppingBagIcon,
  },
  custom_order_status_Processing: {
    label: "Custom Orders - Processing",
    color: "blue",
    icon: TruckIcon,
  },
  custom_order_status_Rejected: {
    label: "Custom Orders - Rejected",
    color: "red",
    icon: XCircleIcon,
  },
  custom_order_status_Success: {
    label: "Custom Orders - Success",
    color: "green",
    icon: CheckCircleIcon,
  },

  // Demo calls
  demo_call_status_Pending: {
    label: "Demo Calls - Pending",
    color: "yellow",
    icon: PhoneIcon,
  },
  demo_call_status_Processing: {
    label: "Demo Calls - Processing",
    color: "blue",
    icon: PhoneIcon,
  },
  demo_call_status_Rejected: {
    label: "Demo Calls - Rejected",
    color: "red",
    icon: XCircleIcon,
  },
  demo_call_status_Success: {
    label: "Demo Calls - Success",
    color: "green",
    icon: CheckCircleIcon,
  },

  // Gold
  buy_gold: {
    label: "Buy Gold",
    color: "yellow",
    icon: BanknotesIcon,
  },
  sell_gold: {
    label: "Sell Gold",
    color: "red",
    icon: ArrowDownTrayIcon,
  },
  total_distributor: {
    label: "Total Distributor",
    color: "green",
    icon: UserGroupIcon,
  },
};


const Dashboard = () => {
  const { data } = useQuery(
    ["get_dashboard_Count"],
    () => apiConnectorGet(endpoint.get_dashboard_Count),
    usequeryBoolean
  );

  const dashboardData = data?.data?.result || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, index) => {
          const key = item.metric.replaceAll(" ", "_"); // handle spaces
          const mapItem = metricMap[key];

          if (!mapItem) return null; // skip unknown metrics

          return (
            <StatCard
              key={index}
              label={mapItem.label}
              value={item.total_count}
              color={mapItem.color}
              icon={mapItem.icon}
            />

          );
        })}
      </div>
    </div>
  );
};

const StatCard = ({ color, label, value, icon: Icon }) => {
  const formattedValue = Number(value);
  return (
    <div className={`bg-${color}-50 py-6  px-2 rounded-lg border border-${color}-200`}>
      <div className="flex items-center justify-between">
        {Icon && <Icon className={`h-8 w-8 text-${color}-400`} />}

        <div>
          <p className={`text-${color}-600 text-sm font-medium`}>{label}</p>
          <p className={`text-xl text-end px-5 font-bold text-${color}-700`}>{formattedValue}</p>
        </div>
      </div>
    </div>
  );
};



export default Dashboard;
