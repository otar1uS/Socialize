import { connectToDataBase } from "@/lib/mongoDB/mongoose";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { uploads } from "@/lib/Utilities/cloudinary";
import Post from "@/lib/models/Post";
import User from "@/lib/models/User";

export const POST = async (req: Request, { params }: Params) => {
  try {
    const { photo, caption, tag } = Object.fromEntries(await req.formData());
    const { id } = params;

    await connectToDataBase();

    const photoBlob = new Blob([photo]);
    const arrayBuffer = await photoBlob.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const cloudinaryResult = await uploads(buffer, "socialize");

    const user = await User.findOne({ clerkId: id });

    const postResponse = await Post.create({
      creator: user._id,
      caption: caption,
      postPhoto: (cloudinaryResult as any).url,
      tag: tag,
    });

    await postResponse.save();

    await User.findOneAndUpdate(
      user._id,
      { $push: { posts: postResponse._id } },
      { new: true, useFindAndModify: false }
    );

    return new Response("Post was created successfully", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(`Failed to create post ${e}`, {
      status: 500,
    });
  }
};
