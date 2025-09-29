import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";   // <- dine GraphQL typeDefs
import resolvers from "./resolvers";   // <- dine resolvers

// Opret server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server standalone
const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
};

start();
