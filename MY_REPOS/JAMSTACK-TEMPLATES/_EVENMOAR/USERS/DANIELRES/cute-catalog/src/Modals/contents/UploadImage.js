import React from "react";

import { closeModal, openModal } from "Modals/bus";

import DropZone from "shared/Forms/Dropzone";

const onError = (e) => openModal("ERROR", e);
const onSuccess = () => setTimeout(closeModal, 1000);

export default () => <DropZone onError={onError} onSuccess={onSuccess} />;
