import { createApp, h, provide } from "vue";
import App from "./App.vue";
import { router } from "./router";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// 🧠 Sørg for at hente playerId når app starter
const playerId = localStorage.getItem("myPlayerId");

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "x-player-id": playerId || "",
  },
}));

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          game: {
            keyArgs: ["id"],
            merge: false,
            read(existing) {
              return existing;
            },
          },
        },
      },
    },
  }),
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router);
app.mount("#app");
