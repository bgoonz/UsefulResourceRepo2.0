import * as React from "react";
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  Provider as GraphqlProvider
} from "urql";
import { useAccessToken } from "./Auth0Provider";

const config = {
  endpoint: process.env.API_GRAPHQL_ENDPOINT
};

export default ({ children }) => {
  const { accessToken: authorization } = useAccessToken();

  const client = createClient({
    url: config.endpoint,
    fetchOptions: { headers: { authorization } },
    exchanges: [cacheExchange, dedupExchange, fetchExchange]
  });

  return <GraphqlProvider value={client}>{children}</GraphqlProvider>;
};
