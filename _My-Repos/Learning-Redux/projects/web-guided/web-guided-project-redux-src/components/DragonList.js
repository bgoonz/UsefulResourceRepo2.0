import React from "react";
import { connect } from "react-redux";

import { addMember, toggleDragonStatus } from "../actions";

class DragonList extends React.Component {
  state = {
    newMember: "",
  };

  handleChanges = (e) => {
    this.setState({ newMember: e.target.value });
  };

  handleNewMember = (e) => {
    e.preventDefault();
    this.props.addMember(this.state.newMember);
  };

  render() {
    return (
      <React.Fragment>
        <div className="friends-list">
          {this.props.members.map((member, index) => (
            <h4
              key={index}
              onClick={() => this.props.toggleDragonStatus(member.name)}
            >
              {member.name}
              {member.dragonStatus && <i className="fas fa-dragon">🐲</i>}
            </h4>
          ))}
        </div>
        <input
          type="text"
          value={this.state.newMember}
          onChange={this.handleChanges}
          placeholder="Add new member"
        />
        <button onClick={this.handleNewMember}>Add member</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    members: state.members.members,
  };
};

export default connect(mapStateToProps, { addMember, toggleDragonStatus })(
  DragonList
);
