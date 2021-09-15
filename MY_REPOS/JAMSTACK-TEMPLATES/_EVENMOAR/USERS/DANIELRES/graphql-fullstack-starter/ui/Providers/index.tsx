import React from "react";
import ApolloProvider from "./ApolloProvider";

interface IProps {
  children: JSX.Element;
}

export default function Providers({ children }: IProps): JSX.Element {
  return <ApolloProvider>{children}</ApolloProvider>;
}
