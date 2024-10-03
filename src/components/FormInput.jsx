import PropTypes from "prop-types"

export const FormInput = ({label, name, type, defaultValue, placeHolder, className}) => {
  return (
    <>
      <label htmlFor={name} className="form-label">{label}</label>
      <input type={type} className={`form-control form-control-sm ${className}`} id={name} name={name} defaultValue={defaultValue} placeholder={placeHolder} />
    </>
  )
}

export const FormTextarea = ({label, name, defaultValue, placeHolder, Row, className}) => {
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
      ></textarea>
    </>
  );
}

export const FormSelect = ({ label, name, options, defaultValue, className }) => { 
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
}

FormInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
FormTextarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  Row: PropTypes.number,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
}

FormSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  })),
}