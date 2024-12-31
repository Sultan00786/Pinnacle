import { ReactNode } from "react";

interface ButtonProps {
   children: ReactNode;
   type?: "button" | "submit";
   onclick?: () => void;
}

export default function Button({
   onclick,
   type = "button",
   children,
}: ButtonProps) {
   return (
      <button
         onClick={onclick|| (() => {})}
         type={type}
         className="w-full bg-blue-500 text-white font-semibold rounded-lg h-10 mt-4 transition-all duration-150 hover:scale-95"
      >
         {children}
      </button>
   );
}
