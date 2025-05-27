import React, { useEffect } from "react";

import logo from "../assets/logo.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { DotLoader } from "react-spinners";

function Header() {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/Dashboard");
      }, 1000);
    }
    else{
      setTimeout(() => {
        navigate("/");
      }, 1000);

    }
  }, [user,navigate]);
  function Logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("User logged out");

        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
    
  }

  return (
    <div className="flex justify-between font-inter  z-50 h-16 p-4 fixed top-0 left-0 items-center bg-white shadow-md w-full">
      <div className="flex items-center space-x-2 p-1 pl-2">
        <img src={logo} className="w-auto h-8" alt="logo" />
        <h2 className="font-bold tracking-wide  text-black">MoneyMate</h2>
      </div>
      {user && !loading && (
        <div className="text-black- p-1">
          <button className="font-bold" onClick={Logout}>
            Logout
          </button>
        </div>
      )}
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white flex flex-col items-center justify-center z-50">
          <DotLoader size={50} color="#ff7bac" />
          <p className="mt-4 text-lg font-semibold text-[#ff7bac]">
            Logging in
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
