import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const Profile = (props) => {
  const { username } = props.auth;
  return (
    <div className="container bootstrap snippet">
      <div className="row">
        <div className="col-sm-3">
          <h1>{username}</h1>
        </div>
        <div className="col-sm-4">
          <h1 className="align-left">My Profile</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <div className="text-center mb-4">
            <img
              src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
              className="avatar mb-4"
              alt="avatar"
            />
            <h6>Upload a different photo...</h6>
            <input
              type="file"
              className="text-center center-block file-upload"
            />
          </div>
          <div className="panel panel-default"></div>

          <div className="panel panel-default">
            <div className="panel-body text-center ">
              <i className="fa fa-facebook fa-2x mr-6"></i>{" "}
              <i className="fa fa-twitter fa-2x mr-6"></i>{" "}
              <i className="fa fa-instagram fa-2x mr-6"></i>
            </div>
          </div>
        </div>
        <div className="col-sm-9">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#settings">
                Revenue
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active" id="home">
              <form className="form">
                <br />
                <div className="form-group">
                  <div className="col-xs-6">
                    <label for="first_name">
                      <h4>First name</h4>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="first_name"
                      id="first_name"
                      placeholder="first name"
                      title="enter your first name if any."
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label for="last_name">
                      <h4>Last name</h4>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      id="last_name"
                      placeholder="last name"
                      title="enter your last name if any."
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label for="phone">
                      <h4>Phone</h4>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      id="phone"
                      placeholder="enter phone"
                      title="enter your phone number if any."
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label for="mobile">
                      <h4>Mobile</h4>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="mobile"
                      id="mobile"
                      placeholder="enter mobile number"
                      title="enter your mobile number if any."
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label for="email">
                      <h4>Email</h4>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="you@email.com"
                      title="enter your email."
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label for="email">
                      <h4>Location</h4>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="location"
                      placeholder="somewhere"
                      title="enter a location"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-xs-12">
                    <button className="btn btn-lg btn-success" type="submit">
                      <i className="glyphicon glyphicon-ok-sign"></i> Save
                    </button>
                    <button className="btn btn-lg" type="reset">
                      <i className="glyphicon glyphicon-repeat"></i> Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="tab-pane" id="settings">
              <form className="form">
                <br />
                <div className="form-group">
                  <div className="col-xs-6">
                    <label for="first_name"></label>
                    <h2>Total:</h2>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Profile);
