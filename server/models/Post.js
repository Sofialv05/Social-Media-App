import { ObjectId } from "mongodb";
import { database } from "../config/db";

class Post {
  static async findAllPosts() {
    const postCollection = database.collection("posts");
    const posts = postCollection.find().toArray();

    return posts;
  }

  static async createOnePost(inputPost) {
    const { content, tags, imgUrl, authorId } = inputPost;
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
    const postId = "";
    const { content, username } = inputComment;
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

  static async addLikeOnPost({ username }) {
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
