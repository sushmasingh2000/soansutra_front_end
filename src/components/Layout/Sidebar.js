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
        id: "material",
        label: "Material",
        icon: "📦",
        path: "/product-material",
        roles: ["Support Engineer", "user"],
      },
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
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (id) => {
    setOpenSubMenu((prev) => (prev === id ? null : id));
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
        <ul className="mt-2">
          {filteredMenuItems.map(({ id, label, icon, path, children }) => (
            <li key={id}>
              {children ? (
                <div>
                  <button
                    onClick={() => toggleSubMenu(id)}
                    className="w-full px-6 py-3 flex items-center space-x-3 font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                  >
                    <span className="text-xl">{icon}</span>
                    <span className="flex-1 text-left">{label}</span>
                    <span className="text-xs">{openSubMenu === id ? "▲" : "▼"}</span>
                  </button>

                  {openSubMenu === id && (
                    <ul className="ml-8">
                      {children
                        .filter((child) => child.roles.includes(userRole))
                        .map(({ id, label, icon, path }) => (
                          <li key={id}>
                            <NavLink
                              to={path}
                              className={({ isActive }) =>
                                `w-full text-left px-6 py-2 flex items-center space-x-2 hover:bg-gray-100 transition-colors ${
                                  isActive
                                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                                    : "text-gray-600"
                                }`
                              }
                            >
                              <span className="text-sm">{icon}</span>
                              <span className="text-sm">{label}</span>
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `w-full text-left px-6 py-3 flex items-center space-x-3 hover:bg-gray-100 transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                        : "text-gray-700"
                    }`
                  }
                >
                  <span className="text-xl">{icon}</span>
                  <span className="font-medium">{label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
