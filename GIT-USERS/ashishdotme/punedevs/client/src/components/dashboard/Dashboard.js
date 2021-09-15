import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import Experience from "./Experience";
import Education from "./Education";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.deleteProfile = this.deleteProfile.bind(this);
  }
  deleteProfile() {
    this.props.deleteProfile();
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile == null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education experience={profile.education} />
            <div className="mb-5" />
            <button onClick={this.deleteProfile} className="btn btn-danger">
              Delete Profile
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteProfile })(
  Dashboard
);
