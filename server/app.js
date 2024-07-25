import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userTypeDefs, postTypeDefs, followTypeDefs } from "./schema/index.js";
import {
  userResolver,
  postResolver,
  followResolver,
} from "./resolvers/index.js";
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
        if (!access_token) {
          throw new GraphQLError("Unauthenticated");
        }

        const [bearer, token] = access_token.split(" ");

        if (bearer !== "Bearer" || !token) {
          throw new GraphQLError("Invalid token");
        }

        const user = verifyToken(token);

        return user;
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
