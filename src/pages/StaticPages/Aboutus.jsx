import about_1 from "../../assets/about/about_1.svg";
import about_2 from "../../assets/about/about_2.svg";
import about_3 from "../../assets/about/about_3.svg";
import about_4 from "../../assets/about/about_4.svg";
import image_1 from "../../assets/about/image_1.png";
import about_5 from "../../assets/about/about_5.svg";
import about_9 from "../../assets/about/about_9.svg";
import about_7 from "../../assets/about/about_7.svg";
import about_8 from "../../assets/about/about_8.svg";
import image from "../../assets/about/image.png";
import { motion } from "framer-motion";
function Aboutus() {
  const reviews = [
    {
      id: 1,
      platform: "Capterra",
      rating: 5,
      stars: "★★★★★",
      text: "5/5",
      logo: about_5,
    },
    {
      id: 2,
      platform: "Facebook",
      rating: 5,
      stars: "★★★★★",
      text: "5/5",
      logo: about_7,
    },
    {
      id: 3,
      platform: "g2.com",
      rating: 5,
      stars: "★★★★★",
      text: "5/5",
      logo: about_8,
    },
    {
      id: 4,
      platform: "Google",
      rating: 5,
      stars: "★★★★★",
      text: "5/5",
      logo: about_9,
    },
  ];
  const stats = [
    {
      id: 1,
      img: about_1,
      title: "1,800 +",
      subtitle: "Projects Completed",
    },
    {
      id: 2,
      img: about_2,
      title: "1,000",
      subtitle: "Clients Worldwide",
    },
    {
      id: 3,
      img: about_3,
      title: "20 Years",
      subtitle: "Helping Organizations Grow",
    },
  ];

  return (
    <motion.div
      className="bg-[#EDECEC] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.5 }}
        className="text-[#FE9900] font-semibold text-[30px] border-b border-gray-400 mx-10 py-4"
      >
        About Us
      </motion.h2>
      <motion.div
        className="flex p-10 w-full justify-between"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.4 }}
      >
        <div className="w-[50%] space-y-2">
          <motion.p
            className="text-[#00953B] font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: false }}
          >
            WHO WE ARE
          </motion.p>
          <motion.h3
            className="text-[30px] font-semibold"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: false }}
          >
            Helping Organizations Spread Their Vision is What We Do For a Living
          </motion.h3>
          <motion.p
            className="text-justify"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: false }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
          </motion.p>
        </div>
        <div className="w-[50%] flex justify-end">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            src={image_1}
            alt=""
            className="w-[80%]"
          />
        </div>
      </motion.div>

      <div className="bg-white flex flex-wrap justify-evenly h-[400px]">
        {stats.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: false, amount: 0.4 }}
          >
            <div className="p-4 border border-[#FE9900] rounded-xl">
              <img
                src={item.img}
                alt={item.subtitle}
                className="w-[134px] h-[134px]"
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-2">
              <h2 className="text-[40px]">{item.title}</h2>
              <p className="font-medium text-center">{item.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex p-10">
        {/* Left Image */}
        <motion.div
          className="w-[50%]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <img src={image} alt="" className="w-[80%]" />
        </motion.div>

        {/* Right Text */}
        <motion.div
          className="w-[50%] space-y-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h3 className="text-[30px] font-semibold">
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </h3>
          <p className="text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
          </p>
          <button className="bg-[#FE9900] rounded-2xl px-4 py-1 text-white mt-4">
            Contact Us
          </button>
        </motion.div>
      </div>

      <div className="px-10 py-5 bg-white w-full">
        <motion.div
          className="flex flex-col justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <img src={about_4} alt="" className="w-[40%]" />
          <p className="text-center px-10">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making
          </p>
        </motion.div>
        {/* Review Cards */}
  <motion.div
    className="flex flex-wrap justify-evenly gap-8 py-8"
    initial="hidden"
    whileInView="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.2,
        },
      },
    }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {reviews.map((review) => (
      <motion.div
        key={review.id}
        className="flex flex-col items-center text-center"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={review.logo}
          alt={review.platform}
          className="w-[180px] h-auto"
        />
        <div className="text-yellow-500">{review.stars}</div>
        <p className="text-sm text-gray-600">{review.text}</p>
      </motion.div>
    ))}
  </motion.div>
      </div>
    </motion.div>
  );
}

export default Aboutus;
