import React from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import * as actions from "actions";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.loginUser = this.loginUser.bind(this);
    this.state = {
      loginErrors: [],
    };
  }

  loginUser(values) {
    this.props.dispatch(actions.login(values)).then((res) => {
      if (res && res.errors) this.setState({ loginErrors: res.errors });
    });
  }

  render() {
    const { loginErrors } = this.state;
    const { fromSuccessRegister } = this.props.location.state || false;

    return (
      <section id="login">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Login</h1>
              {fromSuccessRegister && (
                <div className="alert alert-success">
                  <p>You have been succesfuly registered, please login in</p>
                </div>
              )}
              <LoginForm errors={loginErrors} submitCb={this.loginUser} />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img
                  src={process.env.PUBLIC_URL + "/img/login-image.jpg"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect()(Login);
