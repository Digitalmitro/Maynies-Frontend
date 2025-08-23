import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PlainLayout = () => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

    useEffect(() => {
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("id");

    if (role && id) {
      // agar login hai toh previous page pe redirect kar
      // ya agar directly login page pe aaya hai, toh "/" ya fallback route bhej
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } else {
      setChecking(false);
    }
  }, [navigate]);


    if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Checking...</p>
      </div>
    );
  }

  return <Outlet />;
};

export default PlainLayout;
