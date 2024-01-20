import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

const mongoDB = process.env.MONGODB || "";

export const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    isConnected = true;

    console.log("mongoDB is Connected");
  } catch (e) {
    console.log(`mongodb connection failed ${e}`);
  }
};
