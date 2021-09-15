import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class PortModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(isConfirm = false) {
    this.setState({
      modal: !this.state.modal,
    });

    if (isConfirm) {
      const { successHandler } = this.props;
      successHandler();
    }
  }

  render() {
    const { hidden, text } = this.props;

    return (
      <div>
        <Button
          style={{ display: hidden ? "none" : "block" }}
          color="danger"
          onClick={this.toggle}
        >
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>{text}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggle(true)}>
              Confirm
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
