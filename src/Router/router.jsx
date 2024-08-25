import { createBrowserRouter } from "react-router-dom";
import DefaultDashboardLayout from "../Layout/DefaultDashboardLayout";
import ChatWindow from "../components/ChatWindow";
import LoginPage from "../page/Login";
import SignupPage from "../page/SignupPage";
import LoginProtected from "../Layout/LoginProtected";
import DashboardProtected from "../Layout/DashboardProtected";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: (
      <LoginProtected>
        <LoginPage />
      </LoginProtected>
    ),
  },
  {
    path: "/signup",
    element: (
      <LoginProtected>
        <SignupPage />
      </LoginProtected>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <DashboardProtected>
        <DefaultDashboardLayout>
          <ChatWindow />
        </DefaultDashboardLayout>
      </DashboardProtected>
    ),
  },
]);
