import React, { Component } from "react";

import bus, { closeModal } from "Modals/bus";

import Cookies from "Modals/contents/Cookies";
import CookiesPolicy from "Modals/contents/CookiesPolicy";
import RegistrationConfirmed from "Modals/contents/RegistrationConfirmed";
import RegistrationPending from "Modals/contents/RegistrationPending";
import UploadImage from "Modals/contents/UploadImage";

const Header = ({ children, noCloseButton }) => (
  <div className="modal-header">
    <h4 className="modal-title">{children}</h4>
    {!noCloseButton && (
      <button
        className="close"
        onClick={closeModal}
        style={{ outline: "none" }}
      >
        &times;
      </button>
    )}
  </div>
);

const Modal = ({ children, noCloseButton, title }) => (
  <div className="modal d-block">
    <div className="modal-dialog">
      <div className="modal-content">
        <Header noCloseButton={noCloseButton}>{title}</Header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </div>
);

const getErrorMessage = (payload) => {
  if (payload && payload.code && payload.code === 401)
    return "Unauthorized action, please login first.";
  if (payload && payload.message) return payload.message;
  return "Something went wrong, please try again";
};

const Backdrop = () => (
  <div className="modal-backdrop" style={{ opacity: 0.5 }} />
);

class ModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { queue: ["UPLOAD_IMAGE"] };
    const getQueue = () => this.state.queue;

    bus.take("OPEN_MODAL", ({ name, payload }) => {
      this.setState({
        queue: [
          { name, payload },
          ...getQueue().filter((o) => o.name !== name),
        ],
      });
    });

    bus.take("CLOSE_MODAL", () =>
      this.setState({
        queue: getQueue().slice(1, getQueue().length),
      })
    );
  }

  render() {
    const { name, payload } = this.state.queue[0];

    return (
      <>
        {name === "AUTOLOGOUT_WARNING" && (
          <Modal title="Warning">
            <p>
              Your session expires in <b>{payload}</b> minutes.
            </p>
            <p>
              You might want to logout and login again to extend your session.
            </p>
          </Modal>
        )}

        {name === "COOKIES" && (
          <Modal noCloseButton title="Cookies notice">
            <Cookies />
          </Modal>
        )}

        {name === "COOKIES_POLICY" && (
          <Modal title="Cookies policy">
            <CookiesPolicy />
          </Modal>
        )}

        {name === "ERROR" && (
          <Modal title="Error">{getErrorMessage(payload)} </Modal>
        )}

        {name === "REGISTRATION_CONFIRMED" && (
          <Modal title="Welcome aboard!">
            <RegistrationConfirmed />
          </Modal>
        )}

        {name === "REGISTRATION_PENDING" && (
          <Modal title="Your registration is pending">
            <RegistrationPending
              registrationTokenMaxAge={payload.registrationTokenMaxAge}
            />
          </Modal>
        )}

        {name === "UPLOAD_IMAGE" && (
          <Modal title="Upload Image">
            <UploadImage />
          </Modal>
        )}

        {name && <Backdrop />}
      </>
    );
  }
}

export default ModalContainer;
