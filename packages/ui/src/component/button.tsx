import { ButtonProps } from "@repo/interface/interface";
import { ReactNode } from "react";

export default function Button({
   onClick,
   type = "button",
   children,
}: ButtonProps) {
   return (
      <button
         onClick={onClick|| (() => {})}
         type={type}
         className="w-full bg-blue-500 text-white font-semibold rounded-lg h-10 mt-4 transition-all duration-150 hover:scale-95"
      >
         {children}
      </button>
   );
}
