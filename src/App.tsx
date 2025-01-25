import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Components/Login" 
  import RegisterForm from "./Components/RegisterForm";
import HomePage from "./Pages/HomePage";
import Toolbar from "./Components/Toolbar";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";

const App: React.FC = () => {
  const location = useLocation(); 

  
  const noNavbarPaths = ["/login", "/register", "/forgot-password"];

  return (
    <>
    
      {!noNavbarPaths.includes(location.pathname) && <Toolbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        
      </Routes>
    </>
  );
};

const RootApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
