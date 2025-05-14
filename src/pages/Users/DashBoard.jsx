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

//
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { FaBell, FaCheckCircle } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Sidebar() {
  const navigate=useNavigate();
  const navItems = [
    { label: "Links to Employee Forms", icon: <FaFileAlt /> },
    { label: "Loan Requests", icon: <FaMoneyCheckAlt /> },
    { label: "Vacation Time", icon: <FaUmbrellaBeach /> },
    { label: "Sick Time", icon: <FaFirstAid /> },
    { label: "Policies", icon: <FaBook /> },
    { label: "Payroll", icon: <FaFileInvoiceDollar /> },
    { label: "Attendance", icon: <FaUserCheck /> },
    { label: "Training", icon: <FaChalkboardTeacher /> },
    { label: "Demographics", icon: <FaUsers /> },
  ];

  //
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Payroll",
        data: [2000, 2500, 2200, 3000, 2800],
        borderColor: "#0F766E",
        backgroundColor: "#99F6E4",
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Loan",
        data: [2000, 3000, 5000],
        backgroundColor: ["#22C55E", "#FACC15", "#10B981"],
      },
    ],
  };

  const pieChartData = {
    labels: ["Present", "Absent", "Leave"],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: ["#3B82F6", "#F59E0B", "#EF4444"],
      },
    ],
  };
  //
  return (
    <div className="flex min-h-screen bg-[#EDECEC]">
      <div className="w-[20%] min-h-screen  flex flex-col items-center py-6 bg-white">
        <img src={logo} alt="Logo" className="w-[100px] mb-8" onClick={()=>navigate("/")}/>

        <ul className="space-y-6 w-full px-4">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center  px-4 py-2 hover:text-white rounded gap-3 text-gray-700 hover:bg-green-600 transition-all cursor-pointer"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-[80%] min-h-screen bg-white rounded-xl p-6  m-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Hello, Employee Name!</h2>
            <p className="text-gray-500">Designation</p>
          </div>
          <FaBell className="text-orange-400 text-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Leave Status */}
          <div className=" p-4 rounded-md shadow-sm bg-[#EDECEC]">
            <h3 className="font-semibold">Employee's on Leave</h3>
            <ul className="text-sm text-gray-600 space-y-1 mt-2">
              <li>PL - Privilege Leave</li>
              <li>SL - Sick Leave</li>
              <li>CL - Casual Leave</li>
              <li>ML - Maternity Leave</li>
            </ul>

            <div className="flex justify-between mt-4 text-sm">
              <div>PL</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mx-2 mt-1">
                <div className="bg-yellow-400 h-2 rounded-full w-2/3"></div>
              </div>
              <div>8/12</div>
            </div>

            <div className="flex justify-between mt-2 text-sm">
              <div>CL</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mx-2 mt-1">
                <div className="bg-green-400 h-2 rounded-full w-1/4"></div>
              </div>
              <div>2/12</div>
            </div>

            <div className="flex justify-between mt-2 text-sm">
              <div>SL</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mx-2 mt-1">
                <div className="bg-green-400 h-2 rounded-full w-1/2"></div>
              </div>
              <div>5/12</div>
            </div>

            <div className="flex justify-between mt-2 text-sm">
              <div>ML</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mx-2 mt-1"></div>
            </div>
          </div>

          {/* Payroll */}
          <div className=" p-4 rounded-md shadow-sm bg-[#EDECEC]">
            <h3 className="font-semibold">Payroll</h3>
            <p className="text-sm text-gray-500 mb-2">Next Payday: March 6</p>
            <Line data={lineChartData} />
            <p className="text-xs text-gray-400 mt-2">
              Average overtime cost: $6,584
            </p>
          </div>

          {/* Loan Status */}
          <div className=" p-4 rounded-md shadow-sm bg-[#EDECEC]">
            <h3 className="font-semibold">Loan Status</h3>
            <p className="text-sm text-gray-500 mb-2">Approved - $5,000</p>
            <Bar
              data={barChartData}
              options={{
                responsive: false,
                maintainAspectRatio: false,
              }}
              width={400}
              height={300}
            />
          </div>

          {/* Attendance Overview */}
          <div className=" p-4 rounded-md shadow-sm bg-[#EDECEC]">
            <h3 className="font-semibold">Attendance Overview</h3>
            <p className="text-sm text-gray-500 mb-2">Approved - $5,000</p>
            <div className="flex flex-col items-center">
              <Doughnut
                data={pieChartData}
                options={{
                  responsive: false,
                  maintainAspectRatio: false,
                }}
                width={300}
                height={280}
              />
              <p className="text-sm mt-2">
                Attendees: 65 | Attendance: 632 | Session: 96
              </p>
            </div>
          </div>

          {/* Employee Process */}
          {/* <div className=" p-4 rounded-md shadow-sm col-span-1 md:col-span-2 bg-[#EDECEC]">
            <h3 className="font-semibold">Employee</h3>
            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="flex items-center gap-1 text-orange-500">
                <FaCheckCircle /> Pending
              </div>
              <div className="flex items-center gap-1 text-orange-500">
                <FaCheckCircle /> Process
              </div>
              <div className="flex items-center gap-1 text-orange-500">
                <FaCheckCircle /> Approve
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm">
              <div>Vacation</div>
              <div className="flex items-center gap-1 text-orange-500">
                <FaCheckCircle /> Pending
              </div>
              <div className="flex items-center gap-1 text-orange-500">
                <FaCheckCircle /> Process
              </div>
              <div className="flex items-center gap-1 text-orange-500">
                <FaCheckCircle /> Approve
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
