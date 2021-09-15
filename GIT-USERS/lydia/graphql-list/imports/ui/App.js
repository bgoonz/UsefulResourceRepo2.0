import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import { Button } from 'react-materialize';
import gql from 'graphql-tag';
import styled from 'styled-components';

import ResolutionForm from './ResolutionForm';
import { ResolutionsList } from './ResolutionsList';
import UserAuth from './UserAuth';

const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
      completed
      goals {
        _id
        name
        completed
      }
    }
    user {
      _id
    }
  }
`;

const App = ({ loading, resolutions, client, user }) => (
  <Form>
    { user != undefined && user._id != null ?
      <Button onClick={ () => {
        Meteor.logout() 
        client.resetStore() }}>
        Log Out
      </Button> :
      <UserAuth client={ client } />
    }
    <ResolutionForm />
    <ResolutionsList loading={ loading } resolutions={ resolutions } />
  </Form>
);

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default graphql(resolutionsQuery, {
  props: ({data}) => ({...data})
})(withApollo(App));
