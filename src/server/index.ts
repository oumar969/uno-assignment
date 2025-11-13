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

const schema = makeExecutableSchema({ typeDefs, resolvers });

// ---- HTTP + WS share same port ----
const httpServer = createServer();
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// GraphQL over WebSocket
useServer({ schema }, wsServer);

// ---- HTTP Apollo server ----
const server = new ApolloServer({ schema });

async function start() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const viewerId = req?.headers["x-player-id"] || null;
      return { viewerId, pubsub };
    },
  });

  console.log(`🚀 Server running at: ${url}`);
  console.log(`🔗 Subscriptions at: ws://localhost:4000/graphql`);
}

start().catch((err) => {
  console.error("Server start failed:", err);
  process.exit(1);
});
