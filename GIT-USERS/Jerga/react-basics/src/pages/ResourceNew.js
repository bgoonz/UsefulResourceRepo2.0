import React from "react";
import ResourceForm from "../components/ResourceForm";
import { useHistory } from "react-router-dom";
import withAlert from "../hoc/withAlert";

import { createResourceApi } from "../actions";

const ResourceNew = ({ alert, displayAlert }) => {
  const router = useHistory();

  const createResource = async (resource) => {
    try {
      const { _id } = await createResourceApi(resource);
      router.push(`/resources/${_id}`);
    } catch (e) {
      displayAlert("error", e);
    }
  };

  return <ResourceForm onSubmit={createResource} alert={alert} />;
};

export default withAlert(ResourceNew);
