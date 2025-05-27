import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/ClipLoader";
import Input from "./Input";
import { toast } from "react-toastify";
import { auth, provider } from "../firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";

function Signin({ togglesignin }) {
  const handle_toggle_click = () => {
    togglesignin(true);
  };
  function resetpassword() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        toast.success("If an account with this email exists, a reset link has been sent.");
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        // ..
      });
  }
  function signupwithgoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const { isNewUser } = getAdditionalUserInfo(result);

  
        setauthloading(true);
        setTimeout(() => {
          navigate("/dashboard"); // Change this to your target route
        }, 1000);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        toast.error(errorMessage);
      });
  }
  function signinwithemail(e) {
    e.preventDefault();
    setloading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("Signed in");
        setloading(false);
        setauthloading(true);
        setTimeout(() => {
          navigate("/dashboard");
          setauthloading(false);
        }, 1000);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setloading(false);
      });
  }
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setauthloading] = useState(false);

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
          <p className="text-right text-sm text-[#0000EE]  mt-1 mb-4">
            <span className="cursor-pointer" onClick={resetpassword}>Forgot Password?</span>
          </p>

          <button
            onClick={signinwithemail}
            disabled={loading}
            type="button"
            className=" w-full px-4 py-3 border border-solid  border-[#ff7bac] bg-[#ff7bac] rounded-md text-white shadow-sm mb-2 "
          >
            {loading ? <p>loading</p> : <p>Login</p>}
          </button>
          <p className="text-center font-semibold text-black mx-2">or</p>
          <button
            onClick={signupwithgoogle}
            disabled={loading}
            type="button"
            className="w-full px-4 py-3 border border-black bg-white rounded-md text-black shadow-sm flex items-center justify-center space-x-2 mt-2"
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
          <p className="text-center mt-10">
            Haven't signed up yet?{" "}
            <span
              className="text-[#0000EE] cursor-pointer underline"
              onClick={handle_toggle_click}
            >
              Create an account
            </span>
          </p>
        </form>
      </div>
      {authLoading && (
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

export default Signin;
