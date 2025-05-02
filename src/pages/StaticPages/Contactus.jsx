import banner from "../../assets/about/contact.png";
import about_5 from "../../assets/about/about_5.svg";
import about_9 from "../../assets/about/about_9.svg";
import about_7 from "../../assets/about/about_7.svg";
import about_8 from "../../assets/about/about_8.svg";
import about_4 from "../../assets/about/about_4.svg";
import { motion } from "framer-motion";
import { useState } from "react";
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
function Contactus() {
  const [thank, setThank] = useState(false);
  const handleSubmit = () => {
    setThank(true);
  };
  return (
    <div>
      {thank ? (
        <>
          <div className="w-full bg-[#EDECEC] h-[400px] flex flex-col justify-center items-center px-4 text-center">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-green-600 font-medium text-sm"
            >
              Submission Successful
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="font-semibold text-[28px] sm:text-[36px] md:text-[40px] leading-tight mt-2"
            >
              Thank You for Contacting Us!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-gray-700 text-sm sm:text-base mt-3"
            >
              We'll contact you with further information within 1–2 business
              days.
            </motion.p>
          </div>
        </>
      ) : (
        <>
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
                font-semibold text-[40px] z-20 text-center"
            >
              Contact Us
            </motion.h2>
          </div>
          <div className="flex justify-center items-center px-20 py-[100px] w-full">
            {/* Contact Info Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="space-y-4 w-[40%] flex flex-col justify-center lg:pl-20"
            >
              <h4 className="text-xl font-semibold">Way to reach us:</h4>
              <p className="text-[#00953B]">+1 405 638-5343</p>
              <p className="text-[#00953B]">maynies05@gmail.com</p>
              <p>Monday-Friday 9:00am-5:00pm MST</p>
              <h4 className="text-xl font-semibold pt-2">
                Head Office & Mailing Address:
              </h4>
              <p className="w-[200px]">
                #210-1702 4 Street SW Calgary, Alberta, Canada T2S 3A8
              </p>
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="rounded-lg overflow-hidden flex justify-center items-center w-[60%]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.8385726795154!2d-114.07380222417746!3d51.03760214491585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5371701c1ab5862d%3A0x580336b67296461b!2s1702%204%20St%20SW%20%23210%2C%20Calgary%2C%20AB%20T2S%203A8%2C%20Canada!5e0!3m2!1sen!2sin!4v1745994213624!5m2!1sen!2sin"
                width="600"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>

          <div className="bg-[#EDECEC] w-full px-40 py-[50px] space-y-2">
            <motion.h2
              className="text-[25px] font-semibold text-[#FE9900]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              General Inquiries or Sales
            </motion.h2>

       
            <motion.div
              className="flex justify-between w-full pt-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <input
                type="text"
                placeholder="First Name"
                className="outline-1 outline-gray-500 px-4 w-[45%] py-2 rounded"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="outline-1 outline-gray-500 px-4 w-[45%] py-2 rounded"
              />
            </motion.div>

       
            <motion.div
              className="flex justify-between w-full pt-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <input
                type="text"
                placeholder="Email"
                className="outline-1 outline-gray-500 px-4 w-[45%] py-2 rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                className="outline-1 outline-gray-500 px-4 w-[45%] py-2 rounded"
              />
            </motion.div>

  
            <motion.div
              className="flex justify-between w-full pt-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <textarea
                rows={6}
                placeholder="How can we help you?"
                className="outline-1 outline-gray-500 px-4 w-full py-2 rounded"
              />
            </motion.div>


            <motion.button
              className="bg-[#FE9900] rounded-md px-4 py-2 text-white mt-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              onClick={handleSubmit}
            >
              Submit
            </motion.button>
          </div>
        </>
      )}

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
          viewport={{ once: false, amount: 0.2 }}
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
    </div>
  );
}

export default Contactus;
