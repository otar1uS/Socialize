"use client";

import { Comment } from "./comment";
import { Post } from "@/TS/ActionTypes";
import { CommentPoster } from "./commentPoster";
import { formatTime } from "@/lib/Utilities/utils";

export default function Comments({ post }: { post: Post }) {
  return (
    <div className="w-full max-w-full h-60  overflow-y-scroll  custom-scrollbar   flex flex-col bg-dark text-indigo-200  p-4 rounded-md gap-6 ">
      <div className="text-[16px] items-start ">Comments</div>
      <CommentPoster postId={post._id} />
      {post.comments &&
        post.comments.map((com, i) => {
          return (
            <Comment
              key={i}
              picture={com.creator.profilePhoto!}
              username={com.creator.firstName + " " + com.creator.lastName}
              text={com.text}
              time={formatTime(com.createdAt)}
              clerkId={com.creator.clerkId!}
            />
          );
        })}
    </div>
  );
}
