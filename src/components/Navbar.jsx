import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { motion } from 'framer-motion'

function Navbar() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="w-full h-[82px] bg-[#EDECEC] fixed top-[40px] z-50 shadow "
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="flex">
        <div className="w-[35%] px-10 py-1 cursor-pointer">
          <img src={logo} alt="Logo" onClick={() => navigate("/")} />
        </div>
        <div className="w-[65%] flex justify-center">
          <ul className="flex justify-evenly items-center w-full font-medium ">
            <li><Link to="/" className="hover:text-[#00953B]">Home</Link></li>
            <li><Link to="/about-us" className="hover:text-[#00953B]">About Us</Link></li>
            <li><Link to="/employee-portal" className="hover:text-[#00953B]">Employee Portal</Link></li>
            <li><Link to="/student-portal" className="hover:text-[#00953B]">Student Portal</Link></li>
            <li><Link to="/careers" className="hover:text-[#00953B]">Careers</Link></li>
            <li><Link to="/marketplace" className="hover:text-[#00953B]">Marketplace</Link></li>
            <li><Link to="/contact-us" className="hover:text-[#00953B]">Contact Us</Link></li>
            <li><Link to="/login" className="hover:text-[#00953B]">Sign Up / Log in</Link></li>
          </ul>
        </div>
      </nav>
    </motion.div>
  )
}

export default Navbar
