import React, { useState } from "react";
import logo from "../assets/neighborly-black-vertical.png";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore";  


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGnN9GJuboajSn7TdMGPFKU0xZjRLXyYA",
  authDomain: "neighbourly-jassm.firebaseapp.com",
  projectId: "neighbourly-jassm",
  storageBucket: "neighbourly-jassm.firebasestorage.app",
  messagingSenderId: "126061597996",
  appId: "1:126061597996:web:dd444bbe46c6c457a50889"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


const Register = () => {
  const [FullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const navigate = useNavigate();


const auth = getAuth(app);


function handleSubmit(e) {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Registration successful!");
      navigate("/dashboard");
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        alert("Email already in use. Please try another email.");
      } else if (errorCode === 'auth/weak-password') {
        alert("Weak password. Please enter a stronger password.");
      } else {
        alert("Error during registration: " + error.message);
      }
    });
}




  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <br />
        <img src={logo} alt="Neighborly Logo" style={{ ...logoStyle, height: "80px", width: "80px" }} />
        <p style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 600 }}>
          Create Account
        </p>


        <label style={labelStyle}>Full Name</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="Enter your full name"
          value={FullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <label style={labelStyle}>Email</label>
        <input
          style={inputStyle}
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
       
        <label style={labelStyle}>Password</label>
        <input
          style={inputStyle}
          type="password"
          placeholder="Password@123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />


        <label style={labelStyle}>Confirm Password</label>
        <input
          style={inputStyle}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />


        <div style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            id="terms-conditions"
            required
            style={{ marginRight: "8px" }}
          />
          <label htmlFor="terms-conditions" style={{ fontSize: "0.95rem", color: "#333" }}>
            I accept the <a href="#" style={{ color: "#0000d8" }}>terms and conditions</a>
          </label>
        </div>
        <br />


        <button style={buttonStyle} type="submit">Register</button>
        <p style={{ textAlign: 'center', color: '#adadad', fontSize: '0.9rem' }}>
          Already have an account? <Link
            to="/login"
            style={{ color: '#000000', textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};


export default Register;


const logoStyle= {
    height: "120px",
    width: "120px",
    display: "block",
    alignSelf: "center",
  }
const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    backgroundColor: '#f0f4f8',
  };


  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '450px',
    height: '600px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
   
  };


  const inputStyle = {
    borderRadius: '10px',
    border:'1px solid #bfc9d1',
    padding: '3px',
    fontsize: '1rem',
    outline: 'none',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const labelStyle = {
    fontweight: 'bold',
    color: 'color black',
    alignItems:'left',
  }
 const buttonStyle = {
    backgroundColor: '#0000d8',
    borderRadius:'10px',
    padding: '3px',
    color: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
 }

