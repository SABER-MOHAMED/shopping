import "./button.styles.scss";
/** Buttons Types
 * default
 * Google button
 * inverted
 */

const BUTTON_TYPES = {
  google: "google-sign-in",
  inverted: "inverted",
};
const Button = (content, buttonType, { ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPES[buttonType]}`}
      {...otherProps}
    >
      {content}
    </button>
  );
};

export default Button;
