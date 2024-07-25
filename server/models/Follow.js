import { ObjectId } from "mongodb";
import { database } from "../config/db.js";

class Follow {
  static async addFollow({ followingId, followerId }) {
    const followCollection = database.collection("follow");
    const follow = followCollection.insertOne({
      followingId: new ObjectId(followingId),
      followerId: new ObjectId(followerId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return follow;
  }

  static async findFollowers(userId) {
    const followCollection = database.collection("follow");
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "followerId",
          foreignField: "_id",
          as: "follower",
        },
      },
      {
        $unwind: {
          path: "$follower",
        },
      },
      {
        $project: {
          "follower.password": 0,
          "follower._id": 0,
        },
      },
      {
        $match: {
          followingId: new ObjectId(userId),
        },
      },
    ];

    const followers = followCollection.aggregate(pipeline).toArray();

    return followers;
  }
  static async findFollowing(userId) {
    const followCollection = database.collection("follow");
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "followingId",
          foreignField: "_id",
          as: "following",
        },
      },
      {
        $unwind: {
          path: "$following",
        },
      },
      {
        $project: {
          "following.password": 0,
          "following._id": 0,
        },
      },
      {
        $match: {
          followerId: new ObjectId(userId),
        },
      },
    ];

    const following = followCollection.aggregate(pipeline).toArray();

    return following;
  }
}

export default Follow;
