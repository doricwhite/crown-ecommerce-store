/* IMPORTS */
import { useState } from "react";
// import { UserContext } from "../../contexts/user.context";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

/* SIGN IN FORM COMPONENT */
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // User context
  // const { setCurrentUser } = useContext(UserContext);

  // Reset form fields after sign up completes
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Handles changes on input fields
  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormFields({ ...formFields, [name]: value });
  };

  // On Click Handler
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  // Handles action when the form is submitted
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // Sign in with email and password
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      // Set user in context
      // setCurrentUser(user);

      resetFormFields();
    } catch (err) {
      // Switch Statement
      /*
      switch (err.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("User not available");
          break;
        default:
          console.log(err);
      }
      */

      // Check if password is correct or user exists
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        alert("Incorrect email and/or password");
      }
    }
  };

  // Renders on the webpage
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      <form action="" onSubmit={handleSubmit}>
        {/* Email */}
        <FormInput
          label="Email"
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={email}
        />

        {/* Password */}
        <FormInput
          label="Password"
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

/* EXPORT */
export default SignInForm;
