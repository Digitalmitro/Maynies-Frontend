import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiCreditCard,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiAlertTriangle,
} from "react-icons/fi";

function EnrolledPlanDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const planId = location.state?.id;
  console.log(planId);
  const [plan, setPlan] = useState(null);
  const [enrollmentPlanID, setEnrollmentPlanID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollError, setEnrollError] = useState(null);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [paymentMode, setPaymentMode] = useState("one_time");

  const fetchStudentPlanDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/student/plans/planenrollments/${planId}`,
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch plan details");
      }
      const data = await response.json();
      setPlan(data.plan || null);
      setEnrollmentPlanID(data.enrolledPlans)
    } catch (error) {
      console.error("Error fetching student plan data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const studentId = localStorage.getItem("id");

  useEffect(() => {
    fetchStudentPlanDetails();
  }, []);

const handlePayment = async () => {

  console.log(enrollmentPlanID[0]?._id);
  
  try {
    const payload = {
      studentId: studentId,
      studentPlanId:enrollmentPlanID[0]?._id, 
      amount: plan.totalAmount,
      currency: "INR",
      paymentMethod: "cash",
      // transactionId: "TXN123",
      // proofUrl: "https://example.com/receipt.jpg",
      // remarks: "Full fees paid at counter",
    };

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/student/plans/payment/offline`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Payment failed");
    }

    console.log("✅ Payment success:", data);
    alert("Payment submitted successfully! Waiting for admin approval.");
  } catch (err) {
    console.error("❌ Payment error:", err.message);
    alert(err.message || "Something went wrong");
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <FiLoader className="animate-spin text-blue-600 text-4xl mb-4" />
          <p className="text-gray-700">Loading plan details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <FiAlertTriangle className="text-red-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Plan
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <FiAlertCircle className="text-gray-400 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Plan Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested plan could not be found.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Error Message */}
        {enrollError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{enrollError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors mr-4"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Plan Details</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Card Header */}
          <div
            className={`p-6 ${
              plan.status === "active" ? "bg-green-50" : "bg-red-50"
            } border-b`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {plan.name}
                </h2>
                <p className="text-gray-700 mt-1">{plan.description}</p>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  plan.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {plan.status === "active" ? (
                  <FiCheckCircle className="mr-1" />
                ) : (
                  <FiAlertCircle className="mr-1" />
                )}
                {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Plan Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiDollarSign className="text-gray-700 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Total Amount
                    </h3>
                    <p className="text-lg font-semibold">
                      ₹{plan.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiCreditCard className="text-gray-700 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Payment Details
                    </h3>
                    <p className="text-gray-800">
                      {plan.paymentType} ({plan.paymentMode})
                    </p>
                    {plan.lateFeeValue > 0 && (
                      <p className="text-sm text-gray-700 mt-1">
                        Late fee: {plan.lateFeeType} (₹{plan.lateFeeValue})
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiCalendar className="text-gray-700 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Duration
                    </h3>
                    <p className="text-gray-800">
                      {new Date(plan.startDate).toLocaleDateString()} -{" "}
                      {new Date(plan.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {plan.installmentCount} installments
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Mode Selection */}

            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Select Payment Option
              </h3>
              <div className="mb-6">
                {plan.paymentMode === "one_time" ? (
                  <button
                    onClick={() => setPaymentMode("one_time")}
                    className="p-4 border border-blue-500 bg-blue-50 rounded-lg w-full text-left"
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex items-start">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full border border-blue-500 bg-blue-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                        <div>
                          <h4 className="font-medium">One-time Payment</h4>
                          <p className="text-sm text-gray-600">
                            Pay the full amount now
                          </p>
                        </div>
                      </div>
                      <button
                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => handlePayment()}
                      >
                        Pay Now
                      </button>
                    </div>
                  </button>
                ) : plan.paymentMode === "installments" &&
                  plan.installmentCount > 0 ? (
                  <button
                    onClick={() => setPaymentMode("installments")}
                    className="p-4 border border-blue-500 bg-blue-50 rounded-lg w-full text-left"
                  >
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 w-5 h-5 rounded-full border border-blue-500 bg-blue-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Installments</h4>
                        <p className="text-sm text-gray-600">
                          Pay in {plan.installmentCount} installments
                        </p>
                      </div>
                    </div>
                  </button>
                ) : null}
              </div>
            </div>

            {/* Installments Table */}
            {plan.installmentAmounts?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Payment Schedule
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Installment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {plan.installmentAmounts.map((inst, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {idx + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            ₹{inst.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {inst.dueDate
                              ? new Date(inst.dueDate).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <button
                              className=" px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                              onClick={() => handlePayment()}
                            >
                              Pay Now
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrolledPlanDetails;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiCreditCard,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiAlertTriangle,
} from "react-icons/fi";

function EnrolledPlanDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const planId = location.state?.id;
  console.log(planId);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollError, setEnrollError] = useState(null);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [paymentMode, setPaymentMode] = useState("one_time");

  const fetchStudentPlanDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/student/plans/${planId}`,
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch plan details");
      }
      const data = await response.json();
      setPlan(data.plan || null);
    } catch (error) {
      console.error("Error fetching student plan data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchStudentPlanDetails();
  }, []);

  const handlePayment = async () => {
    // Implement your payment handling logic here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <FiLoader className="animate-spin text-blue-600 text-4xl mb-4" />
          <p className="text-gray-700">Loading plan details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <FiAlertTriangle className="text-red-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Plan
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <FiAlertCircle className="text-gray-400 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Plan Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested plan could not be found.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Error Message */}
        {enrollError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{enrollError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors mr-4"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Plan Details</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Card Header */}
          <div
            className={`p-6 ${
              plan.status === "active" ? "bg-green-50" : "bg-red-50"
            } border-b`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {plan.name}
                </h2>
                <p className="text-gray-700 mt-1">{plan.description}</p>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  plan.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {plan.status === "active" ? (
                  <FiCheckCircle className="mr-1" />
                ) : (
                  <FiAlertCircle className="mr-1" />
                )}
                {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Plan Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiDollarSign className="text-gray-700 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Total Amount
                    </h3>
                    <p className="text-lg font-semibold">
                      ₹{plan.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiCreditCard className="text-gray-700 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Payment Details
                    </h3>
                    <p className="text-gray-800">
                      {plan.paymentType} ({plan.paymentMode})
                    </p>
                    {plan.lateFeeValue > 0 && (
                      <p className="text-sm text-gray-700 mt-1">
                        Late fee: {plan.lateFeeType} (₹{plan.lateFeeValue})
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiCalendar className="text-gray-700 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Duration
                    </h3>
                    <p className="text-gray-800">
                      {new Date(plan.startDate).toLocaleDateString()} -{" "}
                      {new Date(plan.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {plan.installmentCount} installments
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Mode Selection */}

            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Select Payment Option
              </h3>
              <div className="mb-6">
                {plan.paymentMode === "one_time" ? (
                  <button
                    onClick={() => setPaymentMode("one_time")}
                    className="p-4 border border-blue-500 bg-blue-50 rounded-lg w-full text-left"
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex items-start">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full border border-blue-500 bg-blue-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                        <div>
                          <h4 className="font-medium">One-time Payment</h4>
                          <p className="text-sm text-gray-600">
                            Pay the full amount now
                          </p>
                        </div>
                      </div>
                      <button
                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => handlePayment()}
                      >
                        Pay Now
                      </button>
                    </div>
                  </button>
                ) : plan.paymentMode === "installments" &&
                  plan.installmentCount > 0 ? (
                  <button
                    onClick={() => setPaymentMode("installments")}
                    className="p-4 border border-blue-500 bg-blue-50 rounded-lg w-full text-left"
                  >
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 w-5 h-5 rounded-full border border-blue-500 bg-blue-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Installments</h4>
                        <p className="text-sm text-gray-600">
                          Pay in {plan.installmentCount} installments
                        </p>
                      </div>
                    </div>
                  </button>
                ) : null}
              </div>
            </div>

            {/* Installments Table */}
            {plan.installmentAmounts?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Payment Schedule
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Installment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {plan.installmentAmounts.map((inst, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {idx + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            ₹{inst.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {inst.dueDate
                              ? new Date(inst.dueDate).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <button
                              className=" px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                              onClick={() => handlePayment()}
                            >
                              Pay Now
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrolledPlanDetails;
