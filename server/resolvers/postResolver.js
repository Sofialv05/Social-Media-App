import { GraphQLError } from "graphql";
import redis from "../config/redis.js";
import Post from "../models/Post.js";

const resolvers = {
  Query: {
    findPosts: async () => {
      const postChaches = await redis.get("posts:all");

      if (postChaches) {
        return JSON.parse(postChaches);
      } else {
        const posts = await Post.findAllPosts();
        await redis.set("posts:all", JSON.stringify(posts));
        return posts;
      }
    },
    // findPost: async () => {

    // },
  },

  Mutation: {
    addPost: async (_, { inputPost }, contextValue) => {
      const user = contextValue.authentication();

      // await redis.del("posts:all");
      const postId = "";
      const authorId = user._id;
      await Post.createOnePost({ ...inputPost, authorId });
      const post = Post.findPostById(postId);
      const postChaches = await redis.get("posts:all");

      if (postChaches) {
        const parsedChaches = JSON.parse(postChaches);

        parsedChaches.push(post);

        await redis.set("posts:all", JSON.stringify(parsedChaches));
      }

      return post;
    },
    commentPost: async (_, { inputComment }) => {
      const post = await Post.addCommentOnPost(inputComment);
      if (post.acknowledged) {
        const findPost = await Post.findPostById(inputComment.postId);
        return findPost;
      }
    },
    likePost: async (_, { inputLike }) => {
      const post = await Post.addLikeOnPost(inputLike);
      if (post.acknowledged) {
        const findPost = await Post.findPostById(inputLike.postId);
        return findPost;
      }
    },
  },
};

export default resolvers;
