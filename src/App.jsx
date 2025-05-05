import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Aboutus from "./pages/StaticPages/Aboutus";
import MainLayout from "./components/MainLayout";
import PlainLayout from "./components/PlainLayout";
import Home from "./pages/Homepage/Home";
import Contactus from "./pages/StaticPages/Contactus";
import PrivacyPolicy from "./pages/StaticPages/PrivacyPolicy";
import Terms from "./pages/StaticPages/Terms";
import Career from "./pages/career/Career";
import Portalpage from "./pages/EmployeePortal/Portalpage";
import Studpotal from "./pages/Student Portal/Studpotal";
import AllMarketplace from "./pages/marketplace/AllMarketplace";
import SingleMarketplace from "./pages/marketplace/SingleMarketplace";
import ScrollToTop from "./ScrollToTop";
import AllJobs from "./pages/career/AllJobs";
function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        {/* Routes with Navbar + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/contact-us" element={<Contactus />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/employee-portal" element={<Portalpage />} />
          <Route path="/student-portal" element={<Studpotal />} />
          <Route path="/marketplace" element={<AllMarketplace />} />
          <Route path="/SingleMarketplace" element={<SingleMarketplace />} />
          <Route path="/jobs" element={<AllJobs />} />

        </Route>

        {/* Routes without Navbar + Footer */}
        <Route element={<PlainLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
