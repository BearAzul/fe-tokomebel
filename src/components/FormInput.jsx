import PropTypes from "prop-types"

export const FormInput = ({label, name, type, defaultValue, placeHolder, className, disabled = false}) => {
  return (
    <>
      <label htmlFor={name} className="form-label">{label}</label>
      <input type={type} className={`form-control form-control-sm ${className}`} id={name} name={name} defaultValue={defaultValue} placeholder={placeHolder} disabled={disabled} />
    </>
  )
}

export const FormTextarea = ({
  label,
  name,
  defaultValue,
  placeHolder,
  Row,
  className,
  disabled = false,
}) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        className={`form-control form-control-sm ${className}`}
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={Row}
        placeholder={placeHolder}
        disabled={disabled}
      ></textarea>
    </>
  );
};

export const FormSelect = ({
  label,
  name,
  options,
  defaultValue,
  className,
  disabled = false,
}) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={`form-select form-select-sm ${className}`}
        id={name}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
      >
        <option
          value=""
          disabled
          className="text-capitalize"
        >{`-- Choose ${name} --`}</option>
        {options.map((option) => (
          <option key={option.key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  disabled: PropTypes.bool
};
FormTextarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  Row: PropTypes.number,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

FormSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
  disabled: PropTypes.bool,
};