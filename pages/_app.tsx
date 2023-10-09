import React from "react";
import { AppProps } from "next/app";
import Navbar from "@/components/Navbar"; // Import the Navbar component
import Footer from "@/components/Footer";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Juan Lopez @Zealthy</title>
        <meta name="description" content="Juan Lopez Zealthy App" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/dev.png" />
      </Head>
      <Navbar /> {/* Include the Navbar component */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
