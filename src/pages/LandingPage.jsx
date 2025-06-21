// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold">Welcome to Neighbourly</h1>
      <p className="text-lg mt-4">Give what you can. Take what you need.</p>
      <script type="module" src="login.jsx"></script>
      <script type="module" src="register.jsx"></script>
      <div className="mt-6 space-x-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Sign Up
        </Link>
        <Link
          to="/dashboard"
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Continue as Guest
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
