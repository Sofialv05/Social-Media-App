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

      await User.createOneUser(inputUser);
      return { message: "Successfully add new user" };
    },

    login: async (_, { inputLogin }) => {
      const { username, password } = inputLogin;

      const user = await User.findOneUserByUsername(username);

      const isValidPassword = compare(password, user.password);

      if (!isValidPassword) throw Error;

      const token = signToken({ _id: user._id });

      return { token, username };
    },
  },
};

export default resolvers;
