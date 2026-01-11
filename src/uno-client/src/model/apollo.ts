import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client/core"
import { createClient } from "graphql-ws"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { setContext } from "@apollo/client/link/context"
import { getMainDefinition } from "@apollo/client/utilities"
//we build the “connection layer”. it decides how to send GraphQL operations to the server.
//Queries and Mutations go over HTTP, 
//Subscriptions go over WebSocket.
//We also add an AuthLink to add the player ID to each request header.
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", 
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
  })
)

// AuthLink to add player ID to headers
const authLink = setContext((_, { headers }) => {
  const playerId = localStorage.getItem("myPlayerId");
  return {
    headers: {
      ...headers,
      "x-player-id": playerId || "",
    },
  };
});

// Split links: WebSocket for subscriptions, HTTP for queries/mutations
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    const isSubscription = definition.kind === "OperationDefinition" && definition.operation === "subscription"
    return isSubscription
  },
  wsLink,
  authLink.concat(httpLink)
)

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})
