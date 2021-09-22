import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";

import TextFieldGroup from "../common/TextFieldGroup";
import { loginUser } from "../../actions/authActions";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      email: "",
      password: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newObject = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(newObject);
    this.props.loginUser(newObject);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login-form mt-5 mb-5">
        <div className="row">
          <div className="col-sm-3" />
          <div className="col-sm-6">
            <form noValidate onSubmit={this.onSubmit}>
              <h4 className="modal-title">Login</h4>
              <div className="form-group mt-4">
                <TextFieldGroup
                  type="email"
                  error={errors.email}
                  placeholder="Enter email"
                  name="email"
                  label="Email"
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
              Don't have an account? <Link to="/register">Sign up</Link>
            </div>
          </div>
          <div className="col-sm-3" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
