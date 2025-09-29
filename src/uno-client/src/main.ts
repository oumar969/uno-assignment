// src/main.ts
import { createApp, h, provide } from "vue";
import App from "./App.vue";
import { router } from "./router";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // din server
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient); // provide Apollo client to the app
  },
  render: () => h(App),
})
  .use(router)
  .mount("#app");
