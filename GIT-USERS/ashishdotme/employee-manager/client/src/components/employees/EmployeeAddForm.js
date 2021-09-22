import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addEmployees } from "../../actions/empoyeeActions";
import TextFieldGroup from "../common/TextFieldGroup";

class EmployeeAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mobile: "",
      email: "",
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
    const empData = {
      name: this.state.name,
      mobile: this.state.mobile,
      email: this.state.email,
    };
    this.props.addEmployees(empData, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="add-education mt-2 mb-5">
        <div className="container">
          <Link to="/employees" className="btn btn-info">
            Go back
          </Link>
          <div className="row">
            <div className="col-md-6 m-auto">
              <h2 className="display-4 text-center">Add Employee</h2>
              <small className="d-block pb-3">* = required fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Enter name"
                  label="Name"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="* Enter mobile"
                  label="Mobile"
                  name="mobile"
                  type="text"
                  value={this.state.mobile}
                  onChange={this.onChange}
                  error={errors.mobile}
                />
                <TextFieldGroup
                  placeholder="* Enter email"
                  label="Email"
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: state.employees,
  errors: state.errors,
});

export default connect(mapStateToProps, { addEmployees })(EmployeeAddForm);
