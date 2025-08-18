import React from 'react';
import './App.css';
import { BrowserRouter, Outlet, Route, Router, Routes } from 'react-router-dom';
import Dashboard from './components/Layout/Dashboard';
import { routes } from './routes/Routes';
import HomePage from './components/pages/homePage';
import Login from './authentiaction/Login';


function App() {
  const user = localStorage.getItem("token");
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/"  element = {<HomePage/>} />
      <Route path="/admin-login"  element = {<Login/>} />
        {user ? (
          routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))
        ) : (
          <Route path="*" element={<Dashboard />} />
        )}
    </Routes>
    </BrowserRouter>
     
    
  );
}

export default App;