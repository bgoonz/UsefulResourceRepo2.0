import { GraphQLClient } from "graphql-request";
import * as config from "../../config";

const endpoint = config.fauna.graphql.endpoint;
const secret = config.fauna.keys.server;

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: { authorization: `Bearer ${secret}` },
});
