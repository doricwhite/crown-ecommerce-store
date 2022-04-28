import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAg7fsV2p8ARlU3FJjxVcvE1qb6Kin-0lU",
  authDomain: "crown-react-db-c3bae.firebaseapp.com",
  projectId: "crown-react-db-c3bae",
  storageBucket: "crown-react-db-c3bae.appspot.com",
  messagingSenderId: "418485519931",
  appId: "1:418485519931:web:d13c6a2ae39493c1893e1e",
};

const firebaseApp = initializeApp(firebaseConfig);

/* Google Authentication */
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

/* Firestore DB */
export const db = getFirestore();

export const creatUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  /**Creates user if it does not exist  */
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log("error creating the user", err);
    }
  }

  return userDocRef;
};
