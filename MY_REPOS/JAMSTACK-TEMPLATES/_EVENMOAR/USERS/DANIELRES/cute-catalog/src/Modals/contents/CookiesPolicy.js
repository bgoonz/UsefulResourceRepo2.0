import React from "react";

import { closeModal } from "Modals/bus";

export default () => (
  <section>
    <h5>For simple visitors</h5>
    <p>
      Cookies are used for the purpose of usage analytics only.
      <br />
      No personal information are collected through these cookies.
    </p>

    <h5>For registered visitors</h5>
    <p>
      Cookies are used to allow the login system to function properly and for
      the user session to persist between page refreshes and page changes.
    </p>

    <p className="text-center">
      <button className="btn btn-primary" onClick={closeModal}>
        <i className="fa fa-arrow-left" /> Back
      </button>
    </p>
  </section>
);
