import { ReactNode } from "react";

interface ButtonProps {
   children: ReactNode;
   onclick: () => void;
}

export default function Button({
   onclick,
   children,
}: ButtonProps) {
   return (
      <button
         onClick={onclick}
         type="button"
         className="w-full bg-blue-500 text-white font-semibold rounded-lg h-12 mt-6 transition-all duration-150 hover:scale-95"
      >
         {children}
      </button>
   );
}
