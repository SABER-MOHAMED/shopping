import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 1. check if passwords matching
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    try {
      // 3. create Auth user
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // 4. create document for this user
      await createUserDocumentFromAuth(user, { displayName });

      // 5. clear form Fields
      resetFormFields();
    } catch (err) {
      // 0. check email uniqueness
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user, Email already used");
        return;
      }
      console.log(err);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          type="text"
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />

        <FormInput
          label="Email"
          required
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label={"Password"}
          required
          type="password"
          name="password"
          minLength={6}
          onChange={handleChange}
          value={password}
        />

        <FormInput
          label={"Confirm Password"}
          required
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
