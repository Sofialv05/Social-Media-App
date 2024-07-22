import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

export const client = new MongoClient(uri);

export const database = client.db("gc1-P3");

// async function run() {
//   try {
//     const database = client.db("gc1-P3");
//     const movies = database.collection("movies");

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: "Back to the Future" };
//     const movie = await movies.findOne(query);

//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
