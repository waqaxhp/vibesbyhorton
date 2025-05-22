

import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-950 text-white">
      {/* Sidebar */}
      <div className="w-64 hidden md:block fixed top-0 left-0 h-full border-r border-gray-800 z-20">
        <Sidebar />
      </div>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col md:pl-64 w-full h-full">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 md:left-64 right-0 z-10">
          <Header />
        </div>

        {/* Scrollable Page Content */}
        <main className="mt-20 p-4 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
