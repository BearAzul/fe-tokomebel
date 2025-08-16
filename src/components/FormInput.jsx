import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Form } from "react-bootstrap";

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
    <Form.Group>
      <Form.Label htmlFor={name}>
        {label} <span className="text-danger">*</span>
      </Form.Label>
      <Form.Control
        size="sm"
        type={type}
        className={`${className}`}
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeHolder}
        disabled={disabled}
      />
    </Form.Group>
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
    <Form.Group>
      <Form.Label htmlFor={name}>
        {label} <span className="text-danger">*</span>
      </Form.Label>
      <Form.Control
        as="textarea"
        size="sm"
        className={`form-control form-control-sm ${className}`}
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={Row}
        placeholder={placeHolder}
        disabled={disabled}
      />
    </Form.Group>
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
    <Form.Group>
      <Form.Label htmlFor={ name }>
        {label} <span className="text-danger">*</span>
      </Form.Label>
      <Form.Select
        className={`${className}`}
        size="sm"
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        disabled={disabled}
        aria-label={name}
      >
        <option
          value=""
          className="text-capitalize"
        >{`-- Pilih ${label} --`}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
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
      <Form.Label>
        {label} <span className="text-danger">*</span>
      </Form.Label>
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
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
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
