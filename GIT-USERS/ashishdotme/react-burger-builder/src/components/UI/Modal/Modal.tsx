import React, { Component } from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

interface ModalProps {
  modalClosed: () => void;
  show: boolean;
}

interface ModalState {}
class Modal extends Component<ModalProps, ModalState> {
  shouldComponentUpdate(nextProps: any, nextState: any) {
    return nextProps.show !== this.props.show;
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="Modal"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? 1 : 0,
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
