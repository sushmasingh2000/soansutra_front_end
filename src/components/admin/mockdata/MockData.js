import {
  AdUnits,
  DashboardCustomizeOutlined,
  GroupAdd,
  Logout,
  PermScanWifi,
  ProductionQuantityLimitsOutlined,
  PublishRounded,
  RollerShadesClosed,
  Store
} from "@mui/icons-material";

import {
  Eye,
  User2Icon
} from "lucide-react";

const superAdminAccess = [
  "dashboard",
  "stores",
  "users",
  "roles",
  "permissions",
  "logout",
];

export const all_Data = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <DashboardCustomizeOutlined />,
    navLink: "/admin-dashboard",
  },
  {
    id: "stores",
    label: "Store Management",
    icon: <Store />,
    navLink: "/stores",
  },
  {
    id: "users",
    label: "User Management",
    icon: <User2Icon />,
    navLink: "/users",
  },
  {
    id: "roles",
    label: "Role",
    icon: <RollerShadesClosed />,
    navLink: "/roles",
  },
  {
    id: "permissions",
    label: "Permissions",
    icon: <PermScanWifi />,
    navLink: "/permissions",
  },
  {
    id: "utils",
    label: "Utils",
    icon: <Eye />,
    subcomponent: [
      {
        id: "unit",
        label: "Units",
        icon: <AdUnits />,
        navLink: "/unit",
      },
      {
        id: "material-group",
        label: "Material",
        icon: <GroupAdd />,
        subcomponent: [
          {
            id: "master-material",
            label: "Master Material",
            icon: <ProductionQuantityLimitsOutlined />,
            navLink: "/product-master-material",
          },
          {
            id: "purity-material",
            label: "Purity Material",
            icon: <PublishRounded />,
            navLink: "/purity",
          },
        ],
      },
    ],
  },
  {
    id: "logout",
    label: "Logout",
    icon: <Logout />,
    navLink: "/",
  },
]
const userRole = localStorage.getItem("role");

// Determine allowed IDs based on role
const allowedIds = userRole === "superuser"
  ? superAdminAccess
  : ["dashboard", "logout"]; // only always visible ones for non-superuser

// Final filtered navigation data
export const filtered_Data = all_Data.filter((item) =>
  allowedIds.includes(item.id)
);
