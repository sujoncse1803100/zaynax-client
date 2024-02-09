import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import Signup from "./components/Signup/Signup";
import AdmiPanel from "./components/AdminPanel/AdmiPanel";
import AdminLogin from "./components/AdminPanel/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/adminpanel" element={<AdmiPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
