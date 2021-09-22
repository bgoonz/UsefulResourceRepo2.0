import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../actions/auth';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(logout());
  }

  render() {
    const { user } = this.props;

    return <div>
      <h1>Authlify Example</h1>
      {user && <div>
        <h3>Logged in as <strong>{user.email}</strong> <small>
          <a href="#" onClick={this.handleLogout}>Logout</a>
        </small></h3>
      </div>}
      {!user && <div>
        <h3><Link to="/login">Login</Link> or <Link to="/signup">Signup</Link></h3>
      </div>}

      {this.props.children}
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth
  };
}

export default connect(mapStateToProps)(App);
