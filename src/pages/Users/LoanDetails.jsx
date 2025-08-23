import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function LoanDetails() {
  const { state } = useLocation();
  const Id = state?.loanList?.[0]?._id;

  const [repayments, setRepayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchLoanDetails = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/employer/loan/${Id}/repayments`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch loan details");

      const data = await response.json();
      console.log("Loan details:", data);
      setRepayments(data?.repayments || []);
    } catch (error) {
      console.error("Error fetching loan details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Id) fetchLoanDetails();
  }, [Id]);
  const payRepayment = async (Id, repaymentId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/employer/loan/${Id}/repayments/${repaymentId}/pay`,
        {
          method: "POST",
          credentials: "include", // send cookies/session
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        fetchLoanDetails()
        console.log("✅ Repayment successful:", data);
        // optionally refetch repayment list or show toast
      } else {
        console.warn("❌ Repayment failed:", data?.message);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Loan Repayment Details
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : repayments.length === 0 ? (
        <div className="text-center text-gray-500">No repayments found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border">Month</th>
                <th className="px-4 py-2 border">Due Date</th>
                <th className="px-4 py-2 border">Amount (₹)</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Pay</th>
                {/* <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Updated At</th> */}
              </tr>
            </thead>
            <tbody>
              {repayments.map((item, index) => {
                const dueDate = new Date(item.dueDate);
                const today = new Date();

                const isFutureMonth = dueDate > today;
                const isPaid = item.status === "paid";

                const shouldEnableButton = !isPaid && !isFutureMonth;

                return (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{item.month}</td>
                    <td className="px-4 py-2 border">
                      {dueDate.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border">₹{item.amount}</td>
                    <td className="px-4 py-2 border capitalize">
                      {item.status}
                    </td>
                    <td className="px-4 py-2 border capitalize">
                      <button
                        onClick={() =>
                          shouldEnableButton && payRepayment(Id, item._id)
                        }
                        disabled={!shouldEnableButton}
                        className={`px-4 py-1 text-sm rounded-md transition-all duration-200 ${
                          shouldEnableButton
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        Pay Now
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LoanDetails;
