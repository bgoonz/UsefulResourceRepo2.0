import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <div>
      <hr className="mt-5" />
      <p className="text-center">
        Powered by{" "}
        <a href="https://developers.google.com/books/">Google Books</a>
      </p>
      <p className="text-center mt-5">
        <FontAwesomeIcon icon={faCopyright} /> 2019 willjw3. All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
