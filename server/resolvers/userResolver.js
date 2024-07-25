import { compare } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/jwt.js";
import { GraphQLError } from "graphql";
import User from "../models/User.js";
import UserValidation from "../validations/userValidation.js";

const resolvers = {
  Query: {
    findUsers: async () => {
      const data = await User.findAllUsers();
      return data;
    },
  },

  Mutation: {
    register: async (_, { inputUser }) => {
      const validate = UserValidation.safeParse(inputUser);
      // console.log(validate);
      if (!validate.success) {
        // console.error(validate.error.errors[0].message);
        throw new GraphQLError(validate.error.errors[0].message, {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const result = await User.createOneUser(inputUser);

      if (result.acknowledged) {
        return { message: "Successfully add new user" };
      } else {
        throw new GraphQLError("Failed to add user", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
    },

    login: async (_, { inputLogin }) => {
      const { username, password } = inputLogin;

      if (!username) {
        throw new GraphQLError("Username is required", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (!password) {
        throw new GraphQLError("Pasword is required", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const user = await User.findOneUserByUsername(username);

      if (!user) {
        throw new GraphQLError("Username does not exist", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const isValidPassword = compare(password, user.password);

      if (!isValidPassword) {
        throw new GraphQLError("Invalid Password", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const token = signToken({ _id: user._id, username });

      return { token, username };
    },
  },
};

export default resolvers;
