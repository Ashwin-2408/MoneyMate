import React, { useState } from "react";
import Input from "./Input";
import { toast } from "react-toastify";
import { auth, provider } from "../firebase";
import { db, doc, setDoc } from "../firebase";
import { getDoc, serverTimestamp } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  
  
} from "firebase/auth";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function Signup({ togglesSignUp }) {
  async function createdoc(user) {
    if (!user) {
      return;
    }
    const userRef = doc(db, "Users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          name: user.displayName ? user.displayName : name,
          email: user.email ? user.email : email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: serverTimestamp(),
        });
        toast.success("doc created");
      } catch (e) {
        toast.error(e.message);
      }
    } else {
    }
  }
  const handle_toggle_click = () => {
    togglesSignUp(false);
  };

  function signupWithEmail() {
    setloading(true);
    if (password !== confirmpassword) {
      toast.error("Passwords do not match.");
      setloading(false);
      return;
    }
    if (
      name.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
      confirmpassword.length !== 0
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          toast.success("User created.");
          setloading(false);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmpassword("");
          createdoc(user);
          // ...
        })
        .catch((error) => {
          
          const errorMessage = error.message;
          toast.error(errorMessage);
          setloading(false);
          // ..
        });
    } else {
      toast.error("Invalid credentials");
      setloading(false);
      return;
    }
  }
  function signupwithgoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        
        
        // The signed-in user info.
        const user = result.user;
        setauthloading(true);
        setTimeout(() => {
          navigate("/dashboard"); // Change this to your target route
        }, 1000);

        createdoc(user);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        
        const errorMessage = error.message;
        // The email of the user's account used.
   
        // The AuthCredential type that was used.
        
        toast.error(errorMessage);
      });
  }
  const navigate=useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [authLoading, setauthloading] = useState(false);

  return (
    <div className="flex flex-col md:ml-24 rounded-3xl p-3 pt-2 bg-white h-full w-full max-w-4xl sm:w-full md:w-full lg:w-3/4   shadow-lg font-inter">
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
      <div className="flex flex-col m-3">
        <form>
          <Input
            label="FullName"
            placeholder="Fullname"
            state={name}
            setState={setName}
          ></Input>
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
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            state={confirmpassword}
            setState={setConfirmpassword}
          ></Input>
          <button
            disabled={loading}
            type="button"
            onClick={signupWithEmail}
            className=" w-full px-4 py-3 border border-solid  border-[#ff7bac] bg-[#ff7bac] rounded-md text-white shadow-sm "
          >
            {loading ? <p>loading</p> : <p>Signup with Email</p>}
          </button>
          <p className="text-center font-semibold text-black mx-2">or</p>
          <button
            disabled={loading}
            onClick={signupwithgoogle}
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
          <p className="text-center mt-2">
            Already signed up?{" "}
            <span
              className="text-[#0000EE] cursor-pointer underline"
              onClick={handle_toggle_click}
            >
              Sign In
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

export default Signup;
