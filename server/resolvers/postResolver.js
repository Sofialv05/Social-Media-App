const resolvers = {
  Query: {
    findPosts: async () => {},
  },

  Mutation: {
    addPost: async (_, { inputPost }) => {},
    commentPost: async (_, { inputComment }) => {},
    likePost: async (_, { inputLike }) => {},
  },
};

export default resolvers;
