import Follow from "../models/Follow.js";

const resolvers = {
  Mutation: {
    followUser: async (_, { inputFollow }, contextValue) => {
      const user = contextValue.authentication();

      const follow = await Follow.addFollow({
        ...inputFollow,
        followerId: user._id,
      });

      if (follow.acknowledged) {
        return { message: "Successfully add new follower" };
      }
    },
  },
};

export default resolvers;
