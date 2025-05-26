import React, { useState } from "react";
import Input from "./Input";
// import { toast } from "react-toastify";
// import { auth, provider } from "../firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   getAdditionalUserInfo
// } from "firebase/auth";

function Signin() {
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setloading] = useState(false);
 
  return (
    <div className="flex flex-col md:ml-24 rounded-3xl p-4 bg-white h-full w-full max-w-md sm:w-full md:w3/4   shadow-lg font-inter">
      <div className="font-inter items-center justify-center pt-3">
        <h1 className="text-center font-semibold text-2xl mb-1">
          {" "}
          Sign Up on{" "}
          <span className="text-[#ff7bac] font-bold text-4xl">
            MoneyMate
          </span>{" "}
        </h1>
        <hr></hr>
      </div>
      <div className="flex flex-col m-3 mt-14">
        <form>
      
          <Input
            type="email"
            label="Email"
            placeholder="Email"
            state={email}
            setState={setEmail}
          ></Input>
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            state={password}
            setState={setPassword}
          ></Input>
          <p className="items-left mb-3">Forgot Password</p>
        
          <button
            disabled={loading}
            type="button"
            
            className=" w-full px-4 py-3 border border-solid  border-[#ff7bac] bg-[#ff7bac] rounded-md text-white shadow-sm "
          >
            {loading ? <p>loading</p> : <p>Login</p>}
          </button>
          <p className="text-center font-semibold text-black mx-2">or</p>
          <button
            disabled={loading}
            
            type="button"
            className="w-full px-4 py-3 border border-black bg-white rounded-md text-black shadow-sm flex items-center justify-center space-x-2 "
          >
            {loading ? (
              <p>loading</p>
            ) : (
              <div className="flex">
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5 mr-1"
                />
                <span>Sign In with Google</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
