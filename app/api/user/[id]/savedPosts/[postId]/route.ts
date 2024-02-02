import { Post as PostTypes } from "@/TS/ActionTypes";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const POST = async (req: Request, { params }: Params) => {
  const { id, postId } = params;

  try {
    await connectToDataBase();

    const user = await User.findOne({ clerkId: id })
      .populate("following followers savedPosts likedPosts posts")
      .exec();

    const post = await Post.findById(postId)
      .populate(
        "creator likes comments.creator comments.likes comments.replies.creator"
      )

      .exec();

    const isSaved = user.savedPosts.find(
      (post: PostTypes) => post._id.toString() === postId
    );
    if (isSaved) {
      user.savedPosts = user.savedPosts.filter(
        (post: PostTypes) => post?._id.toString() !== postId
      );
    } else {
      user.savedPosts.push(post);
    }

    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to save post", { status: 500 });
  }
};
