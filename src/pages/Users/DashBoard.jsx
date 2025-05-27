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
    <div className="">
      <div className=" min-h-screen bg-white rounded-xl p-6  m-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Hello, Employee Name!</h2>
            <p className="text-gray-500">Designation</p>
          </div>
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
          <div className="p-4 space-y-2 rounded-md shadow-sm col-span-1 md:col-span-2 bg-[#EDECEC]">
            {/* Vacation Section */}
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Vacation</h4>
              <div className="flex items-center justify-evenly w-full text-sm relative">
                {/* Gray background line */}
                <div className="absolute w-full bg-gray-200 rounded-full h-2"></div>

                {/* Status indicators positioned on top of the line */}
                <div className="w-full  mt-10">
                {/* Range Input */}
                <div className="relative w-full ">
                  <input
                    type="range"
                    min={500}
                    max={50000}
                    defaultValue={25000}
                    className="w-full accent-orange-500"
                  />

                  {/* Tick Marks */}
                  <div className="flex justify-evenly absolute top-full left-0 w-full mt-1">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="w-px h-3 bg-gray-400"></div>
                    ))}
                  </div>

                  {/* Labels */}
                  <div className="flex justify-evenly mt-1 text-xs text-gray-600">
                    <span>Pending</span>
                    <span>Process</span>
                    <span>Approve</span>
                  </div>
                </div>
              </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Employee</h4>
              <div className="w-full  mt-10">
                {/* Range Input */}
                <div className="relative w-full ">
                  <input
                    type="range"
                    min={500}
                    max={50000}
                    defaultValue={25000}
                    className="w-full accent-orange-500"
                  />

                  {/* Tick Marks */}
                  <div className="flex justify-evenly absolute top-full left-0 w-full mt-1">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="w-px h-3 bg-gray-400"></div>
                    ))}
                  </div>

                  {/* Labels */}
                  <div className="flex justify-evenly mt-1 text-xs text-gray-600">
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
    </div>
  );
}

export default DashBoard;
