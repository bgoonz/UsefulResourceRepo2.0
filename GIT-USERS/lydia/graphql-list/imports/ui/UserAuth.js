import React, { Component } from 'react';
import { Button, Input } from 'react-materialize';
import { Accounts } from 'meteor/accounts-base';

export default class UserAuth extends Component {
  constructor() {
    super();
    this.state = { login: true };
    this.emailRef = React.createRef();
    this.passRef = React.createRef();
  }

  toggleState = () => {
    this.setState({ login: !this.state.login });
  }

  loginUser = e => {
    e.preventDefault();
    this.state.login ? 
    Meteor.loginWithPassword(
      this.emailRef.current.state.value,
      this.passRef.current.state.value,
      (err) => err ? console.log(err) :
      this.props.client.resetStore()) :
    Accounts.createUser({
      email: this.emailRef.current.state.value,
      password: this.passRef.current.state.value,
    }, err => 
      err ? console.log(err) :
      this.props.client.resetStore()
    );
  }

  render() {
    const { login } = this.state;
    return (
      <div>
        <span onClick={ this.toggleState }>
          Or {login ? 'Sign up' : 'Log in'}
        </span>
        <form onSubmit={this.loginUser}> 
          <Input type='email' ref={ this.emailRef } />
          <Input type='password' ref={ this.passRef } />
          <Button type='submit'>{login ? 'Login' : 'Register'}</Button>
        </form>
      </div>
    );
  }
}
