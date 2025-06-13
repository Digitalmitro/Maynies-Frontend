import { motion } from "framer-motion";
import banner from "../../assets/marketbanner.png";
import market2 from "../../assets/market2.png";
const marketplaceData = {
  main: {
    title: "Work Japan",
    subtitle: "JENZA | Career Services",
    description:
      "Cool snow jobs, Work Japan (£1,099). We provide the visa, job concierge, and ski work in Japan in one go for up to 12 months",
    bulletPoints: [
      "12-month visa",
      "Ski resort or summer jobs",
      "Degree required",
      "Flights not included",
    ],
    note: "Book now or later. Secure your slot with just £100 and choose your start date within 12 months.",
    price: "£1,099",
    image: market2,
  },
  moreFrom: [
    {
      title: "Internships UK Visa Sponsorship",
      subtitle:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae pariatur omnis itaque soluta earum ut distinctio dolore fugiat aliquid ab.",
      price: "$1,539",
      image: market2,
    },
    {
      title: "Internships UK Placement Support",
      subtitle:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae pariatur omnis itaque soluta earum ut distinctio dolore fugiat aliquid ab.",
      price: "$1,919",
      image: market2,
    },
    {
      title: "Work Canada",
      subtitle:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae pariatur omnis itaque soluta earum ut distinctio dolore fugiat aliquid ab.",
      price: "£749",
      image: market2,
    },
  ],
};

function SingleMarketplace() {
  const { main, moreFrom } = marketplaceData;

  return (
    <>
      <div className="relative w-full">
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
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
          Work Japan
        </motion.h2>
      </div>
      <div className="flex flex-col px-4 lg:px-20 py-10 text-gray-700">
        {/* Hero Section */}
        <div className="lg:flex border border-gray-300">
          <div className="w-full lg:w-[60%]">
            <img
              src={main.image}
              alt={main.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-[40%] p-6 border-t lg:border-t-0 lg:border-l border-gray-300 bg-white flex flex-col justify-between">
            <div className="">
              <h2 className="text-2xl font-bold mb-2">{main.title}</h2>
              <p className="text-sm text-gray-500 mb-1">{main.subtitle}</p>
              <p className="text-sm mt-4">{main.description}</p>
              <ul className="list-disc pl-5 text-sm mt-4 space-y-1">
                {main.bulletPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
              <p className="text-sm mt-4">{main.note}</p>
            </div>
            <div className="mt-6">
              <p className="font-bold text-xl text-orange-600">{main.price}</p>
              <button className="bg-yellow-400 text-black mt-4 py-2 px-6 rounded font-semibold">
                Visit JENZA
              </button>
            </div>
          </div>
        </div>

        {/* More from JENZA */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-6">More from JENZA</h3>
          <div className="lg:flex">
            {/* Sidebar */}
            <div className="lg:w-[30%] text-sm text-gray-600 pr-6 mb-6 lg:mb-0">
              <p>
                Who is JENZA? Can I trust them? And why are they shouting about
                trusted travel and ethical work abroad? All fair questions –
                here’s the short story...
              </p>
              <p className="mt-4">
                JENZA is a certified B Corp that reinvests 100% of its profits
                back into social impact programs.JENZA is a certified B Corp
                that reinvests 100% of its profits back into social impact
                programs.JENZA is a certified B Corp that reinvests 100% of its
                profits back into social impact programs.JENZA is a certified B
                Corp that reinvests 100% of its profits back into social impact
                programs.JENZA is a certified B Corp that reinvests 100% of its
                profits back into social impact programs.JENZA is a certified B
                Corp that reinvests 100% of its profits back into social impact
                programs.JENZA is a certified B Corp that reinvests 100% of its
                profits back into social impact programs.JENZA is a certified B
                Corp that reinvests 100% of its profits back into social impact
                programs.
              </p>
            </div>

            {/* Card List */}
            <div className="lg:w-[70%] space-y-6">
              {moreFrom.map((item, index) => (
                <div key={index} className="flex border border-gray-300">
                  <div className="w-[30%]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-[70%]  flex justify-between border border-gray-300">
                    <div className="w-[70%] p-4">
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="text-right flex flex-col p-4 justify-between w-[30%] border-l border-gray-300">
                      <p className="text-[12px]  text-center">
                        From{" "}
                        <span className="text-orange-600 font-bold text-[18px] ">
                          {item.price}
                        </span>
                      </p>
                      <p className="text-[10px]  text-center">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Nisi, ullam
                      </p>
                      <button className="bg-yellow-400 text-black mt-2 py-1 px-4 rounded text-sm">
                        Find out more
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleMarketplace;
