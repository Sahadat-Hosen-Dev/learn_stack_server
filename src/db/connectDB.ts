import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (!DB_CONNECTION_URL || !DB_USERNAME || !DB_PASSWORD) {
  throw new Error("Missing environtment variables for database connection!");
}

const username = encodeURIComponent(DB_USERNAME);
const password = encodeURIComponent(DB_PASSWORD);

let connectionURL = DB_CONNECTION_URL.replace("<username>", username).replace(
  "<password>",
  password,
);

const connectDB = async () => {
  await mongoose.connect(connectionURL, {
    dbName: process.env.DB_NAME,
  });
  console.log("Datebase Connected");
};

export default connectDB;
