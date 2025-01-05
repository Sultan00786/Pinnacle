declare global {
   interface Window {
      confirmationResult: import("firebase/auth").ConfirmationResult;
      recaptchaVerifier: import("firebase/auth").RecaptchaVerifier;
   }
}

export {};
