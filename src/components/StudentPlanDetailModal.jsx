import { useEffect, useState } from "react";
import {
  FiX,
  FiDollarSign,
  FiCreditCard,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiUserCheck,
} from "react-icons/fi";

const StudentPlanDetailsModal = ({ isOpen, onClose, plan, loading }) => {
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollError, setEnrollError] = useState(null);
  const [enrollStatus, setEnrollStatus] = useState(null);

  useEffect(() => {
    if (plan?.enrolledstatus) {
      setEnrollStatus(plan.enrolledstatus);
    }
  }, [plan?.enrolledstatus]);

  if (!isOpen) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
      : "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium";
  };

  const handleEnroll = async () => {
    try {
      setEnrollLoading(true);
      setEnrollError(null);

      // Replace with your actual enrollment API endpoint
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/student/plans/enroll`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planId: plan._id,
            paymentMode: plan?.paymentMode,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to enroll in plan");
      }

      const data = await response.json();
      setEnrollStatus(data?.data?.status || null);

      // You might want to refresh the parent component's data here
      // onenrollStatus();
    } catch (error) {
      console.error("Error enrolling in plan:", error);
      setEnrollError(error.message);
    } finally {
      setEnrollLoading(false);
    }
  };

  console.log(enrollStatus);
  console.log(plan);

  return (
    <div className='fixed inset-0 overflow-y-auto z-50'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div
            className='absolute inset-0 bg-gray-500 opacity-75'
            onClick={onClose}
          ></div>
        </div>

        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full relative z-30'>
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                <div className='flex justify-between items-center'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Plan Details
                  </h3>
                  <button
                    onClick={onClose}
                    className='text-gray-400 hover:text-gray-500'
                  >
                    <FiX className='h-6 w-6' />
                  </button>
                </div>

                {loading ? (
                  <div className='flex justify-center items-center py-10'>
                    <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
                  </div>
                ) : plan ? (
                  <div className='mt-4 space-y-4'>
                    <div>
                      <h4 className='text-md font-medium text-gray-900'>
                        {plan.name}
                      </h4>
                      <p className='text-sm text-gray-500'>
                        {plan.description}
                      </p>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div className='flex items-center'>
                        <FiDollarSign className='text-gray-500 mr-2' />
                        <span className='text-gray-700'>
                          <span className='font-medium'>Total:</span>{" "}
                          {formatCurrency(plan.totalAmount)}
                        </span>
                      </div>

                      <div className='flex items-center'>
                        <FiCreditCard className='text-gray-500 mr-2' />
                        <span className='text-gray-700'>
                          <span className='font-medium'>Plan Type:</span>{" "}
                          {plan.paymentType}
                        </span>
                      </div>
                      <div className='flex items-center'>
                        <FiCreditCard className='text-gray-500 mr-2' />
                        <span className='text-gray-700'>
                          <span className='font-medium'>Payment:</span> (
                          {plan.paymentMode})
                        </span>
                      </div>

                      <div className='flex items-center'>
                        <FiCalendar className='text-gray-500 mr-2' />
                        <span className='text-gray-700'>
                          <span className='font-medium'>Start:</span>{" "}
                          {plan.startDate ? formatDate(plan.startDate) : "N/A"}
                        </span>
                      </div>

                      <div className='flex items-center'>
                        <FiCalendar className='text-gray-500 mr-2' />
                        <span className='text-gray-700'>
                          <span className='font-medium'>End:</span>{" "}
                          {plan.endDate ? formatDate(plan.endDate) : "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <span className={getStatusBadge(plan.status)}>
                        {plan.status === "active" ? (
                          <FiCheckCircle className='inline mr-1' />
                        ) : (
                          <FiXCircle className='inline mr-1' />
                        )}
                        {plan.status}
                      </span>
                    </div>

                    {/* Installment Details Section */}
                    {plan.installmentAmounts &&
                      plan.installmentAmounts.length > 0 && (
                        <div className='border-t border-gray-200 pt-4'>
                          <h4 className='text-sm font-medium text-gray-900 mb-2'>
                            Installment Details
                          </h4>
                          <div className='overflow-x-auto'>
                            <table className='min-w-full divide-y divide-gray-200'>
                              <thead className='bg-gray-50'>
                                <tr>
                                  <th
                                    scope='col'
                                    className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                  >
                                    Installment
                                  </th>
                                  <th
                                    scope='col'
                                    className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                  >
                                    Due Date
                                  </th>
                                  <th
                                    scope='col'
                                    className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                  >
                                    Amount
                                  </th>
                                  <th
                                    scope='col'
                                    className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                  >
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody className='bg-white divide-y divide-gray-200'>
                                {plan.installmentAmounts.map(
                                  (installment, index) => (
                                    <tr key={installment._id}>
                                      <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                                        Installment {index + 1}
                                      </td>
                                      <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                                        {formatDate(installment.dueDate)}
                                      </td>
                                      <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                                        {formatCurrency(installment.amount)}
                                      </td>
                                      <td className='px-4 py-2 whitespace-nowrap'>
                                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                                          Pending
                                        </span>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td
                                    colSpan='2'
                                    className='px-4 py-2 text-sm font-medium text-gray-900 text-right'
                                  >
                                    Total:
                                  </td>
                                  <td className='px-4 py-2 text-sm font-medium text-gray-900'>
                                    {formatCurrency(
                                      plan.installmentAmounts.reduce(
                                        (sum, inst) => sum + inst.amount,
                                        0
                                      )
                                    )}
                                  </td>
                                  <td></td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      )}

                    <div className='border-t border-gray-200 pt-4'>
                      <h4 className='text-sm font-medium text-gray-900 mb-2'>
                        Additional Information
                      </h4>
                      <p className='text-sm text-gray-500'>
                        Created: {formatDate(plan.createdAt)}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Last Updated: {formatDate(plan.updatedAt)}
                      </p>
                    </div>

                    {/* Enrollment Section */}
                    <div className='border-t border-gray-200 pt-4'>
                      <h4 className='text-sm font-medium text-gray-900 mb-2'>
                        Enrollment
                      </h4>

                      {/* ✅ Status messages */}
                      {enrollStatus === "enrolled" && (
                        <div className='p-3 bg-green-50 rounded-md mb-4'>
                          <p className='text-green-800 text-sm'>
                            Successfully enrolled in this plan!
                          </p>
                        </div>
                      )}

                      {enrollStatus === "pending" && (
                        <div className='p-3 bg-yellow-50 rounded-md mb-4'>
                          <p className='text-yellow-800 text-sm'>
                            Enrollment request is pending approval.
                          </p>
                        </div>
                      )}

                      {enrollStatus === "rejected" && (
                        <div className='p-3 bg-red-50 rounded-md mb-4'>
                          <p className='text-red-800 text-sm'>
                            Your enrollment request was rejected.
                          </p>
                        </div>
                      )}

                      {enrollError && (
                        <div className='p-3 bg-red-50 rounded-md mb-4'>
                          <p className='text-red-800 text-sm'>{enrollError}</p>
                        </div>
                      )}

                      {/* ✅ Button */}
                      <button
                        onClick={handleEnroll}
                        disabled={
                          enrollLoading ||
                          ["pending", "enrolled", "completed"].includes(
                            enrollStatus
                          ) ||
                          plan.status !== "active"
                        }
                        className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white ${
                          enrollLoading ||
                          ["pending", "enrolled", "completed"].includes(
                            enrollStatus
                          ) ||
                          plan.status !== "active"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {enrollLoading ? (
                          <>
                            <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2'></div>
                            Processing...
                          </>
                        ) : enrollStatus === "enrolled" ? (
                          <>
                            <FiCheckCircle className='mr-2' />
                            Enrolled Successfully
                          </>
                        ) : enrollStatus === "pending" ? (
                          "Waiting for Approval"
                        ) : enrollStatus === "completed" ? (
                          "Plan Completed"
                        ) : enrollStatus === "cancelled" ? (
                          "Enrollment Cancelled — You can re-enroll"
                        ) : enrollStatus === "rejected" ? (
                          "Enrollment Rejected — Try Again"
                        ) : plan.status !== "active" ? (
                          "Plan Not Active"
                        ) : (
                          <>
                            <FiUserCheck className='mr-2' />
                            Enroll in this Plan
                          </>
                        )}
                      </button>

                      <p className='text-xs text-gray-500 mt-2'>
                        By enrolling, you agree to the terms and conditions of
                        this plan.
                        {plan.paymentMode === "installments" &&
                          " The installment amounts and due dates are shown above."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className='text-center py-6'>
                    <FiXCircle className='mx-auto h-8 w-8 text-gray-400' />
                    <p className='mt-2 text-gray-500'>
                      Unable to load plan details.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPlanDetailsModal;
