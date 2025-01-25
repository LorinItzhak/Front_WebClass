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
       
        <span>Clothing Store</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link to="/create-item" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "10px 15px",
              background: "linear-gradient(135deg, #ff7eb3, #ff758c)",
              color: "white",
              borderRadius: "20px",
              border: "none",
            }}
          >
            Create New Item
          </button>
        </Link>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#f0f0f0",
              cursor: "pointer",
            }}
            title="Go to Profile"
          />
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#f0f0f0",
              cursor: "pointer",
            }}
            title="Home"
          />
        </Link>
      </div>
    </div>
  );
};

export default Toolbar;
