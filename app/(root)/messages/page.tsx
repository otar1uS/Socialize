"use client";

import { Post } from "@/TS/ActionTypes";
import { Cards } from "@/components/cards/Cards";
import { Messages } from "@/components/ui/message/Messages";
import usePostState from "@/store/PostsStore";

const MessagePage = () => {
  return (
    <div className="w-full h-full ">
      <Messages itsPage={true} />
    </div>
  );
};

export default MessagePage;
