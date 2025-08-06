import { useEffect, useState } from "react";
import moment from "moment";

import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
function EmployeeAttendance() {
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [isLate, setIsLate] = useState(false);
  const [lateReason, setLateReason] = useState("");
  const [clockInTime, setClockInTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clockInData, setClockInData] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAttendance = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/employer/attendence`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setAttendanceData(data?.data || []);
      } else {
        console.error("Failed to fetch attendance data:", data.message);
        alert("Failed to fetch attendance data: " + data.message);
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      alert("Error fetching attendance data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAttendance();
    try {
      const storedClockIn = localStorage.getItem("clockInTime");

      if (storedClockIn) {
        const storedDate = new Date(storedClockIn);
        const today = new Date();

        if (
          storedDate.getDate() === today.getDate() &&
          storedDate.getMonth() === today.getMonth() &&
          storedDate.getFullYear() === today.getFullYear()
        ) {
          setHasClockedIn(true);
          console.log("user has already clocked in ");
          setClockInTime(storedDate);
        } else {
          localStorage.removeItem("clockInTime");
        }
      }
    } catch (error) {
      console.error("Error reading localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClockIn = async () => {
    const current = new Date();
    const nineAM = new Date();
    nineAM.setHours(9, 0, 0, 0);

    if (current > nineAM && !lateReason.trim()) {
      setIsLate(true);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/employer/attendence/check-in`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: new Date(),
            check_in_time: current,
            is_late: current > nineAM,
            is_late_reason: lateReason,
          }),
        }
      );

      const data = await res.json();
      console.log(data?.data);
      setClockInData(data?.data);
      // console.log(clockInData)
      if (res.ok) {
        setHasClockedIn(true);
        setClockInTime(current);
        setIsLate(false);
        setLateReason("");
        localStorage.setItem("clockInTime", current.toISOString());
        alert("Clock-in successful");
      } else {
        alert("Clock-in failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error while clocking in");
    }
  };

  const handleClockOut = async () => {
    const current = new Date();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/employer/attendence/check-out`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: new Date(),
            check_out_time: current,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setHasClockedIn(false);
        setClockInTime(null);
        localStorage.removeItem("clockInTime");
        alert("Clock-out successful");
      } else {
        alert("Clock-out failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error while clocking out");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner
  }

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

  if (attendanceData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No attendance records found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto  min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white  overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Attendance Management
            </h2>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              ACTIVE
            </span>
          </div>

          <div className="p-6">
            {!hasClockedIn ? (
              <div className="text-center">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
                  onClick={handleClockIn}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Clock In</span>
                  </div>
                </button>

                {isLate && (
                  <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3 flex flex-col justify-center w-full">
                        <h3 className="text-sm font-medium text-yellow-800">
                          You're running late today
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>Please provide a reason for your late arrival</p>
                        </div>
                        <div className="mt-4 ">
                          <div className="mt-1">
                            <textarea
                              rows={3}
                              value={lateReason}
                              onChange={(e) => setLateReason(e.target.value)}
                              className="shadow-sm p-4 outline-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="Enter reason for being late..."
                            />
                          </div>
                          <button
                            onClick={handleClockIn}
                            className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Submit & Clock In
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Today's Attendance Record
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Status
                        </h4>
                        <p className="mt-1 text-sm text-gray-900 font-medium">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              clockInData?.status === "Present"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {clockInData?.status}
                          </span>
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Clock In Time
                        </h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {clockInData?.check_in_time
                            ? new Date(
                                clockInData.check_in_time
                              ).toLocaleString()
                            : "--"}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Clock Out Time
                        </h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {clockInData?.check_out_time
                            ? new Date(
                                clockInData.check_out_time
                              ).toLocaleString()
                            : "--"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Work Hours
                        </h4>
                        <p className="mt-1 text-sm text-gray-900 font-medium">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {clockInData?.work_hours || 0} hrs
                          </span>
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Late Arrival
                        </h4>
                        <p className="mt-1 text-sm text-gray-900">
                          {clockInData?.is_late ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              No
                            </span>
                          )}
                        </p>
                      </div>

                      {clockInData?.is_late_reason && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Late Reason
                          </h4>
                          <p className="mt-1 text-sm text-gray-900 italic">
                            "{clockInData?.is_late_reason}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                    onClick={handleClockOut}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 100-2H9V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Clock Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaClock className="mr-2 text-blue-500" />
              Attendance History
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Clock In
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Clock Out
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Work Hours
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
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
                      <div className="flex flex-col">
                        <span>
                          {moment(record.check_in_time).format("hh:mm A")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span>
                          {record.check_out_time ? moment(record.check_in_time).format("hh:mm A") : "--"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.work_hours
                        ? `${record.work_hours.toFixed(2)} hrs`
                        : "--"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {record.is_late_reason || "--"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAttendance;
