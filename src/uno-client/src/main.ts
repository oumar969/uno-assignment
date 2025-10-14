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

// 🔗 GraphQL endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// 🧠 Dynamisk authLink – henter playerId hver gang der sendes en request
const authLink = setContext((_, { headers }) => {
  const playerId = localStorage.getItem("myPlayerId");
  return {
    headers: {
      ...headers,
      "x-player-id": playerId || "",
    },
  };
});

// ⚙️ Apollo Client setup
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          game: {
            keyArgs: ["id"],
            merge: false, // så vi ikke cacher gamle spil
          },
        },
      },
    },
  }),
});

// 🚀 Mount app
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router);
app.mount("#app");
