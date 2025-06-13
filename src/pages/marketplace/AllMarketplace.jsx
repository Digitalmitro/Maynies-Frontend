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
    {/* Hero Banner Section */}
    <div className="relative w-full">
      <motion.img
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
        src={banner}
        alt="Marketplace banner"
        className="w-full h-auto md:h-[400px] object-cover brightness-75"
      />
      <div className="absolute inset-0 bg-white/50 z-10" />
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              font-semibold text-3xl sm:text-4xl lg:text-[40px] z-20 text-center px-4"
      >
        Marketplace
      </motion.h2>
    </div>
  
    {/* Marketplace Listings */}
    <div className="py-10 md:py-20 px-4 sm:px-8 lg:px-20 xl:px-40">
      {dummyMarket.map((place, i) => (
        <div key={i} className="border border-gray-300 flex flex-col md:flex-row w-full mb-8 md:mb-10">
          {/* Image Section */}
          <div className="w-full md:w-[20%] h-48 md:h-auto">
            <img 
              src={market} 
              alt={place.title} 
              className="w-full h-full object-cover" 
            />
          </div> 
          
          {/* Description Section */}
          <div className="py-4 px-4 md:px-8 border-t md:border-t-0 md:border-l border-gray-300 w-full md:w-[60%] text-gray-500 h-auto">
            <h3 className="font-bold text-lg sm:text-xl lg:text-[20px] text-gray-700">{place.title}</h3>
            <div>
              <p className="text-sm sm:text-[15px] pt-2">{place.description}</p>
              <p className="pt-4 sm:pt-6 md:pt-10">{place.provider}</p>
            </div>
          </div>
          
          {/* Price and CTA Section */}
          <div className="py-4 px-4 w-full md:w-[20%] flex flex-col border-t md:border-t-0 md:border-l border-gray-300 justify-between text-gray-700">
            <div className="space-y-2 w-full mb-4 md:mb-0">
              <p className="text-sm sm:text-[15px]">
                From <span className="text-orange-600">$ {place.price}</span>
              </p>
              <p className="text-sm sm:text-[15px]">{place.price_note}</p>
            </div>
            <div className="flex justify-center pb-4 md:pb-0">
              <button 
                className="bg-amber-300 py-2 px-4 sm:py-2 sm:px-5 text-sm sm:text-base cursor-pointer hover:bg-amber-400 transition-colors"
                onClick={() => navigate("/SingleMarketplace")}
              >
                Find out more
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default AllMarketplace;
