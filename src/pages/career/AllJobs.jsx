import { motion } from "framer-motion";
import jobs from "../../assets/jobs.png";
import { FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
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
  return (
    <div>
      <div className="relative w-full">
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          src={jobs}
          alt=""
          className="w-full max-h-[400px] brightness-75"
        />
        <div className="absolute inset-0 bg-white/50 z-10" />
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                font-semibold text-[40px] z-20 text-center"
        >
          Job Opportunities
        </motion.h2>
      </div>

      <div className="lg:px-20 px-4 py-6">
        {facultyData.map((item, index) => (

          <div
            key={index}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center  py-6 gap-6"
          >
            <div className="flex items-center gap-2 text-green-700 text-[18px] font-medium min-w-[120px]">
              <FaBuilding size={20} />
              <span>{item.location}</span>
            </div>
            <div className="flex-1">
              <h2 className=" text-3xl font-bold">
                {item.title}
              </h2>
              <p className="text-gray-600 w-[50%] sm:text-base mt-1">
                {item.description}
              </p>
            </div>

            <div className="flex items-start gap-2 text-green-700 text-[14px] sm:text-[16px] font-medium mt-4 lg:mt-0">
              <div>
                <p className="font-semibold">Deadline</p>
                <div className="flex items-center gap-1">
                  <FaCalendarAlt size={16} />
                  <span className="text-gray-700">
                    {item.deadline.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          

        ))}
        <div className="flex justify-between">
            <div>
                <p className="text-[#FE9900] ">Page 1 of 2</p>
            </div>
            <div className="flex">
                <p className="flex justify-center items-center gap-2 text-[#FE9900] ">Page 2 <FaArrowRightLong className="font-bold text-2xl"/></p>
            </div>
          </div>
      </div>
    </div>
  );
}

export default AllJobs;
