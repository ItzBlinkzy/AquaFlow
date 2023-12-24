import mongoose from "mongoose";

const DASH_COUNT = 50

export default async function dbConnect() {
  console.log("Connecting to database...");
  try {
    const connectString = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster.uu92eo7.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(connectString);
    console.log("-".repeat(DASH_COUNT));
    console.log("Successfully connected to Mongo DB database.");
    console.log("-".repeat(DASH_COUNT));
  } catch (err) {
    console.log(err);
    console.log("-".repeat(DASH_COUNT));
    console.log("Could not connect to the database");
  }
}
