import React from "react";
import { motion } from "framer-motion";
import banner from "../../assets/about/student-banner.png";
import stud from "../../assets/about/student.png";
function Studpotal() {
  return (
    <div>
      <div className="relative w-full">
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
          src={banner}
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
                font-semibold lg:text-[40px] text-[28px] z-20 text-center"
        >
          Employee Portal
        </motion.h2>
      </div>

      <motion.div
        className="lg:px-20 px-4 py-15"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.4 }}
      >
        <div>
            <div className="flex gap-10">
            <img src={stud} alt="" /> 
            <p className="flex justify-center items-center font-bold text-xl">Student Name</p>
            </div>
          <div
            className="flex justify-between w-full pt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Gender"
              className="outline-1 outline-gray-500 px-4 w-[45%] py-2 rounded"
            />
            <input
              type="text"
              placeholder="Birth Date"
              className="outline-1 outline-gray-500 px-4 w-[45%] py-2 rounded"
            />
          </div>
          <div
            className="flex justify-between w-full pt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Blood Group"
              className="outline-1 outline-gray-500 px-4 w-[45%] py-2 rounded"
            />
            <input
              type="text"
              placeholder="Nationality"
              className="outline-1 outline-gray-500 px-4 w-[45%] py-2 rounded"
            />
          </div>
          <div
            className="flex justify-between w-full pt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Mobile"
              className="outline-1 outline-gray-500 px-4 w-[45%] py-2 rounded"
            />
            <input
              type="text"
              placeholder="Email"
              className="outline-1 outline-gray-500 px-4 w-[45%] py-2 rounded"
            />
          </div>

          {/* Textarea */}
          <div
            className="flex justify-between w-full pt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <textarea
              rows={6}
              placeholder="Address"
              className="outline-1 outline-gray-500 px-4 w-full py-2 rounded"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Studpotal;
