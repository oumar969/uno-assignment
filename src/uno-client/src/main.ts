import { createApp, h, provide } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "./router";
import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { setContext } from "@apollo/client/link/context";

// HTTP link (for queries & mutations)
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

// WebSocket link (for subscriptions)
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
  })
);

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

// Split mellem query/mutation og subscription
const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === "OperationDefinition" && def.operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// Vue setup
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(createPinia());
app.use(router);
app.mount("#app");
