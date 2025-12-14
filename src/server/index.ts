import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { typeDefs } from "./schema";
import resolvers from "./resolvers";
import { EventEmitter } from "events";
import express from "express";
import cors from "cors";
import { MemoryGameStore } from "./MemoryGameStore";
import { gameEvents } from "./context";
/*
Real-time opdateringer håndteres via:
EventEmitter på serversiden
GraphQL Subscriptions over WebSocket
ServerModel udsender events → klienter opdateres automatisk.
*/
/*EventEmitter (server data)
        ↓
GraphQL Subscriptions (protocol)
        ↓
WebSocket (transport)
        ↓
Apollo Client (client)*/

// Use EventEmitter instead of graphql-subscriptions PubSub


const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

// WebSocket server for subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// GraphQL over WebSocket
const serverCleanup = useServer(
  {
    schema,
    onConnect: async (ctx: any) => {
      return true;
    },
    context: async (ctx: any) => {
      // Extract viewerId from connection params
      const viewerId = ctx.connectionParams?.["x-player-id"] || null;
      return { gameEvents, viewerId };
    },
  },
  wsServer
);

// Apollo Server
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

async function start() {
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }: any) => {
        const viewerId = req?.headers["x-player-id"] || null;
        return { viewerId };
      },
    })
  );

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(` Server running at: http://localhost:${PORT}/graphql`);
  });
}

start().catch((err) => {
  console.error("Server start failed:", err);
  process.exit(1);
});
