import Login from "../authentiaction/Login";
import Banner from "../components/admin/Banner";
import Customer from "../components/admin/Customer";
import CustomOrder from "../components/admin/Customizatiion.js";
import Discount from "../components/admin/Discount";
import MasterMaterial from "../components/admin/MasterMaterial";
import ProductMaterial from "../components/admin/Material";
import PaymentMethod from "../components/admin/Payment";
import Products from "../components/admin/Product";
import ProductCategories from "../components/admin/ProductCategories";
import ProductDiscount from "../components/admin/ProductDiscount";
import ProductInventory from "../components/admin/ProductInventory";
import ProductTax from "../components/admin/ProductTax";
import ProductVariant from "../components/admin/ProductVariant";
import RequestDemo from "../components/admin/ReqDemo.js";
import SubCategory from "../components/admin/SubCategories";
import Tax from "../components/admin/Tax";
import ProductUnits from "../components/admin/Unit";
import AdminLayout from "../components/layout";
import Dashboard from "../components/Layout/Dashboard";
import MainLayout from "../components/Layout/MainLayout";
import ShoppingCart from "../components/pages/cart";
import CheckoutHeader from "../components/pages/checkout";
import DynamicProductListingPage from "../components/pages/jewelleryProductPage";
import LoginPage from "../components/pages/LoginPage";
import ProductPage from "../components/pages/productDetailsPage";
import ProfileDashboard from "../components/pages/profile";
import SignUpPage from "../components/pages/signup";
import WishlistPage from "../components/pages/Wishlist";
import Permissions from "../components/superadmin/Permissions";
import Role from "../components/superadmin/Role";
import StoreManagement from "../components/superadmin/StoreMangement";
import UserManagement from "../components/superadmin/UserManagement";

export const routes = [
  {
    path: "/dashboard",
    element: (
      <MainLayout>
        <Dashboard />{" "}
      </MainLayout>
    ),
  },
  //super
  {
    path: "/stores",
    element: (
      <MainLayout>
        <StoreManagement />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/users",
    element: (
      <MainLayout>
        <UserManagement />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/roles",
    element: (
      <MainLayout>
        <Role />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/permissions",
    element: (
      <MainLayout>
        <Permissions />{" "}
      </MainLayout>
    ),
  },
  //user
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/categories",
    element: (
      <MainLayout>
        <ProductCategories />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/sub_categories",
    element: (
      <MainLayout>
        <SubCategory />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/products",
    element: (
      <MainLayout>
        <Products />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/unit",
    element: (
      <MainLayout>
        <ProductUnits />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/product-variant/:id",
    element: (
      <MainLayout>
        <ProductVariant />{" "}
      </MainLayout>
    ),
  },
   {
    path: "/product-master-material",
    element: (
      <MainLayout>
        <MasterMaterial />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/product-material",
    element: (
      <MainLayout>
        <ProductMaterial />{" "}
      </MainLayout>
    ),
  },
 
  {
    path: "/inventory",
    element: (
      <MainLayout>
        <ProductInventory />{" "}
      </MainLayout>
    ),
  },
   {
    path: "/custom",
    element: (
      <MainLayout>
        <CustomOrder />{" "}
      </MainLayout>
    ),
  },
  
  {
    path: "/discount",
    element: (
      <MainLayout>
        <Discount />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/product-discount",
    element: (
      <MainLayout>
        <ProductDiscount />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/banner",
    element: (
      <MainLayout>
        <Banner />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/tax",
    element: (
      <MainLayout>
        <Tax />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/product-tax",
    element: (
      <MainLayout>
        <ProductTax />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/payment",
    element: (
      <MainLayout>
        <PaymentMethod />{" "}
      </MainLayout>
    ),
  },
    {
    path: "/demo-call",
    element: (
      <MainLayout>
        <RequestDemo />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/customer",
    element: (
      <MainLayout>
        <Customer />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/products_web/:id",
    element: <DynamicProductListingPage />,
  },
  {
    path: "/myaccount/profile",
    element: <ProfileDashboard />,
  },
  {
    path: "/productdetails",
    element: <ProductPage />,
  },
  {
    path: "/shopping-cart",
    element: <ShoppingCart />,
  },
  {
    path: "/checkout",
    element: <CheckoutHeader />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
  },
  {
    path: "/admin-login",
    element: <Login />,
  },
  {
    path: "/product-variant/:id",
    element: <ProductVariant />,
  },
  {
    path: "/product-attributes/:id",
    element: <ProductVariant />,
  },
    {
    path: "/wish",
    element: <WishlistPage />,
  },
];

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App />,
//         children: [
//             {
//                 path: "login",
//                 element: <LoginPage />
//             },
//             {

//                 path: "/sign-up",
//                 element: <SignUpPage />

//             },
//             {
//                 path: "",
//                 element: <HomePage />
//             },
//             {
//                 path: "/products/:category",
//                 element: <DynamicProductListingPage/>
//             },
//             {
//                 path: "/myaccount/profile",
//                 element: <ProfileDashboard/>
//             },
//             {
//                 path: "/productdetails",
//                 element: <ProductPage/>
//             },
//             {
//                 path: "/shopping-cart",
//                 element:<ShoppingCart/>
//             },
//             {
//                 path:"/checkout",
//                 element:<CheckoutHeader/>
//             },
//              {
//                 path:"/admin",
//                 element:<AdminLayout/>
//             },
//              {
//                 path:"/admin-login",
//                 element:<Login/>
//             },
//             {
//               path:"/product-variant/:id",
//                 element:<ProductVariant/>
//            },
//             {
//               path:"/product-attributes/:id",
//                 element:<ProductVariant/>
//            },

//         ]
//     }
// ])

// export default router
