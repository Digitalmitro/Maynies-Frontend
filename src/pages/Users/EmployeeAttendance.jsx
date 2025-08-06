import { useEffect, useState } from "react";

function EmployeeAttendance() {
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [isLate, setIsLate] = useState(false);
  const [lateReason, setLateReason] = useState("");
  const [clockInTime, setClockInTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    try {
      const storedClockIn = localStorage.getItem("clockInTime");
      console.log("debug 1",storedClockIn)
      if (storedClockIn) {
        const storedDate = new Date(storedClockIn);
        const today = new Date();

        if (
          storedDate.getDate() === today.getDate() &&
          storedDate.getMonth() === today.getMonth() &&
          storedDate.getFullYear() === today.getFullYear()
        ) {
          setHasClockedIn(true);
          console.log("user has already clocked in ")
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

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg border border-gray-300 mt-8">
      {!hasClockedIn ? (
        <>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleClockIn}
          >
            Clock In
          </button>
          {isLate && (
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium">
                Reason for being late:
              </label>
              <input
                type="text"
                value={lateReason}
                onChange={(e) => setLateReason(e.target.value)}
                className="border px-3 py-2 w-full rounded"
                placeholder="Enter reason"
              />
              <button
                onClick={handleClockIn}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit & Clock In
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          <p className="mb-4">
            Clocked in at:{" "}
            <span className="font-semibold">
              {clockInTime?.toLocaleTimeString()}
            </span>
          </p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleClockOut}
          >
            Clock Out
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeAttendance;