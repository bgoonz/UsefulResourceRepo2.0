import React from "react";

export function BwmResError(props) {
  const { errors } = props;

  return (
    errors.length > 0 && (
      <div className="alert alert-danger bwm-res-errors">
        {errors.map((error, index) => (
          <p key={index}> {error.detail} </p>
        ))}
      </div>
    )
  );
}
