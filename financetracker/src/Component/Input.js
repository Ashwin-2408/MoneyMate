import React from "react";

function Input({  type = "text", placeholder,state,setState }) {
  return (
    <div className="flex flex-col mb-5">
      <input
        value={state}
        type={type}
        placeholder={placeholder}
        onChange={(e)=>setState(e.target.value)}
        required
        className="border border-gray-300 rounded-md px-4 py-3 text-gray-900
                   focus:outline-none focus:ring-2 focus:ring-[#ff7bac] 
                   focus:border-transparent transition duration-300"
      />
    </div>
  )
}

export default Input;