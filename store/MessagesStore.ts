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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: textMessage }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching messages");
      }

      const data = await response.json();
      console.log(data);

      set({ chats: [data] });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useMessageStore;
