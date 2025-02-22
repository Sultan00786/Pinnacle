import { AddCardInputProps, SignUpIputProps } from "../auth/index.js";

export interface RootState {
   loading: boolean;
   auth: {
      user: null | SignUpIputProps; // or define user type here
      step: number;
   };
   account: null | AddCardInputProps;
}
