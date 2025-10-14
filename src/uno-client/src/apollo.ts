import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/", // din server
  headers: {
      "x-player-id": localStorage.getItem("myPlayerId") || "",
    },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
