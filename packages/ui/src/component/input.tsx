import { LoginInputProps } from "@repo/interface/interface";
import React from "react";
import {
   FieldError,
   FieldErrors,
   FieldValues,
   Path,
   useForm,
   UseFormRegister,
} from "react-hook-form";



interface InputProps<T extends FieldValues> {
   id: Path<T>;
   label?: string;
   placeholder: string;
   type?: "text" | "email" | "password" | "number";
   register: UseFormRegister<T>;
   maxLength?: number;
   pattern?: RegExp;
   errors: {
      [key in Path<T>]?: FieldError;
   };
}

// const { register, formState:{errors, isSubmitSuccessful} } = useForm();

function Input<T extends FieldValues>({
   label,
   placeholder,
   type,
   id,
   register,
   maxLength,
   pattern,
   errors,
}: InputProps<T>) {
   return (
      <div className=" w-full mb-3">
         {label && (
            <label
               htmlFor={id as string}
               className="block text-sm font-medium text-gray-700"
            >
               {label}
            </label>
         )}
         <input
            id={id as string}
            type={type || "text"}
            placeholder={placeholder}
            {...register(id, {
               required: true,
               maxLength: maxLength || 70,
               pattern: pattern || /^[A-Za-z]+$/i,
            })}
            className="w-full border-2 border-gray-300 h-10 rounded-lg px-3 py-2 text-lg"
         />
         {errors[id] && (
            <p className="text-red-500 text-sm mt-1">
               {errors[id]?.type === "required" &&
                  "This field is required. "}
               {errors[id]?.type === "maxLength" &&
                  "This field is too long. "}
               {errors[id]?.type === "pattern" &&
               type === "email"
                  ? "Please enter a valid email"
                  : type === "password"
                    ? "Password must be at least 8 characters, include uppercase, lowercase and number"
                    : "Please enter a valid numbers"}
            </p>
         )}
      </div>
   );
}

export default Input;

// import React from "react";

// interface InputProps {
//    id: string;
//    label?: string;
//    placeholder: string;
//    type?: string;
//    getFormValue: (value: HTMLInputElement["value"]) => void;
// }

// function Input({
//    label,
//    placeholder,
//    type,
//    id,
//    getFormValue,
// }: InputProps) {
//    return (
//       <div className=" w-full mb-3">
//          {label && (
//             <label
//                htmlFor={id}
//                className="block text-sm font-medium text-gray-700"
//             >
//                {label}
//             </label>
//          )}
//          <input
//             id={id}
//             type={type || "text"}
//             placeholder={placeholder}
//             className="w-full border-2 border-gray-300 h-10 rounded-lg px-3 py-2 text-lg"
//             onChange={(e) => {
//                getFormValue(e.target.value);
//             }}
//          />
//       </div>
//    );
// }

// export default Input;
