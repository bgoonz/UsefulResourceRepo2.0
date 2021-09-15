import React from "react";
import { useParams } from "react-router-dom";
import { useGetResource } from "../actions";
import { useSettings } from "../context/SettingsProvider";

const ResourceDetail = () => {
  const { settings } = useSettings();
  const { id } = useParams();
  const { resource, loading, error } = useGetResource(id);

  if (loading) {
    return "Resource is getting loaded!";
  }

  if (error) {
    return "Resource cannot be loaded";
  }

  return (
    <div className={`card ${settings?.theme}`}>
      <div className="card-header">{resource.title}</div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>{resource.description}</p>
          <footer className="text-muted mb-2">{resource.type}</footer>
        </blockquote>
        <a href={resource.link} target="_blank">
          See resource link
        </a>
      </div>
    </div>
  );
};

export default ResourceDetail;
