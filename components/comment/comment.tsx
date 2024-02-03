"use client";

import { useRouter } from "next/navigation";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn-ui/avatar";
import { useState } from "react";
import { usePostHandler } from "@/store/PostsStore";
import { useUser } from "@clerk/nextjs";
import { CommentPoster } from "./commentPoster";

export const Comment = ({
  username,
  time,
  text,
  picture,
  clerkId,
  commentId,
}: {
  username: string;
  time: string;
  text: string;
  picture: string;
  clerkId: string;
  commentId: string;
}) => {
  const router = useRouter();

  const [showReply, setShowReply] = useState(false);

  return (
    <div>
      <div className="flex">
        <Avatar>
          <AvatarImage
            src={picture}
            onClick={() => router.replace(`/profile/${clerkId}`)}
            className="cursor-pointer"
          />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-start gap-2 ml-2">
          <div className="flex gap-2 items-center">
            <div className=" text-[12px]  md:text-[14px] font-[700]">
              {username}
            </div>
            <div className="text-[10px]  md:text-[12px]">{time}</div>
          </div>
          <div className="text-[12px]  md:text-[14px] text-wrap">{text}</div>
        </div>
        <MdOutlineQuestionAnswer
          onClick={() => setShowReply((e: boolean) => !e)}
          size={18}
          className="ml-auto mt-auto cursor-pointer"
        />
      </div>

      {showReply && (
        <div className="flex ml-10 py-4 border-l-[1px] border-[#ffffff53]">
          <div className="flex flex-col items-start gap-2 ml-2">
            <CommentPoster
              commentId={commentId}
              clerkId={clerkId}
              isItComment={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};
