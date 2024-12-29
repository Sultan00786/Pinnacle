"use client";

import path from "path";
import AuthComponent from "../../components/auth/AuthComponent";

export default function Signup() {
   return (
      <div>
         <AuthComponent authType={"signup"} />
      </div>
   );
}
