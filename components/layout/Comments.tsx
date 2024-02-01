"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../shadcn-ui/input";
import { Button } from "../shadcn-ui/button";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn-ui/avatar";
import { Post } from "@/TS/ActionTypes";
import usePostState from "@/store/PostsStore";
import { useUser } from "@clerk/nextjs";

const Comments = ({ post }: { post: Post }) => {
  const [comment, setComment] = useState("");

  const postHandler = usePostState((state) => state.postHandler);
  const { user } = useUser();
  const url = `/api/posts/${post._id}/comment/${user?.id}`;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      postHandler(url, "POST", { text: comment });
      setComment("");
    }
  };

  return (
    <div className="w-full max-w-full h-60 overflow-scroll  flex flex-col bg-dark text-indigo-200  p-4 rounded-md gap-6 ">
      <div className="text-[16px] items-start ">Comments</div>
      <div className="flex flex-col items-start ">
        <div className="w-full flex gap-2 ">
          <Input
            className="flex-grow-[3] bg-black"
            value={comment}
            onKeyDown={handleKeyPress}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="flex-grow-[1]"
            onClick={() => {
              postHandler(url, "POST", { text: comment });
              setComment("");
            }}
          >
            Reply
          </Button>
        </div>
      </div>
      {post.comments &&
        post.comments.map((com) => (
          <Comment
            key={com._id.toString()}
            username={com.user.username!}
            text={com.text}
            time={com.date.toString()}
          />
        ))}
    </div>
  );
};

export default Comments;

const Comment = ({
  username,
  time,
  text,
}: {
  username: string;
  time: string;
  text: string;
}) => (
  <div className="flex">
    {/* <Avatar>
              <AvatarImage
                src={
                  isItProfile
                    ? userInfo?.profilePhoto
                    : postData?.creator?.profilePhoto
                }
                onClick={() =>
                  router.replace(
                    `/profile/${
                      isItProfile
                        ? userInfo?.clerkId
                        : postData?.creator.clerkId
                    }`
                  )
                }
                className="cursor-pointer"
              />
              <AvatarFallback>
                {isItProfile
                  ? userInfo?.firstName.slice(0, 2).toUpperCase()
                  : postData?.creator?.firstName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar> */}

    <div className="flex flex-col items-start gap-2 ml-2">
      <div className="flex gap-2 items-center">
        <div className=" text-[12px]  md:text-[16px] font-[700]">
          {username}
        </div>
        <div className="text-[10px]  md:text-[12px]">{time}</div>
      </div>
      <div className="text-[12px]  md:text-[14px]">{text}</div>
    </div>
    <MdOutlineQuestionAnswer
      size={18}
      className="ml-auto mt-auto cursor-pointer"
    />
    <div></div>
  </div>
);
