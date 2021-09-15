import React from 'react';
import ThemeContext from './ThemeContext';

class Profile extends React.Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      color: "",
    };
  }

  updateSelection = (e) => {
    this.setState({ color: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.updateColor(this.state.color);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.updateSelection}
          value={this.state.color}
          placeholder="Type a color!"
        />
        <button type="submit">Change Color</button>
      </form>
    );
  }
}

export default Profile;
