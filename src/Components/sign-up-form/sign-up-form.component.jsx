import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

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
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor=""> Display Name</label>
        <input
          required
          type="text"
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />

        <label htmlFor="">Email</label>
        <input
          required
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
        />

        <label htmlFor="">Password</label>
        <input
          required
          type="password"
          name="password"
          minLength={6}
          onChange={handleChange}
          value={password}
        />

        <label htmlFor="">Confirm Password</label>
        <input
          required
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
