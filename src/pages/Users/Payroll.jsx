import React, { useState } from "react";

const Payroll = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [payrollList, setPayrollList] = useState([]);

  const handleGeneratePayroll = async (e) => {
    e.preventDefault();
    if (!month || !year) {
      alert("Please select month and year");
      return;
    }

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/employer/payroll/generate?month=${month}&year=${year}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to generate payroll");

      const data = await res.json();
      console.log(data);
      if (data?.payroll) {
        setPayrollList((prev) => [...prev, data.payroll]); // Add to table
      }
    } catch (err) {
      console.error(err);
      alert("Error generating payroll");
    }
  };

  return (
  <div className="p-6 bg-gray-50 min-h-screen">
  {/* Payroll Generation Form */}
  <form
    onSubmit={handleGeneratePayroll}
    className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6"
  >
    {/* Month */}
    <select
      value={month}
      onChange={(e) => setMonth(e.target.value)}
      className="border px-3 py-2 rounded w-full sm:w-auto"
    >
      <option value="">Select Month</option>
      {Array.from({ length: 12 }, (_, i) => {
        const m = String(i + 1).padStart(2, "0");
        return (
          <option key={m} value={m}>
            {m}
          </option>
        );
      })}
    </select>

    {/* Year */}
    <select
      value={year}
      onChange={(e) => setYear(e.target.value)}
      className="border px-3 py-2 rounded w-full sm:w-auto"
    >
      <option value="">Select Year</option>
      {Array.from({ length: 5 }, (_, i) => {
        const y = new Date().getFullYear() - 2 + i;
        return (
          <option key={y} value={y}>
            {y}
          </option>
        );
      })}
    </select>

    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
    >
      Generate Payroll
    </button>
  </form>

  {/* Payroll List Table */}
  <div className="bg-white shadow rounded overflow-x-auto">
    <table className="min-w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="px-4 py-2 border">Sl</th>
          <th className="px-4 py-2 border">Month / Year</th>
          {/* <th className="px-4 py-2 border">Base Salary</th> */}
          {/* <th className="px-4 py-2 border">Bonus</th> */}
          {/* <th className="px-4 py-2 border">Deductions</th> */}
          {/* <th className="px-4 py-2 border">Net Salary</th> */}
          <th className="px-4 py-2 border">Present Days</th>
          <th className="px-4 py-2 border">Paid Leaves</th>
          <th className="px-4 py-2 border">Unpaid Leaves</th>
          <th className="px-4 py-2 border">Absent</th>
          <th className="px-4 py-2 border">Working Days</th> 
          {/* <th className="px-4 py-2 border">Currency</th> */}
          <th className="px-4 py-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {payrollList.length > 0 ? (
          payrollList.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">
                {item.monthName?.toUpperCase() || item.month} / {item.year}
              </td>
               {/* <td className="px-4 py-2 border">{item.baseSalary}</td> */}
              {/* <td className="px-4 py-2 border">{item.bonus}</td> */}
              {/* <td className="px-4 py-2 border">{item.deductions}</td> */}
              {/* <td className="px-4 py-2 border">{item.netSalary}</td> */}
              <td className="px-4 py-2 border">{item.presentDays}</td>
              <td className="px-4 py-2 border">{item.paidLeaves}</td>
              <td className="px-4 py-2 border">{item.unpaidLeaves}</td>
              <td className="px-4 py-2 border">{item.absent}</td>
              <td className="px-4 py-2 border">{item.workingDays}</td> 
              {/* <td className="px-4 py-2 border">{item.currency}</td> */}
              <td className="px-4 py-2 border">
                <button
                  onClick={() => window.open(item.downloadUrl, "_blank")}
                  className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 w-full sm:w-auto"
                >
                  Download
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="13"
              className="text-center px-4 py-6 text-gray-500"
            >
              No payroll records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default Payroll;
