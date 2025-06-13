import logo from "../assets/logo.svg";
import login from "../assets/login.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Add OTP verification logic (backend)
    console.log("Entered OTP:", otp);

    // On success, redirect to reset password page
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-col justify-center items-center lg:w-[35%] lg:py-10">
        <img
          src={logo}
          alt="Logo"
          className="w-[148px] h-[148px] hidden lg:block"
        />
        <img src={login} alt="OTP Illustration" className="w-[400px] h-[400px]" />
      </div>

      <div className="bg-[#EDEDED] lg:pt-28 font-semibold lg:w-[65%] w-full pb-10">
        <h2 className="text-[25px] text-center w-full pt-4 pb-8">
          Verify OTP
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col"
        >
          <div className="flex flex-col w-[90%] lg:w-[50%] h-[80px] space-y-2 mb-3">
            <label htmlFor="otp" className="font-normal">
              Enter the OTP sent to your email
            </label>
            <input
              type="text"
              name="otp"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-white h-[50px] rounded outline-none px-4"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#FE9900]  rounded px-4 py-2 text-white w-[90%] lg:w-[50%]"
          >
            Verify
          </button>

          <p className="text-gray-500 font-medium pt-2">
            Didn't get the OTP?{" "}
            <span className="text-[#00953B] underline cursor-pointer">
              Resend
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
