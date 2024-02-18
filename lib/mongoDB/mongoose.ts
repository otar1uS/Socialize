import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

const mongoDB = process.env.MONGODB || "";

export const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(mongoDB, {
      dbName: "socialize",
    } as ConnectOptions);

    isConnected = true;
  } catch (e) {}
};
