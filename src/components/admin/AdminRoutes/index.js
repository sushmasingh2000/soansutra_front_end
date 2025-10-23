import Dashboard from "../../Layout/Dashboard";
import Banner from "../Banner";
import Customer from "../Customer";
import CustomOrder from "../Customizatiion.js";
import Discount from "../Discount";
import MasterMaterial from "../MasterMaterial";
import ProductMaterial from "../Material";
import PaymentMethod from "../Payment";
import Products from "../Product";
import ProductAttributes from "../ProductAttributes";
import ProductCategories from "../ProductCategories";
import ProductDiscount from "../ProductDiscount";
import ProductInventory from "../ProductInventory";
import ProductTax from "../ProductTax";
import PurityMaterial from "../PurityMaterial";
import RequestDemo from "../ReqDemo";
import SubCategory from "../SubCategories";
import Tax from "../Tax";
import ProductUnits from "../Unit";
import Permissions from "../../superadmin/Permissions";
import Role from "../../superadmin/Role";
import StoreManagement from "../../superadmin/StoreMangement";
import PayoutReport from "../PayoutReport";
import PurchaseWallet from "../PurchaseWallet";
import AddPurchaseWallet from "../AddPurchaseWallet";
import BankDetais from "../Bankdetails";
import Video from "../Video";
import MasterMaterialBackup from "../MaterialBackup";
import Coupon from "../Coupon";
import Order from "../Order";
import OrderDetails from "../OrderDetails";
import Rank from "../Rank";
import Distributor from "../Distributor";
import Rankachiver from "../RankAchiver";
import EgoldOrder from "../E-goldOrder";
import Attribute from "../Attributes";
import InsiderEmail from "../InsiderEmail";
import Collection from "../Collection";
import ProductVariant from "../ProductVariant";
import CouponPriceRange from "../CouponPriceRange.";
import UserManagement from "../../superadmin/UserManagement";
import DeliveryAdd from "../deliveryboy/Adddelivery.js";
import DeliveryBoyProfile from "../deliveryboy/deliveryPanel/Profile.js";
import AssignOrder from "../deliveryboy/deliveryPanel/AssignOrder.js";
import DeliveryDashboard from "../deliveryboy/Deliverydashboard.js";
import OfflineOrder from "../OfflineOrder.js";
import InventoyPos from "../pos/InventoryPos.js";
import OfflineSell from "../offlineSell/Offlinesell.js";

export const adminroutes = [

//superadmin
 {
    path: "/stores",
    component: <StoreManagement />,
    navItem:"Store Management"
  },
  {
    path: "/users",
    component: <UserManagement />,
    navItem: "User Management",

  },
  {
    path: "/roles",
    component: <Role />,
    navItem: "Role",

  },
 {
    path: "/permissions",
    component: <Permissions />,
    navItem: "Permissions",
  },

  //admin
  {
    path: "/admin-dashboard",
    component: <Dashboard />,
    navItem: "Dashboard",
  },
  {
    path: "/master",
    component: <MasterMaterial />,
    navItem: "Master Material",

  },
  {
    path: "/banner",
    component: <Banner />,
    navItem: "Banner",
  },
  {
    path: "/leads",
    component: <InsiderEmail />,
    navItem: "Insider Email",
  },
  {
    path: "/bank_detail",
    component: <BankDetais />,
    navItem: "Bank Details",
  },
  {
    path: "/payout_report",
    component: <PayoutReport />,
    navItem: "Payout Report",
  },
  {
    path: "/purchase_wallet",
    component: <PurchaseWallet />,
    navItem: "Purchase Wallet",
  },
  {
    path: "/add_purchase_wallet",
    component: <AddPurchaseWallet />,
    navItem: "Add Purchase Wallet",
  },
 
  {
    path: "/Collection",
    component: <Collection />,
    navItem: "Collection",
  },
  {
    path: "/order",
    component: <Order />,
    navItem: "Order",
  },

  {
    path: "/pos",
    component: <InventoyPos />,
    navItem: "POS Inventory",
  },
   {
    path: "/sell",
    component: <OfflineSell />,
    navItem: "Offline Sell",
  },
  {
    path: "/order-details/:orderId",
    component: <OrderDetails />,
    navItem: "Order Details",
  },
  {
    path: "/rank",
    component: <Rank />,
    navItem: "Rank",
  },
  {
    path: "/distributor",
    component: <Distributor />,
    navItem: "Distributor",
  },
  {
    path: "/rankachiver",
    component: <Rankachiver />,
    navItem: "Rank Achiver",
  },
  {
    path: "/categories",
    component: <ProductCategories />,
    navItem: "Product Categories",
  },
  {
    path: "/sub_categories",
    component: <SubCategory />,
    navItem: "Sub Categories",

  },
  {
    path: "/products",
    component: <Products />,
    navItem: "Products",
  },
  {
    path: "/unit",
    component: <ProductUnits />,
    navItem: "Product Units",
  },
  {
    path: "/product-variant/:id",
    component: <ProductVariant />,
    navItem: "Product Variant",
  },
  {
    path: "/product-master-material",
    component: <MasterMaterial />,
    navItem: "Master Material",
  },
  {
    path: "/product-material",
    component: <ProductMaterial />,
    navItem: "Product Material",
  },
  {
    path: "/coupon",
    component: <Coupon />,
    navItem: "Coupon",
  },
  {
    path: "/price_range",
    component: <CouponPriceRange />,
    navItem: "Coupon Price Range",
  },
  {
    path: "/inventory",
    component: <ProductInventory />,
     navItem: "Product Inventory",
  },
  {
    path: "/offline",
    component: <OfflineOrder />,
     navItem: "Offline Order",
  },
  {
    path: "/custom",
    component: <CustomOrder />,
    navItem: "Custom Order",
  },
  {
    path: "/discount",
    component: <Discount />,
    navItem: "Discount",
  },
  {
    path: "/product-discount",
    component: <ProductDiscount />,
    navItem: "Product Discount",
  },
  {
    path: "/purity",
    component: <PurityMaterial />,
     navItem: "Purity Material",
  },
  {
    path: "/tax",
    component: <Tax />,
    navItem: "Tax",
  },
  {
    path: "/attribute",
    component: <Attribute />,
    navItem: "Attribute",
  },
  {
    path: "/product-tax",
    component: <ProductTax />,
    navItem: "Product Tax",
  },
  {
    path: "/product-attribute",
    component: <ProductAttributes />,
    navItem: "Product Attributes",
  },
  {
    path: "/backup_materials",
    component: <MasterMaterialBackup />,
    navItem: "Master Material Backup",
  },
  {
    path: "/payment",
    component: <PaymentMethod />,
    navItem: "Payment Method",
  },
  {
    path: "/demo-call",
    component: <RequestDemo />,
    navItem: "Request Demo",
  },
  {
    path: "/egold_order",
    component: <EgoldOrder />,
    navItem: "Egold Order",
  },
  {
    path: "/video",
    component: <Video />,
    navItem: "Video",
  },
  {
    path: "/customer",
    component: <Customer />,
    navItem: "Customer",
  },
  {
    path: "/crete_delivery",
    component: <DeliveryAdd />,
     navItem: "Create Delivery Boy",
  },
  //deliveryboy
  {
    path: "/deliveryboy_dashboard",
    component: <DeliveryDashboard />,
     navItem: " Dashboard",
  },
   {
    path: "/profile_delivery",
    component: <DeliveryBoyProfile />,
     navItem: " Profile",
  },
     {
    path: "/assign_order",
    component: <AssignOrder />,
     navItem: " Assign Order",
  },
  
];