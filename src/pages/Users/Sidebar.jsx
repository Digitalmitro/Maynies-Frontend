import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

import {
  FaFileAlt,
  FaMoneyCheckAlt,
  FaUmbrellaBeach,
  FaFirstAid,
  FaBook,
  FaFileInvoiceDollar,
  FaUserCheck,
  FaChalkboardTeacher,
  FaUsers,
} from "react-icons/fa";
function Sidebar() {
  const navigate=useNavigate();
  const navItems = [
    { label: "Links to Employee Forms", icon: <FaFileAlt /> , path:"/dashboard/profile" },
    { label: "Loan Requests", icon: <FaMoneyCheckAlt /> , path:"/dashboard/kycFrom"},
    { label: "Vacation Time", icon: <FaUmbrellaBeach /> ,path:"/dashboard/vacation" },
    { label: "Sick Time", icon: <FaFirstAid /> },
    { label: "Policies", icon: <FaBook /> ,path:"/dashboard/privacy"},
    { label: "Payroll", icon: <FaFileInvoiceDollar /> ,path:"/dashboard/payroll"},
    { label: "Attendance", icon: <FaUserCheck /> },
    { label: "Training", icon: <FaChalkboardTeacher /> },
    { label: "Demographics", icon: <FaUsers /> },
  ];

  const handleClick = (path) => {
    navigate(path);
    onItemClick?.(); // Close sidebar on mobile after clicking
  };
  return (
    <div className="h-full flex flex-col items-center py-2 bg-white">
      <img
        src={logo}
        alt="Logo"
        className="w-[80px] mb-4"
        onClick={() => navigate("/dashboard")}
      />

      <ul className="space-y-6 w-full px-4">
        {navItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center px-4 py-2 hover:text-white rounded gap-3 text-gray-700 hover:bg-green-600 transition-all cursor-pointer"
            onClick={() => handleClick(item.path)}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar