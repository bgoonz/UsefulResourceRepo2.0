import React from "react";

export function BwmTextField({
  input,
  label,
  className,
  rows,
  cols,
  meta: { touched, error },
}) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea rows={rows} cols={cols} {...input} className={className} />
      {touched && error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
