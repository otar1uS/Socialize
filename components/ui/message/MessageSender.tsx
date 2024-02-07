import InputEmoji from "react-input-emoji";
import { BsFillSendFill } from "react-icons/bs";
import useMessageStore from "@/store/MessagesStore";
import { useState } from "react";

export const MessageSender = ({
  curUser,
  chatId,
}: {
  curUser: string;
  chatId: string;
}) => {
  const [textMessage, setMessage] = useState<string>("");

  const fetchMessages = useMessageStore((state) => state.fetchMessages);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };
  const sendMessage = () => {
    if (textMessage.trim() !== "") {
      fetchMessages(curUser, chatId, textMessage);

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
