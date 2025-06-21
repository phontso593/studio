import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/neighborly-black-vertical.png";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";   
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message || "Login failed. Please check your credentials.");
    }
    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <br/>
        <br/>
        <img src={logo} alt="Neighborly Logo" style={{ ...logoStyle, height: "80px", width: "80px" }} />

        <p style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 400 }}>
          Welcome back
        </p>

        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#adadad' }}>
          Please enter your detail to sign in.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {/* Apple Login button */}
          <button
            type="button"
            style={{
              backgroundColor: '',
              padding: '5px',
              borderRadius: '8px',
              border: '1px solid #000000',
              cursor: 'pointer',
              height: '30px',
              width: '80px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => {
              alert("For Apple when implement with firebase.");
            }} > 
            <img src={require("../assets/apple logo.png")} 
            alt="Apple" style={{ height: '20px', width: '35px' }} />
          </button>

          {/* Google Login button */}
          <button
            type="button"
            style={{
              backgroundColor: '',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #000000',
              cursor: 'pointer',
              height: '30px',
              width: '80px',
              fontSize: '0.9rem',
            }}
            onClick={() => {
              alert("For Google when implement with firebase.");
            }} >
              <img src={require("../assets/google logo.jpg")} 
            alt="Google" style={{ height: '18px', width: '15px',marginLeft:'20px' }} />
          </button>

          {/*LinkedIn Login button */}
          <button
            type="button"
            style={{
              backgroundColor: '',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #000000',
              cursor: 'pointer',
              height: '30px',
              width: '80px',
              fontSize: '0.9rem',
            }}
            onClick={() => {
              alert("For LinkedIn when implement with firebase.");
            }} >
              <img src={require("../assets/linkedinlogo.jpg")} 
            alt="LinkedIn" style={{ height: '20px', width: '35px',marginLeft:'10px'}} />
          </button>
        </div>

        <label style={{ ...labelStyle, fontSize: '0.95rem' }}>Email:</label>
        <input
          style={{ ...inputStyle, fontSize: '0.95rem', padding: '2px 6px' }}
          placeholder="Enter your email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label style={{ ...labelStyle, fontSize: '0.95rem' }}>Password:</label>
        <input
          style={{ ...inputStyle, fontSize: '0.95rem', padding: '2px 6px' }}
          placeholder="Password@123"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button style={{ ...buttonStyle, fontSize: '1rem', padding: '6px 0' }} type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <br />
        <p style={{ textAlign: 'center', color: '#adadad', fontSize: '0.9rem' }}>
          Don't have an account yet? <Link
            to="/register"
            style={{ color: '#000000', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
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
    padding: '10px',
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