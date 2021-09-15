import React from "react";
import Modal from "react-modal";
import * as actions from "../../actions/index";
import { connect } from "react-redux";
import { Link } from "react-router";

class OffersAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      realoading: false,
    };
  }

  openModal() {
    return this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = "#f00";
  }

  closeModal() {
    return this.setState({ modalIsOpen: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    var offer = {};

    offer["companyName"] = this.refs.companyName.value;
    offer["customerAdress"] = this.refs.customerAdress.value;
    offer["item"] = this.refs.item.value;
    const { dispatch } = this.props;

    dispatch(actions.addOffer(offer));
    this.setState({ modalIsOpen: false });
  }

  render() {
    const customStyles = {
      content: {
        margin: "10px",
      },
    };

    return (
      <li>
        <p onClick={this.openModal.bind(this)}>ADD_OFFER</p>
        <Modal
          className="modal"
          l
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal.bind(this)}
          style={customStyles}
        >
          <h2 ref="subtitle">
            Add Offer- FOR_FAST ADDING TO DB, FOR TEST PURPOSES ONLY
          </h2>
          <Link onClick={this.closeModal.bind(this)} to="/">
            {" "}
            Return{" "}
          </Link>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              id="fname"
              ref="companyName"
              placeholder="Company Name"
            />
            <input
              type="text"
              id="lname"
              ref="customerAdress"
              placeholder="Adress"
            />
            <input type="text" id="lname" ref="item" placeholder="Product" />

            <button>Add</button>
          </form>
        </Modal>
      </li>
    );
  }
}

export default connect()(OffersAdd);
