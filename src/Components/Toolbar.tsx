import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";


const Toolbar: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#ffffff",
        padding: "10px 20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Logo />
        
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link to="/create-item" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "10px 15px",
              background: "linear-gradient(135deg,rgb(145, 87, 204), #38a3a5)",
              color: "white",
              borderRadius: "20px",
              border: "none",
            }}
          >
            Create New Item
          </button>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "10px 15px",
              background: "linear-gradient(135deg,rgb(145, 87, 204), #38a3a5)",
              color: "white",
              borderRadius: "20px",
              border: "none",
            }}
          >
            Sign In
          </button>
        </Link>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "10px 15px",
              background: "linear-gradient(135deg,rgb(145, 87, 204), #38a3a5)",
              color: "white",
              borderRadius: "20px",
              border: "none",
            }}
            title="Go to Profile"
          >Profile
            </button>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "10px 15px",
              background: "linear-gradient(135deg,rgb(145, 87, 204), #38a3a5)",
              color: "white",
              borderRadius: "20px",
              border: "none",
            }}
            title="Home"
          >Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Toolbar;
