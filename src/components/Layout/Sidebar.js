import { AdUnits, AodOutlined, Call, DashboardCustomizeOutlined, GroupAdd, Logout, ManageAccountsRounded, Maximize, PaymentSharp, PermScanWifi, Person, ProductionQuantityLimitsOutlined, RollerShadesClosed, Store, TaxiAlert } from "@mui/icons-material";
import { Disc2Icon, Eye, Image, MarsStroke, Minimize2Icon, User2Icon, Utensils } from "lucide-react";
import React, { useState } from "react";
import { FaFirstOrder } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <DashboardCustomizeOutlined/>,
    path: "/dashboard",
    roles: ["superuser", "Support Engineer", "user"],
  },
  {
    id: "stores",
    label: "Store Management",
    icon: <Store/>,
    path: "/stores",
    roles: ["superuser"],
  },
  {
    id: "users",
    label: "User Management",
    icon: <User2Icon/>,
    path: "/users",
    roles: ["superuser"],
  },
  {
    id: "roles",
    label: "Role",
    icon: <RollerShadesClosed/>,
    path: "/roles",
    roles: ["superuser"],
  },
  {
    id: "permissions",
    label: "Permissions",
    icon: <PermScanWifi/>,
    path: "/permissions",
    roles: ["superuser"],
  },
  {
    id: "categories",
    label: "Categories",
    icon: <AodOutlined/>,
    path: "/categories",
    roles: ["Support Engineer", "user"],
  },
  {
    id: "subcategories",
    label: "Sub Categories",
    icon: <Minimize2Icon/>,
    path: "/sub_categories",
    roles: ["Support Engineer", "user"],
  },
  {
    id: "products",
    label: "Products",
    icon: <MarsStroke/>,
    path: "/products",
    roles: ["Support Engineer", "user"],
  },
  {
    id: "utils",
    label: "Utils",
    icon: <Eye/>,
    roles: ["Support Engineer", "user"],
    children: [
      {
        id: "unit",
        label: "Units",
        icon: <AdUnits/>,
        path: "/unit",
        roles: ["Support Engineer", "user"],
      },
      {
        id: "material-group",
        label: "Material",
        icon: <GroupAdd/>,
        roles: ["Support Engineer", "user"],
        children: [
          {
            id: "master-material",
            label: "Master Material",
            icon: <ProductionQuantityLimitsOutlined/>,
            path: "/product-master-material",
            roles: ["Support Engineer", "user"],
          },
          {
            id: "sub-material",
            label: "Sub Material",
            icon: <ManageAccountsRounded/>,
            path: "/product-material",
            roles: ["Support Engineer", "user"],
          }
        ]
      }
      ,
      {
        id: "discount",
        label: "Discount",
        icon: <Disc2Icon/>,
        path: "/discount",
        roles: ["Support Engineer", "user"],
      },
      {
        id: "tax",
        label: "Tax",
        icon: <TaxiAlert/>,
        path: "/tax",
        roles: ["Support Engineer", "user"],
      },
    ],
  },
  {
    id: "custpm",
    label: "Custom Order",
    icon: <FaFirstOrder/>,
    path: "/custom",
    roles: ["superuser", "Support Engineer", "user"],
  },
  {
    id: "payment",
    label: "Payment",
    icon: <PaymentSharp/>,
    path: "/payment",
    roles: ["Support Engineer", "user"],
  },
  {
    id: "banner",
    label: "Banner",
    icon: <Image/>,
    path: "/banner",
    roles: ["Support Engineer", "user"],
  },
  {
    id: "demo",
    label: "Requset Call",
    icon: <Call />,
    path: "/demo-call",
    roles: ["Support Engineer", "user"],
  },
  {
    id: "customer",
    label: "Customer",
    icon: <Person />,
    path: "/customer",
    roles: ["Support Engineer", "user"],
  },
  {
    id: "logout",
    label: "LogOut",
    icon: <Logout/>,
    path: "/",
    roles: ["superuser", "Support Engineer", "user"],
  },

  // {
  //   id: "reports",
  //   label: "Reports",
  //   icon: "📈",
  //   path: "/reports",
  //   roles: ["superuser", "Support Engineer", "user"],
  // },
  // {
  //   id: "profile",
  //   label: "Profile",
  //   icon: "👤",
  //   path: "/profile",
  //   roles: ["superuser", "Support Engineer", "user"],
  // },
  // {
  //   id: "settings",
  //   label: "Settings",
  //   icon: "⚙️",
  //   path: "/settings",
  //   roles: ["superuser", "Support Engineer", "user"],
  // },
];


const Sidebar = ({ sidebarOpen = true }) => {
  const userRole = localStorage.getItem("role");
  const [openSubMenu, setOpenSubMenu] = useState({});

  const toggleSubMenu = (id) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMenuItems = (items, level = 0) => {
    return (
      <ul className={level > 0 ? "ml-6" : ""}>
        {items.map(({ id, label, icon, path, children, roles = [] }) => {
          if (!roles.includes(userRole)) return null;

          const isOpen = openSubMenu[id] || false;

          return (
            <li key={id}>
              {children ? (
                <div>
                  <button
                    onClick={() => toggleSubMenu(id)}
                    className={`w-full text-left px-6 py-2 flex items-center space-x-3 hover:bg-gray-100 ${level === 0 ? "font-medium text-gray-700" : "text-sm text-gray-600"
                      }`}
                  >
                    <span className="text-lg">{icon}</span>
                    <span className="flex-1">{label}</span>
                    <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
                  </button>
                  {isOpen && renderMenuItems(children, level + 1)}
                </div>
              ) : (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block px-6 py-2 flex items-center space-x-3 hover:bg-gray-100 transition-colors ${isActive
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                      : level === 0
                        ? "text-gray-700 font-medium"
                        : "text-sm text-gray-600"
                    }`
                  }
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <aside
      className={`h-full bg-white shadow-lg transition-all duration-300 z-40 ${sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"
        }`}
    >
      <nav className="mt-4">
        <div className="px-4 py-2">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Navigation
          </h2>
        </div>
        {renderMenuItems(menuItems)}
      </nav>
    </aside>
  );
};

export default Sidebar;
