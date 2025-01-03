import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth/web-extension";

const firebaseConfig = {
   apiKey: process.env.FIREBASE_API_KEY,
   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
   projectId: process.env.FIREBASE_PROJECT_ID,
   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.FIREBASE_APP_ID,
   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

async function setUpRecaptcha(phone: string, id: string) {
   const recaptchaVerifier = new RecaptchaVerifier(auth, id, {});

   const response = await signInWithPhoneNumber(
      auth,
      phone,
      recaptchaVerifier
   );
   return response;
}
