import React, { useState } from "react";
import Input from "./Input";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  return (
    <div className="flex flex-col lg:ml-24 rounded-3xl p-4 bg-white h-full w-3/4 shadow-lg font-inter">
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
            label="Email"
            placeholder="Email"
            state={email}
            setState={setEmail}
          ></Input>
          <Input
            label="Password"
            placeholder="Password"
            state={password}
            setState={setPassword}
          ></Input>
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            state={confirmpassword}
            setState={setConfirmpassword}
          ></Input>
          <button className=" w-full px-4 py-3 border border-solid  border-[#ff7bac] bg-[#ff7bac] rounded-md text-white shadow-sm ">
            Signup with Email
          </button>
          <p className="text-center font-semibold text-black mx-2">or</p>
          <button className="w-full px-4 py-3 border border-black bg-white rounded-md text-black shadow-sm flex items-center justify-center space-x-2 ">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Signup with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
