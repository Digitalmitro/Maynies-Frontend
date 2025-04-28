import banner from "../../assets/content-banner.png";
import { motion } from "framer-motion";
import mission2 from "../../assets/home/mission2.svg";
import mission1 from "../../assets/home/mission1.svg";
import mission3 from "../../assets/home/mission3.svg";
import mission4 from "../../assets/home/mission4.svg";
import mission5 from "../../assets/home/mission5.svg";
import values1 from "../../assets/home/values_1.svg";
import values2 from "../../assets/home/values_2.svg";
import values3 from "../../assets/home/values_3.svg";
import values4 from "../../assets/home/values_4.svg";
import overviewImg from "../../assets/home/bussiness-over-bannerimg.png";
import overview from "../../assets/home/business-overview.png";
import team1 from "../../assets/home/team_1.png";
import team2 from "../../assets/home/team_2.png";
import team3 from "../../assets/home/team_3.png";
import { IoLogoFacebook } from "react-icons/io";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
const dummyMission = [
  {
    id: 1,
    image: mission1,
    title: "Putting Students First",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been.",
  },
  {
    id: 2,
    image: mission2,
    title: "Taking Care of Our People",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been.",
  },
  {
    id: 3,
    image: mission3,
    title: "Inspiring Ingenuity",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been.",
  },
  {
    id: 4,
    image: mission4,
    title: "Ensuring Greater Trust",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been.",
  },
  {
    id: 5,
    image: mission5,
    title: "Bringing Together",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been.",
  },
];
const dummyValues = [
  {
    id: "01",
    title: "Excellence in Education",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority.",
    image: values1,
  },
  {
    id: "02",
    title: "Innovation & Growth",
    description:
      " There are many variations of passages of Lorem Ipsum available, but the majority.",
    image: values2,
  },
  {
    id: "03",
    title: "Integrity & Inclusivity",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority.",
    image: values3,
  },
  {
    id: "04",
    title: "Student-Centered Approach",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority",
    image: values4,
  },
];
const dummyTeam = [
  {
    id: "01",
    name: "Harrison",
    title: "Excellence in Education",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary A small river named Duden flows by their place and supplies it with the necessary.",
    image: team1,
    facLink: "",
    instaLink: "",
    linkdin: "",
  },
  {
    id: "02",
    name: "Jenny",
    title: "Innovation & Growth",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary A small river named Duden flows by their place and supplies it with the necessary.",
    image: team2,
    facLink: "",
    instaLink: "",
    linkdin: "",
  },
  {
    id: "03",
    title: "Integrity & Inclusivity",
    description:
      "A small river named Duden flows by their place and supplies it with the necessary A small river named Duden flows by their place and supplies it with the necessary.",
    image: team3,
    name: "Nick",
    facLink: "",
    instaLink: "",
    linkdin: "",
  },
];
function Content() {
  return (
    <div>
      <div className="relative ">
        <img src={banner} alt="" className="w-full h-auto" />
        <div className="absolute top-[150px] lg:left-10">
          <motion.p
            className="lg:text-[40px] font-bold lg:w-[50%] counter"
            data-aos="fade-up"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1 }}
          >
            Unlocking <span className="text-[#00953B]">Knowledge</span>,
            Inspiring <span className="text-[#00953B]">Innovation</span>, and
            Shaping a <span className="text-[#00953B]">Brighter Future</span>
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
      </div>

      <div className="bg-[#EEEEEE] h-[448px]">
        <motion.h2
          className="text-[30px] font-semibold py-[40px] text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          Mission & Vision
        </motion.h2>
        <div className=" flex justify-evenly">
          {dummyMission.map((item, i) => (
            <motion.div
              className="group w-[249px] rounded-xl flex flex-col items-center p-[20px] space-y-1 bg-white hover:bg-[#00953B] transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              key={item.id}
            >
              <img src={item.image} alt="" className="w-[68px] h-[68px]" />

              <h4 className="font-bold text-[#FE9900] group-hover:text-white text-[16px]">
                {item.title}
              </h4>

              <p className="text-[14px] text-justify group-hover:text-white">
                {item.description}
              </p>

              <button className="underline text-[#FE9900] group-hover:text-white text-[14px]">
                Read More
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white h-[723px] pt-10 ">
        <motion.h2
          className="text-center font-semibold text-[36px]"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          Business Overview
        </motion.h2>
        <div className="flex p-4">
          <div className="w-[60%]  p-6">
            <h3 className="text-[25px] w-[350px] font-medium">
              Your experience is everything to us
            </h3>
            <div className="flex space-x-4">
              <img src={overview} alt="" />
              <div className="pt-7">
                <p className="text-[16px] text-justify">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                  autem. Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Error, dolores? The point of using Lorem Ipsum is that
                  it has a more-or-less normal distribution of letters, as
                  opposed to using 'Content here, content here making.
                </p>
                <button className="bg-[#FE9900] rounded-2xl px-4 py-1 text-white mt-4">
                  Know More
                </button>
              </div>
            </div>
            <div className="flex justify-between  w-[550px] pt-10">
              <div className="flex justify-center gap-2 border-b items-center hover:border-[#00953B]">
                <p className="text-[40px] font-semibold">240+</p>
                <p className="w-[50px]">Business Peoples</p>
              </div>
              <div className="flex justify-center gap-2 border-b items-center hover:border-[#00953B]">
                <p className="text-[40px] font-semibold">100%</p>
                <p className="w-[50px]">Customer Satisfaction</p>
              </div>
            </div>
          </div>
          <div className="w-[40%] flex justify-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              src={overviewImg}
              alt=""
              className="rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#f3f3f3] py-10">
        <motion.h2
          className="text-[36px] font-semibold py-[40px] text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          Our Values
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-10">
          {dummyValues.map((items, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="relative flex flex-col items-center w-[250px]"
            >
              {/* Top Circle Icon */}
              <div className="absolute -top-1">
                <div className="w-[80px] h-[80px] bg-green-600 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                  <img
                    src={items.image}
                    alt=""
                    className="w-[40px] h-[40px] object-contain"
                  />
                </div>
              </div>

              {/* Card */}
              <div className="mt-10 w-full bg-white rounded-xl overflow-hidden shadow-md  transition-transform duration-300">
                <div className="h-[20px] bg-[#00953B]"></div>
                <div className="p-6">
                  <h3 className="font-semibold text-[16px] text-center">
                    {items.title.split(" ").slice(0, 1).join(" ")}
                    <br />
                    {items.title.split(" ").slice(1).join(" ")}
                  </h3>
                  <p className="text-[14px] text-justify pt-4">
                    {items.description}
                  </p>
                </div>
                <div className="h-[20px] bg-[#FE9900]"></div>
              </div>

              {/* Bottom Circle Number */}
              <div className="mt-4">
                <div className="w-[50px] h-[50px] rounded-full border-2 border-[#fe9900] bg-white flex items-center justify-center text-[#00953B] font-bold text-xl">
                  {items.id}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white h-[780px]">
        <motion.h2
          className="text-center py-10 font-semibold text-[36px]"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          Team Introduction
        </motion.h2>
        <div className="flex justify-evenly">
          {dummyTeam.map((item, i) => (
            <motion.div
              className="w-[400px] bg-[#EEEEEE] mb-4"
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div>
                <img src={item.image} alt={item.name} />
              </div>
              <div className=" group flex flex-col items-center justify-center pt-2 px-4 hover:bg-[#FE9900] hover:text-white text-justify">
                <p className="text-[20px] font-semibold">{item.name}</p>
                <p className="text-[20px] font-semibold">{item.title}</p>
                <p className="text-[16px] pt-2 items-center">
                  {item.description}
                </p>
                <div className="flex justify-center  gap-2 items-center text-gray-500 group-hover:text-white py-2">
                  <Link to={item.facLink}>
                    <IoLogoFacebook size={30} />
                  </Link>
                  <Link to={item.instaLink}>
                    <FaSquareInstagram size={30} />
                  </Link>
                  <Link to={item.linkdin}>
                    <FaLinkedin size={30} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content;
