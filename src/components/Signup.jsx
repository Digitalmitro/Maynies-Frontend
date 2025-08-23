import logo from "../assets/logo.svg";
import login from "../assets/login.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  
  const navigate = useNavigate();
  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(register),
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("Registration successful:", data);
        // localStorage.setItem("role", register?.role);
        localStorage.setItem("email_temp", register?.email);
        navigate("/otp");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("Register state:", loading);
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
        <form
          onSubmit={handleSumbit}
          className="flex justify-center items-center flex-col "
        >
          <div className="flex flex-col w-[90%] lg:w-[50%] h-[80px] space-y-2 mb-3">
            <label htmlFor="" className="font-normal">
              User Name
            </label>
            <input
              type="name"
              name="name"
              required
              className="bg-white h-[50px] rounded outline-none px-4"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col w-[90%] lg:w-[50%] h-[80px] space-y-2 mb-3">
            <label htmlFor="" className="font-normal">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="bg-white h-[50px] rounded outline-none px-4"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-[90%] lg:w-[50%] h-[80px] space-y-2 mb-3">
            <label htmlFor="role" className="font-normal">
              Select Role
            </label>
            <select
              name="role"
              id="role"
              className="bg-white h-[50px] rounded outline-none px-4"
              onChange={handleInputChange}
              defaultValue=""
              required
            >
              <option value="" disabled className="text-gray-300">
                select your role
              </option>
              <option value="student">Student</option>
              <option value="employer">Employee</option>
            </select>
          </div>

          <div className="flex flex-col w-[90%] lg:w-[50%] h-[80px] space-y-2 relative">
            <label htmlFor="password" className="font-normal">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="bg-white h-[50px] rounded outline-none px-4 pr-12 w-full"
                required
                onChange={handleInputChange}
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
            type="submit"
            disabled={loading}
            className={`mt-6 rounded px-4 py-2 w-[90%] lg:w-[50%] text-white transition-colors
    ${
      loading
        ? "bg-[#FE9900]/60 cursor-not-allowed" // halka aur disabled cursor
        : "bg-[#FE9900] hover:bg-[#e68900]"
    }     // normal + hover
  `}
          >
            {loading ? "Signing up..." : "Sign Up"}
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
