import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import apolloClient from "./apolloClient";

interface IProps {
  children: JSX.Element;
}

export default function ConfiguredApolloProvider({
  children,
}: IProps): JSX.Element {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
