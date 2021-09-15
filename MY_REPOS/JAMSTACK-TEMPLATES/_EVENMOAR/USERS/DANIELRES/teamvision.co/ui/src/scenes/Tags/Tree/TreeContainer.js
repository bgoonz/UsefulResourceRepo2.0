import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { GET_TAG_TREE_DATA } from "../../../gql/tags";
import Tree from "./Tree";

export default ({ ButtonDone }) => {
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(GET_TAG_TREE_DATA);

  if (loading) return <p>Loading...</p>;

  return <Tree flatTreeData={data.tagTreeData} />;
};
