/*import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import resolvers from "./resolvers";

// Opret server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server standalone
const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const viewerId = req.headers["x-player-id"] || null;
      console.log("Viewer ID:", viewerId);
      return { viewerId };
    },
  });
  console.log(`🚀 Server klar på: ${url}`);
  console.log(`📭 GraphQL Playground: ${url}playground`);
  console.log(`🧑‍💻 Apollo Studio: https://studio.apollographql.com/sandbox/explorer`);
  console.log(`🔗 GraphiQL: ${url}graphiql`);
  console.log(`📝 Dokumentation: ${url}docs`);
};

start();
*/
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { typeDefs } from "./schema";
import resolvers from "./resolvers";
import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();

// 👇 Opret samlet schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// 👇 HTTP server + WebSocket server
const httpServer = createServer();

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// 🔥 GraphQL over WebSocket
useServer({ schema }, wsServer);

// Apollo-server over HTTP
const server = new ApolloServer({ schema });

async function start() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const viewerId = req?.headers["x-player-id"] || null;
      return { viewerId, pubsub };
    },
  });

  console.log(`🚀 Server klar på: ${url}`);
  console.log(`🚀 Server klar på: http://localhost:4000/graphql`);
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

