import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import Request from "./pages/Request";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DonateForm from "./pages/DonateForm";
import Profile from "./pages/Profile";
import Requests from "./pages/Requests";
import AdminReports from "./pages/AdminReports";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <Header />
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donate-form" element={<DonateForm />} />
          <Route path="/request" element={<Request />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin-reports" element={<AdminReports />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
