import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

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

const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleprovider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  console.log(userAuth);
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userDocSnapshot = await getDoc(userDocRef);
  console.log(userDocSnapshot);
  console.log(userDocSnapshot.exists());

  // if user does not exist, create a new user
  if (!userDocSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  // if the user exists, return the user document reference
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
