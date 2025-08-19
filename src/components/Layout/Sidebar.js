import React from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard', roles: ['superuser', 'Support Engineer', 'user'] },
  { id: 'stores', label: 'Store Management', icon: '🏪', path: '/stores', roles: ['superuser'] },
  { id: 'users', label: 'User Management', icon: '👥', path: '/users', roles: ['superuser'] },
  { id: 'roles', label: 'Role', icon: '🔐', path: '/roles', roles: ['superuser'] },
  { id: 'permissions', label: 'Permissions', icon: '🔐', path: '/permissions', roles: ['superuser'] },
  { id: 'categories', label: 'Categories', icon: '📂', path: '/categories', roles: ['Support Engineer', 'user'] },
  { id: 'subcategories', label: 'Sub Categories', icon: '📂', path: '/sub_categories', roles: ['Support Engineer', 'user'] },
  { id: 'products', label: 'Products', icon: '📦', path: '/products', roles: ['Support Engineer', 'user'] },
  { id: 'unit', label: 'Units', icon: '📦', path: '/unit', roles: ['Support Engineer', 'user'] },
  { id: 'material', label: 'Material', icon: '📦', path: '/product-material', roles: ['Support Engineer', 'user'] },
  { id: 'discount', label: 'Discount', icon: '📦', path: '/discount', roles: ['Support Engineer', 'user'] },
  { id: 'tax', label: 'Tax', icon: '📦', path: '/tax', roles: ['Support Engineer', 'user'] },
  { id: 'payment', label: 'Payment', icon: '📦', path: '/payment', roles: ['Support Engineer', 'user'] },
  
  { id: 'reports', label: 'Reports', icon: '📈', path: '/reports', roles: ['superuser', 'Support Engineer', 'user'] },
  { id: 'profile', label: 'Profile', icon: '👤', path: '/profile', roles: ['superuser', 'Support Engineer', 'user'] },
  { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings', roles: ['superuser', 'Support Engineer', 'user'] },
];

const Sidebar = ({ sidebarOpen=true }) => {
  const userRole = localStorage.getItem("role")
  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside
      className={`  h-full bg-white shadow-lg transition-all duration-300 z-40 ${
        sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
      }`}
    >
      <nav className="mt-4">
        <div className="px-4 py-2">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Navigation</h2>
        </div>
        <ul className="mt-2">
          {filteredMenuItems.map(({ id, label, icon, path }) => (
            <li key={id}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `w-full text-left px-6 py-3 flex items-center space-x-3 hover:bg-gray-100 transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                  }`
                }
              >
                <span className="text-xl">{icon}</span>
                <span className="font-medium">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
