import { ApolloServer } from "@apollo/server";
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
