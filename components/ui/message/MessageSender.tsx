import InputEmoji from "react-input-emoji";
import { BsFillSendFill } from "react-icons/bs";
import useMessageStore from "@/store/MessagesStore";
import { useEffect, useState } from "react";

import socketIO from "socket.io-client";

const socket = socketIO("http://localhost:4000", {
  transports: ["websocket"],
  withCredentials: true,
});

const PORT = process.env.PORT || 4000;

export const MessageSender = ({
  curUser,
  chatId,
}: {
  curUser: string;
  chatId: string;
}) => {
  const [textMessage, setMessage] = useState<string>("");
  const [socketReturnedData, setSocketReturnedData] = useState<any>();

  console.log(PORT);
  const fetchMessages = useMessageStore((state) => state.fetchMessages);

  console.log(socket);

  useEffect(() => {
    socketInitializer();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);
  async function socketInitializer() {
    try {
      socket.on("messageResponse", (data: any) => {
        setSocketReturnedData(data);
      });
    } catch (error) {
      console.error("Socket initialization error:", error);
    }
  }
  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      socket.emit("message", {
        textMessage,
      });
      sendMessage();
      setMessage("");
    }
    console.log("emitted");
  }

  const sendMessage = () => {
    if (textMessage.trim() !== "") {
      fetchMessages(curUser, chatId, socketReturnedData.textMessage);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center  px-4 gap-3 chat-input flex-grow-0 z-[100] ">
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
  );
};
