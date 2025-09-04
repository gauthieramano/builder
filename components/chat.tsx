"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { PanelRight, Redo2, Undo2 } from "lucide-react";
import { useState } from "react";
import { type ExternalToast, toast } from "sonner";
import { Response } from "@/components/ai-elements/response";
import { REGEX } from "@/lib/constants";
import { getJsx, getProperText } from "@/lib/helpers";
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
import useChatRefs, { useInitChatRefs } from "./hooks/useChatRefs";
import { Button } from "./ui/button";

type ArgsToast = [message: string, options?: ExternalToast];

type Props = {
  llmApiKey: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

export default function Chat({ llmApiKey, setCode }: Props) {
  const [input, setInput] = useState("");
  const [isLarge, setIsLarge] = useState(false);
  const { jsxs, steps, stepIndex, stashedMessages } = useInitChatRefs();

  const { messages, sendMessage, setMessages, status } = useChat({
    transport: new DefaultChatTransport({ body: { llmApiKey } }),

    experimental_throttle: 1000,

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
        jsxs.current.push(jsx);
        steps.current.push(0);
        stepIndex.current++;
      } else {
        // No new preview to display, but inappropriate messages to reference
        steps.current[steps.current.length - 1]++;
      }
    },
  });

  const { cleanRefs, undo, redo, hasLoader, canUndo, canRedo } = useChatRefs({
    messages,
    jsxs,
    steps,
    stepIndex,
    stashedMessages,
    status,
    setMessages,
    setCode,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.trim()) {
      cleanRefs();
      sendMessage({ text: input });
      setInput("");
    }
  };

  return (
    <div className="relative">
      <div
        className={`flex h-[calc(100dvh-158px)] shrink flex-col rounded-lg border p-2 text-xs ${isLarge ? "min-w-lg max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-2xl" : "min-w-50 max-w-3xs md:max-w-2xs lg:max-w-sm xl:max-w-md"}`}
      >
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
                            {getProperText(part.text)}
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

      <div className="absolute right-2 bottom-2 flex gap-2">
        <Button
          onClick={undo}
          size="icon"
          disabled={!canUndo}
          variant="secondary"
          className="size-8"
        >
          <Undo2 />
        </Button>

        <Button
          onClick={redo}
          size="icon"
          disabled={!canRedo}
          variant="secondary"
          className="size-8"
        >
          <Redo2 />
        </Button>
      </div>

      <Button
        onClick={() => setIsLarge(!isLarge)}
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 size-8"
      >
        <PanelRight />
      </Button>
    </div>
  );
}
