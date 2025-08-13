import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiRefreshCw,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
  FiDollarSign,
  FiCreditCard,
  FiInfo,
} from "react-icons/fi";

function StudentPlan() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchStudentPlan = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/student/plans`,
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }
      const data = await response.json();
      setPlans(data?.plans || []);
    } catch (error) {
      console.error("Error fetching student plan data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentPlan();
  }, []);

  // Card gradient colors based on status
  const getCardGradient = (status) => {
    return status === "active"
      ? "from-green-50 to-green-100"
      : "from-red-50 to-red-100";
  };

  // Status badge colors
  const getStatusBadge = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with refresh button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Study Plans</h1>
            <p className="text-gray-600 mt-2">
              Manage and view all your education plans
            </p>
          </div>
          <button
            onClick={fetchStudentPlan}
            disabled={loading}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <FiRefreshCw className="h-5 w-5 mr-2" />
            Refresh
          </button>
        </div>

        {/* Status indicators */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading & Empty State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <FiInfo className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No plans found
            </h3>
            <p className="mt-1 text-gray-500">
              You don't have any study plans yet.
            </p>
            <div className="mt-6">
              <button
                onClick={fetchStudentPlan}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                <FiRefreshCw className="-ml-1 mr-2 h-4 w-4" />
                Check again
              </button>
            </div>
          </div>
        ) : (
          // Responsive Grid
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className={`bg-gradient-to-br ${getCardGradient(
                  plan.status
                )} rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {plan.name}
                    </h3>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        plan.status
                      )}`}
                    >
                      {plan.status === "active" ? (
                        <FiCheckCircle className="mr-1" />
                      ) : (
                        <FiXCircle className="mr-1" />
                      )}
                      {plan.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{plan.description}</p>

                  <div className="space-y-3 mt-4">
                    <div className="flex items-center">
                      <FiDollarSign className="text-gray-500 mr-2" />
                      <span className="text-gray-700">
                        <span className="font-medium">Total:</span> ₹
                        {plan.totalAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiCreditCard className="text-gray-500 mr-2" />
                      <span className="text-gray-700">
                        <span className="font-medium">Payment:</span>{" "}
                        {plan.paymentType} ({plan.paymentMode})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="text-gray-500 mr-2" />
                      <span className="text-gray-700">
                        <span className="font-medium">Start:</span>{" "}
                        {new Date(plan.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="text-gray-500 mr-2" />
                      <span className="text-gray-700">
                        <span className="font-medium">End:</span>{" "}
                        {new Date(plan.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/dashboard/plan-details/${plan.name}`, { state: { id: plan._id } })
                    }
                    className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentPlan;
