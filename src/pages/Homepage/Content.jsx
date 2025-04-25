import banner from "../../assets/content-banner.png";
import { motion } from "framer-motion";
import mission2 from "../../assets/home/mission2.svg";
import mission1 from "../../assets/home/mission1.svg";
import mission3 from "../../assets/home/mission3.svg";
import mission4 from "../../assets/home/mission4.svg";
import mission5 from "../../assets/home/mission5.svg";
function Content() {
  return (
    <div className="relative ">
      <img src={banner} alt="" className="w-full h-auto" />
      <div className="absolute top-1/6 left-10">
        <motion.p
          className="text-[40px] font-bold w-[50%] counter"
          data-aos="fade-up"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          Unlocking <span className="text-[#00953B]">Knowledge</span>, Inspiring{" "}
          <span className="text-[#00953B]">Innovation</span>, and Shaping a{" "}
          <span className="text-[#00953B]">Brighter Future</span>
        </motion.p>
        <motion.button
          className="bg-[#FE9900] rounded-2xl px-4 py-2 text-white mt-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Learn More
        </motion.button>
      </div>

      <div className="bg-[#EEEEEE] h-[448px]">
        <motion.h2 className="text-[30px] font-semibold py-[58px] text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1 }}
        >
          Mission & Vision
        </motion.h2>
        <motion.div className="flex justify-evenly"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1 }}
        >
          <div className=" w-[249px] rounded-xl flex flex-col items-center p-[20px] space-y-1 bg-[#00953B]">
            <img src={mission1} alt="" className="w-[68px] h-[68px]" />
            <h4 className="text-white font-bold text-[16px]">
              Putting Students First
            </h4>
            <p className="text-[14px] text-justify text-white">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry Lorem Ipsum has been .
            </p>
            <button className="underline text-[#FE9900] text-[14px]">Read More</button>
          </div>
          <div className=" w-[249px] rounded-xl bg-white flex space-y-1 flex-col items-center p-[20px]">
            <img src={mission2} alt="" className="w-[68px] h-[68px]" />
            <h4 className="text-[#FE9900] font-bold text-[16px]">
              Taking Care of Our People
            </h4>
            <p className="text-[14px] text-justify ">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry Lorem Ipsum has been .
            </p>
            <button className="underline text-[#FE9900] text-[14px]">Read More</button>
          </div>

          <div className=" w-[249px] rounded-xl bg-white flex space-y-1 flex-col items-center p-[20px]">
            <img src={mission3} alt="" className="w-[68px] h-[68px]" />
            <h4 className="text-[#FE9900] font-bold text-[16px]">Inspiring Ingenuity</h4>
            <p className="text-[14px] text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry Lorem Ipsum has been .
            </p>
            <button className="underline text-[#FE9900] text-[14px]">Read More</button>
          </div>

          <div className=" w-[249px] rounded-xl bg-white flex space-y-1 flex-col items-center p-[20px]">
            <img src={mission4} alt="" className="w-[68px] h-[68px]" />
            <h4 className="text-[#FE9900] font-bold text-[16px]">
              Ensuring Greater Trust
            </h4>
            <p className="text-[14px] text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry Lorem Ipsum has been .
            </p>
            <button className="underline text-[#FE9900] text-[14px]">Read More</button>
          </div>

          <div className=" w-[249px] rounded-xl bg-white space-y-1 flex flex-col items-center p-[20px]">
            <img src={mission5} alt="" className="w-[68px] h-[68px]" />
            <h4 className="text-[#FE9900] font-bold text-[16px]">Bringing Together</h4>
            <p className="text-[14px] text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry Lorem Ipsum has been .
            </p>
            <button className="underline text-[#FE9900] text-[14px]">Read More</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Content;
