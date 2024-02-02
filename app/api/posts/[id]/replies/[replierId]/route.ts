import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const POST = async (req: Request, { params }: Params) => {
  try {
    await connectToDataBase();

    const user = await User.findOne({ clerkId: params.replierId }).exec();
    const post = await Post.findOne({ "comments._id": params.id }).exec();

    if (!post || !user) {
      return new Response(
        JSON.stringify({ error: "comment or user not found" }),
        {
          status: 404,
        }
      );
    }

    const body = await req.json();

    const comment = post.comments.id(params.id);
    comment.replies.push({
      text: body?.text,
      creator: user._id,
    });

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate(
        "creator likes comments.creator comments.likes comments.replies.creator"
      )
      .exec();

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
};
