import React, { useEffect } from "react";
import DonateForm from "./DonateForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Donate = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        window.location.href = "/login";
      }
    });
    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <main>
        <h1>Donate Items</h1>
        <DonateForm />
      </main>
    </>
  );
};

export default Donate;
