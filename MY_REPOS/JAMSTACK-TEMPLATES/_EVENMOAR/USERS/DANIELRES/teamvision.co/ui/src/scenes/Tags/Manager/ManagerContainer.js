import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { GET_TAG_TREE_DATA } from "../../../gql/tags";
import Manager from "./Manager";

export default ({ ButtonDone }) => {
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(GET_TAG_TREE_DATA);

  if (loading) return <p>Loading...</p>;

  return <Manager ButtonDone={ButtonDone} flatTreeData={data.tagTreeData} />;
};
