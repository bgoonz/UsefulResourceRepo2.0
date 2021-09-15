import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { replace } from 'react-router-redux';
import { sendRecovery, recover } from '../actions/auth';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleRecoveryRequest = this.handleRecoveryRequest.bind(this);
    this.handleConfirm =this.handleConfirm.bind(this);
    this.handleConfirmationError = this.handleConfirmationError.bind(this);
  }

  componentDidMount() {
    const { code, dispatch } = this.props;
    if (code) {
      dispatch(recover(code)).then(this.handleConfirm, this.handleConfirmationError);
    }
  }

  handleChange(field) {
    return (e) => {
      const state = {};
      state[field] = e.target.value;
      this.setState(state);
    }
  }

  handleRecoveryRequest(e) {
    const { email } = this.state;
    e.preventDefault();
    this.props.dispatch(sendRecovery(email)).then(
      (success) => this.setState({success: true}),
      (error) => this.setState({error:error})
    );
  }

  handleConfirm() {
    this.props.dispatch(replace('/'));
  }

  handleConfirmationError(error) {
    this.setState({
      error: error.msg
    });
  }

  render() {
    const { code } = this.props;
    const { success, error } = this.state;

    if (success) {
      return <div>
        <h2>Check your email</h2>
        <p>{'We\'ve sent you an email with a link to recover your password'}</p>
      </div>
    }

    if (code && error) {
      return <div>
        <h2>Error recovering password</h2>
        <p>{error}</p>
      </div>;
    }

    if (code) {
      return <div>
        <h2>Recovering password</h2>
        <p>One more moment...</p>
      </div>;
    }

    return <div>
      <h2>Password Recovery</h2>
      <form onSubmit={this.handleRecoveryRequest}>
        {error && <h3>Error recovering password: {error}</h3>}
        <p>
          <label>Email: </label>
          <input type="email" onChange={this.handleChange('email')}/>
        </p>
        <p>
          <button>Recover password</button>
        </p>
      </form>
    </div>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    code: ownProps.params.code
  };
}

export default connect(mapStateToProps)(Signup);
