import PropTypes from "prop-types"

export const FormInput = ({label, name, type, defaultValue, placeHolder}) => {
  return (
    <>
      <label htmlFor={name} className="form-label">{label}</label>
      <input type={type} className="form-control form-control-sm" id={name} name={name} defaultValue={defaultValue} placeholder={placeHolder} />
    </>
  )
}

export const FormTextarea = ({label, name, defaultValue, placeHolder, Row}) => {
  return (
    <>
      <label htmlFor={name} className="form-label">{label}</label>
      <textarea className="form-control form-control-sm" id={name} name={name} defaultValue={defaultValue} rows={Row} placeholder={placeHolder}></textarea>
    </>
  )
}

export const FormSelect = ({ label, name, options, defaultValue }) => { 
  return (
    <>
      <label htmlFor={name} className="form-label">{label}</label>
      <select className="form-select form-select-sm" id={name} name={name} defaultValue={defaultValue}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  )
}

FormInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
FormTextarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  Row: PropTypes.number,
  defaultValue: PropTypes.string,
}

FormSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string,
}