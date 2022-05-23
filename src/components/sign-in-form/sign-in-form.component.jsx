/* IMPORTS */
import { useState } from "react";
// import { UserContext } from "../../contexts/user.context";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { SignUpContainer, ButtonsContainer } from "./sign-in-form.styles";

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
    <SignUpContainer>
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

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  );
};

/* EXPORT */
export default SignInForm;
