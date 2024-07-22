import { database } from "../config/db";

class User {
  static async findAllUsers() {
    const userCollection = database.collection;
  }
}
