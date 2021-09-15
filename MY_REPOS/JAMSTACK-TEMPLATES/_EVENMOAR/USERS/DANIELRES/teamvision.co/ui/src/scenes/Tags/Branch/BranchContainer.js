import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { GET_TAG_TREE_DATA } from "../../../gql/tags";

import Branch from "./Branch";

export default ({ node }) => {
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(GET_TAG_TREE_DATA);

  if (loading) return <p>Loading...</p>;

  return <Branch flatTreeData={data.tagTreeData} node={node} />;
};
