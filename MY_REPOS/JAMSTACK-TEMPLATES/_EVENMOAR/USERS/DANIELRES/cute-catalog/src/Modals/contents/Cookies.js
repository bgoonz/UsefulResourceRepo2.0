import Cookies from "js-cookie";
import React from "react";

import { closeModal, openModal } from "Modals/bus";

const onConsent = (e) => {
  e.preventDefault();
  Cookies.set("isCookiesConsented", true);
  closeModal();
};

const onLearnMore = (e) => {
  e.preventDefault();
  openModal("COOKIES_POLICY");
};

export default () => (
  <div className="text-center">
    <p>
      This website uses cookies to ensure you get the best experience.
      <br />
      <button className="btn btn-link" onClick={onLearnMore}>
        Learn more
      </button>
    </p>

    <p>
      <button className="btn btn-success" onClick={onConsent}>
        I consent to the usage of cookies
      </button>
    </p>
  </div>
);
