import { motion } from "framer-motion";
import career from "../../assets/about/career.png";
import { useNavigate } from "react-router-dom";
function Career() {
  const navigate=useNavigate();
  const handleSubmit = () => {
    navigate("/jobs");
  };
  return (
    <div>
      <div className="relative w-full">
        <motion.img
          initial={{ opacity: 0}}
          whileInView={{ opacity: 1}}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          src={career}
          alt=""
          className="w-full h-auto brightness-75"
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
          Career
        </motion.h2>
      </div>
      <div className="text-center py-10 space-y-2 w-full">
        <h2
          className="text-[25px] font-semibold text-[#00953B]"
        >
          Work With Us
        </h2>
        <p className="w-[80%] mx-auto">
          To find out about the latest vacancies at Adamas University, please
          click on the ‘Current Vacancies’ button below. Apply
          to recruitment@adamasuniversity.ac.in
        </p>
        <button
          className="bg-[#FE9900] rounded-md px-4 py-2 text-white mt-2"
          onClick={handleSubmit}
        >
          View Jobs
        </button>
      </div>
    </div>
  );
}

export default Career;
