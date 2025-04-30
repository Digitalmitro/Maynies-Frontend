import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

function Navbar() {
    const navigate=useNavigate();
  return (
    <div className='w-full h-[82px]'>
        <nav className='flex'>
            <div className='w-[35%] px-10 py-1 cursor-pointer'>
                <img src={logo} alt="" onClick={()=>navigate("/")}/>
            </div>
            <div className='w-[65%] flex justify-center'>
                <ul className='flex justify-evenly items-center w-full'>
                    <Link to={"/"} className="hover:text-[#00953B]">Home</Link>
                    <Link to={"/about-us"} className="hover:text-[#00953B]">About Us</Link>
                    <Link  className="hover:text-[#00953B]">Employee Portal</Link>
                    <Link className="hover:text-[#00953B]">Student Portal</Link>
                    <Link className="hover:text-[#00953B]">Careers</Link>
                    <Link className="hover:text-[#00953B]">Marketplace</Link>
                    <Link to={"/contact-us"} className="hover:text-[#00953B]">Contact Us</Link>
                    <Link to={"/login"} className="hover:text-[#00953B]">Sign Up/Log in</Link>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
