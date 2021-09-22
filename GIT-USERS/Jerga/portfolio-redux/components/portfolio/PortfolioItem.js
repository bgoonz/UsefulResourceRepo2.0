import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";

export default class PortfolioItem extends React.Component {
  constructor(props) {
    super(props);
  }

  toggle() {
    this.props.toggle();
  }

  render() {
    const { portfolio, modal } = this.props;

    return (
      <div>
        <Button
          style={{ display: "none" }}
          color="danger"
          onClick={() => this.toggle()}
        >
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={modal}
          toggle={() => this.toggle()}
          className={this.props.className}
        >
          <ModalHeader toggle={() => this.toggle()}>
            {" "}
            {portfolio.title}{" "}
          </ModalHeader>
          <ModalBody>
            <div>
              {" "}
              <b>Description: </b> {portfolio.description}{" "}
            </div>
            <div>
              {" "}
              <b>Company: </b> {portfolio.company}{" "}
            </div>
            <div>
              {" "}
              <b>Position: </b> {portfolio.position}{" "}
            </div>
            <div>
              {" "}
              <b>Location: </b> {portfolio.location}{" "}
            </div>
            <div>
              {" "}
              <b>Start Date: </b>{" "}
              {moment(portfolio.startAt).format("MMMM YYYY")}{" "}
            </div>
            <div>
              {" "}
              <b>End Date: </b>{" "}
              {portfolio.endDate
                ? moment(portfolio.endDate).format("MMMM YYYY")
                : "Still Working Here (:"}{" "}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
