import Post from "@/lib/models/Post";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";

export const GET = async () => {
  try {
    await connectToDataBase();

    const posts = await Post.find({})
      .populate(
        "creator likes comments.creator comments.likes comments.replies.creator"
      )
      .exec();

    console.log(posts);
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response(`${e}  Failed to get posts`, { status: 500 });
  }
};
