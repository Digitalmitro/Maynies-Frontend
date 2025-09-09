import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiInfo,
  FiDollarSign,
  FiCreditCard,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import StudentPlanDetailsModal from "../../components/StudentPlanDetailModal";

function StudentPlan() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    paymentType: "",
    paymentMode: "",
    status: "",
    minAmount: "",
    maxAmount: "",
    hasInstallments: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const fetchStudentPlan = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query string from searchParams
      const queryParams = new URLSearchParams();
      Object.keys(searchParams).forEach((key) => {
        if (searchParams[key]) {
          queryParams.append(key, searchParams[key]);
        }
      });

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/student/plans?${queryParams}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }

      const data = await response.json();
      setPlans(data?.data || []);
      setPagination(data?.pagination || {});
    } catch (error) {
      console.error("Error fetching student plan data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlanDetails = async (planId) => {
    try {
      setModalLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/student/plans/${planId}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch plan details");
      }

      const data = await response.json();
      setSelectedPlan(data?.data || null);
    } catch (error) {
      console.error("Error fetching plan details:", error);
      setError(error.message);
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentPlan();
  }, [searchParams]);

  const handleSearchChange = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      search: e.target.value,
      page: 1, // Reset to first page when searching
    }));
  };

  const handleFilterChange = (filter, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [filter]: value,
      page: 1, // Reset to first page when filtering
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setSearchParams((prev) => ({
        ...prev,
        page: newPage,
      }));
    }
  };

  const openModal = (plan) => {
    setSelectedPlan(null);
    setIsModalOpen(true);
    fetchPlanDetails(plan._id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const getStatusBadge = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
      : "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium";
  };

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

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>My Study Plans</h1>
            <p className='text-gray-600 mt-2'>
              Manage and view all your education plans
            </p>
          </div>
          <div className='flex items-center mt-4 md:mt-0'>
            <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
              {pagination.total} Enrolled Plans
            </span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className='bg-white rounded-lg shadow-sm p-4 mb-6'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='relative flex-1'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FiSearch className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='text'
                placeholder='Search plans by name...'
                className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                value={searchParams.search}
                onChange={handleSearchChange}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
            >
              <FiFilter className='h-4 w-4 mr-2' />
              Filters
              <FiChevronDown className='h-4 w-4 ml-2' />
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Payment Type
                </label>
                <select
                  className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
                  value={searchParams.paymentType}
                  onChange={(e) =>
                    handleFilterChange("paymentType", e.target.value)
                  }
                >
                  <option value=''>All Types</option>
                  <option value='tuition'>Tuition</option>
                  <option value='hostel'>Hostel</option>
                  <option value='exam'>Exam</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Payment Mode
                </label>
                <select
                  className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
                  value={searchParams.paymentMode}
                  onChange={(e) =>
                    handleFilterChange("paymentMode", e.target.value)
                  }
                >
                  <option value=''>All Modes</option>
                  <option value='one_time'>One Time</option>
                  <option value='installments'>Installments</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Status
                </label>
                <select
                  className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
                  value={searchParams.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value=''>All Status</option>
                  <option value='active'>Active</option>
                  <option value='inactive'>Inactive</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Amount Range
                </label>
                <div className='flex space-x-2'>
                  <input
                    type='number'
                    placeholder='Min'
                    className='block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md text-sm'
                    value={searchParams.minAmount}
                    onChange={(e) =>
                      handleFilterChange("minAmount", e.target.value)
                    }
                  />
                  <input
                    type='number'
                    placeholder='Max'
                    className='block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md text-sm'
                    value={searchParams.maxAmount}
                    onChange={(e) =>
                      handleFilterChange("maxAmount", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <FiXCircle className='h-5 w-5 text-red-500' />
              </div>
              <div className='ml-3'>
                <p className='text-sm text-red-700'>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading & Empty State */}
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
          </div>
        ) : plans.length === 0 ? (
          <div className='text-center py-12 bg-white rounded-xl shadow-sm'>
            <FiInfo className='mx-auto h-12 w-12 text-gray-400' />
            <h3 className='mt-2 text-lg font-medium text-gray-900'>
              No plans found
            </h3>
            <p className='mt-1 text-gray-500'>
              {searchParams.search ||
              Object.values(searchParams).some(
                (param) => param && param !== "createdAt" && param !== "desc"
              )
                ? "Try adjusting your search or filters."
                : "You don't have any study plans yet."}
            </p>
          </div>
        ) : (
          <>
            {/* Plans Table */}
            <div className='bg-white shadow-sm rounded-lg overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Plan Name
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Payment Type
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Amount
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Payment Mode
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Status
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Created Date
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {plans.map((plan) => (
                      <tr key={plan._id} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900'>
                            {plan.name}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {plan.description}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {plan.paymentType}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {formatCurrency(plan.totalAmount)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {plan.paymentMode}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className={getStatusBadge(plan.status)}>
                            {plan.status === "active" ? (
                              <FiCheckCircle className='inline mr-1' />
                            ) : (
                              <FiXCircle className='inline mr-1' />
                            )}
                            {plan.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {formatDate(plan.createdAt)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                          <button
                            onClick={() => openModal(plan)}
                            className='text-blue-600 hover:text-blue-900'
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
                  <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                    <div>
                      <p className='text-sm text-gray-700'>
                        Showing{" "}
                        <span className='font-medium'>
                          {(pagination.page - 1) * pagination.limit + 1}
                        </span>{" "}
                        to{" "}
                        <span className='font-medium'>
                          {Math.min(
                            pagination.page * pagination.limit,
                            pagination.total
                          )}
                        </span>{" "}
                        of{" "}
                        <span className='font-medium'>{pagination.total}</span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav
                        className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                        aria-label='Pagination'
                      >
                        <button
                          onClick={() => handlePageChange(pagination.page - 1)}
                          disabled={!pagination.hasPrevPage}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                            pagination.hasPrevPage
                              ? "text-gray-500 hover:bg-gray-50"
                              : "text-gray-300 cursor-not-allowed"
                          }`}
                        >
                          <FiChevronLeft className='h-5 w-5' />
                        </button>

                        {Array.from(
                          { length: pagination.totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              pagination.page === page
                                ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          onClick={() => handlePageChange(pagination.page + 1)}
                          disabled={!pagination.hasNextPage}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            pagination.hasNextPage
                              ? "text-gray-500 hover:bg-gray-50"
                              : "text-gray-300 cursor-not-allowed"
                          }`}
                        >
                          <FiChevronRight className='h-5 w-5' />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Plan Details Modal */}
      <StudentPlanDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        plan={selectedPlan}
        loading={modalLoading}
      />
    </div>
  );
}

export default StudentPlan;
