import React, { useState } from "react";
import Modal from "react-responsive-modal";

const BwmModal = ({
  title = "Modal Window",
  subtitle = "Confirm your data",
  openBtn: OpenBtn,
  onSubmit,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!OpenBtn && (
        <button onClick={() => setIsOpen(true)} className="btn btn-success">
          Open
        </button>
      )}
      {OpenBtn && <div onClick={() => setIsOpen(true)}>{OpenBtn}</div>}
      <Modal
        focusTrapped={false}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        classNames={{ modal: "bwm-modal" }}
      >
        <h4 className="modal-title title">{title}</h4>
        <p className="modal-subtitle">{subtitle}</p>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button
            onClick={() => onSubmit(() => setIsOpen(false))}
            type="button"
            className="btn btn-bwm-main"
          >
            Confirm
          </button>
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="btn btn-alert"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BwmModal;
