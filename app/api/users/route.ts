import User from "@/lib/models/userModel";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";

export const GET = async () => {
  try {
    await connectToDataBase();

    const posts = await User.find({});

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (e) {
    return new Response(`${e}  Failed to get posts`, { status: 500 });
  }
};
