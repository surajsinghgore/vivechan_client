import Sidebar from "../components/Sidebar"; // Ensure Sidebar is imported

const DefaultDashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DefaultDashboardLayout;
