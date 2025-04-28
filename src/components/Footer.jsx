import { IoLogoFacebook } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import mail from "../assets/mail.svg";
import location from "../assets/location.svg";
import { FaPhoneAlt } from "react-icons/fa";
function Footer() {
  return (
    <div className="bg-black text-white py-10 px-6">
      <div className="max-w-[1240px] mx-auto flex flex-wrap justify-between gap-8">
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 max-w-[300px]">
          <img src={logo} alt="Logo" className="w-[100px] h-auto" />
          <p className="text-[14px] leading-relaxed">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor amet
            sint. Amet minim mollit non deserunt ullamco est sit aliqua.
          </p>
          <div className="flex gap-4 pt-2">
            <Link to="#">
              <IoLogoFacebook size={25} />
            </Link>
            <Link to="#">
              <FaTwitter size={25} />
            </Link>
            <Link to="#">
              <FaLinkedin size={25} />
            </Link>
          </div>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-[18px] font-semibold mb-2">Useful Links</h3>
          <div className="w-[60px] h-[2px] bg-[#00953B]"></div>
          <ul className="space-y-2 text-[14px]">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-[18px] font-semibold mb-2">Contact</h3>
          <div className="w-[60px] h-[2px] bg-[#00953B]"></div>
          <ul className="space-y-2 text-[14px]">
            <li className="flex gap-2 items-center">
              <FaPhoneAlt /> +1 405 638-5343
            </li>
            <li className="flex gap-2">
              <img src={mail} alt="" /> maynies05@gmail.com
            </li>
            <li className="flex gap-2">
              <img src={location} alt="" /> 2919 NW Cache Rd, Lawton, OK 73505,
              United States
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-[13px]">
        Copyright © {new Date().getFullYear()} Digitalmitro. All Rights
        Reserved.
      </div>
    </div>
  );
}

export default Footer;
