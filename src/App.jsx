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
import ScrollToTop from "./ScrollToTop";
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
