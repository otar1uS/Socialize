import User from "@/lib/models/User";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";

export const GET = async (req: Request) => {
  try {
    await connectToDataBase();

    const allUsers = await User.find()
      .populate("posts savedPosts likedPosts followers following")
      .exec();

    return new Response(JSON.stringify(allUsers), { status: 200 });
  } catch (err: any) {
    return new Response(`Failed to get all users. Error: ${err.message}`, {
      status: 500,
    });
  }
};
