import { ObjectId } from "mongodb";
import { database, client } from "../config/db.js";
import { encrypt } from "../helpers/bcrypt.js";

class User {
  static async findAllUsers(search) {
    const userCollection = database.collection("users");

    let findUsername = {};
    if (search) {
      findUsername = { username: { $regex: search, $options: "i" } };
    }
    const users = userCollection.find(findUsername).toArray();

    return users;
  }
  static async findOneUserById(userId) {
    const pipeline = [
      {
        $match: {
          _id: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
        },
      },
    ];
    const userCollection = database.collection("users");
    const users = userCollection.aggregate(pipeline).toArray();

    return users;
  }
  static async findOneUserByUsername(username) {
    const userCollection = database.collection("users");
    const user = userCollection.findOne({
      username: username,
    });

    return user;
  }
  static async findOneUserByEmail(email) {
    const userCollection = database.collection("users");
    const user = userCollection.findOne({
      email,
    });

    return user;
  }
  static async createOneUser({ name, username, email, password }) {
    const userCollection = database.collection("users");
    const user = userCollection.insertOne({
      name,
      username,
      email,
      password: encrypt(password),
    });
    return user;
  }
}

export default User;
