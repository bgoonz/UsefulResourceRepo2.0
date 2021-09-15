import React from "react";
import ResourceForm from "./ResourceForm";
import withAlert from "../hoc/withAlert";
import { updateResourceApi } from "../actions";

const ResourceUpdate = ({
  resource,
  onResourceUpdate,
  displayAlert,
  alert,
}) => {
  const updateResource = async (resourceData) => {
    try {
      const updatedResource = await updateResourceApi(
        resourceData._id,
        resourceData
      );
      onResourceUpdate(updatedResource);
      displayAlert("success", "Resouce was updated!");
    } catch (e) {
      displayAlert("error", e);
    }
  };

  if (!resource?._id) {
    return "Resource update is not available!";
  }

  return (
    <ResourceForm alert={alert} onSubmit={updateResource} resource={resource} />
  );
};

export default withAlert(ResourceUpdate);
