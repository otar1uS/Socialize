"use client";
import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  GetBackArrow,
} from "@/lib/Utilities/IconsStore";
import { Avatar, AvatarFallback, AvatarImage } from "../../shadcn-ui/avatar";
import useUserState from "@/store/UserStore";
import { useUser } from "@clerk/nextjs";
import ChatBox from "./chat";
import useMessageStore from "@/store/MessagesStore";
import MessageSender from "./MessageSender";
import { getTimeOfLastMessage } from "@/lib/Utilities/utils";

export const Messages = ({ itsPage }: { itsPage: boolean }) => {
  const [open, setOpen] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  const createChat = useMessageStore((state) => state.createChat);
  const [curChatId, setCurrentChatId] = useState("");

  const { user } = useUser();

  const users = useUserState((state) =>
    state.Users.filter((u) => u.clerkId !== user?.id)
  );
  const userId = useUserState((state) =>
    state.Users.filter((u) => u.clerkId === user?.id)
  );

  const userChats = useMessageStore((state) => state.chats);
  const partnerMessage = useMessageStore((state) => state.partnerMessage);

  const chat = userChats
    .find((c) => c._id.toString() === userId[0]._id)
    ?.chats.filter((c) => c.partner.toString() == curChatId);

  const openedUserInfo = users.find((u) => u._id.toString() === curChatId);

  const openChatHandler = async (partnerId: string) => {
    setOpenChat((prev) => !prev);
    setCurrentChatId(partnerId.toString());

    try {
      await createChat(userId[0]._id, partnerId);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const partnerUserChat = users
    .find((u) => u._id.toString() === curChatId)
    ?.chats.find((c) => c.partner.toString() === userId[0]._id);

  const curUserChat = userId[0]?.chats.find(
    (c) => c.partner.toString() === curChatId
  );

  return (
    <div
      className={` ${
        itsPage
          ? "w-full h-screen   "
          : " absolute bottom-0 z-50 w-96 py-4 h-auto border-[1px] border-b-[0px] bg-black rounded-tl-md rounded-tr-md "
      }   `}
    >
      <div className="flex-col flex gap-4 w-full px-3 my-2 py-1 cursor-pointer">
        {!itsPage && (
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Messages</h1>
            {open ? (
              <ArrowDownIcon
                size={30}
                onClick={() => {
                  setOpen((e: boolean) => !e);
                  openChat && setOpenChat(false);
                }}
              />
            ) : (
              <ArrowUpIcon
                size={30}
                onClick={() => setOpen((e: boolean) => !e)}
              />
            )}
          </div>
        )}
        {openChat && (
          <div className="flex items-center justify-start gap-1   border-b-[1px_gray]    px-1 ">
            <GetBackArrow
              className="cursor-pointer"
              size={25}
              onClick={() => setOpenChat(false)}
            />
            <Avatar className="size-4">
              <AvatarImage src={openedUserInfo?.profilePhoto} />
              <AvatarFallback>
                {openedUserInfo?.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className={`${itsPage ? " text-lg" : " text-md"} text-white`}>
              texting with {openedUserInfo?.username}
            </p>
          </div>
        )}
      </div>

      <div
        className={`  ${
          itsPage
            ? "max-h-[calc(100vh-4rem)]   "
            : `  ${open ? "msg-open-transition" : "msg-close-transition"}`
        }   w-full flex flex-col  overflow-y-scroll   justify-start  custom-scrollbar `}
      >
        {openChat && (
          <ChatBox
            curUser={userId[0]._id.toString()}
            curUserChat={userChats.length > 0 ? chat![0] : curUserChat!}
            partnerUserChat={
              partnerMessage.length > 0 ? partnerMessage[0] : partnerUserChat!
            }
          />
        )}

        {users?.map((u, index) => {
          return (
            !openChat && (
              <div
                key={index}
                onClick={() => openChatHandler(u._id)}
                className="flex items-start flex-col border  py-2    justify-start mt-3 gap-3 px-4 cursor-pointer "
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={u.profilePhoto} />
                    <AvatarFallback>
                      {u.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <p className="text-white text-md">{u.username}</p>
                  <p className="text-indigo-200 text-sm">
                    {getTimeOfLastMessage(u, userId[0]._id.toString())?.time}
                  </p>
                </div>
                <p className="text-indigo-600 text-md  ">
                  {" "}
                  {getTimeOfLastMessage(
                    u,
                    userId[0]._id.toString()
                  )?.lastMessage?.slice(0, 20) + "..." ?? ""}
                </p>
              </div>
            )
          );
        })}
      </div>
      {openChat && (
        <MessageSender
          curUser={userId[0]._id.toString()}
          partnerId={curUserChat?.partner.toString()!}
        />
      )}
    </div>
  );
};
