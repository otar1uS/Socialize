import Post from "@/lib/models/Post";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";

export const GET = async (
  req: Request,
  { params }: { params: { query: string } }
) => {
  const { query } = params;

  try {
    await connectToDataBase();

    const searchedPosts = await Post.find({
      $or: [
        { caption: { $regex: query, $options: "i" } },
        { tag: { $regex: query, $options: "i" } },
      ],
    })
      .populate(
        "creator likes comments.creator comments.likes comments.replies.creator"
      )
      .exec();
    console.log(`Searched Posts: ${JSON.stringify(searchedPosts)}`);

    return new Response(JSON.stringify(searchedPosts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get posts by search", { status: 500 });
  }
};
