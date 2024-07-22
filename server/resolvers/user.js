import { compare } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/jwt.js";
import User from "../models/User.js";

const resolvers = {
  Query: {
    findUsers: async () => {
      const data = await User.findAllUsers();
      return data;
    },
  },

  Mutation: {
    register: async (_, { inputUser }) => {
      //   console.log("test");
      const result = await User.createOneUser(inputUser);
      const newUser = await User.findOneUser(result.insertedId);
      return newUser;
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
