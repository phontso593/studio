// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/neighborly-black-vertical.png";

const Header = () => {
  return (
    <header style={styles.header}>
      <img src={logo} alt="Neighbourly Logo" style={styles.logo} />
      <h1 style={styles.title}>Neighbourly</h1>
      <nav>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/donate" style={styles.link}>
          Donate
        </Link>
        <Link to="/request" style={styles.link}>
          Request
        </Link>
        <Link to="/login" style={styles.link}>
          Login
        </Link>
        <Link to="/register" style={styles.link}>
          Register
        </Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    background: "#4caf50",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: "140px",
    width: "auto",
  },
  
  title: { color: "white", margin: 0 },
  link: { color: "white", margin: "0 1rem", textDecoration: "none" },
};

export default Header;
