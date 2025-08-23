import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LinkBanner from "../pages/Homepage/LinkBanner";

const MainLayout = () => {
  return (
    <div className="bg-[#F4F4F4]">
      <LinkBanner />
      <Navbar />
      <div className="mt-[122px]">
      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
