import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="grid">
          <div className="row">
            <div className="col-lg-3 col-md-8 col-xs-12 col-12">
              <img
                src={profile.user.avatar}
                alt=""
                className="rounded-circle"
              />
            </div>
            <div className="col-lg-4 col-md-4 col-xs-12 col-12 ml-3">
              <h3 className="pt-3">{profile.user.name}</h3>
              {profile.status}
              {isEmpty(profile.company) ? null : (
                <span> at {profile.company}</span>
              )}
              <br />
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
              <br />
              <br />
              <Link to={`browse/${profile.handle}`} className="btn btn-primary">
                View Profile
              </Link>
            </div>
            <div className="col-md-4 d-none d-md-block pt-3">
              <h4>Skill Set</h4>
              <ul className="list-group">
                {profile.skills.slice(0, 4).map((skill, index) => (
                  <li
                    key={index}
                    className="card-header"
                    style={{ listStyle: "none" }}
                  >
                    <i className="fa fa-laptop pr-2" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileItem;
