import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './authentiaction/Login';
import HomePage from './components/pages/homePage';
import { default as LoginModal, default as LoginPage } from './components/pages/LoginPage';
import { useLoginModal } from './context/Login';
import { routes } from './routes/Routes';


function App() {
  const admin = localStorage.getItem("token");
  const user = localStorage.getItem("user_token");
  const { showLoginModal, setShowLoginModal } = useLoginModal();
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
    {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
    </BrowserRouter>
    
  );
}

export default App;