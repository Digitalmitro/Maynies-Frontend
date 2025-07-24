import { useEffect, useState } from "react";

const LeaveRequestForm = () => {
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [requests, setRequests] = useState([]);
  const [leaveData, setLeaveData] = useState({
    type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const handleChange = (field, value) => {
    setLeaveData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLeaveRequest = async () => {
    const { start_date, end_date, reason } = leaveData;

    if (!start_date || !end_date || !reason) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/employer/leave/request`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leaveData),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Leave request submitted successfully!");
        setLeaveData({
          type: "",
          start_date: "",
          end_date: "",
          reason: "",
        });
      } else {
        alert("Leave request failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Failed to submit leave request.");
    }
  };
  useEffect(() => {
    const fetchLeaveBalance = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/employer/leave/balance`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch leave balance");
        const data = await res.json();
        console.log(data?.data);
        setLeaveBalance(data?.data);
      } catch (error) {
        console.error("Error fetching leave balance:", error);
      }
    };
    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/employer/leave/request`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch leave requests");
        const data = await res.json();
        setRequests(data?.data || []);
        console.log("request", data?.data);
      } catch (err) {
        console.error("Error fetching leave requests:", err);
      }
    };

    fetchRequests();
    fetchLeaveBalance();
  }, []);

  return (
    <div className=" mx-auto bg-white py-8 px-2">
      {/* Leave Balance Section */}
      <div className="mb-8 max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 ">
          Leave Balance {leaveBalance?.year && `(${leaveBalance.year})`}
        </h2>

        {leaveBalance ? (
          <div className="grid md:grid-cols-3 gap-3">
            {["vacation", "sick", "casual"].map((type) => (
              <div
                key={type}
                className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center hover:shadow-sm transition-shadow"
              >
                <p className="capitalize text-sm font-medium text-gray-600 mb-1">
                  {type}
                </p>
                <p className="text-xl font-bold text-orange-600">
                  {leaveBalance[type]?.balance}
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    days
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-6">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Leave Request Form */}
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Leave Request Form
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Leave Type
            </label>
            <select
              value={leaveData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            >
              <option disabled value="Other">
                Select leave type
              </option>
              <option value="Vacation">Vacation</option>
              <option value="Sick">Sick Leave</option>
              <option value="Casual">Casual Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={leaveData.start_date}
                onChange={(e) => handleChange("start_date", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={leaveData.end_date}
                onChange={(e) => handleChange("end_date", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <textarea
              value={leaveData.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              placeholder="Briefly explain your reason for leave..."
            />
          </div>

          <button
            onClick={handleLeaveRequest}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Submit Leave Request
          </button>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-8 bg-white p-4">
        <h2 className="text-lg text-center font-bold mb-6">Leave Requests</h2>

        {requests?.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="w-full sm:w-[48%] lg:w-[31%] border border-gray-200 rounded-lg p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    {new Date(req.start_date).toLocaleDateString()} →{" "}
                    {new Date(req.end_date).toLocaleDateString()}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      req.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : req.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                <p className="text-sm text-gray-800 mb-1">
                  <strong>Type:</strong> {req.type}
                </p>

                <p className="text-sm text-gray-800 mb-1">
                  <strong>Total Days:</strong> {req.total_days}
                </p>

                <p className="text-sm text-gray-700">
                  <strong>Reason:</strong> {req.reason}
                </p>

                <p className="text-xs text-gray-400 text-right mt-2">
                  Requested on:{" "}
                  {new Date(req.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500 py-8">
            No leave requests found.
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestForm;
