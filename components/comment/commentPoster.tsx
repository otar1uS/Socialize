"use client";

import React from "react";
import { Input } from "../shadcn-ui/input";
import { Button } from "../shadcn-ui/button";
import { useState } from "react";
import {
  User,
  commentPosterHandlerProps,
  commentPosterProps,
} from "@/TS/ActionTypes";

import useUserState from "@/store/UserStore";
import { useUser } from "@clerk/nextjs";
import {
  useAddComment,
  useAddReplies,
  usePostHandler,
} from "@/store/PostsStore";

export const CommentPoster = ({
  postId,
  isItComment,
  commentId,
  clerkId,
}: commentPosterProps) => {
  const [comment, setComment] = useState("");
  const Users = useUserState((state) => state.Users);
  const { user } = useUser();
  const postHandler = usePostHandler();
  const addComment = useAddComment();
  const addReply = useAddReplies();
  const creator = Users.find((u: User) => u.clerkId === user?.id);
  const time: Date = new Date();

  const url = isItComment
    ? `/api/posts/${postId}/comment/${user?.id}`
    : `/api/posts/${commentId}/replies/${clerkId}`;

  const handler = (e: commentPosterHandlerProps) => {
    if (
      (e as React.KeyboardEvent<HTMLInputElement>)?.key === "Enter" ||
      e.type === "click"
    ) {
      postHandler(url, "POST", { text: comment });
      isItComment
        ? addComment({
            text: comment,
            creator,
            time,
            postId: postId.toString(),
          })
        : addReply({
            text: comment,
            creator,
            time,
            postId: postId.toString(),
            commentId: commentId!.toString(),
          });

      setComment("");
    }
  };

  return (
    <div className="flex flex-col items-start ">
      <div className="w-full flex gap-2 ">
        <Input
          className="flex-grow-[3] h-[30px] bg-black"
          value={comment}
          onKeyDown={handler}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          className="flex-grow-[1] hover:bg-cyan h-[30px]"
          onClick={handler}
        >
          Reply
        </Button>
      </div>
    </div>
  );
};
