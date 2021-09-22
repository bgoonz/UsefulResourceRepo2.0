import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { login } from '../actions/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.handleLoginError = this.handleLoginError.bind(this);
  }

  handleChange(field) {
    return (e) => {
      const state = {};
      state[field] = e.target.value;
      this.setState(state);
    }
  }

  handleLogin(e) {
    const { email, password } = this.state;
    e.preventDefault();
    this.props.dispatch(login(email, password)).then(
      this.handleLoginSuccess,
      this.handleLoginError
    );
  }

  handleLoginSuccess() {
    this.props.dispatch(push('/'));
  }

  handleLoginError(error) {
    console.log('error %o', error);
    this.setState({error: error.description || error.toString()});
  }

  render() {
    const { error } = this.state;

    return <div>
      <h2>Login</h2>
      <form onSubmit={this.handleLogin}>
        {error && <h3>Error Login in: {error}</h3>}
        <p>
          <label>Email: </label>
          <input type="email" onChange={this.handleChange('email')}/>
        </p>
        <p>
          <label>Password: </label>
          <input type="password" onChange={this.handleChange('password')}/>
        </p>
        <p>
          <button>Login</button> <Link to='/amnesia'>Forgot your password?</Link>
        </p>
      </form>
    </div>;
  }
}

function mapStateToProps(props) {
  return {};
}

export default connect(mapStateToProps)(Login);
