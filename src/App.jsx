import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Aboutus from "./pages/StaticPages/Aboutus";
import MainLayout from "./components/MainLayout";
import PlainLayout from "./components/PlainLayout";
import DashboardLayout from "./components/DasboardLayout";
import Home from "./pages/Homepage/Home";
import Contactus from "./pages/StaticPages/Contactus";
import PrivacyPolicy from "./pages/StaticPages/PrivacyPolicy";
import Privacy from "./pages/Users/PrivacyPolicy";
import Terms from "./pages/StaticPages/Terms";
import Career from "./pages/career/Career";
import Portalpage from "./pages/EmployeePortal/Portalpage";
import Studpotal from "./pages/Student Portal/Studpotal";
import AllMarketplace from "./pages/marketplace/AllMarketplace";
import SingleMarketplace from "./pages/marketplace/SingleMarketplace";
import ScrollToTop from "./ScrollToTop";
import AllJobs from "./pages/career/AllJobs";
import Job from "./pages/career/Job";
import DashBoard from "./pages/Users/DashBoard";
import EmployeeProfile from "./pages/Users/EmployeeForm";
import KYCForm from "./pages/Users/KYCForm";
import Vacation from "./pages/Users/Vacation";
import Payroll from "./pages/Users/Payroll";
import ViewPayroll from "./pages/Users/ViewPayroll";
import Demographics from "./pages/Users/Demographics";
import NotRegistered from "./components/Notregistered";
import AdmissionForm from "./pages/Users/Admission";
import PaymentPlans from "./pages/Users/Payment";
import AcademicCalendar from "./pages/Users/AcademicCalendar";
import StudentProgress from "./pages/Users/StudentProgress";
import StudentDemographic from "./pages/Users/StudentDemographic";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import OtpVerification from "./components/OtpVerification";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
          <Route path="/job" element={<Job />} />
        </Route>

        {/* Routes without Navbar + Footer */}
        <Route element={<PlainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/not-registered" element={<NotRegistered />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/otp" element={<OtpVerification />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="profile" element={<EmployeeProfile />} />
          <Route path="kycFrom" element={<KYCForm />} />
          <Route path="vacation" element={<Vacation />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="Payroll" element={<Payroll />} />
          <Route path="viewPayroll" element={<ViewPayroll />} />
          <Route path="demographics" element={<Demographics />} />
          <Route path="admission" element={<AdmissionForm />} />
          <Route path="payment" element={<PaymentPlans />} />
          <Route path="progress" element={<StudentProgress/>} />
          <Route path="calender" element={<AcademicCalendar />} />
          <Route path="studentDemographic" element={<StudentDemographic />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
