import { InputFileType } from "@repo/interface/interface";
import {
   FieldError,
   FieldValues,
   Path,
   UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
   id: Path<T>; // Path<T> is a type from react-hook-form
   label?: string;
   placeholder: string;
   type?: InputFileType;
   register: UseFormRegister<T>;
   maxLength?: number;
   minLength?: number;
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
   minLength,
   pattern,
   errors,
}: InputProps<T>) {
   const getErrorMessage = (
      errorType: string | undefined,
      fieldType?: InputFileType
   ): string | null => {
      switch (errorType) {
         case "required":
            return "This field is required.";

         case "maxLength":
            return "This field is too long.";

         case "minLength":
            return "This field is too short.";

         case "pattern":
            if (fieldType === "email") return "Please enter a valid email.";

            if (fieldType === "password")
               return "Password must be at least 8 characters, include uppercase, lowercase, and a number.";

            if (fieldType === "number") return "Please enter valid numbers.";

            if (fieldType === "date") return null;

         default:
            return null;
      }
   };

   return (
      <div className=" w-full mb-3">
         {label && (
            <label
               htmlFor={id as string}
               className="block text-sm font-medium text-gray-700 mb-1"
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
               minLength: minLength || 1,
               pattern: pattern || undefined,
            })}
            className="w-full border-2 border-gray-300 h-10 rounded-lg px-3 py-2 text-lg"
         />
         {errors[id] && (
            <p className="text-red-500 text-sm mt-1">
               {getErrorMessage(errors[id].type, type)}
            </p>
         )}
      </div>
   );
}

export default Input;
