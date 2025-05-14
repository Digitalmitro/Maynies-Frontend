import logo from "../assets/logo.svg";
import login from "../assets/login.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';

function Login() {
  const [enabled, setEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();
  return (
    <div className=" flex flex-col lg:flex-row ">
      <div className="flex flex-col justify-center items-center  lg:w-[35%] lg:py-10">
        <img src={logo} alt="" className="w-[148px] h-[148px] hidden lg:block" />
        <img src={login} alt="" className="w-[400px] h-[400px]" />
      </div>
      <div className="bg-[#EDEDED] lg:pt-28 font-semibold lg:w-[65%] w-full pb-10">
        <h2 className="text-[25px] text-center  w-full pt-4   pb-8">
          Log into your account
        </h2>
        <form action="" className="flex justify-center items-center flex-col ">
          <div className="flex flex-col w-[90%] lg:w-[50%] h-[80px] space-y-2 mb-3">
            <label htmlFor="" className="font-normal">Email Address</label>
            <input
              type="text"
              className="bg-white h-[50px] rounded outline-none px-4"
            />
          </div>
          <div className="flex flex-col w-[90%] lg:w-[50%] h-[80px] space-y-2 relative">
      <label htmlFor="password" className="font-normal">Password</label>
      <div className="relative">
        <input
          id="password"
          type={showPassword ? "text" : "text"} // make 2nd text password later
          className="bg-white h-[50px] rounded outline-none px-4 pr-12 w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <IoEyeOffSharp className="h-6 w-6 text-gray-600" />
          ) : (
            <IoEyeSharp className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>
    </div>
          <div className="flex justify-between w-[90%] lg:w-[50%] h-[80px] space-y-2 pt-4">
            <p className="pt-2 font-normal">Enable Multi-factor Authentication ?</p>

            <div
              className={`w-24 h-9 flex items-center bg-gray-200 rounded-full p-1 cursor-pointer transition-all duration-300 ${
                enabled ? "justify-end" : "justify-start"
              }`}
              onClick={() => setEnabled(!enabled)}
            >
              {enabled ? (
                <div className="flex items-center gap-1 pr-2">
                  <div className="w-7 h-7 bg-orange-500 rounded-full shadow-md"></div>
                </div>
              ) : (
                <div className="flex">
                  <div className="w-7 h-7 bg-orange-500 rounded-full shadow-md"></div>
                  <span className="text-green-600 text-md px-2 font-semibold pt-0.5">Yes</span>
                </div>
              )}
            </div>
          </div>
          <button className="bg-[#FE9900] rounded px-4 py-2 text-white  w-[90%] lg:w-[50%]" onClick={()=>navigate("/dashboard")}>Log In</button>
          <Link className="text-[#00953B] font-normal pt-4">Forget Password?</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
