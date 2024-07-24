import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userTypeDefs, postTypeDefs, followTypeDefs } from "./schema/index.js";
import userResolver from "./resolvers/userResolver.js";
import postResolver from "./resolvers/postResolver.js";
import followResolver from "./resolvers/followResolver.js";
import { GraphQLError } from "graphql";
import { verifyToken } from "./helpers/jwt.js";

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolver, postResolver, followResolver],
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000 },
  context: async ({ req, res }) => {
    return {
      authentication: () => {
        const access_token = req.headers.authorization;
        if (!token) {
          throw GraphQLError("Unauthenticated");
        }

        const [Bearer, token] = access_token.split(" ");

        if (!Bearer || !token) {
          throw GraphQLError("Unauthenticated");
        }

        const user = verifyToken(token);

        return user;
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
