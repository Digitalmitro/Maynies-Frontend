import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage/Home";
import Login from "./components/Login";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
