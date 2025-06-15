import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["link"],
    ["clean"],
  ],
};

export const FormInput = ({
  label,
  name,
  type,
  defaultValue,
  placeHolder,
  className,
  disabled = false,
}) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label} <span className="text-danger">*</span>
      </label>
      <input
        type={type}
        className={`form-control form-control-sm ${className}`}
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeHolder}
        disabled={disabled}
      />
    </>
  );
};

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
        {label} <span className="text-danger">*</span>
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
  value,
  onChange,
  className,
  disabled = false,
}) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label} <span className="text-danger">*</span>
      </label>
      <select
        className={`form-select form-select-sm ${className}`}
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
      >
        <option
          value=""
          className="text-capitalize"
        >{`-- Pilih ${label} --`}</option>
        {options.map((option) => (
          <option key={option.key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export const FormEditor = ({
  label,
  value,
  onChange,
  className,
  placeHolder,
}) => {
  return (
    <div className={`form-editor ${className}`}>
      <label className="form-label">
        {label} <span className="text-danger">*</span>
      </label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className="quill-editor"
        placeholder={placeHolder}
      />
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
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
  value: PropTypes.string,
  onChange: PropTypes.func,
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

FormEditor.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string.isRequired,
  className: PropTypes.string,
};
