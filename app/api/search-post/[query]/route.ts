import Post from "@/lib/models/postModel";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";

export const GET = async (
  req: Request,
  { params }: { params: { query: string } }
) => {
  const { query } = params;

  try {
    await connectToDataBase();
    const post = await Post.find({
      $or: [
        { caption: { $regex: query, $options: "i" } },
        { tag: { $regex: query, $options: "i" } },
      ],
    });
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (e) {
    return new Response(`  Failed to get posts`, { status: 500 });
  }
};
