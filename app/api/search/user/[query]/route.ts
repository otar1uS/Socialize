import User from "@/lib/models/User";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";

export const GET = async (
  req: Request,
  { params }: { params: { query: string } }
) => {
  const { query } = params;

  try {
    await connectToDataBase();

    const searchedUsers = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
      ],
    })
      .populate("posts savedPosts  likedPosts  followers  following")
      .exec();

    return new Response(JSON.stringify(searchedUsers), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(`Failed to get users by search ${err}`, {
      status: 500,
    });
  }
};
