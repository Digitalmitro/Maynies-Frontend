import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaEnvelope, FaTwitter, FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";

function LinkBanner() {
  return (
    <div className="w-full fixed top-0 z-50 shadow">
      <div className="h-[40px] flex bg-black text-[13px] text-white p-1 justify-between items-center">
        {/* Left Section - Location & Email */}
        <div className="flex w-[50%] space-x-8 px-4 items-center">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt size={14} />
            <span className="hidden lg:block">12880 SW Scholls Ferry Rd Tigard, OR 97223</span>
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope size={13} />
            <span className="hidden lg:block">
            maynies05@gmail.com
            </span>
          </p>
        </div>

        {/* Right Section - Social Icons */}
        <div className="flex justify-end gap-4 w-[50%] px-4">
          <Link to="#"><FaTwitter size={18} className="hover:text-[#00953B]" /></Link>
          <Link to="#"><FaFacebookF size={18} className="hover:text-[#00953B]" /></Link>
          <Link to="#"><FaPinterestP size={18} className="hover:text-[#00953B]" /></Link>
          <Link to="#"><FaInstagram size={18} className="hover:text-[#00953B]" /></Link>
        </div>
      </div>
    </div>
  );
}

export default LinkBanner;
