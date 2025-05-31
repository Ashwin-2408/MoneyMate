import React from "react";
import Input from "./Input";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getDoc,
  doc,
  serverTimestamp,
  collection,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { toast } from "react-toastify";

function ExpenseForm() {
  const [user] = useAuthState(auth);
  const [title, settitle] = useState("");
  const [amount, setamount] = useState("");
  const [tag, settag] = useState("");
  const [date, setdate] = useState("");
  const handleTagChange = (e) => {
    settag(e.target.value);
  };
  async function add_transaction(e) {
    e.preventDefault();
    if (title && amount && tag && date) {
      const UserRef = doc(db, "Users", user.uid);
      const UserData = await getDoc(UserRef);
      if (UserData.exists()) {
        const transactionRef = collection(UserRef, "Transactions");
        await addDoc(transactionRef, {
          Title: title,
          Amount: amount,
          Tag: tag,
          Date: date,
          type: "Expense",
          CreatedAt: serverTimestamp(),
        });
        settitle("");
        setamount("");
        settag("");
        setdate("");
        toast.success("transaction added");
      } else {
        toast.error("User does not exist");
      }
    } else {
      toast.error("FIll in all the details.");
      return;
    }
  }
  return (
    <div>
      <form>
        <Input placeholder="Title" state={title} setState={settitle}></Input>
        <Input placeholder="Amount" state={amount} type="number" setState={setamount}></Input>
        <select
          id="tag"
          value={tag}
          onChange={handleTagChange}
          required
          className="
          mb-5
          block
          w-full
          rounded-md
          border border-gray-300  px-4 py-3 
          text-base
          text-gray-900
          focus:border-pink-500
          focus:outline-none
          focus:ring-1
          focus:ring-pink-500
          appearance-none
          cursor-pointer
        "
        >
          <option className="text-[9fa6b2]" value="" disabled hidden>
            Tag
          </option>
          <option value="Household & Utilities">Household & Utilities</option>
          <option value="Groceries">Groceries & Essentials</option>
          <option value="Food">Food & Dining</option>
        </select>

        <Input
          placeholder="Date"
          type="Date"
          state={date}
          setState={setdate}
        ></Input>
        <button
          onClick={add_transaction}
          className="border border-gray-300 rounded-md px-4 py-3 text-gray-900 w-full"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
