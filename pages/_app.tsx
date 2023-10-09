import React from "react";
import { AppProps } from "next/app";
import Navbar from "@/components/Navbar"; // Import the Navbar component
import Footer from "@/components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar /> {/* Include the Navbar component */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
