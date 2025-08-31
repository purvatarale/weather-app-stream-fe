import { create, type StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { UIMessage } from "@/components/chat/messageList";

type Chat = {
  id: string;
  messages: UIMessage[];
};

type ChatState = {
  chats: Record<string, Chat>;
  currentChatId: string | null;
  createChat: (id?: string) => string;
  setCurrentChat: (id: string | null) => void;
  addMessage: (chatId: string, message: UIMessage) => void;
  updateMessage: (chatId: string, message: UIMessage) => void;
  clearChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
};

const storage = typeof window !== "undefined"
  ? createJSONStorage(() => localStorage)
  : {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    };

const storeCreator: StateCreator<ChatState> = (set) => ({
      chats: {},
      currentChatId: null,
      createChat: (idParam?: string) => {
        const id = idParam ?? uuidv4();
        set((state) => ({
          chats: { ...state.chats, [id]: { id, messages: [] } },
          currentChatId: id
        }));
        return id;
      },
      setCurrentChat: (id: string | null) => set({ currentChatId: id }),
      addMessage: (chatId: string, message: UIMessage) =>
        set((state) => ({
          chats: {
            ...state.chats,
            [chatId]: {
              id: chatId,
              messages: [
                ...(state.chats[chatId]?.messages || []),
                message
              ]
            }
          }
        })),
      updateMessage: (chatId: string, message: UIMessage) =>
        set((state) => {
          const messages = state.chats[chatId]?.messages || [];
          if (messages.length === 0) return {};
          return {
            chats: {
              ...state.chats,
              [chatId]: {
                id: chatId,
                messages: [...messages.slice(0, -1), message]
              }
            }
          };
        }),
      clearChat: (chatId: string) =>
        set((state) => ({
          chats: {
            ...state.chats,
            [chatId]: { id: chatId, messages: [] }
          }
        })),
      deleteChat: (chatId: string) =>
        set((state) => {
          const rest = { ...state.chats };
          delete rest[chatId];
          const newCurrent = state.currentChatId === chatId ? null : state.currentChatId;
          return {
            chats: rest,
            currentChatId: newCurrent
          };
        })
    });

export const useChatStore = create<ChatState>()(
  persist<ChatState>(storeCreator, {
    name: "chat-storage",
    storage: storage as any
  })
);
