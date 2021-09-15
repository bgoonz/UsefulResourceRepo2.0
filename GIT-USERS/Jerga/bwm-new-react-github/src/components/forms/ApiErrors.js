import React from "react";

const ApiErrors = ({ errors }) => {
  if (errors && errors.length > 0) {
    return (
      <div className="alert alert-danger">
        {errors.map((e) => (
          <p key={e.title}>{e.detail}</p>
        ))}
      </div>
    );
  }

  return null;
};

export default ApiErrors;
