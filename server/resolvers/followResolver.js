import Follow from "../models/Follow.js";

const resolvers = {
  Query: {
    findAllFollowers: async (_, __, contextValue) => {
      const user = contextValue.authentication();

      const followers = await Follow.findFollowers(user._id);

      return followers;
    },
    findAllFollowing: async (_, __, contextValue) => {
      const user = contextValue.authentication();

      const following = await Follow.findFollowing(user._id);

      return following;
    },
  },
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
