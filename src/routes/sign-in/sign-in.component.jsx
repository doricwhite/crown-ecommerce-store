/* IMPORTS */

// Firebase Utils
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

/* Sign Up Form Component */
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

/* Sign In  */
const SignIn = () => {
  /* Sign in with Google popup */

  // On Click Handler
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1> Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>
      <SignUpForm />
    </div>
  );
};

/* EXPORT */
export default SignIn;
