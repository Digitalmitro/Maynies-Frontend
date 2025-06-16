import logo from "../assets/logo.svg";
import login from "../assets/login.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp ,email}), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

     
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
        <h2 className="text-[25px] text-center w-full pt-4 pb-8">Verify OTP</h2>

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

          {error && (
            <p className="text-red-600 font-medium mb-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "opacity-60 cursor-not-allowed" : ""
            } bg-[#FE9900] rounded px-4 py-2 text-white w-[90%] lg:w-[50%]`}
          >
            {loading ? "Verifying..." : "Verify"}
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
