import { Navigate, useNavigate } from "react-router-dom";
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
import NotRegistered from "../../components/Notregistered";
function Sidebar({ onItemClick }) {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  console.log("role", role);

  const employeeNavItems = [
    {
      label: "Links to Employee Forms",
      icon: <FaFileAlt />,
      path: "/dashboard/employeeForms",
    },
    {
      label: "Loan Requests",
      icon: <FaMoneyCheckAlt />,
      path: "/dashboard/kycFrom",
    },
    {
      label: "Leave Request",
      icon: <FaUmbrellaBeach />,
      path: "/dashboard/vacation",
    },
    { label: "Policies", icon: <FaBook />, path: "/dashboard/privacy" },
    {
      label: "Payroll",
      icon: <FaFileInvoiceDollar />,
      path: "/dashboard/payroll",
    },
    {
      label: "Attendance",
      icon: <FaUserCheck />,
      path: "/dashboard/attendance",
    },
    { label: "Training", icon: <FaChalkboardTeacher /> },
    { label: "Demographics", icon: <FaUsers />, path: "/dashboard/profile" },
  ];

  const studentNavItems = [
    { label: "Admission", icon: <FaFileAlt />, path: "/dashboard/admission" },
    
    {
      label: "Academic Calendar Year",
      icon: <FaFileInvoiceDollar />,
      path: "/dashboard/calender",
    },
    {
      label: "Student Progress",
      icon: <FaChalkboardTeacher />,
      path: "/dashboard/progress",
    },
    {
      label: "Student Demographics",
      icon: <FaChalkboardTeacher />,
      path: "/dashboard/studentDemographic",
    },
     {
      label: "Student Plan",
      icon: <FaChalkboardTeacher />,
      path: "/dashboard/student_plan",
    },
  ];

  // ✅ If no role is present, redirect to not registered page

  const navItems = role === "employer" ? employeeNavItems : studentNavItems;

  const handleClick = (path) => {
    if (path) navigate(path);
    onItemClick?.();
  };

  return (
    <div className="h-full flex flex-col items-center py-2 bg-white">
      <img
        src={logo}
        alt="Logo"
        className="w-[80px] mb-4 pt-2"
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
  );
}

export default Sidebar;
