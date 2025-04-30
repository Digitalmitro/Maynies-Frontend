import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Aboutus from "./pages/StaticPages/Aboutus";
import MainLayout from "./components/MainLayout";
import PlainLayout from "./components/PlainLayout";
import Home from "./pages/Homepage/Home";
import Contactus from "./pages/StaticPages/Contactus";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Navbar + Footer */} 
       <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/contact-us" element={<Contactus />} />

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
