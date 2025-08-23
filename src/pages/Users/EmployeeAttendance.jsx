import { useState, useEffect, useCallback } from "react";
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaClock } from "react-icons/fa";
import moment from "moment";

function EmployeeAttendance() {
  const [attendanceStatus, setAttendanceStatus] = useState(false);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [lateReason, setLateReason] = useState("");
  const [showLateReason, setShowLateReason] = useState(false);

  // Fetch today's attendance
  const fetchTodayAttendance = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/employer/attendence/today`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setTodayAttendance(data);
      } else {
        setTodayAttendance(null);
      }
    } catch (err) {
      console.error("Error fetching today attendance:", err);
      setTodayAttendance(null);
    }
  }, []);

  // Get employee attendance status
  const getEmployeeAttendanceStatus = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/employer/attendence/status`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setAttendanceStatus(data?.isCheckedIn || false);
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  }, []);

  // Fetch attendance history
  const fetchAttendances = useCallback(async () => {
    try {
      setLoading(true);
      let url = `${import.meta.env.VITE_BACKEND_API}/api/employer/attendence/monthly`;
      const params = new URLSearchParams();
      
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setAttendanceData(data);
      } else {
        setAttendanceData([]);
      }
    } catch (err) {
      console.error("Error fetching monthly attendance:", err);
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  // Handle clock in/out
  const handleAttendance = async (isCheckIn = true) => {
    try {
      setButtonLoading(true);
      const endpoint = isCheckIn ? "check-in" : "check-out";
      const body = showLateReason ? JSON.stringify({ lateReason }) : undefined;
      
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/employer/attendence/${endpoint}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body,
        }
      );

      if (res.ok) {
        setAttendanceStatus(isCheckIn);
        setShowLateReason(false);
        setLateReason("");
        // Refresh data
        await Promise.all([getEmployeeAttendanceStatus(), fetchTodayAttendance(), fetchAttendances()]);
      } else {
        const errData = await res.json();
        console.error("Attendance Error:", errData.message);
        alert(errData.message || "Error processing attendance");
      }
    } catch (err) {
      console.error("Attendance fetch error:", err);
      alert("Network error occurred");
    } finally {
      setButtonLoading(false);
    }
  };

  // Check if user is late (after 9:30 AM)
  const checkIfLate = () => {
    const now = new Date();
    const lateTime = new Date();
    lateTime.setHours(9, 30, 0, 0); // 9:30 AM
    return now > lateTime;
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        getEmployeeAttendanceStatus(),
        fetchTodayAttendance(),
        fetchAttendances()
      ]);
      setLoading(false);
    };
    
    loadData();
  }, [getEmployeeAttendanceStatus, fetchTodayAttendance, fetchAttendances]);

  const renderStatus = (status, isLate) => {
    return (
      <div className="flex items-center">
        {status === "Present" ? (
          <FaCheckCircle className="text-green-500 mr-2" />
        ) : (
          <FaTimesCircle className="text-red-500 mr-2" />
        )}
        <span>{status}</span>
        {isLate && <FaExclamationTriangle className="text-yellow-500 ml-2" />}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Attendance Management
            </h2>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              ACTIVE
            </span>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              {!attendanceStatus ? (
                <div className="text-center space-y-4">
                  {checkIfLate() && !showLateReason && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            You're running late today. Please provide a reason.
                          </p>
                          <button
                            onClick={() => setShowLateReason(true)}
                            className="mt-2 text-sm font-medium text-yellow-800 hover:text-yellow-900"
                          >
                            Add Reason →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {showLateReason ? (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg w-full max-w-md">
                      <h3 className="text-sm font-medium text-yellow-800 mb-2">
                        Reason for being late
                      </h3>
                      <textarea
                        rows={3}
                        value={lateReason}
                        onChange={(e) => setLateReason(e.target.value)}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                        placeholder="Enter reason for being late..."
                      />
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={() => handleAttendance(true)}
                          disabled={buttonLoading}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                          {buttonLoading ? "Processing..." : "Submit & Clock In"}
                        </button>
                        <button
                          onClick={() => setShowLateReason(false)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAttendance(true)}
                      disabled={buttonLoading}
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                    >
                      {buttonLoading ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <FaClock className="inline mr-2" />
                          <span>Clock In</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg max-w-md">
                    <p className="text-green-700">You are clocked in</p>
                    <p className="text-sm text-green-600 mt-1">
                      {todayAttendance?.sessions?.[todayAttendance.sessions.length - 1]?.check_in_time 
                        ? `Clocked in at ${moment(todayAttendance.sessions[todayAttendance.sessions.length - 1].check_in_time).format("h:mm A")}`
                        : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAttendance(false)}
                    disabled={buttonLoading}
                    className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 disabled:opacity-50 flex items-center space-x-2"
                  >
                    {buttonLoading ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <FaClock className="inline mr-2" />
                        <span>Clock Out</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Today's Attendance */}
        {todayAttendance && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Today's Attendance Details
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">
                    {moment(todayAttendance.date).format("MMMM D, YYYY")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Work Hours</p>
                  <p className="font-medium">
                    {todayAttendance.total_work_hours?.toFixed(2) || "0.00"} hrs
                  </p>
                </div>
              </div>

              {todayAttendance.sessions && todayAttendance.sessions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Check-In
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Check-Out
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Work Hours
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Late
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Manual Entry
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {todayAttendance.sessions.map((session, index) => {
                        const isOngoing = !session.check_out_time;
                        return (
                          <tr key={session._id} className={isOngoing ? "bg-yellow-50" : ""}>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                              {index + 1}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {moment(session.check_in_time).format("h:mm A")}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {isOngoing
                                ? "Ongoing"
                                : moment(session.check_out_time).format("h:mm A")}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                              {session.work_hours?.toFixed(2) || "0.00"}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                              {session.is_late ? "Yes" : "No"}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                              {session.is_manual_entry ? "Yes" : "No"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">No attendance sessions today</p>
              )}
            </div>
          </div>
        )}

        {/* Attendance History */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaClock className="mr-2 text-blue-500" />
              Attendance History
            </h2>
            
            {/* Date Filter */}
            <div className="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="self-end">
                <button
                  onClick={fetchAttendances}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {attendanceData.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clock In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clock Out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Work Hours
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Late Reason
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceData.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {moment(record.date).format("DD MMM YYYY")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {renderStatus(record.status, record.is_late)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.first_check_in
                          ? moment(record.first_check_in).format("hh:mm A")
                          : "--"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.last_check_out
                          ? moment(record.last_check_out).format("hh:mm A")
                          : "--"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.total_work_hours
                          ? `${record.total_work_hours.toFixed(2)} hrs`
                          : "--"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {record.is_late_reason || "--"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No attendance records found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAttendance;