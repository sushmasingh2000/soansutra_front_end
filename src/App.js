import React from 'react';
import './App.css';
import { BrowserRouter, Outlet, Route, Router, Routes } from 'react-router-dom';
import Dashboard from './components/Layout/Dashboard';
import { routes } from './routes/Routes';
import HomePage from './components/pages/homePage';
import Login from './authentiaction/Login';
import LoginPage from './components/pages/LoginPage';


function App() {
  const admin = localStorage.getItem("token");
  const user = localStorage.getItem("user_token");
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/"  element = {<HomePage/>} />
      <Route path="/admin-login"  element = {<Login/>} />
        {admin ? (
          routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))
        ) : (
          <Route path="*" element={<Login />} />
        )}
       
         { routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<LoginPage />} />
    </Routes>
    </BrowserRouter>
     
    
  );
}

export default App;