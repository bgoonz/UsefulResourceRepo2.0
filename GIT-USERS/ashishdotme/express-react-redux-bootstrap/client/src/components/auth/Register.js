import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";

import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

import "./Register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const user = this.props.auth.user;
    return (
      <div className="login-form mt-5 mb-5">
        <div className="row">
          <div className="col-sm-3" />
          <div className="col-sm-6">
            <form
              className="needs-validation"
              onSubmit={this.onSubmit}
              noValidate
            >
              <h4 className="modal-title">Register</h4>
              <div className="form-group mt-4">
                <TextFieldGroup
                  type="text"
                  error={errors.name}
                  placeholder="Enter name"
                  name="name"
                  label="Name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  type="email"
                  error={errors.email}
                  placeholder="Enter email"
                  name="email"
                  label="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  type="text"
                  error={errors.password}
                  placeholder="Enter password"
                  name="password"
                  label="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  type="text"
                  error={errors.password2}
                  placeholder="Enter password again"
                  name="password2"
                  label="Confirm Password"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group small clearfix">
                <label className="checkbox-inline">
                  <input type="checkbox" /> Remember me
                </label>
              </div>
              <input
                type="submit"
                className="btn btn-primary btn-block btn-lg"
                value="Login"
              />
            </form>
            <div className="text-center small mt-4">
              Alread have an account? <Link to="/login">Login</Link>
            </div>
          </div>
          <div className="col-sm-3" />
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
