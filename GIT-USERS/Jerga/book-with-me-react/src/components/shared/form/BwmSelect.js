import React from "react";

export function BwmSelect({
  options,
  input,
  label,
  className,
  meta: { touched, error },
}) {
  function renderOptions(options) {
    return options.map((option, index) => {
      return (
        <option key={index} value={option}>
          {option}
        </option>
      );
    });
  }
  return (
    <div className="form-group">
      <label>{label}</label>
      <div>
        <select {...input} className={className}>
          {renderOptions(options)}
        </select>
        {touched && error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
}
