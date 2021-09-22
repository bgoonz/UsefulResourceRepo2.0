import React, { Fragment } from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";

import QuakeTile from "./components/quaketile";
import Header from "./components/header";
import "./App.css";

const GET_QUAKES = gql`
  query quakeList($after: String) {
    quakes(after: $after) {
      cursor
      hasMore
      quakes {
        id
        magnitude
        location
        when
        cursor
      }
    }
  }
`;

function Quakes() {
  const client = useApolloClient();
  const { data, loading, error, fetchMore } = useQuery(GET_QUAKES);

  const logoutHandler = (e) => {
    e.preventDefault();
    client.writeData({ data: { isLoggedIn: false } });
    localStorage.clear();
  };
  if (loading) return <p>Loading, Yo!</p>;
  if (error) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header />
      <div className="main">
        <button type="submit" onClick={logoutHandler}>
          Log Out
        </button>
        {data.quakes &&
          data.quakes.quakes &&
          data.quakes.quakes.map((quake) => (
            <QuakeTile
              key={quake.id}
              id={quake.id}
              magnitude={quake.magnitude}
              location={quake.location}
              when={quake.when}
            />
          ))}
        {data.quakes && data.quakes.hasMore && (
          <button
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.quakes.cursor,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return {
                    ...fetchMoreResult,
                    quakes: {
                      ...fetchMoreResult.quakes,
                      quakes: [
                        ...prev.quakes.quakes,
                        ...fetchMoreResult.quakes.quakes,
                      ],
                    },
                  };
                },
              })
            }
          >
            Load More
          </button>
        )}
      </div>
    </Fragment>
  );
}

export default Quakes;
