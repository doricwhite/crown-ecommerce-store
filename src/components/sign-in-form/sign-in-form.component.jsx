/* IMPORTS */
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

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
  const dispatch = useDispatch();

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
    dispatch(googleSignInStart());
  };

  // Handles action when the form is submitted
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // Sign in with email and password
    try {
      dispatch(emailSignInStart(email, password));

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
