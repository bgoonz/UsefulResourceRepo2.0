import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (isOpen) {
    return (
      <div className="app-modal">
        <div className="app-modal-content">
          <span onClick={onClose} className="close">
            &times;
          </span>
          <div>{children}</div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default Modal;
