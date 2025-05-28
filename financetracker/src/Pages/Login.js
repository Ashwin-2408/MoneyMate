import React from "react";
import { motion } from 'framer-motion';
import Header from "../Component/Header.js"; // Updated import path
import Signup from "../Component/Signup.js"; // Updated import path
import Signin from "../Component/Signin.js"; // Updated import path
import WelcomePanel from "../Component/WelcomePanel.js"; // Updated import path
import { useState } from "react";
import Footer from "../Component/Footer.js";

function Login() {
  const [signup, setsignup] = useState(true);
  const toggle_signup = (toggle) => {
    setsignup(toggle);
  };

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <Header />
      <div className="flex flex-col md:p-10 p-0  flex-1 bg-primary w-full  font-inter">
        <div className="flex flex-col lg:flex-row    w-full space-x-1 flex-1 ">
          <div className="   w-full md:w-1/2 flex-grow rounded-3xl  items-center">
            {/* This div contains information about the website(logo and details) */}
            <WelcomePanel></WelcomePanel>
            {/* <img src={home}/> */}
          </div>
          <motion.p
            className="w-full md:w-1/2 mt-9 flex-grow block md:hidden text-sm sm:text-base md:text-lg text-slate-600 text-center mb-8 sm:mb-10 max-w-2xl px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Track your finances effortlessly with a clear view of your balance,
            expenses, and income in the graph above to help you stay on top of
            your budget and achieve your financial goals.
          </motion.p>

          <div className="w-full md:w-1/2 flex-grow rounded-3xl p-0 md:p-5 items-center ">
            {/* This div contains the login signup form */}
            {signup ? (
              <Signup togglesSignUp={toggle_signup} />
            ) : (
              <Signin togglesignin={toggle_signup} />
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;
