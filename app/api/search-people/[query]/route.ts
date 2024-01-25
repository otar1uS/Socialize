import User from "@/lib/models/userModel";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";

export const GET = async (
  req: Request,
  { params }: { params: { query: string } }
) => {
  const { query } = params;

  try {
    await connectToDataBase();

    const searchedPosts = await User.find({
      query,
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
      ],
    })
      .populate("posts")
      .exec();

    console.log(`Searched Posts: ${JSON.stringify(searchedPosts)}`);

    return new Response(JSON.stringify(searchedPosts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get posts by search", { status: 500 });
  }
};
