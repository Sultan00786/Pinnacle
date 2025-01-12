import Image from "next/image";
import logo from "../public/logo.png";
import React from "react";
import { Kanit } from "@next/font/google";

const kaint = Kanit({
   subsets: ["latin"],
   weight: ["500"],
   style: ["normal", "italic"],
});

function Logo() {
   return (
      <div className="relative flex items-center">
         <Image
            src={logo}
            alt="logo"
            width={35}
            className=" absolute bottom-[5px] left-0"
         />
         <h1
            className={`${kaint.className} ml-8 text-3xl font-bold text-purple-600`}
         >
            innacle
         </h1>
      </div>
   );
}

export default Logo;
