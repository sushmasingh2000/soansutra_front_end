import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  DashboardCustomizeOutlined,
  Store,
  Logout,
  Person,
  PaymentSharp,
  Call,
  AodOutlined,
  DirectionsTransit,
  GroupAdd,
  ImageAspectRatio,
  PermScanWifi,
  ManageAccountsRounded,
  ProductionQuantityLimitsOutlined,
  PublishRounded,
  AdUnits,
  Money,
  TaxiAlert,
  RollerShadesClosed,
} from "@mui/icons-material";
import {
  BanknoteIcon,
  CornerUpLeftIcon,
  Disc2Icon,
  Eye,
  Image,
  LucideAmpersands,
  MarsStroke,
  Minimize2Icon,
  User2Icon,
} from "lucide-react";
import { FaFirstOrder } from "react-icons/fa";

// Define access roles
const superAdminAccess = [
  "dashboard",
  "stores",
  "users",
  "roles",
  "permissions",
  "logout",
];

const alwaysVisible = ["dashboard", "logout"];

// Full menu definition
const fullMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <DashboardCustomizeOutlined />,
    path: "/dashboard",
  },
  {
    id: "stores",
    label: "Store Management",
    icon: <Store />,
    path: "/stores",
  },
  {
    id: "users",
    label: "User Management",
    icon: <User2Icon />,
    path: "/users",
  },
  {
    id: "roles",
    label: "Role",
    icon: <RollerShadesClosed />,
    path: "/roles",
  },
  {
    id: "permissions",
    label: "Permissions",
    icon: <PermScanWifi />,
    path: "/permissions",
  },
  {
    id: "banner",
    label: "Banner",
    icon: <Image />,
    path: "/banner",
  },
  {
    id: "video",
    label: "Video",
    icon: <Image />,
    path: "/video",
  },
  {
    id: "collection",
    label: "Collection",
    icon: <ImageAspectRatio />,
    path: "/collection",
  },
  {
    id: "categories",
    label: "Categories",
    icon: <AodOutlined />,
    path: "/categories",
  },
  {
    id: "subcategories",
    label: "Sub Categories",
    icon: <Minimize2Icon />,
    path: "/sub_categories",
  },
  {
    id: "products",
    label: "Products",
    icon: <MarsStroke />,
    path: "/products",
  },
  {
    id: "distributor",
    label: "Distributor",
    icon: <DirectionsTransit />,
    path: "/distributor",
  },

  {
    id: "utils",
    label: "Utils",
    icon: <Eye />,
    children: [
      {
        id: "unit",
        label: "Units",
        icon: <AdUnits />,
        path: "/unit",
      },
      {
        id: "material-group",
        label: "Material",
        icon: <GroupAdd />,
        children: [
          {
            id: "master-material",
            label: "Master Material",
            icon: <ProductionQuantityLimitsOutlined />,
            path: "/product-master-material",
          },
          {
            id: "purity-material",
            label: "Purity Material",
            icon: <PublishRounded />,
            path: "/purity",
          },
          {
            id: "sub-material",
            label: "Sub Material",
            icon: <ManageAccountsRounded />,
            path: "/product-material",
          },
          {
            id: "backup-material",
            label: "Backup Material",
            icon: <ManageAccountsRounded />,
            path: "/backup_materials",
          },
        ],
      },
      {
        id: "coupon",
        label: "Coupon",
        icon: <CornerUpLeftIcon />,
        path: "/coupon",
      },
      {
        id: "discount",
        label: "Discount",
        icon: <Disc2Icon />,
        path: "/discount",
      },
      {
        id: "tax",
        label: "Tax",
        icon: <TaxiAlert />,
        path: "/tax",
      },
      // {
      //   id: "attribute",
      //   label: "Attribute",
      //   icon: <TaxiAlert />,
      //   path: "/attribute",
      // },
      {
        id: "price_range",
        label: "Coupon Price Range",
        icon: <Money />,
        path: "/price_range",
      },
    ],
  },
  {
    id: "customer",
    label: "Customer",
    icon: <Person />,
    path: "/customer",
  },
  {
    id: "order",
    label: "Order",
    icon: <Person />,
    path: "/order",
  },
   {
    id: "add purchase_wallet",
    label: "Add Purchase Wallet",
    icon: <Person />,
    path: "/add_purchase_wallet",
  },
  {
    id: "purchase_wallet",
    label: "Wallet Ledger",
    icon: <Person />,
    path: "/purchase_wallet",
  },
  
  {
    id: "leads",
    label: "External Leads",
    icon: <LucideAmpersands />,
    path: "/leads",
  },
  {
    id: "demo",
    label: "Request Call",
    icon: <Call />,
    path: "/demo-call",
  },
  {
    id: "custom",
    label: "Custom Order",
    icon: <FaFirstOrder />,
    path: "/custom",
  },
  {
    id: "payment",
    label: "Payment",
    icon: <PaymentSharp />,
    path: "/payment",
  },
   {
    id: "payout_report",
    label: "Payout Report",
    icon: <PaymentSharp />,
    path: "/payout_report",
  },
  
  {
    id: "mlm",
    label: "MLM",
    icon: <Eye />,
    children: [
      {
        id: "rank",
        label: "Master Rank",
        icon: <PermScanWifi />,
        path: "/rank",
      },
      {
        id: "rank_achivers",
        label: "Rank Achiever",
        icon: <PermScanWifi />,
        path: "/rankachiver",
      },

    ],
  },
  {
    id: "bank_detail",
    label: "BankDetail",
    icon: <BanknoteIcon />,
    path: "/bank_detail",
  },
  
  {
    id: "logout",
    label: "LogOut",
    icon: <Logout />,
    path: "/",
  },
];

const Sidebar = ({ sidebarOpen = true }) => {
  const [openSubMenu, setOpenSubMenu] = useState({});
  const userRole = localStorage.getItem("role");

  // Filter based on role
  const menuItems = fullMenuItems.filter((item) => {
    const always = alwaysVisible.includes(item.id);
    const isSuperItem = superAdminAccess.includes(item.id);

    if (always) return true;
    if (userRole === "superuser") return isSuperItem;

    return !isSuperItem;
  });

  const toggleSubMenu = (id) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMenuItems = (items, level = 0) => (
    <ul className={`${level > 0 ? "ml-6 border-l pl-4" : ""}`}>
      {items.map(({ id, label, icon, path, children }) => {
        const isOpen = openSubMenu[id] || false;

        return (
          <li key={id} className="mb-1">
            {children ? (
              <div>
                <button
                  onClick={() => toggleSubMenu(id)}
                  className={`w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 ${level === 0
                    ? "font-medium text-gray-800"
                    : "text-sm text-gray-600"
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{icon}</span>
                    <span>{label}</span>
                  </div>
                  <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && renderMenuItems(children, level + 1)}
              </div>
            ) : (
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block px-4 py-2 flex items-center space-x-3 rounded-md transition-all hover:bg-gray-100 ${isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700"
                  }`
                }
              >
                <span className="text-lg">{icon}</span>
                <span>{label}</span>
              </NavLink>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 w-64 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="py-4 px-4 border-b">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          SonaSutra
        </h2>
      </div>
      <nav className="overflow-y-auto max-h-[calc(100vh-4rem)] p-2 example">
        {renderMenuItems(menuItems)}
      </nav>
    </aside>
  );
};

export default Sidebar;
