import { Post as PostTypes } from "@/TS/ActionTypes";
import LikedPosts from "@/app/(root)/liked-posts/page";
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

    const isLiked = user?.likedPosts.find(
      (post: PostTypes) => post._id.toString() === postId
    );

    if (isLiked) {
      user.likedPosts = user.likedPosts.filter(
        (post: PostTypes) => post?._id.toString() !== postId
      );
      post.likes.pull(user._id);
    } else {
      user.likedPosts.push(post);
      post.likes.push(user._id);
    }

    await user.save();
    await post.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to save post", { status: 500 });
  }
};
