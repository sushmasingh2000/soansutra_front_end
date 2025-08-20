import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../components/pages/LoginPage";
import SignUpPage from "../components/pages/signup";
import HomePage from "../components/pages/homePage";
import DynamicProductListingPage from "../components/pages/jewelleryProductPage";
import ProfileDashboard from "../components/pages/profile";
import ProductPage from "../components/pages/productDetailsPage";
import ShoppingCart from "../components/pages/cart";
import CheckoutHeader from "../components/pages/checkout";
import AdminLayout from "../components/layout";
import Login from "../authentiaction/Login";
import ProductUnits from "../components/admin/Unit";
import ProductVariant from "../components/admin/ProductVariant";
import MainLayout from "../components/Layout/MainLayout";
import Dashboard from "../components/Layout/Dashboard";
import ProductCategories from "../components/admin/ProductCategories";
import SubCategory from "../components/admin/SubCategories";
import Products from "../components/admin/Product";
import StoreManagement from "../components/superadmin/StoreMangement";
import UserManagement from "../components/superadmin/UserManagement";
import Role from "../components/superadmin/Role";
import Permissions from "../components/superadmin/Permissions";
import ProductMaterial from "../components/admin/Material";
import ProductInventory from "../components/admin/ProductInventory";
import Discount from "../components/admin/Discount";
import ProductDiscount from "../components/admin/ProductDiscount";
import Tax from "../components/admin/Tax";
import ProductTax from "../components/admin/ProductTax";
import PaymentMethod from "../components/admin/Payment";
import Customer from "../components/admin/Customer";

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
    path: "login",
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
    path: "/customer",
    element: (
      <MainLayout>
        <Customer />{" "}
      </MainLayout>
    ),
  },
  {
    path: "/products/:id",
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
