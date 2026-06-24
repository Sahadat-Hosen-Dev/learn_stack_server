import http from "http";
import app from "./app";
import dotenv from "dotenv";
import connectDB from "./db";
dotenv.config();
const port = process.env.PORT || 4000;
const server = http.createServer(app);

const main = async () => {
  try {
    await connectDB();
    server.listen(port, async () => {
      console.log(`Server is running: ${port}`);
    });
  } catch (e) {
    console.log("Datebase Error");
    console.log(e);
  }
};

main();
