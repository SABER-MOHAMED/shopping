import SignUpForm from "../../Components/sign-up-form/sign-up-form.component";
import SignInForm from "../../Components/sign-in-form/sign-in-form.component";

import "./authentication.styles.scss";
const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
