import React from "react";

const AuthBoxOuter = ({ children }) => (
  <div className="row justify-content-center">
    <div className="col-md-6 mt-3 mb-3 ">
      <div className="bg-gray p-5 rounded">{children}</div>
    </div>
  </div>
);

export default AuthBoxOuter;
