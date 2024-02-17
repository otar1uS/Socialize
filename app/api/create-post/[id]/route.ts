import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { connectToDataBase } from "@/lib/mongoDB/mongoose";
import { writeFile } from "fs/promises";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import path from "path";

export const POST = async (req: Request, { params }: Params) => {
  const currentWorkingDirectory = process.cwd();

  const { photo, caption, tag } = Object.fromEntries(await req.formData());

  const { id } = params;

  const post: any = {
    postPhoto: photo,
    caption,
    tag,
  };

  // uploading photos

  try {
    const bytes = await post.postPhoto.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const sanitizedFileName = post.postPhoto.name.replace(/\s+/g, "_");
    const timestamp = new Date().getTime();
    const uniqueFileName = `${timestamp}_${sanitizedFileName}`;
    const uniquePostPhotoPath = path.join("public", "uploads", uniqueFileName);

    try {
      await writeFile(uniquePostPhotoPath, buffer);
    } catch (writeError) {
      console.error(`Failed to write file: ${writeError}`);
      return new Response("Failed to create post - error writing file", {
        status: 500,
      });
    }

    const postPhotoLocation = `/uploads/${post.postPhoto.name}`;

    await connectToDataBase();

    const user = await User.findOne({ clerkId: id });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const postResponse = await Post.create({
      creator: user._id,
      caption: caption,
      postPhoto: postPhotoLocation,
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
    return new Response(` Failed to create post ${e}`, {
      status: 500,
    });
  }
};
