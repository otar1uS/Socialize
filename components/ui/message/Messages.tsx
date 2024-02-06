"use client";
import { useState } from "react";

import {
  MdOutlineKeyboardDoubleArrowDown as ArrowDownIcon,
  MdOutlineKeyboardDoubleArrowUp as ArrowUpIcon,
} from "react-icons/md";

import { Avatar, AvatarFallback, AvatarImage } from "../../shadcn-ui/avatar";
import useUserState from "@/store/UserStore";
import { currentUser, useUser } from "@clerk/nextjs";
import ChatBox from "./chat";
import useMessageStore from "@/store/MessagesStore";
import { IChat } from "@/TS/ActionTypes";

export const Messages = () => {
  const [open, setOpen] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [curChatId, setCurrentChatId] = useState<string>("");
  const createChat = useMessageStore((state) => state.createChat);

  const { user } = useUser();
  const users = useUserState((state) =>
    state.Users.filter((u) => u.clerkId !== user?.id)
  );
  const userId = useUserState((state) =>
    state.Users.filter((u) => u.clerkId === user?.id)
  );

  const openChatHandler = async (partnerId: string) => {
    setOpenChat((e) => !e);
    setCurrentChatId(partnerId.toString());
    try {
      await createChat(userId[0]._id, partnerId);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const chat = userId[0]?.chats?.find(
    (c) => c.partner.toString() === curChatId
  );

  const partnerMessages = users
    .find((u) => u._id.toString() === curChatId)
    ?.chats.find((c) => c.partner.toString() === userId[0]._id)?.messages;

  chat?.messages.concat(partnerMessages!) || [];

  return (
    <div className=" absolute bottom-0  z-50 w-96 py-4 h-auto border-[1px] border-b-[0px] bg-black rounded-tl-md rounded-tr-md  ">
      <div
        onClick={() => setOpen((e: boolean) => !e)}
        className="flex justify-between items-center px-3 py-1 cursor-pointer"
      >
        <h1 className="text-xl font-bold">Messages</h1>
        {open ? <ArrowDownIcon size={30} /> : <ArrowUpIcon size={30} />}
      </div>

      <div
        className={`overflow-auto  w-full flex flex-col  justify-start ${
          open ? "msg-open-transition" : "msg-close-transition"
        } `}
      >
        {openChat && (
          <ChatBox curUser={userId[0]._id.toString()} chat={chat as IChat} />
        )}

        {users?.map((u, index) => {
          return (
            !openChat && (
              <div
                key={index}
                onClick={() => openChatHandler(u._id)}
                className="flex items-center  border-b-[1px_gray] justify-start mt-3 gap-3 px-3 cursor-pointer"
              >
                <Avatar>
                  <AvatarImage src={u.profilePhoto} />
                  <AvatarFallback>
                    {u.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <p className="text-white text-md">{u.username}</p>
                <p className="text-indigo-200 text-sm">21/02/2023</p>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};
