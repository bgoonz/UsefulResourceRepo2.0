import React from "react";

export default ({ registrationTokenMaxAge }) => (
  <>
    <p>A confirmation email has been sent to you.</p>
    <p>
      Please check your mailbox and use the provided confirmation link to
      activate your account.
    </p>
    <p className="alert alert-info">
      Please note that the registration link will expire in{" "}
      {registrationTokenMaxAge} days.
    </p>
  </>
);
