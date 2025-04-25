import banner from "../../assets/content-banner.png";

function Content() {
  return (
    <div className="relative">
      <img src={banner} alt="" className="w-full h-auto" />
      <div className="absolute top-1/3 left-10">
      <p className=" text-[40px] font-bold w-[50%] ">
        Unlocking <span className="text-[#00953B]">Knowledge</span>, Inspiring{" "}
        <span className="text-[#00953B]">Innovation</span>, and Shaping a {" "}
        <span className="text-[#00953B]">Brighter Future</span>
      </p>
      <button className="bg-[#FE9900] rounded-2xl px-4 py-2 text-white mt-4">
        Learn More
      </button>
      </div>
      
    </div>
  );
}

export default Content;
