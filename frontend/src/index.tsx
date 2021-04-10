import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { savedLoginToken } from "./auth";

const httpLink = createHttpLink({
  uri: "http://localhost:4018/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = savedLoginToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const gqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={gqlClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")!
);
