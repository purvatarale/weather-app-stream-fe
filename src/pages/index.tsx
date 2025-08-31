import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chatStore";

export default function Home() {
  const router = useRouter();
  const { createChat, chats } = useChatStore();

  const handleNewChat = () => {
    const id = createChat();
    router.push(`/chat/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome to Weather Chat</h1>
        <p className="text-gray-500">Ask anything about the weather.</p>
      </div>
      <Button onClick={handleNewChat}>Start a new chat</Button>
      {Object.keys(chats).length > 0 && (
        <div>
          <h2 className="text-lg mb-2">Recent chats</h2>
          <div className="flex flex-col space-y-2">
            {Object.keys(chats).map((id, idx) => (
              <Button
                key={id}
                variant="secondary"
                className="justify-start w-40"
                onClick={() => router.push(`/chat/${id}`)}
              >
                Chat {idx + 1}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
