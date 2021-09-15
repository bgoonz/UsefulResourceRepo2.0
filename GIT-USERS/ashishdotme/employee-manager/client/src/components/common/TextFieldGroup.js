import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  error,
  name,
  placeholder,
  value,
  label,
  info,
  type,
  onChange,
  disabled,
}) => {
  return (
    <div>
      <label className="form-control-label mt-2" for={name}>
        {label}
      </label>
      <input
        type={type}
        className={classnames("form-control", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        required="required"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default TextFieldGroup;
