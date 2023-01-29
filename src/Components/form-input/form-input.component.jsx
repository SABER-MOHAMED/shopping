import "./form-input.styles.scss";

const formInput = ({ label, ...inputProps }) => {
  return (
    <div className="group">
      {
        // if there is a label
        label && (
          <label
            className={`${
              inputProps.value.length ? "shrink" : ""
            } form-input-label`}
          >
            {label}
          </label>
        )
      }
      <input {...inputProps} />
    </div>
  );
};

export default formInput;
