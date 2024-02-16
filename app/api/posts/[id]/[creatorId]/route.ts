import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const DELETE = async (req: Request, { params }: Params) => {
  try {
    await connectToDataBase();

    await Post.findByIdAndDelete(params.id);

    const user = await User.findByIdAndUpdate(
      params.creatorId,
      { $pull: { posts: params.id } },
      { new: true, useFindAndModify: false }
    )
      .populate("posts savedPosts likedPosts followers following")
      .exec();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to delete the post", { status: 500 });
  }
};
