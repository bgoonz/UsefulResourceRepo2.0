import React from "react";
var Modal = require("react-modal");
import CreateRelationship from "../cards_components/Card_createRelationship";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  renderRelationShips(relationships) {
    if (relationships) {
      return relationships.map((relationship) => {
        return (
          <li key={relationship._id}>
            {" "}
            {relationship.name} - {relationship.relationship}
          </li>
        );
      });
    } else {
      return <h1>Loading..</h1>;
    }
  }

  render() {
    const { name, relationship } = this.props;

    return (
      <div className="col span-1-of-3">
        <div className="card__main__base">
          <div className="card__main__base__title">
            <h1>{name}</h1>
          </div>
          <div className="card__main__base__picture"></div>

          <div className="card__main__base__relationships">
            <ul>{this.renderRelationShips(relationship)}</ul>
          </div>
          <div className="card__main__base__relationships--button">
            <button onClick={this.openModal.bind(this)}>
              {" "}
              Set Relationship
            </button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal.bind(this)}
              onRequestClose={this.closeModal.bind(this)}
              style={customStyles}
            >
              <h2 ref="subtitle">Set relationship</h2>
              <button onClick={this.closeModal.bind(this)}>close</button>
              <div>I am a modal</div>

              <CreateRelationship name={name} />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
