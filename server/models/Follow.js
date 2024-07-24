import { database } from "../config/db.js";

class Follow {
  static async addFollow({ followingId }) {
    const followerId = "";

    const followCollection = database.collection("follow");
    const follow = followCollection.insertOne({
      followingId,
      followerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return follow;
  }
}

export default Follow;
