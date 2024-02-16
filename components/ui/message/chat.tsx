import React, { useState, useRef, useEffect, useCallback } from "react";
import moment from "moment";

import { IChat, IMessage, User } from "@/TS/ActionTypes";

const ChatBox = ({
  curUserChat,
  partnerUserChat,
  curUser,
}: {
  curUserChat: IChat;
  partnerUserChat: IChat;
  curUser: string;
}) => {
  const messages = curUserChat?.messages;

  const curMessages = curUserChat?.messages || [];
  const partnerMessages = partnerUserChat?.messages || [];

  const allMessages = [...curMessages, ...partnerMessages].sort(
    (a, b) =>
      new Date(a.timestamp ?? 0).getTime() -
      new Date(b.timestamp ?? 0).getTime()
  );

  const scroll = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scroll]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className="bg-gray-100 rounded-lg p-2 h-auto  relative">
      <div className="bg-white flex flex-col gap-1 max-w-full rounded-lg p-4 shadow-md min-h-[600px] overflow-y-scroll custom-scrollbar">
        {curUserChat.messages || partnerUserChat.messages
          ? allMessages.map((mes: IMessage, i: number) => {
              return (
                <div
                  key={i}
                  className={` flex-col flex max-w-fit ${
                    mes.sender.toString() === curUser
                      ? "text-white bg-blue-500  self-end"
                      : "bg-slate-200 text-indigo-800  self-start"
                  } rounded-lg p-2`}
                  ref={scroll}
                >
                  <p>{mes.content}</p>
                  <p className="text-[10px] font-[500]">
                    {moment(mes.timestamp).calendar()}
                  </p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ChatBox;
