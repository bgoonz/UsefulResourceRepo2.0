import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { withRouter } from "react-router-dom";
import TableResponsive from "../../components/TableResponsive";
import { GET_PERSONS } from "../../gql/persons";

function PersonsTable({ history }) {
  const { loading, error, data } = useQuery(GET_PERSONS); // eslint-disable-line no-unused-vars

  if (loading) return <p>Loading...</p>;

  return (
    <TableResponsive
      items={data.persons}
      onRowClick={id => history.push(`/persons/${id}`)}
      rows={{
        name: "Name",
        headline: "Headline",
        currentPosition: "Current Position",
        createdAt: "Added"
      }}
    />
  );
}

export default withRouter(PersonsTable);
