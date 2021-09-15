import React from "react";

import { openModal } from "Modals/bus";

export default ({ className = "btn btn-primary" } = {}) => (
  <button className={className} onClick={() => openModal("UPLOAD_IMAGE")}>
    Upload image
  </button>
);
