import React from "react";
import RegisterForm from "./RegisterForm";
import { connect } from "react-redux";
import * as actions from "actions";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
    this.state = {
      redirect: false,
      registerErrors: [],
    };
  }

  registerUser(values) {
    this.props.dispatch(actions.register(values)).then((res) => {
      if (res && res.registered) this.setState({ redirect: true });
      else if (res.errors) this.setState({ registerErrors: res.errors });
    });
  }

  render() {
    const { redirect, registerErrors } = this.state;

    if (redirect) {
      return (
        <Redirect
          to={{ pathname: "/login", state: { fromSuccessRegister: true } }}
        />
      );
    }

    return (
      <section id="register">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Register</h1>
              <RegisterForm
                errors={registerErrors}
                submitCb={this.registerUser}
              />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  As our member you have access to most awesome places in the
                  world.
                </h2>
                <img
                  src={process.env.PUBLIC_URL + "/img/register-image.jpg"}
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

export default connect()(Register);
