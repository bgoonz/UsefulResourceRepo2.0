import React from "react";

const VARIANTS = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];

const Alert = ({ children, variant = "primary", ...props }) => {
  if (!VARIANTS.includes(variant)) {
    throw new Error(`${variant} is not a valid variant`);
  }
  return (
    <div className={`alert alert-${variant}`} {...props}>
      {children}
    </div>
  );
};

export default Alert;
