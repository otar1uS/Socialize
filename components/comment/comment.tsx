"use client";

import { useState } from "react";
import { CommentPoster } from "./commentPoster";
import { usePosts } from "@/store/PostsStore";
import { commentProps } from "@/TS/ActionTypes";
import { formatTime } from "@/lib/Utilities/utils";
import { CommentUI } from "./CommentUI";

export const Comment = ({
  clerkId,
  commentId,
  postId,
  username,
  time,
  text,
  picture,
}: commentProps) => {
  const [showReply, setShowReply] = useState(false);

  const posts = usePosts();

  const replay = posts
    .find((p) => p._id.toString() === postId)
    ?.comments.find((c) => c._id.toString() === commentId)?.replies;

  return (
    <div>
      <div className="flex flex-col items-start gap-8">
        <CommentUI
          username={username}
          time={time}
          text={text}
          picture={picture}
          clerkId={clerkId}
          isItReplay={false}
          setShowReply={setShowReply}
          replayCount={replay?.length}
        />
      </div>
      {showReply && (
        <div className="flex ml-10 py-4  border-l-[1px] border-[#ffffff53]">
          <div className="flex flex-col items-start gap-2 ml-2">
            {replay?.map((r, i) => {
              const time = formatTime(r.createdAt);
              return (
                <CommentUI
                  key={i}
                  username={r.creator.username}
                  time={time}
                  text={r.text}
                  picture={r.creator.profilePhoto}
                  clerkId={r.creator.clerkId}
                  isItReplay={true}
                  setShowReply={setShowReply}
                />
              );
            })}
            <CommentPoster
              commentId={commentId}
              clerkId={clerkId}
              isItComment={false}
              postId={postId}
            />
          </div>
        </div>
      )}
    </div>
  );
};
