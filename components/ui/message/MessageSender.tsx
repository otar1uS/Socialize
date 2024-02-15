import React, { useState, useEffect, useRef } from "react";
import InputEmoji from "react-input-emoji";
import { BsFillSendFill } from "react-icons/bs";

import useMessageStore from "@/store/MessagesStore";
import { socket } from "./socket";
import { data } from "@/TS/ActionTypes";

const MessageSender = ({
  curUser,
  partnerId,
}: {
  curUser: string;
  partnerId: string;
}) => {
  const [textMessage, setTextMessage] = useState("");
  const fetchMessages = useMessageStore((state) => state.fetchMessages);
  const fetchPartnerMessage = useMessageStore(
    (state) => state.fetchPartnerMessage
  );

  useEffect(() => {
    if (socket) {
      socket.emit("register", { curUser });
    }

    const handleReceiveMessage = (data: data) => {
      fetchPartnerMessage(data.user, data.partnerId);
    };

    socket.on("messageResponse", handleReceiveMessage);

    return () => {
      socket.off("messageResponse", handleReceiveMessage);
    };
  }, [curUser, partnerId, fetchPartnerMessage]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (textMessage.trim() !== "") {
      try {
        await fetchMessages(curUser, partnerId, textMessage);
        if (socket) {
          socket.emit("message", { curUser, partnerId, textMessage });
        }
      } catch (error) {
        console.error("Error fetching messages after sending:", error);
      }

      setTextMessage("");
    }
  };

  return (
    <div className="flex items-center px-4 gap-3 chat-input flex-grow-0 z-[100]">
      <InputEmoji
        value={textMessage}
        onChange={setTextMessage}
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
  );
};

export default MessageSender;
