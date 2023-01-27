import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBf0s37hBjnPWNdx72HsOp1XCEW3dCgO3A",
  authDomain: "crown-clothing-db-a7a52.firebaseapp.com",
  projectId: "crown-clothing-db-a7a52",
  storageBucket: "crown-clothing-db-a7a52.appspot.com",
  messagingSenderId: "914602724267",
  appId: "1:914602724267:web:0c2bca5c50b6a7179b20ee",
};

// Initialize Firebase
const fireBaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
