import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Menu, Trash } from "lucide-react";
import MessageList, { UIMessage } from "@/components/chat/messageList";
import MessageInput from "@/components/chat/messageInput";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chatStore";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";

export default function ChatPageMobile() {
  const router = useRouter();
  const { id } = router.query;
  const {
    chats,
    currentChatId,
    createChat,
    setCurrentChat,
    addMessage,
    updateMessage,
    clearChat,
    deleteChat,
  } = useChatStore();

  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const getTimestamp = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    if (typeof id === "string") {
      setCurrentChat(id);
      const existingChats = useChatStore.getState().chats;
      if (!existingChats[id]) {
        createChat(id);
      }
    }
  }, [id, createChat, setCurrentChat]);

  const messages = currentChatId ? chats[currentChatId]?.messages || [] : [];

  const sendMessage = async (text: string) => {
    if (!currentChatId) return;
    const userMessage: UIMessage = {
      id: Date.now().toString(),
      role: "user",
      parts: [{ type: "text", text }],
      timestamp: getTimestamp(),
    };

    addMessage(currentChatId, userMessage);
    setLoading(true);
    setIsTyping(true);

    try {
      const res = await fetch(
        "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            "x-mastra-dev-playground": "true",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: text }],
            runId: "weatherAgent",
            maxRetries: 2,
            maxSteps: 5,
            temperature: 0.5,
            topP: 1,
            runtimeContext: {},
            threadId: "abcd",
            resourceId: "weatherAgent",
          }),
        },
      );

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      let assistantMessage: UIMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        parts: [{ type: "text", text: "" }],
        timestamp: getTimestamp(),
      };
      addMessage(currentChatId, assistantMessage);

      const decoder = new TextDecoder();
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          // only process lines that start with "0:" (actual text tokens)
          if (line.startsWith("0:")) {
            let textPart = line.slice(2); // remove "0:"
            if (
              (textPart.startsWith('"') && textPart.endsWith('"')) ||
              (textPart.startsWith("'") && textPart.endsWith("'"))
            ) {
              textPart = textPart.slice(1, -1);
            }
            assistantMessage = {
              ...assistantMessage,
              parts: [
                {
                  type: "text",
                  text: assistantMessage.parts[0].text + textPart,
                },
              ],
            };
            updateMessage(currentChatId, assistantMessage);
          }
        }
      }
    } catch (err) {
      console.error(err);
      addMessage(currentChatId, {
        id: Date.now().toString(),
        role: "assistant",
        parts: [{ type: "text", text: "⚠️ Error fetching response" }],
        timestamp: getTimestamp(),
      });
    } finally {
      setIsTyping(false);
      setLoading(false);
    }
  };

  const handleClear = () => {
    if (currentChatId) {
      clearChat(currentChatId);
    }
  };

  const handleNewChat = () => {
    const newId = createChat();
    router.push(`/chat/${newId}`);
  };

  const handleDeleteChat = (chatId: string) => {
    deleteChat(chatId);
    if (currentChatId === chatId) {
      router.push("/");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between border-b p-3 ">
          <Sheet>
            <SheetTrigger>
              <Button>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <Button onClick={handleNewChat} className="mb-3">
                New Chat
              </Button>
              <div className="flex-1 overflow-y-auto space-y-2">
                {Object.keys(chats).map((chatId, idx) => (
                  <div key={chatId} className="flex items-center space-x-2">
                    <Button
                      variant={currentChatId === chatId ? "secondary" : "ghost"}
                      className="flex-1 justify-start"
                      onClick={() => router.push(`/chat/${chatId}`)}
                    >
                      Chat {idx + 1}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteChat(chatId)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="font-bold text-lg">Weather Chat</h1>
          <Button
            onClick={handleClear}
            variant="destructive"
            size="sm"
            disabled={loading}
          >
            Clear Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <MessageList messages={messages} isTyping={isTyping} />
        </div>

        <MessageInput onSend={sendMessage} disabled={loading} />
      </div>
    </div>
  );
}
