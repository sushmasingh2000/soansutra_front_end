import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./authentiaction/Login";
import HomePage from "./components/pages/homePage";
import {
  default as LoginModal,
  default as LoginPage,
} from "./components/pages/LoginPage";
import { useLoginModal } from "./context/Login";
import { routes } from "./routes/Routes";
import Test from "./Test";
import { adminroutes } from "./components/admin/AdminRoutes";
import AdminLayout from "./components/admin/Layout";
import AdminLogIn from "./components/admin/Authentication/Login";

function App() {
  const admin = localStorage.getItem("token");
  const user = localStorage.getItem("token");
  const { showLoginModal, setShowLoginModal } = useLoginModal();
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Test />} /> */}
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/admin-login" element={<Login />} /> */}
        <Route path="/admin-Login" element={<AdminLogIn />} />
        {user ? (
          adminroutes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              element={
                <AdminLayout
                  id={route.id}
                  navLink={route.path}
                  navItem={route.navItem}
                  component={route.component}
                />
              }
            />
          ))
        ) : (
          <Route path="*" element={<AdminLogIn />} />
        )}
        {admin ? (
          routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))
        ) : (
          <Route path="*" element={<Login />} />
        )}

        {routes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<LoginPage />} />
      </Routes>
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
