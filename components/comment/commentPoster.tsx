"use client";

import React from "react";
import { Input } from "../shadcn-ui/input";
import { Button } from "../shadcn-ui/button";
import { useState } from "react";
import { User } from "@/TS/ActionTypes";

import useUserState from "@/store/UserStore";
import { useUser } from "@clerk/nextjs";
import { useAddComment, usePostHandler } from "@/store/PostsStore";

export const CommentPoster = ({ postId }: { postId: any }) => {
  const [comment, setComment] = useState("");
  const postHandler = usePostHandler();
  const addComment = useAddComment();

  
  const Users = useUserState((state) => state.Users);
  const { user } = useUser();

  const creator = Users.find((u: User) => u.clerkId === user?.id);
  const time: Date = new Date();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      postHandler(url, "POST", { text: comment });
      addComment({ text: comment, creator, time, postId: postId.toString() });
      setComment("");
    }
  };

  const url = `/api/posts/${postId}/comment/${user?.id}`;
  return (
    <div className="flex flex-col items-start ">
      <div className="w-full flex gap-2 ">
        <Input
          className="flex-grow-[3] h-[30px] bg-black"
          value={comment}
          onKeyDown={handleKeyPress}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          className="flex-grow-[1] hover:bg-cyan h-[30px]"
          onClick={() => {
            postHandler(url, "POST", { text: comment });
            addComment({
              text: comment,
              creator,
              time,
              postId: postId.toString(),
            });
            setComment("");
          }}
        >
          Reply
        </Button>
      </div>
    </div>
  );
};
