import { motion } from "framer-motion";
import banner from "../../assets/about/about-banner.png";
import market from "../../assets/market.jpg";
import {  useNavigate } from "react-router-dom";
function AllMarketplace() {
  const navigate=useNavigate();
  const dummyMarket = [
    {
      title: "Finance Internship NYC",
      description:
        "One of New York’s most iconic features is the Financial District of Wall Street. This is the heart of the financial world and home to the New York Stock Exchange, as well as many of the world’s largest banks, credit companies, insurance companies, and much more.",
      provider: "Intern Abroad HQ | Careers Services",
      price: "1234",
      banner:"",
      price_note: "To see the fees for this program, please choose a duration.",
    },
    {
      title: "Finance Internship NYC",
      description:
        "One of New York’s most iconic features is the Financial District of Wall Street. This is the heart of the financial world and home to the New York Stock Exchange, as well as many of the world’s largest banks, credit companies, insurance companies, and much more.",
      provider: "Intern Abroad HQ | Careers Services",
      price: "1234",
      price_note: "To see the fees for this program, please choose a duration.",
    },
    {
      title: "Finance Internship NYC",
      description:
        "One of New York’s most iconic features is the Financial District of Wall Street. This is the heart of the financial world and home to the New York Stock Exchange, as well as many of the world’s largest banks, credit companies, insurance companies, and much more.",
      provider: "Intern Abroad HQ | Careers Services",
      price: "1234",
      price_note: "To see the fees for this program, please choose a duration.",
    },
    {
      title: "Finance Internship NYC",
      description:
        "One of New York’s most iconic features is the Financial District of Wall Street. This is the heart of the financial world and home to the New York Stock Exchange, as well as many of the world’s largest banks, credit companies, insurance companies, and much more.",
      provider: "Intern Abroad HQ | Careers Services",
      price: "1234",
      price_note: "To see the fees for this program, please choose a duration.",
    },

  ];
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
                font-semibold text-[40px] z-20 text-center"
        >
          Marketplace
        </motion.h2>
      </div>

      <div className="py-20 px-40">
        {dummyMarket.map((place, i) => (
          <div key={i} className="border border-gray-300 flex flex-wrap w-[100%] mb-10">
            <div className="w-[20%]">
              <img src={market} alt="" className="w-full object-cover " />
            </div> 
            <div className="py-4 px-8 border-l border-gray-300 w-[60%] text-gray-500 h-auto">
              <h3 className="font-bold text-[20px] text-gray-700">{place.title}</h3>
              <div>
              <p className="text-[15px] pt-2">{place.description}</p>
              <p className="pt-10">{place.provider}</p>
              </div>
            </div>
            <div className="py-4 px-4 w-[20%] flex flex-col border-l text-[15px] border-gray-300 justify-between text-gray-700">
              <div className="space-y-2 w-full">
                <p >From <span className="text-orange-600">$ {place.price}</span></p>
                <p>{place.price_note}</p>
              </div>
              <div className="flex justify-center">
              <button className="bg-amber-300 lg:py-2 lg:px-5 cursor-pointer" onClick={()=>navigate("/SingleMarketplace")}>Find out more</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllMarketplace;
