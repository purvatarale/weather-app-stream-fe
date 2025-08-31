import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export type Part = { type: "text"; text: string };

export type UIMessage = {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  parts: Part[];
  timestamp?: string;
};

type MessageListProps = {
  messages: UIMessage[];
  isTyping?: boolean;
};

export default function MessageList({ messages, isTyping }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-6 pb-40">
      {messages.map((m) => (
        <div
          key={m.id}
          className={cn("mb-5", m.role === "user" ? "text-right" : "text-left")}
        >
          <div
            className={cn(
              "inline-flex max-w-[85%] flex-col gap-2 rounded-2xl px-3 py-2 text-sm",
              m.role === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-neutral-100 text-neutral-900",
            )}
          >
            {m.parts.map((p, i) => {
              // convert escaped \n into actual newlines
              const cleanText = p.text.replace(/\\n/g, "\n");
              return (
                <div key={i} className="whitespace-pre-wrap leading-relaxed">
                  <ReactMarkdown>{cleanText}</ReactMarkdown>
                </div>
              );
            })}

            {m.timestamp && (
              <div
                className={cn(
                  "text-[10px] opacity-70 mt-1",
                  m.role === "user" ? "text-right" : "text-left",
                )}
              >
                {m.timestamp}
              </div>
            )}
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="mb-5 text-left">
          <div className="inline-flex flex-col gap-2 rounded-2xl px-3 py-2 text-sm bg-neutral-100 text-neutral-900">
            <span className="animate-pulse">Assistant is typing…</span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
