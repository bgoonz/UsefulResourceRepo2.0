import React from "react";
import DragonMember from "./DragonMember";

class DragonList extends React.Component {
  state = {
    newMember: "",
    members: [
      { name: "Jojo Zhang", dragonStatus: true },
      { name: "Brandon Harris", dragonStatus: false },
    ],
  };

  handleChanges = (e) => {
    this.setState({ ...this.state, newMember: e.target.value });
  };

  handleClick = () => {
    this.setState({
      ...this.state.members,
      members: [
        ...this.state.members,
        { name: this.state.newMember, dragonStatus: true },
      ],
    });
  };

  render() {
    return (
      <div>
        <div className="friends-list">
          {this.state.members.map((member, index) => (
            <DragonMember key={index} member={member} />
          ))}
        </div>
        <input
          type="text"
          value={this.state.newMember}
          onChange={this.handleChanges}
          placeholder="Add new member"
        />
        <button onClick={this.handleClick}>Add member</button>
      </div>
    );
  }
}

export default DragonList;
