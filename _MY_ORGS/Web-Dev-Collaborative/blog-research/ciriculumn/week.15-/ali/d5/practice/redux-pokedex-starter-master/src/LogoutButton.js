import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { baseUrl } from './config';

class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedOut: false
    };
  }

  logout = () => {
    fetch(`${baseUrl}/session`, {
      method: 'delete',
      headers: { Authorization: `Bearer ${this.props.token}` },
    }).then(() => this.setState({ loggedOut: true }));
  }

  render() {
    if (this.state.loggedOut) {
      return <Redirect to="/login" />;
    }
    return (
      <div id="logout-button-holder">
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default LogoutButton;
