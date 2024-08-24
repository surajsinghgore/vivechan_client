import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Ensure Sidebar is imported if it is part of this layout

const DefaultDashboardLayout = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Sidebar /> {/* Sidebar should be part of the layout */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultDashboardLayout;
