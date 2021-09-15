import '~/modules/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import 'style!css!graphiql/graphiql.css';
import GraphQLClient from '~/modules/graphql-client/GraphQLClient';
import GraphQLClientBrowserAdapter from '~/modules/graphql-client/GraphQLClientBrowserAdapter';

const graphQLClient = new GraphQLClient(new GraphQLClientBrowserAdapter());
const fetcher = graphQLClient.fetch.bind(graphQLClient);

ReactDOM.render(<GraphiQL fetcher={fetcher} />, document.getElementById('main'));
