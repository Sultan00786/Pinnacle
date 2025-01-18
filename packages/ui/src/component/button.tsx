import { ButtonProps } from "@repo/interface/interface";
import { ReactNode } from "react";

export default function Button({
   onClick,
   type = "button",
   children,
   variant = "Primary",
}: ButtonProps) {
   return (
      <button
         onClick={onClick || (() => {})}
         type={type}
         className={` ${variant === "Primary" ? "bg-purple-600/80 text-white" : " text-purple-700 border-2 border-purple-600"}  w-full font-semibold rounded-lg h-10 mt-4 transition-all duration-150 hover:scale-95`}
      >
         {children}
      </button>
   );
}
