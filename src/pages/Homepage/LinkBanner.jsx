import { Link } from "react-router-dom";
import mail from "../../assets/mail.svg";
import location from "../../assets/location.svg";
import printerest from "../../assets/printerest.svg";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import facebook from "../../assets/facebook.svg";
function LinkBanner() {
  return (
    <div className="w-full fixed top-0 z-50 shadow">
      <div className="h-[40px] flex bg-black text-[13px] text-white p-1 justify-between items-center">
        <div className="flex w-[50%] space-x-8 px-4">
          <p className="flex">
            <img src={location} alt="" className="h-[15px] w-[15px] pt-1"/>
            12880 SW Scholls Ferry Rd Tigard, OR 97223
          </p>
          <p className="flex">
            <img src={mail} alt="" className="h-[14px] pt-1 w-[14px]"/>
            &nbsp;&nbsp;&nbsp; maynies05@gmail.com
          </p>
        </div>
        <div className="flex justify-end gap-4  w-[50%] px-4">
          <Link>
            <img src={twitter} alt="" className="h-[30px] w-[30px]"/>
          </Link>
          <Link>
            <img src={facebook} alt="" className="h-[30px] w-[30px]"/>
          </Link>
          <Link>
            <img src={printerest} alt="" className="h-[30px] w-[30px]"/>
          </Link>
          <Link>
            <img src={instagram} alt="" className="h-[30px] w-[30px]"/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LinkBanner;
