import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import Logo from "./Logo";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Login successful!");
    navigate("/"); // Navigate to the home page after login
  };

  const handleGoogleLogin = () => {
    alert("Google Login Clicked!");
  };
  
  const goToSignUp = () =>{
    return <RegisterForm/>
  }
  return (
    <div
      style={{
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #d0eaff, #f7d6ff, #fff4c2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
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
        
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              style={{
                width: "95%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              style={{
                width: "95%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
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
            }}
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          style={{
            marginTop: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            color: "#555",
            padding: "12px 15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "1em",
            cursor: "pointer",
            transition: "background-color 0.2s ease-in-out",
            width: "100%",
          }}
        >
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google"
            style={{ marginRight: "10px", width: "20px", height: "20px" }}
          />
          Login with Google
        </button>

        {/* Forgot Password */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <a
            href="/forgot-password"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontSize: "0.9em",
            }}
          >
            Forgot your password?
          </a>
        </div>

        {/* Sign Up Section */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "0.9em",
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={goToSignUp}
            style={{
              color: "#007bff",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Sign up here
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
