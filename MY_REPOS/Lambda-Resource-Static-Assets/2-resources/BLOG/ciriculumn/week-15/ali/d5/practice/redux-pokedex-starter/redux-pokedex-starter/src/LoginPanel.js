import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { baseUrl } from './config';

class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'demo@example.com',
      password: 'password',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/session`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    });

    if (response.ok) {
      const { token } = await response.json();
      this.props.updateToken(token);
      this.setState({ token });
    }
  }

  updateEmail = e => {
    this.setState({ email: e.target.value });
  }

  updatePassword = e => {
    this.setState({ password: e.target.value });
  }

  render() {
    if (this.state.token) {
      return <Redirect to="/" />;
    }
    return (
      <main className="centered middled">
        <form onSubmit={this.handleSubmit}>
          <input type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={this.updateEmail} />
          <input type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.updatePassword} />
          <button type="submit">Login</button>
        </form>
      </main>
    );
  }
}

export default LoginPanel;
