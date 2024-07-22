import { ObjectId } from "mongodb";
import { database, client } from "../config/db.js";
import { encrypt } from "../helpers/bcrypt.js";

class User {
  static async findAllUsers() {
    const userCollection = database.collection("users");
    const users = userCollection.find().toArray();
    console.log(users);
    return users;
  }
  static async findOneUser(userId) {
    const userCollection = database.collection("users");
    const user = userCollection.findOne({
      _id: new ObjectId(userId),
    });
    //   console.log(user);
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
