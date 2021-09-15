import React from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsProvider";

const ResourceDetail = ({ resource }) => {
  const { settings } = useSettings();

  if (!resource?._id) {
    return (
      <div className="card">
        <div className="card-body">No resource selected :(</div>
      </div>
    );
  }

  return (
    <div className={`card ${settings?.theme}`}>
      <div className="card-header">{resource.title}</div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>{resource.description}</p>
          <footer className="text-muted mb-2">{resource.type}</footer>
        </blockquote>
        <Link to={`/resources/${resource._id}`} className="btn btn-primary">
          See the resource
        </Link>
      </div>
    </div>
  );
};

export default ResourceDetail;
