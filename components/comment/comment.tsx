"use client";

import { useRouter } from "next/navigation";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn-ui/avatar";

export const Comment = ({
  username,
  time,
  text,
  picture,
  clerkId,
}: {
  username: string;
  time: string;
  text: string;
  picture: string;
  clerkId: string;
}) => {
  const router = useRouter();

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
          size={18}
          className="ml-auto mt-auto cursor-pointer"
        />
      </div>
      <div className=""></div>
    </div>
  );
};
