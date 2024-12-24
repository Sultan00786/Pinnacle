import React from "react";

interface InputProps {
   id: string;
   label: string;
   placeholder: string;
   type?: string;
}

function Input({ label, placeholder, type, id }: InputProps) {
   return (
      <div className=" w-full mb-3">
         <label className="text-[15px] text-gray-500 font-semibold block mb-[2px]">
            {label}
         </label>
         <input
            id={id}
            type={type || "text"}
            placeholder={placeholder}
            className="w-full border-2 border-gray-300 h-10 rounded-lg px-3 py-2 text-lg"
         />
      </div>
   );
}

export default Input;
