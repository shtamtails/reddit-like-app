import { split, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { readFromLocalStorage } from "./utils/localStorage";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  uri: "https://api.vrmarketing.guru/",
});

const authLink = setContext((_, { headers }) => {
  if (typeof window !== "undefined") {
    const token = readFromLocalStorage("token");
    if (token) {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
  }
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "wss://api.vrmarketing.guru/graphql",
        })
      )
    : null;

const link =
  typeof window !== "undefined"
    ? split(
        //only create the split in the browser
        // split based on operation type
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        authLink.concat(httpLink)
      )
    : authLink.concat(httpLink);

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
