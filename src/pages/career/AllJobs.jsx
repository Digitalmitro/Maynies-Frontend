import { motion } from "framer-motion";
import jobs from "../../assets/jobs.png";
import { FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AllJobs() {
  const [jobsData, setJobsData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 1,
  });
  const navigate = useNavigate();

  const fetchJobs = async (page = 1) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/jobs?page=${page}&limit=${pagination.limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobsData(data?.data?.jobs || []);
      setPagination({
        page: data?.data?.page || 1,
        limit: data?.data?.limit || 10,
        total: data?.data?.total || 0,
        totalPages: Math.ceil(data?.data?.total / data?.data?.limit) || 1,
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchJobs(newPage);
    }
  };

  return (
    <div>
      {/* Hero Banner Section */}
      <div className="relative w-full">
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          src={jobs}
          alt="Job opportunities banner"
          className="w-full max-h-[400px] object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-white/50 z-10" />
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                font-semibold text-3xl sm:text-4xl z-20 text-center px-4"
        >
          Job Opportunities
        </motion.h2>
      </div>

      {/* Jobs List Section */}
      <div className="lg:px-20 px-4 py-6">
        {jobsData?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-6 gap-4 sm:gap-6 border-b border-gray-200 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => navigate(`/job`, { state: { job: item?._id } })}
          >
            {/* Location */}
            <div className="flex items-center gap-2 text-green-700 text-base sm:text-lg font-medium min-w-[120px]">
              <FaBuilding size={18} className="flex-shrink-0" />
              <span>{item?.location}</span>
            </div>

            {/* Job Details */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl sm:text-3xl font-bold">{item?.title}</h2>
              <p className="text-gray-600 w-full lg:w-1/2 text-sm sm:text-base mt-1">
                {item?.short_description}
              </p>
            </div>

            {/* Deadline */}
            <div className="flex items-start gap-2 text-green-700 text-sm sm:text-base font-medium mt-2 sm:mt-0">
              <div>
                <p className="font-semibold">Deadline</p>
                <div className="flex items-center gap-1">
                  <FaCalendarAlt size={14} className="flex-shrink-0" />
                  <span className="text-gray-700">
                    {item?.expires_at
                      ? new Date(item?.expires_at).toLocaleDateString()
                      : "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Pagination */}
        {pagination.total > 0 && (
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className={`flex items-center gap-2 ${
                pagination.page === 1 ? "text-gray-400" : "text-[#FE9900]"
              } text-sm sm:text-base`}
            >
              <FaArrowLeftLong className="text-xl sm:text-2xl" />
              Previous
            </button>

            <div className="text-[#FE9900] text-sm sm:text-base">
              Page {pagination.page} of {pagination.totalPages}
            </div>

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className={`flex items-center gap-2 ${
                pagination.page === pagination.totalPages
                  ? "text-gray-400"
                  : "text-[#FE9900]"
              } text-sm sm:text-base`}
            >
              Next
              <FaArrowRightLong className="text-xl sm:text-2xl" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllJobs;
