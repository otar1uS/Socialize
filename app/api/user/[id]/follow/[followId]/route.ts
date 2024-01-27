import { User as UserTypes } from "@/TS/ActionTypes";
import User from "@/lib/models/User";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";

export const POST = async (
  req: Request,
  { params }: { params: { id: string; followId: string } }
) => {
  const { id, followId } = params;

  try {
    await connectToDataBase();

    const user = await User.findOne({ clerkId: id })
      .populate("posts likedPosts savedPosts followers following")
      .exec();

    const personToFollow = await User.findById(followId)
      .populate("posts likedPosts savedPosts followers following")
      .exec();

    const isFollowing = user.following.find(
      (item: UserTypes) => item._id.toString() == followId
    );

    if (isFollowing) {
      user.following = user.following.filter(
        (item: UserTypes) => item._id.toString() !== followId
      );
      personToFollow.followers = personToFollow.followers.filter(
        (item: UserTypes) => item._id.toString() !== user._id.toString()
      );
    } else {
      user.following.push(personToFollow);
      personToFollow.followers.push(user);
    }
    await user.save();
    await personToFollow.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response(`Failed to follow or  unfollow user ${e}`, {
      status: 500,
    });
  }
};
