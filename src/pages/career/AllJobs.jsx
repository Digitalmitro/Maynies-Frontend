import { motion } from "framer-motion";
import jobs from "../../assets/jobs.png";
import { FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const facultyData = [
  {
    location: "Alaska",
    title: "Faculty Positions in History",
    description:
      "We invite applications for faculty positions in history for our undergraduate programme",
    deadline: "Saturday, 31 May 2025",
  },
  {
    location: "Alaska",
    title: "Faculty Positions in Economics",
    description:
      "We invite applications for faculty positions in history for our undergraduate programme",
    deadline: "Saturday, 31 May 2025",
  },
  {
    location: "California",
    title: "Faculty Positions in Child Development and Learning",
    description:
      "We invite applications for faculty positions in history for our undergraduate programme",
    deadline: "Saturday, 31 May 2025",
  },{
    location: "California",
    title: "Faculty Positions in Child Development and Learning",
    description:
      "We invite applications for faculty positions in history for our undergraduate programme",
    deadline: "Saturday, 31 May 2025",
  },{
    location: "California",
    title: "Faculty Positions in Child Development and Learning",
    description:
      "We invite applications for faculty positions in history for our undergraduate programme",
    deadline: "Saturday, 31 May 2025",
  },
];

function AllJobs() {
  const navigate=useNavigate();
  return (
    <div>
    {/* Hero Banner Section */}
    <div className="relative w-full">
      <motion.img
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
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
      {facultyData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-6 gap-4 sm:gap-6 border-b border-gray-200 last:border-0"
          onClick={()=>navigate("/job")}
        >
          {/* Location */}
          <div className="flex items-center gap-2 text-green-700 text-base sm:text-lg font-medium min-w-[120px]">
            <FaBuilding size={18} className="flex-shrink-0" />
            <span>{item.location}</span>
          </div>
  
          {/* Job Details */}
          <div className="flex-1 w-full">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {item.title}
            </h2>
            <p className="text-gray-600 w-full lg:w-1/2 text-sm sm:text-base mt-1">
              {item.description}
            </p>
          </div>
  
          {/* Deadline */}
          <div className="flex items-start gap-2 text-green-700 text-sm sm:text-base font-medium mt-2 sm:mt-0">
            <div>
              <p className="font-semibold">Deadline</p>
              <div className="flex items-center gap-1">
                <FaCalendarAlt size={14} className="flex-shrink-0" />
                <span className="text-gray-700">
                  {item.deadline.toLowerCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
  
      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <div>
          <p className="text-[#FE9900] text-sm sm:text-base">Page 1 of 2</p>
        </div>
        <div className="flex">
          <p className="flex justify-center items-center gap-2 text-[#FE9900] text-sm sm:text-base">
            Page 2 <FaArrowRightLong className="font-bold text-xl sm:text-2xl"/>
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default AllJobs;
