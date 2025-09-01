"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

type Props = {
  llmApiKey: string;
};

export default function Chat({ llmApiKey }: Props) {
  const [input, setInput] = useState("");

  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({ body: { llmApiKey } }),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  return (
    <div className="flex h-[calc(100dvh-110px)] min-w-3xs max-w-lg shrink flex-col overflow-scroll rounded-lg border p-6 text-xs sm:h-[calc(100dvh-158px)]">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>;

              default:
                return null;
            }
          })}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Say something..."
          onChange={(event) => setInput(event.currentTarget.value)}
          className="fixed bottom-0 mb-8 w-lg max-w-md rounded border border-zinc-300 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
        />
      </form>
    </div>
  );
}
