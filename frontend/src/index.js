import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import GlobalStyle from "./GlobalStyles";

import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHookProvider } from "react-apollo-hooks";

import client from "./apolloClient";

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHookProvider client={client}>
      <App />
      <GlobalStyle />
    </ApolloHookProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
