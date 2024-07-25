import { GraphQLError } from "graphql";
import redis from "../config/redis.js";
import Post from "../models/Post.js";

const resolvers = {
  Query: {
    findPosts: async (_, { search }) => {
      const postChaches = await redis.get("posts:all");

      if (postChaches) {
        return JSON.parse(postChaches);
      } else {
        const posts = await Post.findAllPosts(search);
        await redis.set("posts:all", JSON.stringify(posts));
        return posts;
      }
    },
    findPostByAuthorId: async (_, __, contextValue) => {
      const user = contextValue.authentication();

      const posts = await Post.findPostByAuthorId(user._id);

      return posts;
    },

    findPostById: async (_, { postId }) => {
      const post = await Post.findPostById(postId);

      if (!post) {
        return new GraphQLError("Post not found");
      }

      return post[0];
    },
  },

  Mutation: {
    addPost: async (_, { inputPost }, contextValue) => {
      const user = contextValue.authentication();

      const authorId = user._id;
      const post = await Post.createOnePost({ ...inputPost, authorId });
      const postChaches = await redis.get("posts:all");

      if (postChaches) {
        await redis.del("posts:all");
      }

      if (post.acknowledged) {
        return { message: "Successfully add new post" };
      }

      return new GraphQLError("Failed to add post", {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
      });
    },
    commentPost: async (_, { inputComment }, contextValue) => {
      const user = contextValue.authentication();
      const post = await Post.addCommentOnPost({
        ...inputComment,
        username: user.username,
      });

      const postChaches = await redis.get("posts:all");

      if (postChaches) {
        await redis.del("posts:all");
        // const parsedChaches = JSON.parse(postChaches);

        // parsedChaches.push(post);

        // await redis.set("posts:all", JSON.stringify(parsedChaches));
      }
      if (post.acknowledged) {
        const findPost = await Post.findPostById(inputComment.postId);
        return findPost;
      }

      return new GraphQLError("Failed to add comment", {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
      });
    },
    likePost: async (_, { inputLike }, contextValue) => {
      const user = contextValue.authentication();
      const post = await Post.addLikeOnPost({
        ...inputLike,
        username: user.username,
      });

      const postChaches = await redis.get("posts:all");

      if (postChaches) {
        await redis.del("posts:all");
      }
      if (post.acknowledged) {
        const findPost = await Post.findPostById(inputLike.postId);
        return findPost;
      }

      return new GraphQLError("Failed to like a post", {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
      });
    },
  },
};

export default resolvers;
