import { ReactNode } from "react";

type LoginInputProps = {
   email: string;
   password: string;
};

type SignUpIputProps = {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   address: string;
   state: string;
   dob: string;
};

type AddCardInputProps = {
   cardNumber: string;
   cardHolder: string;
   phone: string;
   source:string;
   month: string;
   year: string;
   cvv: string;
};

type InputFileType =
   | "text"
   | "email"
   | "password"
   | "number"
   | "date";

interface ButtonProps {
   children: ReactNode;
   type?: "button" | "submit";
   variant?: "Primary" | "Secondary";
   onClick?: () => void;
}

export type {
   LoginInputProps,
   SignUpIputProps,
   AddCardInputProps,
   InputFileType,
   ButtonProps,
};
