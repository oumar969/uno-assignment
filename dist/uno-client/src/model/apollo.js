import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client/core";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";
const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
});
const wsLink = new GraphQLWsLink(createClient({
    url: "ws://localhost:4000/graphql",
}));
// Auth header
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
const splitLink = split(({ query }) => {
    const definition = getMainDefinition(query);
    const isSubscription = definition.kind === "OperationDefinition" && definition.operation === "subscription";
    console.log("🔀 Apollo split:", {
        kind: definition.kind,
        operation: definition.operation,
        useWebSocket: isSubscription
    });
    return isSubscription;
}, wsLink, authLink.concat(httpLink));
export const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});
//# sourceMappingURL=apollo.js.map