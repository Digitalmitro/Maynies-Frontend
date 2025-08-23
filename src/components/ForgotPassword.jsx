import logo from "../assets/logo.svg";
import login from "../assets/login.png";
import { useState } from "react";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // TODO: Add API call here
    console.log("New password set:", password);
    navigate("/login");
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-col justify-center items-center lg:w-[35%] lg:py-10">
        <img
          src={logo}
          alt="Logo"
          className="w-[148px] h-[148px] hidden lg:block"
        />
        <img src={login} alt="Reset Illustration" className="w-[400px] h-[400px]" />
      </div>

      <div className="bg-[#EDEDED] lg:pt-28 font-semibold lg:w-[65%] w-full pb-10">
        <h2 className="text-[25px] text-center w-full pt-4 pb-8">
          Set New Password
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col"
        >
          {/* New Password */}
          <div className="flex flex-col w-[90%] lg:w-[50%] h-[80px] space-y-2 relative mb-3">
            <label htmlFor="password" className="font-normal">
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white h-[50px] rounded outline-none px-4 pr-12 w-full"
                required
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

          {/* Confirm Password */}
          <div className="flex flex-col w-[90%] lg:w-[50%] h-[80px] space-y-2 relative">
            <label htmlFor="confirmPassword" className="font-normal">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white h-[50px] rounded outline-none px-4 pr-12 w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <IoEyeOffSharp className="h-6 w-6 text-gray-600" />
                ) : (
                  <IoEyeSharp className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#FE9900] mt-6 rounded px-4 py-2 text-white w-[90%] lg:w-[50%]"
            onClick={() => navigate("/login")}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
