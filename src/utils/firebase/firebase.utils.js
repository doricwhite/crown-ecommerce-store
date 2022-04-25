import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAg7fsV2p8ARlU3FJjxVcvE1qb6Kin-0lU",
  authDomain: "crown-react-db-c3bae.firebaseapp.com",
  projectId: "crown-react-db-c3bae",
  storageBucket: "crown-react-db-c3bae.appspot.com",
  messagingSenderId: "418485519931",
  appId: "1:418485519931:web:d13c6a2ae39493c1893e1e",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
