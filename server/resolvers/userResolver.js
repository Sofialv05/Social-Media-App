import { compare } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/jwt.js";
import { GraphQLError } from "graphql";
import User from "../models/User.js";
import UserValidation from "../validations/userValidation.js";

const resolvers = {
  Query: {
    findUsers: async (_, { search }) => {
      const data = await User.findAllUsers(search);
      return data;
    },
    findUserById: async (_, { userId }) => {
      const data = await User.findOneUserById(userId);
      if (!data) {
        return new GraphQLError("User not found");
      }
      // console.log(data);
      return data[0];
    },
    findUserProfile: async (_, __, contextValue) => {
      const user = contextValue.authentication();
      const data = await User.findOneUserById(user._id);
      if (!data) {
        return new GraphQLError("User not found");
      }
      return data[0];
    },
  },

  Mutation: {
    register: async (_, { inputUser }) => {
      const validate = UserValidation.safeParse(inputUser);

      if (!validate.success) {
        throw new GraphQLError(validate.error.errors[0].message, {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const findUsername = await User.findOneUserByUsername(inputUser.username);

      if (findUsername) {
        return new GraphQLError("Username already exists", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const findEmail = await User.findOneUserByEmail(inputUser.findEmail);

      if (findEmail) {
        return new GraphQLError("This email is already in use", {
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
