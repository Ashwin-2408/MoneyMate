import React, { useState } from "react";
import Input from "./Input";
import { toast } from "react-toastify";
import { getDocs, collection, deleteDoc, } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

function ResetForm() {
  const [user] = useAuthState(auth);
  const handle_reset = async () => {
    if (!user?.uid) {
      toast.error("User not logged in");
      return;
    }
    if (confirm !== "Reset my Balance") {
      toast.error("Words do not match!");
    } else {
      try {
        const transactionRef = collection(
          db,
          "Users",
          user.uid,
          "Transactions"
        );
        const snapshot = await getDocs(transactionRef);
        for (const document of snapshot.docs) {
          console.log(document);
          await deleteDoc((document.ref));
        }

        toast.success("Reset");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const [confirm, setconfirm] = useState("");
  return (
    <div className="flex flex-col p-4 shadow-md">
      <div className=" flex flex-col space-y-4 mb-4">
        <h1 className="text-xl">
          Are you sure you want to reset your{" "}
          <span className="text-[#ae292f]">Balance.</span>
        </h1>
        <p className="text-sm text-white bg-[#ae292f] rounded-md p-2">
          Warning:This will cause all your transactions to be deleted.
        </p>
      </div>
      <hr className="m-2"></hr>

      <div className="flex flex-col space-y-2">
        <p>
          Enter<span className="font-bold">"Reset my Balance"</span> to continue
        </p>
        <Input
          state={confirm}
          setState={setconfirm}
          placeholder="Enter your confirmation"
        ></Input>
        <div className="flex justify-end items-center">
          <button
            onClick={handle_reset}
            className="flex items-center justify-center h-[40px] w-[100px] p-3 rounded-md shadow-sm bg-[#ae292f] text-white border border-solid"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetForm;
