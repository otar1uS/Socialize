import Post from "@/lib/models/Post";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";
import { unlink } from "fs/promises";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import path from "path";

export const GET = async (req: Request, { params }: Params) => {
  try {
    await connectToDataBase();

    const post = await Post.findById(params.id)
      .populate("likes creator comments.user")
      .exec();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error(err);
    console.log(err);
    return new Response("Fail to get post by id", { status: 500 });
  }
};
