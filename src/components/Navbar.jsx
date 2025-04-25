import logo from '../assets/logo.png'

function Navbar() {
  return (
    <div className='w-full h-[82px]'>
        <nav className='flex'>
            <div className='w-[35%] px-10 py-1'>
                <img src={logo} alt="" />
            </div>
            <div className='w-[65%] flex justify-center'>
                <ul className='flex justify-evenly items-center w-full'>
                    <li className="hover:text-[#00953B]">Home</li>
                    <li className="hover:text-[#00953B]">About Us</li>
                    <li className="hover:text-[#00953B]">Employee Portal</li>
                    <li className="hover:text-[#00953B]">Student Portal</li>
                    <li className="hover:text-[#00953B]">Careers</li>
                    <li className="hover:text-[#00953B]">Marketplace</li>
                    <li className="hover:text-[#00953B]">Contact Us</li>
                    <li className="hover:text-[#00953B]">Sign Up/Log in</li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
