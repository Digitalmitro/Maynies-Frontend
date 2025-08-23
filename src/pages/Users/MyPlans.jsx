import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiDollarSign,
  FiCreditCard,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronRight,
  FiLoader,
} from "react-icons/fi";

function MyPlans() {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/student/plans/enrollments/${id}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }
      const data = await response.json();
      setPlans(data?.data?.plans || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <FiLoader className="animate-spin text-blue-600 text-4xl mb-4" />
          <p className="text-gray-700">Loading your plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <FiAlertCircle className="text-red-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Plans
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchPlans}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            My Enrolled Plans
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage all your current education plans
          </p>
        </div>

        {plans.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <FiCalendar className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              No Plans Enrolled
            </h3>
            <p className="text-gray-500 mt-2">
              You haven't enrolled in any plans yet.
            </p>
            <button
              onClick={() => navigate("/plans")}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Plans
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {plans.map((enrollment) => (
              <div
                key={enrollment._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center">
                        <h2 className="text-xl font-bold text-gray-800 mr-3">
                          {enrollment.planId.name}
                        </h2>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            enrollment.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {enrollment.status === "active" ? (
                            <FiCheckCircle className="mr-1" />
                          ) : (
                            <FiAlertCircle className="mr-1" />
                          )}
                          {enrollment.status.charAt(0).toUpperCase() +
                            enrollment.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">
                        {enrollment.planId.description}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/enrolled-plans/${enrollment._id}`, {
                          state: { id: enrollment?.planId?._id },
                        })
                      }
                      className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details <FiChevronRight className="ml-1" />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <FiDollarSign className="text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="font-medium">
                          ₹{enrollment.planId.totalAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiCreditCard className="text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Payment Mode</p>
                        <p className="font-medium capitalize">
                          {enrollment.chosenMode.replace("_", " ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Enrolled On</p>
                        <p className="font-medium">
                          {formatDate(enrollment.assignedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPlans;
