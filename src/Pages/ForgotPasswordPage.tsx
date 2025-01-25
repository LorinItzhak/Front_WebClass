import React from "react";
import Logo from "../Components/Logo";

const ForgotPasswordPage: React.FC = () => {
  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Password reset link sent!");
  };

  return (
    <div 
      style={{
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #d0eaff, #f7d6f9, #fff4c2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        color: "#333",
      }}
    >
    
      <div
        style={{
          width: "50%",
          maxWidth: "700px",
          background: "#ffffff",
          padding: "40px 30px",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
         <div style={{ marginBottom: "30px" }}>
        <Logo />
        </div>
        <h1 style={{ marginBottom: "20px", fontSize: "1.5em" }}>
          Forgot Password
        </h1>
        <form onSubmit={handleForgotPassword}>
          <div
            style={{
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
           
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              style={{
                width: "95%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1em",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1em",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
