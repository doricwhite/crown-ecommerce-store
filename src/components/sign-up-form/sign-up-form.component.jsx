/* IMPORTS */
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { SignUpContainer } from "./sign-up-form.styles";
import { signUpStart } from "../../store/user/user.action";

// import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

/* SIGN UP FORM COMPONENT */
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

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

  // Handles action when the form is submitted
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // Check for matching passwords
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create user in firebase database
    try {
      dispatch(signUpStart(email, password, displayName));

      resetFormFields();
    } catch (err) {
      /* If email already exists */
      if (err.code === "auth/email-already-in-use") {
        alert("Unable to create user, email provided already in use");
      } else {
        console.log("Error encountered creating the user", err);
      }
    }
  };

  // Renders on the webpage
  return (
    <SignUpContainer>
      <h2>Dont have an account?</h2>
      <span>Sign up with your email and password</span>

      <form action="" onSubmit={handleSubmit}>
        {/* Display Name */}
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          required
          onChange={handleChange}
          value={displayName}
        />

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

        {/* Confirm Password */}
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          required
          onChange={handleChange}
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

/* EXPORT */
export default SignUpForm;
