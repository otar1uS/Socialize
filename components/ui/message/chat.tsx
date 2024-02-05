import React, { useState, useRef, useEffect, useCallback } from "react";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { BsFillSendFill } from "react-icons/bs";
import { IChat, User } from "@/TS/ActionTypes";
import useMessageStore from "@/store/MessagesStore";

const ChatBox = ({ chat, curUser }: { chat: User[]; curUser: string }) => {
  const fetchMessages = useMessageStore((state) => state.fetchMessages);

  const { chats } = chat[0];

  const messages = chats[0].messages;

  const [textMessage, setMessage] = useState<string>("");
  const scroll = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scroll]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (textMessage.trim() !== "") {
      fetchMessages(curUser, chats[0]._id.toString(), textMessage);

      setMessage("");
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">
        {/* Chat with {chattingWithName && chattingWithName.username} */}
      </h2>
      <div className="bg-white  flex flex-col gap-1 max-w-full rounded-lg p-4 shadow-md h-96 overflow-y-auto">
        {messages.map((mes, i) => {
          console.log(mes.sender);

          return null;
          // (
          //   // <div
          //   //   key={i}
          //   //   className={` flex-col flex max-w-fit ${
          //   //     mes.sender.toString() === curUser
          //   //       ? "text-white bg-blue-500 sender self-end"
          //   //       : "bg-gray-300 text-gray-800 receiver self-start"
          //   //   } rounded-lg p-2`}
          //   //   ref={scroll}
          //   // >
          //   //   <p>{mes.content}</p>
          //   //   <p className="text-[10px] font-[500]">
          //   //     {moment(mes.timestamp).calendar()}
          //   //   </p>
          //   // </div>
          // );
        })}
      </div>
      <div className="flex items-center w-full gap-3 chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setMessage}
          onKeyDown={handleKeyPress}
          fontFamily="nunito"
          borderColor="rgba(72,112,223,0.2)"
        />
        <button
          onClick={sendMessage}
          className="send-btn flex items-center justify-center"
        >
          <BsFillSendFill className="w-[16px]" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
