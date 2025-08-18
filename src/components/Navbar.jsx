import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const role = localStorage.getItem("role");
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="w-full h-[82px] bg-[#EDECEC] fixed top-[40px] z-50 shadow">
      <nav className="flex items-center justify-between px-6 h-full">
        {/* Logo */}
        <div className="w-[40%] md:w-auto cursor-pointer">
          <img
            src={logo}
            alt="Logo"
            className="h-[60px]"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="w-[65%] flex justify-center">
          <ul className="hidden lg:flex justify-evenly items-center w-full font-medium">
            <li>
              <Link to="/" className="hover:text-[#00953B]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-[#00953B]">
                About Us
              </Link>
            </li>
            {/* <li>
              <Link to="/employee-portal" className="hover:text-[#00953B]">
                Employee Portal
              </Link>
            </li>
            <li>
              <Link to="/student-portal" className="hover:text-[#00953B]">
                Student Portal
              </Link>
            </li> */}
            <li>
              <Link to="/careers" className="hover:text-[#00953B]">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className="hover:text-[#00953B]">
                Marketplace
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-[#00953B]">
                Contact Us
              </Link>
            </li>
            {role ? (
              <>
                <li>
                  <Link to="/dashboard" className="hover:text-[#00953B]">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-[#00953B]">
                    Cart
                  </Link>
                </li>
                <li>
                  <button onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }} className="hover:text-[#00953B]">
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="hover:text-[#00953B]">
                  Sign Up / Log in
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#EDECEC] px-6 py-4 shadow-md">
          <ul className="flex flex-col gap-4 font-medium text-sm">
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" onClick={toggleMenu}>
                About Us
              </Link>
            </li>
            {/* <li>
              <Link to="/employee-portal" onClick={toggleMenu}>
                Employee Portal
              </Link>
            </li>
            <li>
              <Link to="/student-portal" onClick={toggleMenu}>
                Student Portal
              </Link>
            </li> */}
            <li>
              <Link to="/careers" onClick={toggleMenu}>
                Careers
              </Link>
            </li>
            <li>
              <Link to="/marketplace" onClick={toggleMenu}>
                Marketplace
              </Link>
            </li>
            <li>
              <Link to="/contact-us" onClick={toggleMenu}>
                Contact Us
              </Link>
            </li>
              {role ? (
              <>
                <li>
                  <Link to="/dashboard" className="hover:text-[#00953B]">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-[#00953B]">
                    Cart
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="hover:text-[#00953B]">
                  Sign Up / Log in
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;