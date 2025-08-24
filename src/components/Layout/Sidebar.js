import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "📊",
    path: "/dashboard",
    roles: ["superuser", "Support Engineer", "user"],
  },
  {
    id: "stores",
    label: "Store Management",
    icon: "🏪",
    path: "/stores",
    roles: ["superuser"],
  },
  {
    id: "users",
    label: "User Management",
    icon: "👥",
    path: "/users",
    roles: ["superuser"],
  },
  {
    id: "roles",
    label: "Role",
    icon: "🔐",
    path: "/roles",
    roles: ["superuser"],
  },
  {
    id: "permissions",
    label: "Permissions",
    icon: "🔐",
    path: "/permissions",
    roles: ["superuser"],
  },
  {
    id: "categories",
    label: "Categories",
    icon: "📂",
    path: "/categories",
    roles: ["Support Engineer", "user"],
  },
  {
    id: "subcategories",
    label: "Sub Categories",
    icon: "📂",
    path: "/sub_categories",
    roles: ["Support Engineer", "user"],
  },
  {
    id: "products",
    label: "Products",
    icon: "📦",
    path: "/products",
    roles: ["Support Engineer", "user"],
  },
  {
    id: "utils",
    label: "Utils",
    icon: "🛠️",
    roles: ["Support Engineer", "user"],
    children: [
      {
        id: "unit",
        label: "Units",
        icon: "📦",
        path: "/unit",
        roles: ["Support Engineer", "user"],
      },
       {
        id: "material-group",
        label: "Material",
        icon: "📦",
        roles: ["Support Engineer", "user"],
        children: [
          {
            id: "master-material",
            label: "Master Material",
            icon: "📦",
            path: "/product-master-material",
            roles: ["Support Engineer", "user"],
          },
          {
            id: "sub-material",
            label: "Sub Material",
            icon: "📦",
            path: "/product-material",
            roles: ["Support Engineer", "user"],
          }
        ]
      }
      ,
      {
        id: "discount",
        label: "Discount",
        icon: "📦",
        path: "/discount",
        roles: ["Support Engineer", "user"],
      },
      {
        id: "tax",
        label: "Tax",
        icon: "📦",
        path: "/tax",
        roles: ["Support Engineer", "user"],
      },
    ],
  },
  {
    id: "payment",
    label: "Payment",
    icon: "📦",
    path: "/payment",
    roles: ["Support Engineer", "user"],
  },
  {
    id: "banner",
    label: "Banner",
    icon: "📦",
    path: "/banner",
    roles: ["Support Engineer", "user"],
  },
  
  {
    id: "customer",
    label: "Customer",
    icon: "📦",
    path: "/customer",
    roles: ["Support Engineer", "user"],
  },
{
    id: "logout",
    label: "LogOut",
    icon: "📈",
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
                    className={`w-full text-left px-6 py-2 flex items-center space-x-3 hover:bg-gray-100 ${
                      level === 0 ? "font-medium text-gray-700" : "text-sm text-gray-600"
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
                    `block px-6 py-2 flex items-center space-x-3 hover:bg-gray-100 transition-colors ${
                      isActive
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
      className={`h-full bg-white shadow-lg transition-all duration-300 z-40 ${
        sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"
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
