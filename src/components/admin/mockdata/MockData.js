import {
  AccountBalance,
  AddShoppingCart,
  AdUnits,
  AssignmentTurnedIn,
  Backup,
  ConfirmationNumber,
  DashboardCustomizeOutlined,
  Discount,
  GroupAdd,
  LocalMall,
  Logout,
  Paid,
  Category,
  CurrencyExchange,
  ProductionQuantityLimitsOutlined,
  PublishRounded,
  RequestPage,
  ImageAspectRatio,
  ManageAccountsRounded,
  PaymentSharp,
  DirectionsTransit,
  Boy,
  Sell,
  ShoppingCart,
  Store,
  SupervisorAccount,
  VideoLibrary,
  ViewTimeline,
  PermScanWifi,
  BoySharp,
} from "@mui/icons-material";

import { Eye, Image, LucideAmpersands, User2Icon } from "lucide-react";

const superAdminAccess = ["dashboard", "stores", "users", "permissions"];
const ManagerAccess = [
  "dashboard",
  "collection",
  "product-management",
  "order-management",
  "demo-call",
  "del",
];

const AdminAccess = [
  "dashboard",
  "customer",
  "banner",
  "collection",
  "product-management",
  "utils",
  "order-management",
  "coupon-management",
  "wallet",
  "finance",
  "shop_data",
  "demo-call",
  "video",
  "mlm",
  "leads",
  "del",
  "POS",
  "Offlinesell",
  "dazzl",
];
const deliveryboy = ["pro", "assign", "deldashboard"];

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
    id: "permissions",
    label: "Permissions",
    icon: <PermScanWifi />,
    navLink: "/permissions",
  },

  //admin
  {
    id: "banner",
    label: "Banner",
    icon: <Image />,
    navLink: "/banner",
  },
  {
    id: "collection",
    label: "Collection",
    icon: <ImageAspectRatio />,
    navLink: "/collection",
  },
  {
    id: "product-management",
    label: "Product Management",
    icon: <LocalMall />,
    subcomponent: [
      {
        id: "categories",
        label: "Categories",
        icon: <Category />,
        navLink: "/categories",
      },
      {
        id: "sub_categories",
        label: "Sub Categories",
        icon: <Category />,
        navLink: "/sub_categories",
      },
      {
        id: "products",
        label: "Products",
        icon: <ShoppingCart />,
        navLink: "/products",
      },
      // {
      //   id: "product-inventory",
      //   label: "Inventory",
      //   icon: <Inventory />,
      //   navLink: "/inventory",
      // },
    ],
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
          {
            id: "sub-material",
            label: "Sub Material",
            icon: <ManageAccountsRounded />,
            navLink: "/product-material",
          },
          {
            id: "backup-material",
            label: "Backup Materials",
            icon: <Backup />,
            navLink: "/backup_materials",
          },
        ],
      },
      {
        id: "tax",
        label: "Tax",
        icon: <CurrencyExchange />,
        navLink: "/tax",
      },

      {
        id: "discount",
        label: "Discount",
        icon: <Discount />,
        navLink: "/discount",
      },
    ],
  },
  {
    id: "coupon-management",
    label: "Coupon",
    icon: <ConfirmationNumber />,
    subcomponent: [
      {
        id: "coupon",
        label: "Coupon List",
        icon: <ConfirmationNumber />,
        navLink: "/coupon",
      },
      {
        id: "price-range",
        label: "Coupon Price Range",
        icon: <ViewTimeline />,
        navLink: "/price_range",
      },
    ],
  },
  {
    id: "POS",
    label: "POS",
    icon: <AccountBalance />,
    subcomponent: [
      {
        id: "pos",
        label: "Add Stock ",
        icon: <AccountBalance />,
        navLink: "/pos",
      },
      {
        id: "offpos",
        label: "OFF POS",
        icon: <AccountBalance />,
        navLink: "/pos_main",
      },
    ],
  },
  {
    id: "order-management",
    label: "Order Management",
    icon: <Sell />,
    subcomponent: [
      {
        id: "order",
        label: "Order",
        icon: <ShoppingCart />,
        navLink: "/order",
      },
      {
        id: "custom-order",
        label: "Custom Order",
        icon: <AssignmentTurnedIn />,
        navLink: "/custom",
      },
      {
        id: "offline-order",
        label: "Offline Order",
        icon: <AssignmentTurnedIn />,
        navLink: "/offline",
      },
    ],
  },
  {
    id: "dazzl",
    label: "Dazzle-12",
    icon: <ConfirmationNumber />,
    subcomponent: [
      {
        id: "subs",
        label: "Subscription Plan",
        icon: <AssignmentTurnedIn />,
        navLink: "/subscription",
      },
      {
        id: "due",
        label: "Due Installment",
        icon: <AssignmentTurnedIn />,
        navLink: "/installment",
      },
    ],
  },

  {
    id: "Offlinesell",
    label: "Offline Sell",
    icon: <AccountBalance />,
    subcomponent: [
      {
        id: "sell offline",
        label: "Sell ",
        icon: <AccountBalance />,
        navLink: "/sell",
      },
    ],
  },
  {
    id: "wallet",
    label: "Wallet Management",
    icon: <Paid />,
    subcomponent: [
      {
        id: "purchase-wallet",
        label: "Purchase Wallet",
        icon: <AddShoppingCart />,
        navLink: "/purchase_wallet",
      },
      {
        id: "add-purchase-wallet",
        label: "Add Purchase Wallet",
        icon: <AddShoppingCart />,
        navLink: "/add_purchase_wallet",
      },
    ],
  },
  {
    id: "finance",
    label: "Financials",
    icon: <AccountBalance />,
    subcomponent: [
      {
        id: "bank-detail",
        label: "Bank Details",
        icon: <AccountBalance />,
        navLink: "/bank_detail",
      },
      {
        id: "payment",
        label: "Payment",
        icon: <PaymentSharp />,
        navLink: "/payment",
      },
      {
        id: "payout-report",
        label: "Payout Report",
        icon: <CurrencyExchange />,
        navLink: "/payout_report",
      },
    ],
  },
  {
    id: "shop_data",
    label: "Shop Info",
    icon: <LucideAmpersands />,
    navLink: "/shop-info",
  },
  {
    id: "leads",
    label: "External Leads",
    icon: <LucideAmpersands />,
    navLink: "/leads",
  },
  {
    id: "video",
    label: "Videos",
    icon: <VideoLibrary />,
    navLink: "/video",
  },
  {
    id: "demo-call",
    label: "Request Demo",
    icon: <RequestPage />,
    navLink: "/demo-call",
  },
  {
    id: "customer",
    label: "Customer",
    icon: <SupervisorAccount />,
    navLink: "/customer",
  },

  {
    id: "mlm",
    label: "MLM",
    icon: <Eye />,
    subcomponent: [
      {
        id: "distributor",
        label: "Distributor",
        icon: <DirectionsTransit />,
        navLink: "/distributor",
      },
      {
        id: "rank",
        label: "Master Rank",
        icon: <PermScanWifi />,
        navLink: "/rank",
      },
      {
        id: "rank_achivers",
        label: "Rank Achiever",
        icon: <PermScanWifi />,
        navLink: "/rankachiver",
      },
    ],
  },

  {
    id: "del",
    label: "Create Delivery Boy",
    icon: <Boy />,
    navLink: "/crete_delivery",
  },

  {
    id: "deldashboard",
    label: "Dashboard",
    icon: <DashboardCustomizeOutlined />,
    navLink: "/deliveryboy_dashboard",
  },
  {
    id: "assign",
    label: "My Order",
    icon: <BoySharp />,
    navLink: "/assign_order",
  },
  {
    id: "pro",
    label: "Profile",
    icon: <BoySharp />,
    navLink: "/profile_delivery",
  },

  {
    id: "logout",
    label: "Logout",
    icon: <Logout />,
    navLink: "/",
  },
];

const userRole = localStorage.getItem("role");

let allowedIds = [];

if (userRole === "superuser") {
  allowedIds = superAdminAccess;
} else if (userRole === "Manager") {
  allowedIds = ManagerAccess;
} else if (userRole === "deliveryboy") {
  allowedIds = deliveryboy;
} else {
  allowedIds = AdminAccess;
}

export const filtered_Data = all_Data.filter((item) =>
  allowedIds.includes(item.id)
);
