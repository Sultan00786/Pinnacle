import React from "react";

interface InputProps {
   id: string;
   label?: string;
   placeholder: string;
   type?: string;
   getFormValue: (value: HTMLInputElement["value"]) => void;
}

function Input({
   label,
   placeholder,
   type,
   id,
   getFormValue,
}: InputProps) {
   return (
      <div className=" w-full mb-3">
         {label && (
            <label
               htmlFor={id}
               className="block text-sm font-medium text-gray-700"
            >
               {label}
            </label>
         )}
         <input
            id={id}
            type={type || "text"}
            placeholder={placeholder}
            className="w-full border-2 border-gray-300 h-10 rounded-lg px-3 py-2 text-lg"
            onChange={(e) => {
               getFormValue(e.target.value);
            }}
         />
      </div>
   );
}

export default Input;
