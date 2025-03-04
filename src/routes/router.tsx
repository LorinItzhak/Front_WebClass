import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Pages/Home/HomePage";
import RegisterForm from "../Components/RegisterForm";
import Login from "../Components/Login";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage";
import ProfilePage from "../Pages/ProfilePage";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/forgot-password",
        element:<ForgotPasswordPage/>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      
    ],
  },
  
  
]);