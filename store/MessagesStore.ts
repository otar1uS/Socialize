import { User } from "@/TS/ActionTypes";
import { create } from "zustand";

interface messageState {
  chats: User[];

  createChat: (userId: string, partnerId: string) => Promise<void>;
  fetchMessages: (
    userId: string,
    partnerId: string,
    textMessage: string
  ) => Promise<void>;
}

const useMessageStore = create<messageState>((set) => ({
  chats: [],

  createChat: async (userId, partnerId) => {
    try {
      const response = await fetch(`/api/chats/${userId}/${partnerId}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("something went wrong while creating chat");
      }

      const data = await response.json();

      set((state) => ({ chats: [...state.chats, data] }));
    } catch (error) {
      console.error(error);
    }
  },

  fetchMessages: async (userId, partnerId, textMessage) => {
    try {
      const response = await fetch(
        `/api/chats/${userId}/${partnerId.toString()}/messages`,
        {
          method: "POST",
          body: JSON.stringify({ text: textMessage }),
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong while fetching messages");
      }

      const data = await response.json();

      set((state) => {
        console.log("Original State:", state);

        const newMessage = data.chats.messages.pop();

        console.log(newMessage);

        const updatedChats = state.chats.map((chat) => {
          const partnerChat = chat.chats.find(
            (c) => c._id.toString() === partnerId.toString()
          );

          if (partnerChat) {
            const updatedMessages = [...partnerChat.messages, newMessage];
            console.log("Updated Messages:", updatedMessages);

            return {
              ...chat,
              chats: chat.chats.map((c) =>
                c._id.toString() === partnerId.toString()
                  ? { ...c, messages: updatedMessages }
                  : c
              ),
            };
          }
          console.log(chat);
          return chat;
        });

        console.log("Updated Chats:", updatedChats);

        return { chats: updatedChats };
      });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useMessageStore;
