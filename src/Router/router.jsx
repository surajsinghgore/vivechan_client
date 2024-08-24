import { createBrowserRouter, Navigate } from "react-router-dom";
import { getLocalStorage } from "../../utils/LocalStorageUtils";
import DefaultDashboardLayout from "../Layout/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Login from "../page/Login";
import Signup from "../page/Singup";
import ChatWindow from "../components/ChatWindow";
import RootFunction from "./RootFunction";

const LoginProtected = ({ children }) => {
  const token = getLocalStorage("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
};

const DashboardProtected = ({ children }) => {
  const token = getLocalStorage("token");
  return token ? <DefaultDashboardLayout>{children}</DefaultDashboardLayout> : <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootFunction />,
  },
  {
    path: "/dashboard",
    element: (
      <DashboardProtected>
        <Sidebar />
        <ChatWindow />
      </DashboardProtected>
    ),
  },
  {
    path: "login",
    element: (
      <LoginProtected>
        <Login />
      </LoginProtected>
    ),
  },
  {
    path: "signup",
    element: (
      <LoginProtected>
        <Signup />
      </LoginProtected>
    ),
  },
]);
