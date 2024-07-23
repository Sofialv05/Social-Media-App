import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userTypeDefs, postTypeDefs, followTypeDefs } from "./schema/index.js";
import userResolver from "./resolvers/userResolver.js";
import postResolver from "./resolvers/postResolver.js";
import followResolver from "./resolvers/followResolver.js";

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolver, postResolver, followResolver],
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000 },
});

console.log(`🚀  Server ready at: ${url}`);
