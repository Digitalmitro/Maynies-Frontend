import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Users/Sidebar";
import { FaBars } from "react-icons/fa";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#EDECEC] relative">
 
      <div className="hidden md:block fixed h-full w-[20%] z-10">
        <Sidebar onItemClick={() => setSidebarOpen(false)} />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className={`fixed top-0 left-0 h-full w-[75%] max-w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar onItemClick={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 md:ml-[20%] w-full p-4 md:p-6">

        <button className="md:hidden mb-4 text-xl" onClick={() => setSidebarOpen(true)}>
          <FaBars />
        </button>

        <div className="bg-white rounded-xl p-6 min-h-[calc(100vh-48px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
