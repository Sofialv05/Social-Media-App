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
  },
};

export default resolvers;
