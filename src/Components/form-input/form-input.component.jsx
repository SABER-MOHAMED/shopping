import "./form-input.styles.scss";

const formInput = ({ label, ...inputProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...inputProps} />
      {
        // if there is a label
        label && (
          <label
            className={`${
              inputProps.value.length ? "shrink" : ""
            } form-input-label `}
          >
            {label}
          </label>
        )
      }
    </div>
  );
};

export default formInput;
