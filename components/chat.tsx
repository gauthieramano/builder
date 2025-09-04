"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { type ExternalToast, toast } from "sonner";
import { Response } from "@/components/ai-elements/response";
import { REGEX } from "@/lib/constants";
import { getJsx } from "@/lib/helpers";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "./ai-elements/conversation";
import { Loader } from "./ai-elements/loader";
import { Message, MessageContent } from "./ai-elements/message";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from "./ai-elements/prompt-input";

type ArgsToast = [message: string, options?: ExternalToast];

type Props = {
  llmApiKey: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

export default function Chat({ llmApiKey, setCode }: Props) {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ body: { llmApiKey } }),

    onError: (error) => {
      const result = error.message.match(REGEX.SEPARATION);
      const args: ArgsToast = result
        ? [result[1], { description: result[2] }]
        : [error.message];

      toast.error(...args);
    },

    onFinish: ({ message }) => {
      const jsx = getJsx(message);

      if (jsx) {
        setCode(jsx);
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const hasLoader = ["submitted", "streaming"].includes(status);

  return (
    <div className="relative">
      <div className="flex h-[calc(100dvh-158px)] min-w-50 max-w-lg shrink flex-col rounded-lg border p-2 text-xs">
        <Conversation>
          <ConversationContent>
            {messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <Response key={`${message.id}-${i}`}>
                            {part.text}
                          </Response>
                        );

                      default:
                        return null;
                    }
                  })}
                </MessageContent>
              </Message>
            ))}

            {hasLoader && (
              <div className="flex justify-center">
                <Loader />
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      <div className="-bottom-18 absolute">
        <PromptInput
          onSubmit={handleSubmit}
          className="relative mx-auto mt-4 w-[calc(100dvw-500px)] min-w-md max-w-2xl"
        >
          <PromptInputTextarea
            value={input}
            placeholder="Say what you want to build..."
            onChange={(event) => setInput(event.currentTarget.value)}
            className="pr-12"
          />
          <PromptInputSubmit
            status={status === "streaming" ? "streaming" : "ready"}
            disabled={!input.trim()}
            className="absolute right-1 bottom-1"
          />
        </PromptInput>
      </div>
    </div>
  );
}
