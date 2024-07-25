import { ObjectId } from "mongodb";
import { database } from "../config/db.js";

class Post {
  static async findAllPosts() {
    const postCollection = database.collection("posts");
    const posts = postCollection.find().toArray();

    return posts;
  }

  static async findPostById(postId) {
    const postCollection = database.collection("posts");
    const post = postCollection.findOne({
      _id: new ObjectId(postId),
    });

    return post;
  }

  static async createOnePost(input) {
    const { content, tags, imgUrl, authorId } = input;
    const postCollection = database.collection("posts");
    const post = postCollection.insertOne({
      content,
      tags,
      imgUrl,
      authorId,
      comments: [],
      likes: [],
    });

    return post;
  }

  static async addCommentOnPost(inputComment) {
    const { content, username, postId } = inputComment;
    const postCollection = database.collection("posts");

    const post = postCollection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: {
          comments: {
            content,
            username,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      }
    );

    return post;
  }

  static async addLikeOnPost({ username, postId }) {
    const postId = "";
    const postCollection = database.collection("posts");

    const post = postCollection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: {
          likes: {
            username,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      }
    );

    return post;
  }
}

export default Post;
