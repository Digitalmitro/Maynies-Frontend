
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Users/Sidebar";


function DashboardLayout() {
    return (
      <div className="flex min-h-screen bg-[#EDECEC]">
        {/* Fixed sidebar */}
        <div className="fixed h-full w-[20%]">
          <Sidebar />
        </div>
        
        {/* Scrollable main content */}
        <div className="ml-[20%] w-[80%] p-6">
          <div className="bg-white rounded-xl p-6 min-h-[calc(100vh-48px)]">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

export default DashboardLayout;
