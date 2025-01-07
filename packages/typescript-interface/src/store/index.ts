import { AddCardInputProps, SignUpIputProps } from "../auth";

export interface RootState {
   auth: {
      user: null | SignUpIputProps; // or define user type here
      step: number;
   };
   account: null | AddCardInputProps
}
