import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { Uploader } from "./Uploader";
import { ImageList } from "./ImageList";

const client = new ApolloClient({
  uri: process.env.API_ENDPOINT
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Uploader />
      <ImageList />
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("app"));
module.hot.accept();
