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

function DashBoard() {
  const name=localStorage.getItem("name") || "User";
  const role=localStorage.getItem("role") || "";
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
        backgroundColor: "#00953B", // one color per dataset
      },
      {
        label: "Salary",
        data: [2500, 2800, 4700],
        backgroundColor: "#FE9900",
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
    <div className="p-1 md:p-6">
  <div className="min-h-screen bg-white rounded-xl md:p-4 space-y-6">
    {/* Header */}
    <div className="flex justify-between items-center flex-wrap gap-2">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold">Hello, {name}</h2>
        <p className="text-gray-500 text-sm md:text-base capitalize">{role}</p>
      </div>
    </div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Leave Status */}
      <div className="p-4 rounded-md shadow-sm bg-[#EDECEC]">
        <h3 className="font-semibold">Employee's on Leave</h3>
        <ul className="text-sm text-gray-600 space-y-1 mt-2">
          <li>PL - Privilege Leave</li>
          <li>SL - Sick Leave</li>
          <li>CL - Casual Leave</li>
          <li>ML - Maternity Leave</li>
        </ul>

        {[
          { label: 'PL', value: '8/12', width: 'w-2/3', color: 'bg-yellow-400' },
          { label: 'CL', value: '2/12', width: 'w-1/4', color: 'bg-green-400' },
          { label: 'SL', value: '5/12', width: 'w-1/2', color: 'bg-green-400' },
        ].map((item, idx) => (
          <div className="flex justify-between mt-2 text-sm items-center" key={idx}>
            <div className="min-w-[30px]">{item.label}</div>
            <div className="flex-1 mx-2">
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className={`${item.color} h-2 rounded-full ${item.width}`}></div>
              </div>
            </div>
            <div className="min-w-[40px] text-right">{item.value}</div>
          </div>
        ))}

        {/* ML line */}
        <div className="flex justify-between mt-2 text-sm items-center">
          <div className="min-w-[30px]">ML</div>
          <div className="flex-1 mx-2">
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1"></div>
          </div>
          <div className="min-w-[40px] text-right">-</div>
        </div>
      </div>

      {/* Payroll */}
      <div className="p-4 rounded-md shadow-sm bg-[#EDECEC]">
        <h3 className="font-semibold">Payroll</h3>
        <p className="text-sm text-gray-500 mb-2">Next Payday: March 6</p>
        <div className="w-full aspect-[4/3]">
          <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <p className="text-xs text-gray-400 mt-2">Average overtime cost: $6,584</p>
      </div>

      {/* Loan Status */}
      <div className="p-4 rounded-md shadow-sm bg-[#EDECEC]">
        <h3 className="font-semibold">Loan Status</h3>
        <p className="text-sm text-gray-500 mb-2">Approved - $5,000</p>
        <div className="w-full aspect-[4/3]">
          <Bar
            data={barChartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>

      {/* Attendance */}
      <div className="p-4 rounded-md shadow-sm bg-[#EDECEC]">
        <h3 className="font-semibold">Attendance Overview</h3>
        <div className="w-full aspect-[4/3] flex justify-center">
          <Doughnut
            data={pieChartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <p className="text-sm mt-2 text-center">
          Attendees: 65 | Attendance: 632 | Session: 96
        </p>
      </div>

      {/* Process Section */}
      <div className="p-4 space-y-4 rounded-md shadow-sm col-span-1 md:col-span-2 bg-[#EDECEC]">
        {/* Vacation */}
        <div>
          <h4 className="text-sm font-medium mb-2">Vacation</h4>
          <div className="relative w-full">
            <input
              type="range"
              min={500}
              max={50000}
              defaultValue={25000}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-evenly absolute top-full left-0 w-full mt-1">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="w-px h-3 bg-gray-400"></div>
              ))}
            </div>
            <div className="flex justify-evenly mt-2 text-xs text-gray-600">
              <span>Pending</span>
              <span>Process</span>
              <span>Approve</span>
            </div>
          </div>
        </div>

        {/* Employee Progress */}
        <div>
          <h4 className="text-sm font-medium mb-2">Employee</h4>
          <div className="relative w-full">
            <input
              type="range"
              min={500}
              max={50000}
              defaultValue={25000}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-evenly absolute top-full left-0 w-full mt-1">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="w-px h-3 bg-gray-400"></div>
              ))}
            </div>
            <div className="flex justify-evenly mt-2 text-xs text-gray-600">
              <span>₹500</span>
              <span>₹25,000</span>
              <span>₹50,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default DashBoard;
