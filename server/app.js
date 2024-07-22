import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import userTypeDefs from "./schema/user.js";
import userResolver from "./resolvers/user.js";

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolver],
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000 },
});

// console.log(process.env);
console.log(`🚀  Server ready at: ${url}`);
