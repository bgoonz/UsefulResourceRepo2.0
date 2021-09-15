import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-primary mr-3">
        <i className="fas fa-user-circle text-white mr-2" />
        Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-primary mr-3">
        <i className="fab fa-black-tie text-white mr-2" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-primary mr-3">
        <i className="fas fa-graduation-cap text-white mr-2" />
        Add Education
      </Link>
    </div>
  );
};

export default ProfileActions;
