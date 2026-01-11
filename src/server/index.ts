import { typeDefs } from "./schema";
import { makeExecutableSchema } from "@graphql-tools/schema";

import express from "express";
import { expressMiddleware } from "@apollo/server/express4";

import { createServer } from "http";
import { WebSocketServer } from "ws";

import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import resolvers from "./resolvers";
import cors from "cors";
import { gameEvents } from "./context";

//HTTP handles queries and mutations, WebSocket handles subscriptions, 
// and both share the same /graphql endpoint with a shared schema and context.”

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

// WebSocket server for subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// graphql-ws: connect GraphQL subscriptions to WebSocket transport
const serverCleanup = useServer(
  {
    schema,
    onConnect: async (ctx: any) => {
      return true;
    },
    context: async (ctx: any) => {
      const viewerId = ctx.connectionParams?.["x-player-id"] || null;
      return { gameEvents, viewerId };
    },
  },
  wsServer
);

// Apollo Server handles Query + Mutation over HTTP
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
