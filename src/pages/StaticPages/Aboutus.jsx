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
import banner from "../../assets/about/about-banner.png";
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
    <div className="bg-[#EDECEC] w-full">
      {/* Banner Section */}
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
          font-semibold text-[28px] md:text-[40px] z-20 text-center px-4"
        >
          About Us
        </motion.h2>
      </div>

      {/* Who We Are Section */}
      <motion.div
        className="flex flex-col md:flex-row gap-10 p-6 md:p-10 w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.4 }}
      >
        <div className="md:w-[50%] space-y-2">
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
            className="text-[24px] md:text-[30px] font-semibold"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: false }}
          >
            Helping Organizations Spread Their Vision is What We Do For a Living
          </motion.h3>
          <motion.p
            className="text-justify text-sm md:text-base"
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
        <div className="md:w-[50%] flex justify-center md:justify-end">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            src={image_1}
            alt=""
            className="w-full max-w-[400px]"
          />
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="bg-white flex flex-wrap justify-center md:justify-evenly gap-6 py-8">
        {stats.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex flex-col justify-center items-center w-[140px] sm:w-[160px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: false, amount: 0.4 }}
          >
            <div className="p-4 border border-[#FE9900] rounded-xl">
              <img
                src={item.img}
                alt={item.subtitle}
                className="w-[100px] h-[100px] md:w-[134px] md:h-[134px]"
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-2">
              <h2 className="text-[24px] md:text-[40px]">{item.title}</h2>
              <p className="font-medium text-center text-sm">{item.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Left / Text Right */}
      <div className="flex flex-col md:flex-row p-6 md:p-10 gap-8 items-center">
        <motion.div
          className="md:w-[50%] flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <img src={image} alt="" className="w-full max-w-[400px]" />
        </motion.div>
        <motion.div
          className="md:w-[50%] space-y-4 text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h3 className="text-[22px] md:text-[30px] font-semibold">
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </h3>
          <p className="text-justify text-sm md:text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="bg-[#FE9900] rounded-2xl px-4 py-2 text-white mt-4">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>

      {/* Final Image & Review Cards */}
      <div className="px-4 md:px-10 py-5 bg-white w-full">
        <motion.div
          className="flex flex-col justify-center items-center text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <img src={about_4} alt="" className="w-[60%] md:w-[40%]" />
          <p className="mt-4 text-sm md:text-base">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making
          </p>
        </motion.div>

        {/* Review Cards */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-8 py-8"
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
          viewport={{ once: false, amount: 0.2 }}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              className="flex flex-col items-center text-center w-[80%] md:w-[200px]"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={review.logo}
                alt={review.platform}
                className="w-[140px] md:w-[180px] h-auto"
              />
              <div className="text-yellow-500">{review.stars}</div>
              <p className="text-sm text-gray-600">{review.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Aboutus;
