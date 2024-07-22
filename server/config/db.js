import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
const uri = process.env.MONGODB_URI;

export const client = new MongoClient(uri);

export const database = client.db("gc1P3-Social_Media");
