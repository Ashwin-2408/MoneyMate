/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";

interface FormData {
  Email: string;
  Password: string;
  Password_check: string;
}
export default function Signup() {
    const router=useRouter()
  

  const [formdata, setformdata] = useState<FormData>({
    Email: "",
    Password: "",
    Password_check: "",
  });

  const handle_change = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handle_submit = async (e) => {
    e.preventDefault();
    if (formdata.Password != formdata.Password_check) {
      alert("Password does not match");

      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/Auth/signup",
        formdata
      );
      
      alert(response.data.LOG);
      if(response.data.Message==="Success"){
        
        router.push("/Login")
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.ERR);
      }
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center bg-slate-600/100 items-center ">
      <div className="grid grid-cols-6 grid-rows-6 bg-[#e6ecf3] w-9/12 h-3/4 shadow-3xl rounded-lg">
        <div className="text-black col-span-3 row-span-1 ">
          <h1 className="flex justify-center text-xl h-1/2 items-center pt-4">
            Money Mate
          </h1>
          <p className="p-4 pt-2">
            Money Mate is your trusted companion for managing finances
            effortlessly, offering tools to track, analyze, and optimize your
            budget with ease.
          </p>
        </div>
        <div className="col-span-3 row-span-6 flex justify-center items-center">
          <div className="p-4  bg-slate-600 shadow-md h-96 w-96 rounded-md flex flex-col gap-5">
            <div className="flex justify-start items-center text-xl font-sans text-white">
              Sign up for an account
            </div>

            <form onSubmit={handle_submit} className="flex flex-col gap-4">
              <div className="flex flex-col justify-start items-start gap-3">
                <label htmlFor="Email" className="text-white ">
                  Your Email
                </label>

                <input
                  placeholder="Email"
                  name="Email"
                  id="Email"
                  onChange={handle_change}
                  className={`w-full outline-none text-gray-900 flex items-center bg-white  h-8 rounded-md pl-2`}
                ></input>
              </div>
              <div className="flex flex-col justify-start items-start gap-3">
                <label htmlFor="Password" className="text-white ">
                  Create Password
                </label>

                <input
                  type="password"
                  placeholder="Password"
                  name="Password"
                  id="Password"
                  onChange={handle_change}
                  className={`w-full outline-none text-gray-900 flex items-center bg-white   rounded-md h-8 pl-2 `}
                ></input>
              </div>
              <div className="flex flex-col justify-start items-start gap-3">
                <label htmlFor="Password_check" className="text-white ">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Retype Password"
                  name="Password_check"
                  id="Password_check"
                  onChange={handle_change}
                  className={`w-full outline-none text-gray-900 flex items-center bg-white   rounded-md h-8 pl-2 `}
                ></input>
              </div>
              <div className="flex flex-row justify-between ">
                <button
                  type="submit"
                  className="w-1/3 p-1 rounded-md text-black mt-2 bg-white justify-end items-start"
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className=" col-span-3 row-span-5 flex justify-start items-end ">
          <Image
            className="p-4"
            src="/Images/Login image.jpeg"
            alt="image"
            width={300}
            height={300}
          />
        </div>
      </div>
     
    </div>
  );
}
