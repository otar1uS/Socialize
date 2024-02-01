import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const POST = async (req: Request, { params }: Params) => {
  try {
    await connectToDataBase();

    const user = await User.findOne({ clerkId: params.creatorId }).exec();
    const post = await Post.findById(params.id).exec();

    if (!post || !user) {
      return new Response(JSON.stringify({ error: "Post or user not found" }), {
        status: 404,
      });
    }

    const body = await req.json();

    console.log(body?.text);
    post.comments.push({
      text: body?.text,
      user: user._id,
    });

    await post.save();

    const updatedPost = await Post.findById(params.id)
      .populate("comments.user likes creator")
      .exec();

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
};
