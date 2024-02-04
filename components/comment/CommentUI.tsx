import { useRouter } from "next/navigation";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn-ui/avatar";
import { CommentUIProps } from "@/TS/ActionTypes";

export const CommentUI = ({
  setShowReply,
  username,
  time,
  text,
  picture,
  clerkId,
  replayCount,
  isItReplay,
}: CommentUIProps) => {
  const router = useRouter();

  return (
    <div className="flex items-end gap-3">
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
          <div
            className={` ${
              isItReplay
                ? "text-[10px] md:text-[12px] "
                : "text-[12px]  md:text-[14px] font-weight-bold "
            } `}
          >
            {username}
          </div>
          <div className="text-[10px]  md:text-[12px]">{time}</div>
        </div>
        <div
          className={` ${
            isItReplay
              ? "text-[10px] md:text-[12px]"
              : "text-[12px]  md:text-[14px] "
          } text-wrap`}
        >
          {text}
        </div>
      </div>
      {!isItReplay && (
        <div className="flex gap-1 items-center ">
          <p className="text-[12px]  md:text-[14px]">{replayCount}</p>
          <MdOutlineQuestionAnswer
            onClick={() => setShowReply((e: boolean) => !e)}
            size={18}
            className="ml-auto mt-auto cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};
