import ApolloClient from "apollo-boost";
import config from "../config";

const { URL } = config.graphql;

export default new ApolloClient({
  uri: URL,
  credentials: "include",
});
