import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const months = [
  { month: "Feb 2025" },
  { month: "Jan 2025" },
  { month: "Dec 2024" },
  { month: "Nov 2024" },
  { month: "Oct 2024" },
  { month: "Sept 2024" },
  { month: "Aug 2024" },
  { month: "Jul 2024" },
];

const completedMonths = [
  { label: "Apr 2024", range: "MAR 26 - APR 25" },
  { label: "May 2024", range: "APR 26 - MAY 25" },
  { label: "Jun 2024", range: "MAY 26 - JUN 25" },
  { label: "Jul 2024", range: "JUN 26 - JUL 25" },
];

const Payroll = () => {
    const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-white flex justify-center items-start p-4 md:p-10 relative">
      <div className="w-full max-w-4xl bg-white  rounded-lg p-6">
        {/* Bell Icon */}
        <div className="absolute top-4 right-4 text-orange-500">
          <FaBell />
        </div>

        {/* Heading */}
        <h2 className="text-center text-lg font-semibold mb-6">Payroll</h2>

        {/* Completed Months */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {completedMonths.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-lg border px-4 py-2 text-center w-36 shadow-sm ${
                item.selected
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200"
              }`}
            >
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-xs text-gray-500">{item.range}</p>
              <p
                className={`text-xs font-medium mt-1 ${
                  item.selected ? "text-orange-500" : "text-green-600"
                }`}
              >
                ● Completed
              </p>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mb-6">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600">
            View More
          </button>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 bg-gray-100 text-sm font-semibold text-gray-700 p-3">
            <div>Month</div>
            <div>Action</div>
          </div>
          {months.map((item, idx) => (
            <div
              key={idx}
              className="group grid grid-cols-2 text-sm p-3 items-center 
               bg-gray-100 border-t hover:bg-orange-50 hover:border-orange-300"
            >
              <div>{item.month}</div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded-md text-xs border 
                   bg-gray-200 text-gray-400 
                   group-hover:bg-white group-hover:border-green-500 group-hover:text-green-500 cursor-pointer"
                   onClick={()=>navigate("/dashboard/viewPayroll")}
                >
                  View
                </button>
                <button
                  className="px-3 py-1 rounded-md text-xs border 
                   bg-gray-200 text-gray-400 
                   group-hover:bg-white group-hover:border-green-500 group-hover:text-green-500"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 text-sm gap-2 items-center">
          <button className="px-2 py-1 border rounded hover:bg-gray-200">
            &lt;
          </button>
          {Array.from({ length: 12 }, (_, i) => (
            <button
              key={i}
              className={`px-2 py-1 rounded ${
                i === 10 ? "bg-orange-500 text-white" : "hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button className="px-2 py-1 border rounded hover:bg-gray-200">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
