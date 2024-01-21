import User from "@/lib/models/userModel";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";

type Params = {
  params: { id: string };
};

export const GET = async (req: Request, { params }: Params) => {
  const { id } = params;

  try {
    await connectToDataBase();

    const user = await User.findOne({ clerkId: id })
      .populate("posts savedPosts following followers likedPosts")
      .exec();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (e) {
    return new Response("Failed to get user", { status: 500 });
  }
};