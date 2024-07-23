import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export const client = new MongoClient(uri);

export const database = client.db("gc1P3-Social_Media");
