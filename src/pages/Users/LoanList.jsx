import React, { useEffect, useState } from "react";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiDollarSign,
  FiCalendar,
  FiFileText,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function LoanList() {
  const [loanList, setLoanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/employer/loan`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch loans");
        const data = await response.json();
        setLoanList(data);
        console.log("Fetched loans:", data);
      } catch (error) {
        console.error("Error fetching loans:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const getStatusDetails = (status) => {
    switch (status) {
      case "approved":
        return {
          color: "bg-green-50 text-green-700",
          icon: <FiCheckCircle className="mr-1" />,
        };
      case "rejected":
        return {
          color: "bg-red-50 text-red-700",
          icon: <FiXCircle className="mr-1" />,
        };
      default:
        return {
          color: "bg-blue-50 text-blue-700",
          icon: <FiClock className="mr-1" />,
        };
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiXCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-orange-100">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FiDollarSign className="mr-2 text-orange-500" />
            My Loan Applications
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            View and manage your loan requests
          </p>
        </div>

        {loanList.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-4">
              <FiFileText className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No loan applications
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              You haven't applied for any loans yet. When you do, they'll appear
              here.
            </p>
          </div>
        ) : (
          <div
            className="divide-y divide-gray-100"
            onClick={() =>
              navigate("/dashboard/loanDetails", {
                state: { loanList },
              })
            }
          >
            {loanList.map((loan) => {
              const statusDetails = getStatusDetails(loan.status);

              return (
                <div
                  key={loan._id}
                  className="px-6 py-5 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-medium text-gray-800">
                          ₹{loan.amount.toLocaleString("en-IN")}
                        </h3>
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusDetails.color} flex items-center`}
                        >
                          {statusDetails.icon}
                          {loan.status.charAt(0).toUpperCase() +
                            loan.status.slice(1)}
                        </span>
                      </div>
                      {loan.reason && (
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                          {loan.reason}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:items-end gap-1 text-sm">
                      <div className="flex items-center text-gray-500">
                        <FiCalendar className="mr-1.5" />
                        <span>
                          {new Date(loan.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="text-gray-500">
                        <span className="font-medium">
                          {loan.durationMonths} months
                        </span>{" "}
                        duration
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoanList;
