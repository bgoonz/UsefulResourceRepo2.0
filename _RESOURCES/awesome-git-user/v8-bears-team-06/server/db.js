import mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server";

import { User } from "./models/user";

export async function insertMockData() {
  await User.insertMany([
    { email: "foo@foo.com", password: "foo" },
    { email: "bar@bar.com", password: "bar" },
  ]);
}

export async function setupDbConnection(dev, mongoUri = "") {
  const mongoServer = new MongoMemoryServer({ binary: { version: "4.0.3" } });
  mongoUri = await mongoServer.getConnectionString();
  mongoose.connect(mongoUri, { useNewUrlParser: true });
  const conn = new Promise((resolve, reject) => {
    mongoose.connection
      .on("error", (err) => {
        reject(err);
      })
      .once("open", () => {
        return resolve();
      });
  });
  return conn;
}
