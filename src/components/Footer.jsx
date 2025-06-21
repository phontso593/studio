// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Neighbourly. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    background: "#4CAF50",
    color: "white",
    textAlign: "center",
    padding: "10px",
    position: "relative",
    bottom: 0,
    width: "100%",
  },
};

export default Footer;
