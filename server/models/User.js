import { database, client } from "../config/db.js";

class User {
  static async findAllUsers() {
    try {
      const userCollection = database.collection("users");
      const users = await userCollection.find().toArray();
      console.log(users);
      return users;
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
    }
  }
  static async createOneUser() {
    try {
      const userCollection = database.collection("users");
      const user = await userCollection.insertOne({
        name,
        username,
        email,
        password,
      });
      return user;
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
    }
  }
}

export default User;
