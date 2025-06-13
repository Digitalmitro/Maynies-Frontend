import logo from "../assets/logo.svg";
import login from "../assets/login.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate();
  return (
    <div className=" flex flex-col lg:flex-row ">
      <div className="flex flex-col justify-center items-center  lg:w-[35%] lg:py-10">
        <img
          src={logo}
          alt=""
          className="w-[148px] h-[148px] hidden lg:block"
        />
        <img src={login} alt="" className="w-[400px] h-[400px]" />
      </div>
      <div className="bg-[#EDEDED] lg:pt-28 font-semibold lg:w-[65%] w-full pb-10">
        <h2 className="text-[25px] text-center  w-full pt-4   pb-8">
          Create your account
        </h2>
        <form action="" className="flex justify-center items-center flex-col ">
          <div className="flex flex-col w-[90%] lg:w-[50%] h-[80px] space-y-2 mb-3">
            <label htmlFor="" className="font-normal">
              User Name
            </label>
            <input
              type="name"
              name="name"
              className="bg-white h-[50px] rounded outline-none px-4"
            />
          </div>
          <div className="flex flex-col w-[90%] lg:w-[50%] h-[80px] space-y-2 mb-3">
            <label htmlFor="" className="font-normal">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="bg-white h-[50px] rounded outline-none px-4"
            />
          </div>
          <div className="flex flex-col w-[90%] lg:w-[50%] h-[80px] space-y-2 relative">
            <label htmlFor="password" className="font-normal">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
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
          <button
            type="button"
            className="bg-[#FE9900] mt-6 rounded px-4 py-2 text-white  w-[90%] lg:w-[50%]"
            onClick={() => navigate("/otp")}
          >
            Sign Up
          </button>
          <p className="text-gray-500 font-medium pt-2">
            already have an account ?{" "}
            <Link
              to={"/login"}
              className="text-[#00953B] font-normal pt-4 underline"
            >
              {" "}
              login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
