import Post from "@/lib/models/postModel";

import { connectToDataBase } from "@/lib/mongoDB/mongoose";
import { writeFile } from "fs/promises";

type Params = {
  params: { id: string };
};

export const POST = async (req: Request, { params }: Params) => {
  const path = require("path");
  const currentWorkingDirectory = process.cwd();

  const { photo, caption, tag } = Object.fromEntries(await req.formData());

  try {
    const post: any = {
      postPhoto: photo,
      caption,
      tag,
    };

    if (typeof post?.postPhoto !== "string") {
      const bytes = await post.postPhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const postPhotoPath = path.join(
        currentWorkingDirectory,
        "public",
        "uploads",
        post.postPhoto.name
      );

      await writeFile(postPhotoPath, buffer);
    }

    console.log(post.postPhoto.name);
    const postPhotoLocation = `/uploads/${post.postPhoto.name}`;

    await connectToDataBase();
    const postResponse = await Post.findByIdAndUpdate(
      params.id,
      {
        $set: {
          caption: caption,
          postPhoto: postPhotoLocation,
          tag: tag,
        },
      },
      { new: true, useFindAndModify: false }
    );

    await postResponse.save();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to update the post", { status: 500 });
  }
};
