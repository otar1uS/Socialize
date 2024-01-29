import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";

type Params = {
  params: { id: string };
};

export const GET = async (req: Request, { params }: Params) => {
  await connectToDataBase();
  try {
    const user = await User.findOne({ clerkId: params.id })
      .populate("posts savedPosts  likedPosts  followers  following")
      .exec();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (e) {
    console.log(e);
    console.error(e);
    return new Response(`${e}  Failed to get user`, { status: 500 });
  }
};
