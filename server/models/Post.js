import { ObjectId } from "mongodb";
import { database } from "../config/db.js";

class Post {
  static async findAllPosts(search) {
    const postCollection = database.collection("posts");

    const regex = new RegExp(search, "i");

    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
        },
      },
      {
        $project: {
          "author.password": 0,
          "author._id": 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

    if (search) {
      pipeline.unshift({
        $match: {
          content: regex,
        },
      });
    }

    const posts = postCollection.aggregate(pipeline).toArray();

    return posts;
  }

  static async findPostByAuthorId(authorId) {
    const postCollection = database.collection("posts");

    const pipeline = [
      {
        $match: {
          authorId: new ObjectId(authorId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
        },
      },
      {
        $project: {
          "author.password": 0,
          "author._id": 0,
        },
      },
    ];
    const posts = postCollection.aggregate(pipeline).toArray();

    return posts;
  }
  static async findPostById(postId) {
    const postCollection = database.collection("posts");

    const pipeline = [
      {
        $match: {
          _id: new ObjectId(postId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
        },
      },
      {
        $project: {
          "author.password": 0,
          "author._id": 0,
        },
      },
    ];
    const posts = postCollection.aggregate(pipeline).toArray();
    // console.log(onePost);

    return posts;
  }

  static async createOnePost(input) {
    const { content, tags, imgUrl, authorId } = input;
    const postCollection = database.collection("posts");
    const post = postCollection.insertOne({
      content,
      tags,
      imgUrl,
      authorId: new ObjectId(authorId),
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
